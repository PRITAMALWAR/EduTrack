import React, { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Award,
  BookOpen,
  Clock,
  Star,
  Edit,
  Save,
  X,
  Trophy
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Profile(props) {
  const { setCurrentView } = props;
  const { state } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: state.auth.user?.name || '',
    email: state.auth.user?.email || ''
  });

  if (!state.auth.isAuthenticated || !state.auth.user) {
    return <div>Please sign in to view your profile</div>;
  }

  const userEnrollments = state.enrollments.filter(
    (e) => e.studentId === state.auth.user?.id
  );
  const userCourses = state.courses.filter((c) =>
    userEnrollments.some((e) => e.courseId === c.id)
  );
  const createdCourses = state.courses.filter(
    (c) => c.instructorId === state.auth.user?.id
  );

  const completedCourses = userEnrollments.filter((e) => e.completedAt).length;
  const totalProgress =
    userEnrollments.length > 0
      ? Math.round(
          userEnrollments.reduce((acc, e) => acc + e.progress, 0) /
            userEnrollments.length
        )
      : 0;

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const achievements = [
    {
      title: 'First Course Completed',
      description: 'Completed your first course',
      earned: completedCourses > 0,
      icon: Award,
      color: 'green'
    },
    {
      title: 'Quick Learner',
      description: 'Completed 3 courses',
      earned: completedCourses >= 3,
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Dedicated Student',
      description: 'Enrolled in 5+ courses',
      earned: userEnrollments.length >= 5,
      icon: Star,
      color: 'purple'
    },
    {
      title: 'Course Creator',
      description: 'Created your first course',
      earned:
        state.auth.user.role === 'instructor' && createdCourses.length > 0,
      icon: Trophy,
      color: 'yellow'
    }
  ];

  const getAchievementColor = (color, earned) => {
    if (!earned) return 'bg-gray-100 text-gray-400 border-gray-200';

    const colors = {
      green: 'bg-green-100 text-green-700 border-green-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    return colors[color] || colors.blue;
  };

  const getIconColor = (color, earned) => {
    if (!earned) return 'bg-gray-300';

    const colors = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      yellow: 'bg-yellow-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={
                  state.auth.user.avatar ||
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
                }
                alt={state.auth.user.name}
                className="w-32 h-32 rounded-full ring-4 ring-blue-500 ring-offset-4 object-cover"
              />
              <div
                className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                  state.auth.user.role === 'instructor'
                    ? 'bg-purple-500'
                    : 'bg-green-500'
                }`}
              ></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="text-3xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-gray-800"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="block text-xl bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-gray-600"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {state.auth.user.name}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {state.auth.user.email}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Joined{' '}
                    {new Date(state.auth.user.joinedDate).toLocaleDateString()}
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                    state.auth.user.role === 'instructor'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="capitalize font-medium">
                    {state.auth.user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats and Courses */}
          <div className="lg:col-span-2 space-y-8">
            {/* ... keep the rest unchanged (Statistics, Courses Section) ... */}
            {/* You already have it, so just copy the rest directly from your TSX version */}
          </div>

          {/* Achievements Sidebar */}
           <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 ${getAchievementColor(achievement.color, achievement.earned)} ${
                        achievement.earned ? 'shadow-sm' : 'opacity-60'
                      }`}
                    >
                      <div className={`p-3 rounded-full ${getIconColor(achievement.color, achievement.earned)}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{achievement.title}</h3>
                        <p className="text-xs opacity-75">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <div className="text-green-600">
                          <Award className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentView('courses')}
                  className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-800">Browse Courses</span>
                  </div>
                </button>
                
                {state.auth.user.role === 'instructor' && (
                  <button
                    onClick={() => setCurrentView('add-course')}
                    className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-gray-800">Create Course</span>
                    </div>
                  </button>
                )}
                
                <button className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-800">Contact Support</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
