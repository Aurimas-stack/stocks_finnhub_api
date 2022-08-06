const MongoClient = require("mongodb").MongoClient;

exports.connectDB = async (url) => {
  const client = await MongoClient.connect(url);
  return client;
};

exports.insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};
