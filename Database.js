const { MongoClient } = require('mongodb');

class Database {
  client;
  database = process.env.MONGO_INITDB_DATABASE;
  collection = process.env.MONGO_COLLECTION;

  connect = async () => {
    const username = process.env.MONGO_INITDB_ROOT_USERNAME;
    const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
    const location = process.env.MONGO;
    const port = process.env.MONGO_PORT;
    const uri = `mongodb://${username}:${password}@${location}:${port}/${this.database}`;
    this.client = new MongoClient(uri);

    try {
      console.log('Connecting to MongoDB...');
      await this.client.connect();
      console.log('Successfully connected to MongoDB');
    } catch (err) {
      console.log(err);
    }
  };

  read = async (symbol) => {
    const collection = this.client
      .db(this.database)
      .collection(this.collection);

    const result = await collection.find({ symbol: symbol });
    if (await result.hasNext()) {
      const doc = await result.toArray();

      return doc;
    }
  };
}

module.exports = Database;
