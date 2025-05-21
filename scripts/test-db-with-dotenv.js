// Test database connection with explicit dotenv loading
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Log the DATABASE_URL (with sensitive parts redacted)
    const dbUrl = process.env.DATABASE_URL || 'Not set';
    const redactedUrl = dbUrl.replace(/\/\/.*?@/, '//[REDACTED]@');
    console.log('Using DATABASE_URL:', redactedUrl);
    
    // Test connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connection successful!');
    
    // List users
    console.log('\nListing all users:');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    });
    
    console.log(`Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });
    
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
