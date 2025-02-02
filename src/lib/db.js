import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "mysql", 
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Vikas#123@", 
  database: process.env.DB_NAME || "my_database",
  port: process.env.DB_PORT || 3306,
};


export async function connectDB() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}
