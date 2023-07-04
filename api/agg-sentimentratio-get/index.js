//https://learn.microsoft.com/azure/developer/javascript/how-to/with-database/use-sql-api-as-cosmos-db
module.exports = async function (context, req) {
    const { CosmosClient } = require("@azure/cosmos");
    const cosmosendpoint = process.env.COSMOSDB_CONNECTIONSTRING;
    let client = null;      // Azure Cosmos DB connection object
    let db = null;          // DB object
    let container = null;   // Container object
    const ALL_DOCS = null;
    // connection with SDK
    const connect = () => {
      try {
        return new CosmosClient(cosmosendpoint);
      } catch (err) {
        console.log('Azure Cosmos DB - can\'t connect - err');
        console.log(err);
        context.res.status(500).send(e.message);
      }
    }
  
    const connectToDatabase = async () => {
      client = connect();
      if (client) {
        // get DB
        const databaseResult = await client.databases.createIfNotExists({ id: process.env.COSMOSDB_SQL_API_DATABASE_NAME });
        db = databaseResult.database;
        if (db) {
          // get Container
          const containerResult = await db.containers.createIfNotExists({ id: process.env.COSMOSDB_SQL_API_CONTAINER_NAME });
          container = containerResult.container;
          return !!db;
        }
      } else {
        throw new Error("can't connect to database");
      }
    }
    // find all or by id
    const find = async (query) => {
      const result = await container.items
        .query(query)
        .fetchAll();
      return result && result.resources ? result.resources : [];
    }
  
    try {
      let output = {};
      // connect
      const db = await connectToDatabase();
      if (!db) throw Error("db not working")
      // get all docs
      const query1 = "SELECT c.sentiment, COUNT(1) as NumberOfPosts FROM c GROUP BY c.sentiment"
      const findResult = await find(query1);
      console.log("found " + findResult.length);
    
      context.res.status(200).json(findResult);
    } catch (e) {
      console.log(e.message)
      context.res.status(500).send(e.message);
    }
  };