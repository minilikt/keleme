export type QuestionStatus = 'answered' | 'unanswered' | 'flagged' | 'current';

export interface QuestionData {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamData {
  id: string;
  title: string;
  duration: number; // in minutes
  questions: QuestionData[];
}

export const examData: ExamData = {
  id: 'exam-001',
  title: 'Computer Science Final Exam',
  duration: 90, // 90 minutes
  questions: [
    {
      id: 1,
      text: 'What is the time complexity of binary search algorithm?',
      options: [
        'O(n)',
        'O(log n)',
        'O(n log n)',
        'O(1)'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: 'Which data structure uses LIFO (Last In, First Out) principle?',
      options: [
        'Queue',
        'Stack',
        'Linked List',
        'Array'
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      text: 'What does SQL stand for?',
      options: [
        'Structured Query Language',
        'Standard Query Language',
        'Simple Query Language',
        'System Query Language'
      ],
      correctAnswer: 0
    },
    {
      id: 4,
      text: 'Which sorting algorithm has the best average-case time complexity?',
      options: [
        'Bubble Sort',
        'Insertion Sort',
        'Quick Sort',
        'Selection Sort'
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      text: 'What is the primary purpose of an operating system?',
      options: [
        'To provide a user interface',
        'To manage system resources',
        'To run applications',
        'To provide network connectivity'
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      text: 'In object-oriented programming, what is encapsulation?',
      options: [
        'The ability to create multiple instances of a class',
        'The process of hiding internal implementation details',
        'The ability to inherit properties from a parent class',
        'The process of overriding methods in derived classes'
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: 'What is the purpose of a hash table?',
      options: [
        'To store data in a sorted manner',
        'To provide constant-time average case for insertions and lookups',
        'To implement recursive algorithms',
        'To manage memory allocation'
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      text: 'Which protocol is used for secure web browsing?',
      options: [
        'HTTP',
        'FTP',
        'HTTPS',
        'SMTP'
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      text: 'What is the main difference between compiled and interpreted languages?',
      options: [
        'Compiled languages are faster to write',
        'Interpreted languages are always faster to execute',
        'Compiled languages are translated to machine code before execution',
        'There is no difference'
      ],
      correctAnswer: 2
    },
    {
      id: 10,
      text: 'In database design, what is normalization?',
      options: [
        'The process of encrypting sensitive data',
        'The process of organizing data to reduce redundancy',
        'The process of creating backup copies',
        'The process of indexing tables for faster queries'
      ],
      correctAnswer: 1
    },
    {
      id: 11,
      text: 'What does API stand for?',
      options: [
        'Application Programming Interface',
        'Advanced Programming Interface',
        'Automated Programming Interface',
        'Application Protocol Interface'
      ],
      correctAnswer: 0
    },
    {
      id: 12,
      text: 'Which of the following is NOT a programming paradigm?',
      options: [
        'Object-Oriented Programming',
        'Functional Programming',
        'Procedural Programming',
        'Database Programming'
      ],
      correctAnswer: 3
    },
    {
      id: 13,
      text: 'What is the purpose of version control systems like Git?',
      options: [
        'To compress files',
        'To track changes in code over time',
        'To compile source code',
        'To test applications'
      ],
      correctAnswer: 1
    },
    {
      id: 14,
      text: 'In networking, what does TCP stand for?',
      options: [
        'Transfer Control Protocol',
        'Transmission Control Protocol',
        'Transport Control Protocol',
        'Terminal Control Protocol'
      ],
      correctAnswer: 1
    },
    {
      id: 15,
      text: 'What is the main advantage of using a relational database?',
      options: [
        'It stores data in a single table',
        'It eliminates the need for queries',
        'It maintains data integrity through relationships',
        'It only works with structured data'
      ],
      correctAnswer: 2
    }
  ]
};