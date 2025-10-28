import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from '../models/Task.model.js';
import User from '../models/User.model.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

/**
 * Task Seed Script
 * 
 * Creates sample tasks for testing
 * Usage: node scripts/seedTasks.js
 */

const seedTasks = async () => {
  try {
    console.log('🌱 Starting task seed...\n');

    // Connect to database
    await connectDB();

    // Get a user to assign tasks to (use first user or admin)
    const user = await User.findOne({ email: 'admin@example.com' });
    
    if (!user) {
      console.error('❌ No users found! Please run "npm run seed" first to create users.');
      process.exit(1);
    }

    console.log(`👤 Using user: ${user.email}\n`);

    // Clear existing tasks for this user (optional)
    console.log('🗑️  Clearing existing tasks...');
    await Task.deleteMany({ userId: user._id });
    console.log('✅ Tasks cleared\n');

    // Create sample tasks
    console.log('📝 Creating sample tasks...');

    const tasks = [
      {
        title: 'Complete project documentation',
        description: 'Write comprehensive README and API documentation for the full-stack application',
        userId: user._id,
        completed: false
      },
      {
        title: 'Set up MongoDB Atlas',
        description: 'Create a MongoDB Atlas cluster and configure database connection',
        userId: user._id,
        completed: true
      },
      {
        title: 'Implement user authentication',
        description: 'Add JWT-based authentication with login and registration endpoints',
        userId: user._id,
        completed: true
      },
      {
        title: 'Design responsive UI',
        description: 'Create responsive layouts using Tailwind CSS for all pages',
        userId: user._id,
        completed: false
      },
      {
        title: 'Deploy to production',
        description: 'Deploy backend to Render and frontend to Vercel',
        userId: user._id,
        completed: false
      }
    ];

    for (const taskData of tasks) {
      const task = await Task.create(taskData);
      const status = task.completed ? '✅' : '⬜';
      console.log(`   ${status} Created: ${task.title}`);
    }

    console.log('\n✅ Tasks seeded successfully!\n');
    console.log(`📊 Created ${tasks.length} tasks for ${user.email}\n`);

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error seeding tasks:');
    console.error(`   ${error.message}\n`);
    process.exit(1);
  }
};

// Run seed
seedTasks();
