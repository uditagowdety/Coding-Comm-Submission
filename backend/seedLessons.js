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
    title: "Introduction to Programming",
    subtitle: "Lesson 1",
    theoryContent:
      "Programming is the process of designing and building an executable computer program to accomplish a specific computing result. It is the foundation of all software development, allowing us to create applications that solve problems, automate tasks, and enable new possibilities. Programming involves writing a sequence of instructions using a programming language that a computer can interpret and execute.",
    subLessons: [
      {
        title: "What is Programming?",
        content:
          "Programming is the act of creating step-by-step instructions that a computer can follow to achieve a desired outcome. It encompasses a wide range of activities, including designing algorithms, writing code, and debugging errors. With programming, developers can create anything from simple tools to advanced systems like artificial intelligence, video games, and business software. Modern programming emphasizes efficiency, scalability, and collaboration to build robust solutions for real-world problems.",
      },
      {
        title: "Programming Languages",
        content:
          "Programming languages are the tools used to write instructions for computers. They are categorized into low-level (e.g., assembly) and high-level (e.g., Python) languages. Each programming language has its syntax, paradigms, and best-use cases. For example, Python is known for its simplicity and is often used in data analysis and AI. JavaScript powers the web, enabling dynamic and interactive applications. C++ is used for performance-critical tasks, while Java is common in enterprise applications. Choosing the right programming language depends on the problem at hand, the environment, and the desired performance.",
      },
      {
        title: "Hello World Program",
        content:
          "A 'Hello World' program is traditionally the simplest program that outputs 'Hello, World!' to the console. It serves as an introductory exercise for a new programming language, demonstrating the language's syntax and ensuring that the development environment is correctly set up. For example:\n\n" +
          "**In Python**:\n```python\nprint('Hello, World!')\n```\n" +
          "**In JavaScript**:\n```javascript\nconsole.log('Hello, World!');\n```\n" +
          "**In C++**:\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    cout << 'Hello, World!' << endl;\n    return 0;\n}\n```\n" +
          "This small step marks the beginning of your programming journey.",
      },
    ],
    codingQuestions: [
      {
        title: "Reverse a String",
        difficulty: "Easy",
        description:
          "Write a function that takes a string as input and returns the string reversed. For example, 'hello' should become 'olleh'.",
      },
    ],
  },
  {
    title: "Data Structures",
    subtitle: "Lesson 2",
    theoryContent:
      "Data structures are a way to organize, manage, and store data efficiently, enabling faster and easier access or manipulation. They form the backbone of computer programs and algorithms. The choice of data structure directly impacts the performance of an application. By mastering data structures, you can design systems that scale well and solve complex problems effectively.",
    subLessons: [
      {
        title: "Introduction to Arrays",
        content:
          "An array is a collection of elements stored in contiguous memory locations. It allows you to store multiple values of the same type under a single variable. Arrays provide fast access by index, making them ideal for scenarios where you know the size of your data in advance. For example:\n\n" +
          "**In Python**:\n```python\narr = [1, 2, 3, 4, 5]\nprint(arr[2])  # Outputs: 3\n```\n" +
          "Arrays are efficient for retrieval operations but have limitations such as fixed size and costly insertions/deletions in the middle.",
      },
      {
        title: "Introduction to Linked Lists",
        content:
          "Linked lists are dynamic data structures consisting of nodes. Each node contains data and a pointer to the next node. Unlike arrays, linked lists allow efficient insertions and deletions without resizing. However, accessing an element requires traversing the list. For example:\n\n" +
          "**In Python**:\n```python\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(1)\nhead.next = Node(2)\nhead.next.next = Node(3)\n```\n" +
          "Linked lists are commonly used in scenarios like implementing stacks, queues, or dynamic memory allocation.",
      },
      {
        title: "Stacks and Queues",
        content:
          "Stacks and queues are specialized data structures with specific rules for managing elements. A stack operates on a LIFO (Last In, First Out) basis, meaning the last added item is the first to be removed. It is used in undo functionality, parsing expressions, and function calls. A queue operates on a FIFO (First In, First Out) basis, meaning the first item added is the first to be removed. Queues are used in scheduling tasks and managing resources in operating systems.",
      },
    ],
    codingQuestions: [
      {
        title: "Implement a Stack",
        difficulty: "Medium",
        description:
          "Write a class to implement a stack with push, pop, and peek operations. Ensure the implementation adheres to the LIFO principle.",
      },
    ],
  },
  // Additional lessons can be similarly expanded with longer and richer content.
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
