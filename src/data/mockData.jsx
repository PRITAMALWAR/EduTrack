export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'instructor',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinedDate: '2023-09-20'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'instructor',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinedDate: '2023-11-05'
  }
];

export const mockCourses = [
  {
    id: '1',
    title: 'Complete React.js Masterclass',
    description: 'Master React.js from basics to advanced concepts including hooks, context, and modern patterns.',
    instructor: 'Sarah Wilson',
    instructorId: '2',
    category: 'Web Development',
    difficulty: 'Intermediate',
    rating: 4.8,
    price: 99.99,
    duration: '12 hours',
    enrolledStudents: 245,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdAt: '2024-01-20',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    title: 'AI & Machine Learning Fundamentals',
    description: 'Dive into the world of artificial intelligence and machine learning with practical examples.',
    instructor: 'Mike Chen',
    instructorId: '3',
    category: 'AI',
    difficulty: 'Advanced',
    rating: 4.9,
    price: 149.99,
    duration: '20 hours',
    enrolledStudents: 189,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdAt: '2024-01-18',
    tags: ['AI', 'Python', 'Machine Learning']
  },
  {
    id: '3',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning using Python and popular libraries.',
    instructor: 'Sarah Wilson',
    instructorId: '2',
    category: 'Data Science',
    difficulty: 'Intermediate',
    rating: 4.7,
    price: 89.99,
    duration: '15 hours',
    enrolledStudents: 312,
    image: 'https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdAt: '2024-01-15',
    tags: ['Python', 'Data Science', 'Analytics']
  },
  {
    id: '4',
    title: 'Next.js Developer Bootcamp',
    description: 'Build full-stack applications with Next.js, including SSR, API routes, and deployment.',
    instructor: 'Mike Chen',
    instructorId: '3',
    category: 'Next.js Developer',
    difficulty: 'Advanced',
    rating: 4.6,
    price: 129.99,
    duration: '18 hours',
    enrolledStudents: 156,
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdAt: '2024-01-12',
    tags: ['Next.js', 'React', 'Full-stack']
  },
  {
    id: '5',
    title: 'Frontend Development Essentials',
    description: 'Master HTML, CSS, JavaScript, and modern frontend frameworks for web development.',
    instructor: 'Sarah Wilson',
    instructorId: '2',
    category: 'Frontend Developer',
    difficulty: 'Beginner',
    rating: 4.5,
    price: 59.99,
    duration: '10 hours',
    enrolledStudents: 423,
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdAt: '2024-01-10',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: '6',
    title: 'Backend Development with Node.js',
    description: 'Build scalable server-side applications with Node.js, Express, and databases.',
    instructor: 'Mike Chen',
    instructorId: '3',
    category: 'Backend Developer',
    difficulty: 'Intermediate',
    rating: 4.8,
    price: 119.99,
    duration: '16 hours',
    enrolledStudents: 278,
    image: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdAt: '2024-01-08',
    tags: ['Node.js', 'Express', 'Backend']
  },
  {
    id: '7',
    title: 'Software Testing Masterclass',
    description: 'Comprehensive guide to software testing including unit, integration, and E2E testing.',
    instructor: 'Sarah Wilson',
    instructorId: '2',
    category: 'Tester',
    difficulty: 'Intermediate',
    rating: 4.4,
    price: 79.99,
    duration: '12 hours',
    enrolledStudents: 167,
    image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdAt: '2024-01-05',
    tags: ['Testing', 'QA', 'Automation']
  },
  {
    id: '8',
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into advanced JavaScript topics including closures, prototypes, and async programming.',
    instructor: 'Mike Chen',
    instructorId: '3',
    category: 'Web Development',
    difficulty: 'Advanced',
    rating: 4.7,
    price: 109.99,
    duration: '14 hours',
    enrolledStudents: 201,
    image: 'https://images.pexels.com/photos/11035476/pexels-photo-11035476.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdAt: '2024-01-03',
    tags: ['JavaScript', 'Advanced', 'Programming']
  }
];

export const mockEnrollments = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    progress: 75,
    enrolledAt: '2024-01-25'
  },
  {
    id: '2',
    studentId: '1',
    courseId: '3',
    progress: 45,
    enrolledAt: '2024-01-20'
  },
  {
    id: '3',
    studentId: '1',
    courseId: '5',
    progress: 100,
    enrolledAt: '2024-01-15',
    completedAt: '2024-01-28'
  }
];

export const categories = [
  'All Categories',
  'Web Development',
  'AI',
  'Data Science',
  'Next.js Developer',
  'Frontend Developer',
  'Backend Developer',
  'Tester'
];

export const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
