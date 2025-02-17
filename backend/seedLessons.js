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
    theoryContent: "",
    subLessons: [
      {
        title: "What is Programming?",
        content: "Programming is the process of designing and writing instructions that a computer can execute. It enables us to create applications, automate tasks, and solve problems efficiently."
      },
      {
        title: "Programming Languages",
        content: "There are various programming languages, each suited for different purposes. High-level languages like Python and JavaScript are user-friendly, whereas low-level languages like C and Assembly offer more control over hardware."
      },
      {
        title: "Hello World Program",
        content: "The first step in learning a programming language is writing a 'Hello, World!' program, which simply prints a message to the screen."
      }
    ],
    codingQuestions: [
      {
        title: "Reverse a String",
        difficulty: "Easy",
        description: "Write a function that reverses a given string."
      }
    ]
  },
  {
    title: "Data Structures",
    subtitle: "Lesson 2",
    theoryContent: "",
    subLessons: [
      {
        title: "Introduction to Arrays",
        content: "Arrays store elements in contiguous memory locations, allowing efficient access but fixed size."
      },
      {
        title: "Introduction to Linked Lists",
        content: "A linked list consists of nodes, each containing data and a reference to the next node. Unlike arrays, linked lists allow dynamic resizing but require sequential access."
      },
      {
        title: "Stacks and Queues",
        content: "Stacks follow LIFO (Last In, First Out), whereas Queues follow FIFO (First In, First Out). Both are used for structured data handling."
      }
    ],
    codingQuestions: [
      {
        title: "Implement a Stack",
        difficulty: "Medium",
        description: "Write a class to implement a stack with push and pop operations."
      }
    ]
  },
  {
    title: "Control Flow",
    subtitle: "Lesson 3",
    theoryContent: "",
    subLessons: [
      {
        title: "If-Else Statements",
        content: "Conditional statements allow programs to make decisions based on conditions."
      },
      {
        title: "For Loops",
        content: "For loops help execute a block of code a specified number of times."
      },
      {
        title: "While Loops",
        content: "While loops run as long as a given condition is true, useful when the number of iterations is unknown."
      }
    ],
    codingQuestions: [
      {
        title: "FizzBuzz",
        difficulty: "Easy",
        description: "Print numbers 1 to 100, but for multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'."
      }
    ]
  },
  {
    title: "Object-Oriented Programming",
    subtitle: "Lesson 4",
    theoryContent: "",
    subLessons: [
      {
        title: "Classes and Objects",
        content: "Classes are blueprints for creating objects in object-oriented programming."
      },
      {
        title: "Inheritance",
        content: "Inheritance allows one class to derive properties and methods from another."
      },
      {
        title: "Encapsulation",
        content: "Encapsulation restricts direct access to object data, promoting data security and integrity."
      }
    ],
    codingQuestions: [
      {
        title: "Bank Account Class",
        difficulty: "Medium",
        description: "Create a class `BankAccount` with deposit and withdraw methods."
      }
    ]
  },
  {
    title: "Recursion",
    subtitle: "Lesson 5",
    theoryContent: "",
    subLessons: [
      {
        title: "Understanding Recursion",
        content: "Recursion is a technique where a function calls itself to solve a problem."
      },
      {
        title: "Base Case and Recursive Case",
        content: "A base case stops the recursion, preventing infinite loops."
      },
      {
        title: "Recursion vs Iteration",
        content: "Recursive functions can be converted into iterative ones, often improving efficiency."
      }
    ],
    codingQuestions: [
      {
        title: "Fibonacci Sequence",
        difficulty: "Easy",
        description: "Write a recursive function to generate Fibonacci numbers."
      }
    ]
  },
  {
    title: "Algorithms and Complexity",
    subtitle: "Lesson 6",
    theoryContent: "",
    subLessons: [
      {
        title: "Understanding Algorithms",
        content: "An algorithm is a sequence of steps to solve a problem efficiently."
      },
      {
        title: "Big-O Notation",
        content: "Big-O notation helps measure the efficiency of algorithms in terms of time and space complexity."
      },
      {
        title: "Algorithmic Paradigms",
        content: "Common paradigms include Divide and Conquer, Greedy, and Dynamic Programming."
      }
    ],
    codingQuestions: [
      {
        title: "Binary Search",
        difficulty: "Medium",
        description: "Implement binary search on a sorted array."
      }
    ]
  },
  {
    title: "Sorting Algorithms",
    subtitle: "Lesson 7",
    theoryContent: "",
    subLessons: [
      {
        title: "Bubble Sort and Selection Sort",
        content: "Basic sorting techniques that work by repeatedly swapping or selecting the smallest element."
      },
      {
        title: "Merge Sort and Quick Sort",
        content: "Efficient sorting algorithms that use Divide and Conquer strategies."
      },
      {
        title: "Time Complexity of Sorting",
        content: "Sorting algorithms vary in complexity from O(n^2) to O(n log n)."
      }
    ],
    codingQuestions: [
      {
        title: "Merge Sort",
        difficulty: "Medium",
        description: "Implement Merge Sort and sort an array."
      }
    ]
  },
  {
    title: "Graph Theory",
    subtitle: "Lesson 8",
    theoryContent: "",
    subLessons: [
      {
        title: "Introduction to Graphs",
        content: "Graphs represent relationships between entities using nodes and edges."
      },
      {
        title: "Graph Traversal Algorithms",
        content: "Breadth-First Search (BFS) and Depth-First Search (DFS) explore graphs efficiently."
      },
      {
        title: "Shortest Path Algorithms",
        content: "Dijkstra's and Floyd-Warshall algorithms help find shortest paths in graphs."
      }
    ],
    codingQuestions: [
      {
        title: "Graph Traversal",
        difficulty: "Hard",
        description: "Implement BFS and DFS on a given graph."
      }
    ]
  },
  {
    title: "Dynamic Programming",
    subtitle: "Lesson 9",
    theoryContent: "",
    subLessons: [
      {
        title: "What is Dynamic Programming?",
        content: "Dynamic Programming (DP) solves problems by breaking them into overlapping subproblems."
      },
      {
        title: "Memoization vs Tabulation",
        content: "Memoization stores results of previous calculations, while tabulation builds solutions iteratively."
      },
      {
        title: "Famous DP Problems",
        content: "Classic problems include Fibonacci, Knapsack, and Longest Common Subsequence."
      }
    ],
    codingQuestions: [
      {
        title: "Knapsack Problem",
        difficulty: "Hard",
        description: "Implement the 0/1 Knapsack problem using Dynamic Programming."
      }
    ]
  },
  {
    title: "Databases and SQL",
    subtitle: "Lesson 10",
    theoryContent: "",
    subLessons: [
      {
        title: "Introduction to Databases",
        content: "Databases store and manage structured data efficiently."
      },
      {
        title: "SQL Basics",
        content: "SQL (Structured Query Language) is used to query and manipulate relational databases."
      },
      {
        title: "Joins and Indexing",
        content: "Joins combine data from multiple tables, while indexing speeds up searches."
      }
    ],
    codingQuestions: [
      {
        title: "Write an SQL Query",
        difficulty: "Medium",
        description: "Write a query to find employees earning above a certain salary."
      }
    ]
  }
];



// Seed the database
const seedLessons = async () => {
  try {
    // Clear existing lessons
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
