import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};


export async function connectDB() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}
