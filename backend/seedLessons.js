const mongoose = require('mongoose');
const Lesson = require('./models/Lesson'); // Adjust path if needed
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected...');
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});

// Define the lesson data
const lessons = [
  {
    title: 'Lesson 1',
    subtitle: 'Introduction to Programming',
    theoryContent: 'This is the theory content for Lesson 1.',
    codingQuestions: [
      {
        title: 'Reverse a String',
        difficulty: 'Easy',
        description: 'Write a function to reverse a string.',
      },
      {
        title: 'Sum of Array',
        difficulty: 'Easy',
        description: 'Write a function to calculate the sum of an array of numbers.',
      },
    ],
  },
  {
    title: 'Lesson 2',
    subtitle: 'Data Structures',
    theoryContent: 'This is the theory content for Lesson 2.',
    codingQuestions: [
      {
        title: 'Implement a Stack',
        difficulty: 'Medium',
        description: 'Write a class to implement a stack data structure.',
      },
      {
        title: 'Queue Operations',
        difficulty: 'Medium',
        description: 'Write a program to perform enqueue and dequeue operations on a queue.',
      },
    ],
  },
  {
    title: 'Lesson 3',
    subtitle: 'Algorithms',
    theoryContent: 'This is the theory content for Lesson 3.',
    codingQuestions: [
      {
        title: 'Binary Search',
        difficulty: 'Easy',
        description: 'Implement the binary search algorithm.',
      },
      {
        title: 'Find Factorial',
        difficulty: 'Easy',
        description: 'Write a recursive function to find the factorial of a number.',
      },
    ],
  },
  {
    title: 'Lesson 4',
    subtitle: 'Object-Oriented Programming',
    theoryContent: 'This is the theory content for Lesson 4.',
    codingQuestions: [
      {
        title: 'Class and Objects',
        difficulty: 'Easy',
        description: 'Create a class and demonstrate its use in a program.',
      },
    ],
  },
];

// Seed the database
const seedLessons = async () => {
  try {
    // Clear existing lessons (optional)
    await Lesson.deleteMany();
    console.log('Existing lessons cleared.');

    // Insert new lessons
    await Lesson.insertMany(lessons);
    console.log('Lessons added successfully.');

    // Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding lessons:', err.message);
    mongoose.connection.close();
  }
};

// Run the seed function
seedLessons();
