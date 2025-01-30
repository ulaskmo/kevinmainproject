import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db: Db;

//  Connect to MongoDB
export const connectToDb = async (callback: Function) => {
  const client = new MongoClient(process.env.DB_CONN_STRING as string);
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("✅ Connected to MongoDB");
    callback();
  } catch (error) {
    console.error(" Error connecting to database:", error);
  }
};

//  Get the database instance
export const getDb = () => db;
