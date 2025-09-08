import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import AddCourse from './components/AddCourse';
import Profile from './components/Profile';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;
      case 'courses':
        return (
          <CourseList
            setCurrentView={setCurrentView}
            setSelectedCourse={setSelectedCourse}
          />
        );
      case 'course-details':
        return selectedCourse ? (
          <CourseDetails
            course={selectedCourse}
            setCurrentView={setCurrentView}
          />
        ) : (
          <Dashboard setCurrentView={setCurrentView} />
        );
      case 'add-course':
        return <AddCourse setCurrentView={setCurrentView} />;
      case 'profile':
        return <Profile setCurrentView={setCurrentView} />;
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        <main>{renderView()}</main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
