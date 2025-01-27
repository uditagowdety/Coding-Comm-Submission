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
  {
    title: "Control Flow",
    subtitle: "Lesson 3",
    theoryContent:
      "Control flow in programming refers to the order in which individual instructions, statements, or functions are executed or evaluated. By using control flow constructs like loops, conditionals, and switches, developers can create programs that make decisions, repeat tasks, or break down complex problems into manageable parts.",
    subLessons: [
      {
        title: "If-Else Statements",
        content:
          "The 'if-else' statement allows a program to take different actions based on conditions. This is essential for decision-making in programs. For example:\n\n" +
          "**In Python**:\n```python\nx = 10\nif x > 5:\n    print('x is greater than 5')\nelse:\n    print('x is less than or equal to 5')\n```\n" +
          "This structure ensures that the appropriate code block is executed based on the condition.",
      },
      {
        title: "For Loops",
        content:
          "For loops are used to iterate over a sequence, such as a list, string, or range of numbers. They are essential for tasks like processing arrays or repeating actions. For example:\n\n" +
          "**In Python**:\n```python\nfor i in range(5):\n    print(i)\n```\n" +
          "This loop will output numbers from 0 to 4. Loops make repetitive tasks easier to manage and reduce redundancy.",
      },
      {
        title: "While Loops",
        content:
          "While loops are used when the number of iterations is not known in advance. The loop continues until a specified condition becomes false. For example:\n\n" +
          "**In Python**:\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n```\n" +
          "This loop prints numbers from 0 to 4. Use while loops for scenarios where the exit condition is determined dynamically.",
      },
    ],
    codingQuestions: [
      {
        title: "FizzBuzz Problem",
        difficulty: "Easy",
        description:
          "Write a program that prints numbers from 1 to 100. For multiples of 3, print 'Fizz' instead of the number, and for multiples of 5, print 'Buzz'. For numbers that are multiples of both 3 and 5, print 'FizzBuzz'.",
      },
    ],
  },
  {
    title: "Object-Oriented Programming",
    subtitle: "Lesson 4",
    theoryContent:
      "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of objects, which can contain data in the form of attributes and code in the form of methods. OOP allows developers to model real-world entities, reuse code, and create modular, maintainable programs.",
    subLessons: [
      {
        title: "Classes and Objects",
        content:
          "A class is a blueprint for creating objects, and objects are instances of classes. For example:\n\n" +
          "**In Python**:\n```python\nclass Car:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n\nmy_car = Car('Toyota', 'Corolla')\nprint(my_car.brand)\n```\n" +
          "Here, `Car` is a class, and `my_car` is an object of that class.",
      },
      {
        title: "Inheritance",
        content:
          "Inheritance allows a class to inherit properties and methods from another class, promoting code reuse. For example:\n\n" +
          "**In Python**:\n```python\nclass Animal:\n    def speak(self):\n        print('I am an animal')\n\nclass Dog(Animal):\n    pass\n\ndog = Dog()\ndog.speak()\n```\n" +
          "The `Dog` class inherits the `speak` method from the `Animal` class.",
      },
      {
        title: "Encapsulation",
        content:
          "Encapsulation is the bundling of data and methods that operate on the data within one class. It also restricts access to some components. For example:\n\n" +
          "**In Python**:\n```python\nclass Account:\n    def __init__(self, balance):\n        self.__balance = balance\n\n    def get_balance(self):\n        return self.__balance\n\naccount = Account(1000)\nprint(account.get_balance())\n```\n" +
          "The `__balance` attribute is private and can only be accessed via the `get_balance` method.",
      },
    ],
    codingQuestions: [
      {
        title: "Design a Bank Account Class",
        difficulty: "Medium",
        description:
          "Create a class `BankAccount` with attributes `balance` and methods `deposit` and `withdraw`. Ensure that withdrawals do not exceed the balance.",
      },
    ],
  },
  {
    title: "Recursion",
    subtitle: "Lesson 5",
    theoryContent:
      "Recursion is a technique in which a function calls itself to solve a problem. Recursive solutions are often cleaner and more elegant for problems that can be broken into smaller subproblems.",
    subLessons: [
      {
        title: "Understanding Recursion",
        content:
          "A recursive function calls itself to perform a task. Each recursive call solves a smaller instance of the problem until a base case is reached. For example:\n\n" +
          "**In Python**:\n```python\ndef factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n\nprint(factorial(5))  # Outputs: 120\n```\n" +
          "Here, `factorial(5)` calls itself with smaller values until it reaches 0, the base case.",
      },
      {
        title: "Base Case and Recursive Case",
        content:
          "A recursive function must have a base case to prevent infinite recursion. The recursive case defines how the function reduces the problem size. For example:\n\n" +
          "**In Python**:\n```python\ndef sum_array(arr):\n    if len(arr) == 0:\n        return 0  # Base case\n    return arr[0] + sum_array(arr[1:])  # Recursive case\n```\n" +
          "This function sums all elements of an array by reducing its size on each call.",
      },
      {
        title: "Recursion vs Iteration",
        content:
          "Many problems solved with recursion can also be solved iteratively. While recursion provides a cleaner approach, it may lead to stack overflow for deep recursion. Iteration is generally more memory-efficient. For example:\n\n" +
          "**In Python** (Iterative Fibonacci):\n```python\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\nprint(fibonacci(10))\n```\n" +
          "This iterative approach avoids the overhead of recursive calls.",
      },
    ],
    codingQuestions: [
      {
        title: "Calculate Fibonacci Numbers Recursively",
        difficulty: "Easy",
        description:
          "Write a recursive function to calculate the nth Fibonacci number. Ensure that your function handles the base cases correctly.",
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
