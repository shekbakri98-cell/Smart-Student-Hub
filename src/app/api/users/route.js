import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = await connectToDatabase();
    
    // Execute query against your XAMPP local database structure
    const [rows] = await db.query('SELECT id, name, email, role FROM users');
    
    return NextResponse.json({ users: rows }, { status: 200 });
  } catch (error) {
    console.error("❌ Database query routine exception:", error.message);
    return NextResponse.json({ error: "Internal sequence database failure." }, { status: 500 });
  }
}
