import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { categories, difficulties } from '../data/mockData';
import CourseCard from './CourseCard';

export default function CourseList({ setCurrentView, setSelectedCourse }) {
  const { state, dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const coursesPerPage = 6;

  useEffect(() => {
    let filtered = state.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = state.filters.category === 'All Categories' || 
                              course.category === state.filters.category;
      
      const matchesDifficulty = state.filters.difficulty === 'All Levels' || 
                                course.difficulty === state.filters.difficulty;
      
      const matchesPrice = course.price >= state.filters.minPrice && 
                           course.price <= state.filters.maxPrice;
      
      const matchesRating = course.rating >= state.filters.minRating;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice && matchesRating;
    });

    // Sort courses
    filtered.sort((a, b) => {
      const { field, direction } = state.sort;
      let aValue, bValue;

      switch (field) {
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          aValue = difficultyOrder[a.difficulty];
          bValue = difficultyOrder[b.difficulty];
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          aValue = 0;
          bValue = 0;
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCourses(filtered);
  }, [state.courses, state.filters, state.sort, searchTerm]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (state.currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (field) => {
    const newDirection = state.sort.field === field && state.sort.direction === 'asc' ? 'desc' : 'asc';
    dispatch({ type: 'SET_SORT', payload: { field, direction: newDirection } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Amazing Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of courses designed to help you master new skills and advance your career.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses, instructors, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex gap-4">
              <select
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white min-w-[150px]"
              >
                <option value="createdAt">Sort by: Newest</option>
                <option value="title">Sort by: Title</option>
                <option value="rating">Sort by: Rating</option>
                <option value="price">Sort by: Price</option>
                <option value="difficulty">Sort by: Difficulty</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  showFilters 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={state.filters.category}
                    onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { category: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={state.filters.difficulty}
                    onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { difficulty: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${state.filters.minPrice} - ${state.filters.maxPrice}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="10"
                      value={state.filters.maxPrice}
                      onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { maxPrice: parseInt(e.target.value) } })}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={state.filters.minRating}
                    onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { minRating: parseFloat(e.target.value) } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + coursesPerPage, filteredCourses.length)} of {filteredCourses.length} courses
          </p>
          {state.auth.isAuthenticated && state.auth.user?.role === 'instructor' && (
            <button
              onClick={() => setCurrentView('add-course')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Add New Course
            </button>
          )}
        </div>

        {/* Course Grid */}
        {paginatedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={() => {
                  setSelectedCourse(course);
                  setCurrentView('course-details');
                }}
                setCurrentView={setCurrentView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No courses found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters to find what you're looking for.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  dispatch({ type: 'SET_FILTERS', payload: { category: 'All Categories', difficulty: 'All Levels', minPrice: 0, maxPrice: 200, minRating: 0 } });
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(state.currentPage - 1)}
              disabled={state.currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (state.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (state.currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = state.currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                      state.currentPage === pageNum
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(state.currentPage + 1)}
              disabled={state.currentPage === totalPages}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
