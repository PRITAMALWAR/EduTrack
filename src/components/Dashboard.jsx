import React from 'react';
import { BookOpen, Users, TrendingUp, Award, Clock, Star, ChevronRight, Play } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Dashboard({ setCurrentView }) {
  const { state } = useAppContext();
  
  const userEnrollments = state.enrollments.filter(e => e.studentId === state.auth.user?.id);
  const userCourses = state.courses.filter(c => 
    userEnrollments.some(e => e.courseId === c.id)
  );

  const stats = state.auth.user?.role === 'instructor' 
    ? [
        { label: 'My Courses', value: state.courses.filter(c => c.instructorId === state.auth.user?.id).length, icon: BookOpen, color: 'blue' },
        { label: 'Total Students', value: state.courses.filter(c => c.instructorId === state.auth.user?.id).reduce((acc, c) => acc + c.enrolledStudents, 0), icon: Users, color: 'green' },
        { label: 'Avg Rating', value: '4.7', icon: Star, color: 'yellow' },
        { label: 'Revenue', value: '$12,450', icon: TrendingUp, color: 'purple' }
      ]
    : [
        { label: 'Enrolled Courses', value: userEnrollments.length, icon: BookOpen, color: 'blue' },
        { label: 'Completed', value: userEnrollments.filter(e => e.completedAt).length, icon: Award, color: 'green' },
        { label: 'Hours Learned', value: '47h', icon: Clock, color: 'purple' },
        { label: 'Avg Progress', value: `${Math.round(userEnrollments.reduce((acc, e) => acc + e.progress, 0) / (userEnrollments.length || 1))}%`, icon: TrendingUp, color: 'yellow' }
      ];

  const getStatColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700'
    };
    return colors[color] || colors.blue;
  };

  const getIconColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500'
    };
    return colors[color] || colors.blue;
  };

  if (!state.auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Master New Skills
                </span>
                <br />
                <span className="text-gray-800">with Expert Instructors</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of learners on EduTrack and unlock your potential with our comprehensive 
                courses in web development, AI, data science, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setCurrentView('courses')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                >
                  Explore Courses
                </button>
                <button className="bg-white text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 text-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-200 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute top-40 right-32 w-16 h-16 bg-indigo-200 rounded-full opacity-70 animate-pulse"></div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose EduTrack?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the future of online learning with our cutting-edge platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: 'Expert-Led Courses',
                  description: 'Learn from industry professionals with real-world experience',
                  color: 'blue'
                },
                {
                  icon: Award,
                  title: 'Certificates',
                  description: 'Earn recognized certificates upon course completion',
                  color: 'green'
                },
                {
                  icon: Users,
                  title: 'Community Support',
                  description: 'Connect with fellow learners and get help when needed',
                  color: 'purple'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`inline-flex p-4 rounded-full ${getIconColorClasses(feature.color)} mb-6`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Popular Courses Preview */}
        <div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Courses</h2>
              <p className="text-xl text-gray-600">Start your learning journey today</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {state.courses.slice(0, 3).map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <span className="text-sm font-medium text-gray-500">{course.difficulty}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button
                onClick={() => setCurrentView('courses')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome back, {state.auth.user?.name}! 
          </h1>
          <p className="text-xl text-gray-600">
            {state.auth.user?.role === 'instructor' 
              ? 'Manage your courses and track student progress'
              : 'Continue your learning journey and explore new skills'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-white p-6 rounded-2xl shadow-lg border-2 ${getStatColorClasses(stat.color)} transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-70">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${getIconColorClasses(stat.color)}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Based on Role */}
        {state.auth.user?.role === 'student' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Continue Learning */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Continue Learning</h2>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {userCourses.slice(0, 3).map((course) => {
                  const enrollment = userEnrollments.find(e => e.courseId === course.id);
                  return (
                    <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{course.title}</h3>
                        <p className="text-sm text-gray-500">{course.instructor}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{enrollment?.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${enrollment?.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Play className="h-5 w-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements & Progress */}
            <div className="space-y-8">
              {/* Achievements */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h2>
                <div className="space-y-4">
                  {[
                    { title: 'First Course Completed', description: 'Completed your first course', earned: true, color: 'green' },
                    { title: 'Quick Learner', description: 'Finished 3 courses this month', earned: false, color: 'blue' },
                    { title: 'Coding Expert', description: 'Completed 5 programming courses', earned: false, color: 'purple' }
                  ].map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg ${achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className={`p-3 rounded-full ${achievement.earned ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Instructor Dashboard */
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setCurrentView('add-course')}
                  className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  <BookOpen className="h-6 w-6" />
                  <span className="font-medium">Create New Course</span>
                </button>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="flex items-center justify-center space-x-3 p-6 border-2 border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  <Users className="h-6 w-6" />
                  <span className="font-medium">Manage Courses</span>
                </button>
                <button className="flex items-center justify-center space-x-3 p-6 border-2 border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <TrendingUp className="h-6 w-6" />
                  <span className="font-medium">View Analytics</span>
                </button>
              </div>
            </div>

            {/* My Courses */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.courses.filter(c => c.instructorId === state.auth.user?.id).slice(0, 3).map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{course.enrolledStudents} students</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <span className="text-lg font-bold text-blue-600">${course.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
