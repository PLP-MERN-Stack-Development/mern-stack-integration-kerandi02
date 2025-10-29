import mongoose from 'mongoose';
import Category from './models/Category.js';
import Post from './models/Post.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Category.deleteMany({});
    await Post.deleteMany({});

    // Create categories
    const categories = await Category.create([
      { name: 'Technology', description: 'Posts about technology and programming' },
      { name: 'Web Development', description: 'Frontend and backend development' },
      { name: 'React', description: 'React.js framework and ecosystem' },
      { name: 'Node.js', description: 'Server-side JavaScript development' }
    ]);

    console.log('Sample categories created');
    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();