const data = require('../shared/tweets-data');
module.exports = function (context, req, cosDbCollection) {
  try {

    let output = {};

    const negative = cosDbCollection.filter(item => item.sentiment === 'negative')
    const positive = cosDbCollection.filter(item => item.sentiment === 'positive')
    const neutral = cosDbCollection.filter(item => item.sentiment === 'neutral')

    output = {
      "positive": positive,
      "negative": negative,
      "neutral": neutral
    }
    context.res.status(200).json(output);
  } catch (error) {
    context.res.status(500).send(error);
  }
};