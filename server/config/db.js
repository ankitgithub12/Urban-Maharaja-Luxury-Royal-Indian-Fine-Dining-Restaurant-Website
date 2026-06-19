import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Could not connect to MongoDB Atlas: ${error.message}`);
    console.warn(`[Database Warning] The application will run, but reservation and contact database queries will fail until a valid MONGO_URI is configured in the .env file.`);
  }
};

export default connectDB;
