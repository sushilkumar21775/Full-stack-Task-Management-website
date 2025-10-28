import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Mongoose connection options (removed deprecated options)
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log('');
    console.log('✅ ================================');
    console.log(`   MongoDB Connected!`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log('✅ ================================');
    console.log('');

    // Handle MongoDB connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (error) {
    console.error('');
    console.error('❌ ================================');
    console.error(`   MongoDB Connection Failed!`);
    console.error(`   Error: ${error.message}`);
    console.error('❌ ================================');
    console.error('');
    console.error('💡 Tips:');
    console.error('   - Check if MongoDB is running');
    console.error('   - Verify MONGODB_URI in .env file');
    console.error('   - Ensure network connectivity');
    console.error('');
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('\n✅ MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Error during MongoDB connection closure:', err);
    process.exit(1);
  }
});

export default connectDB;
