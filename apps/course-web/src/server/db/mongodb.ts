import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const directUri = process.env.MONGODB_DIRECT_URI;
const useDirectUri = process.env.MONGODB_USE_DIRECT_URI === "true";
const dbName = process.env.MONGODB_DB ?? "ai_engineer_guide";

declare global {
  // eslint-disable-next-line no-var
  var __ArkionMongoClientPromise: Promise<MongoClient> | undefined;
}

function getConnectionUris() {
  const orderedUris = useDirectUri ? [directUri, uri] : [uri, directUri];

  return orderedUris.filter((value): value is string => Boolean(value));
}

export function hasMongoConfig() {
  return getConnectionUris().length > 0;
}

async function connectWithFallback(connectionUris: string[]) {
  let lastError: unknown;

  for (const connectionUri of connectionUris) {
    const client = new MongoClient(connectionUri, {
      appName: "Arkion-ai-engineer-guide"
    });

    try {
      await client.connect();
      return client;
    } catch (error) {
      lastError = error;
      await client.close().catch(() => undefined);
    }
  }

  throw lastError ?? new Error("MongoDB connection failed");
}

export async function getMongoClient() {
  const connectionUris = getConnectionUris();

  if (!connectionUris.length) {
    throw new Error("MONGODB_URI or MONGODB_DIRECT_URI is not configured");
  }

  if (!globalThis.__ArkionMongoClientPromise) {
    globalThis.__ArkionMongoClientPromise = connectWithFallback(connectionUris);
  }

  try {
    return await globalThis.__ArkionMongoClientPromise;
  } catch (error) {
    globalThis.__ArkionMongoClientPromise = undefined;
    throw error;
  }
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}
