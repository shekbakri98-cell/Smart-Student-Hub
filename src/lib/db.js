import mysql from 'mysql2/promise';

let pool;

export async function connectToDatabase() {
  if (!pool) {
    // This pool automatically routes requests to your Alwaysdata cloud tables
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '3306'),
      waitForConnections: true,
      connectionLimit: 5, // Keeping connection limits low for stable free-tier allocations
      queueLimit: 0
    });
    console.log("✅ Alwaysdata Cloud Database connection pool initialized.");
  }
  return pool;
}
