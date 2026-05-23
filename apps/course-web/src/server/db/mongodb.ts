import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const directUri = process.env.MONGODB_DIRECT_URI;
const dbName = process.env.MONGODB_DB ?? "ai_engineer_guide";

declare global {
  // eslint-disable-next-line no-var
  var __ArkionMongoClientPromise: Promise<MongoClient> | undefined;
}

export function hasMongoConfig() {
  return Boolean(uri || directUri);
}

export async function getMongoClient() {
  const connectionUri = directUri || uri;

  if (!connectionUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!globalThis.__ArkionMongoClientPromise) {
    const client = new MongoClient(connectionUri, {
      appName: "Arkion-ai-engineer-guide"
    });
    globalThis.__ArkionMongoClientPromise = client.connect();
  }

  return globalThis.__ArkionMongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}
