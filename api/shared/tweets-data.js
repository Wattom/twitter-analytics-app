const data = {
    tweets: [
      {
        id: 10,
        name: 'Strawberries',
        text: '16oz package of fresh organic strawberries',
        timestamp: '23 Jan 2:00 pm'
      },
      {
        id: 20,
        name: 'Sliced bread',
        text: 'Loaf of fresh sliced wheat bread',
        timestamp: '23 Jan 2:00 pm'
      },
      {
        id: 30,
        name: 'Apples',
        text: 'Bag of 7 fresh McIntosh apples',
        timestamp: '23 Jan 2:00 pm'
      },
    ],
  };

  const getProducts = () => {
    return data.tweets;
  };

  module.exports = { getProducts };
