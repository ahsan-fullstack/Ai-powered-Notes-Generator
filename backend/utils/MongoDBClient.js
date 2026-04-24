export const MongoDBClient = async() => {
  const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
  await client.connect()
  const collection = client
    .db(process.env.MONGODB_ATLAS_DB_NAME)
    .collection(process.env.MONGODB_ATLAS_COLLECTION_NAME);

  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: collection,
    indexName: "notes_index",
    textKey: "text",
    embeddingKey: "embedding",
  });

  return {client,collection,vectorStore}
}