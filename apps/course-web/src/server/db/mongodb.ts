import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const directUri = process.env.MONGODB_DIRECT_URI;
const dbName = process.env.MONGODB_DB ?? "ai_engineer_guide";

declare global {
  // eslint-disable-next-line no-var
  var __orvionMongoClientPromise: Promise<MongoClient> | undefined;
}

export function hasMongoConfig() {
  return Boolean(uri || directUri);
}

export async function getMongoClient() {
  const connectionUri = directUri || uri;

  if (!connectionUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!globalThis.__orvionMongoClientPromise) {
    const client = new MongoClient(connectionUri, {
      appName: "orvion-ai-engineer-guide"
    });
    globalThis.__orvionMongoClientPromise = client.connect();
  }

  return globalThis.__orvionMongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}
