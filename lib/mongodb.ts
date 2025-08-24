import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

function connectMongo(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    );
  }

  if (client) return Promise.resolve(client);
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect().then((c: MongoClient) => {
      client = c;
      return c;
    });
  }
  return clientPromise as Promise<MongoClient>;
}

export async function getDb(dbName?: string) {
  const c = await connectMongo();
  return c.db(dbName);
}

export async function getBookingsCollection() {
  const db = await getDb(process.env.MONGODB_DB || "repair");
  return db.collection("bookings");
}
