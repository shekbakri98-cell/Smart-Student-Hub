import mysql from 'mysql2/promise';

let pool;

export async function connectToDatabase() {
  if (!pool) {
    pool = mysql.createPool({
      // Uses your local XAMPP parameters unless a cloud URL exists in production
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '', // XAMPP MySQL password is blank by default
      database: process.env.DB_NAME || 'smart_student_hub',
      port: parseInt(process.env.DB_PORT || '3306'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log("⚙️ Database client connector pool established.");
  }
  return pool;
}
