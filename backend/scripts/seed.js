import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

/**
 * Database Seed Script
 * 
 * Creates sample users for testing
 * Usage: npm run seed
 */

const seedUsers = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to database
    await connectDB();

    // Clear existing users (optional - comment out if you don't want to clear)
    console.log('🗑️  Clearing existing users...');
    await User.deleteMany({});
    console.log('✅ Users cleared\n');

    // Create sample users
    console.log('👥 Creating sample users...');

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'john123',
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'jane123',
        role: 'user'
      }
    ];

    // Hash passwords and create users
    for (const userData of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      });

      console.log(`   ✅ Created ${userData.role}: ${user.email}`);
    }

    console.log('\n✅ Database seeded successfully!\n');
    console.log('📝 Sample credentials:');
    console.log('   Admin: admin@example.com / admin123');
    console.log('   User:  john@example.com / john123');
    console.log('   User:  jane@example.com / jane123\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error(`   ${error.message}\n`);
    process.exit(1);
  }
};

// Run seed
seedUsers();
