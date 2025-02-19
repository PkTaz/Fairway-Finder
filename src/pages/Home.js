import React, { useState, useEffect } from 'react';
import '../styles/Home.css'; // Ensure this path is correct

function Home() {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchCourses('golf'); // Use a default search query to get nearby courses
    }
  }, [location]);

  const fetchCourses = async (searchQuery) => {
    try {
      const url = `https://api.golfcourseapi.com/v1/search?search_query=${searchQuery}`;
      console.log('Request URL:', url); // Log the request URL
      const response = await fetch(url, {
        headers: {
          Authorization: 'Key GPW6LA6POJGFPTBC7INJNUAOHM',
        },
      });
      const data = await response.json();
      console.log('Fetched courses:', data); // Log the entire response
      setCourses(data.courses || []); // Ensure courses is an array
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchCourses(query);
  };

  return (
    <div className="home-background">
      <div className="home-content">
        <img className="logo" src="/assets/ff-primary.png" alt="Placeholder" />
        <h1 className="h-title">Find a Course Near You!</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search Course..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
        <div className="courses">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="course-card">
                <h2>{course.course_name}</h2>
                <p>{course.location.address}</p>
                <p>{course.location.city}, {course.location.state}</p>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
        <p>Scroll down to see more content...</p>
        <div style={{ height: '200vh' }}></div> {/* Example content to enable scrolling */}
      </div>
    </div>
  );
}

export default Home;