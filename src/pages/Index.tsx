
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import NLPSearchBar from '@/components/search/NLPSearchBar';
import { SearchQuery } from '@/types';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: SearchQuery) => {
    // Store the query in session storage to be used on the search page
    sessionStorage.setItem('searchQuery', JSON.stringify(query));
    
    // Navigate to the search page
    navigate('/search');
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-12 md:py-20">
        <div className="container px-4 mx-auto text-center md:px-6">
          <div className="max-w-4xl mx-auto">
            <img 
              src="/dut-logo.png" 
              alt="DUT Logo" 
              className="h-20 mx-auto mb-6" 
            />
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Peer-to-Peer Learning <span className="text-primary">Made Simple</span>
            </h1>
            
            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600">
              Connect with fellow students for academic support. Find tutors, schedule sessions, and share resources all in one place.
            </p>
            
            <div className="max-w-3xl mx-auto mt-10 sm:flex sm:justify-center">
              <div className="w-full">
                <NLPSearchBar onSearch={handleSearch} />
              </div>
            </div>
            
            <div className="mt-8 sm:flex sm:justify-center sm:space-x-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="mt-3 w-full sm:mt-0 sm:w-auto">
                  Browse Tutors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
              Our platform makes it easy to connect with peers for academic support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mb-4 text-white bg-dut-teal rounded-full">
                1
              </div>
              <h3 className="text-xl font-medium text-gray-900">Find a Tutor</h3>
              <p className="mt-4 text-gray-600">
                Use our smart search to find the perfect tutor based on subject, availability, and expertise.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mb-4 text-white bg-dut-purple rounded-full">
                2
              </div>
              <h3 className="text-xl font-medium text-gray-900">Schedule a Session</h3>
              <p className="mt-4 text-gray-600">
                Book a session at a time that works for both of you, either online or in-person.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mb-4 text-white bg-dut-green rounded-full">
                3
              </div>
              <h3 className="text-xl font-medium text-gray-900">Learn & Grow</h3>
              <p className="mt-4 text-gray-600">
                Connect, share resources, and help each other succeed academically.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Subject Areas Section */}
      <section className="py-12 bg-gray-50 md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Subject Areas
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
              Find tutors across a wide range of academic disciplines.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-12 md:grid-cols-4">
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Mathematics</h3>
              <p className="mt-2 text-sm text-gray-600">
                Calculus, Algebra, Statistics
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Computer Science</h3>
              <p className="mt-2 text-sm text-gray-600">
                Programming, Data Structures, AI
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Physics</h3>
              <p className="mt-2 text-sm text-gray-600">
                Mechanics, Electricity, Thermodynamics
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Chemistry</h3>
              <p className="mt-2 text-sm text-gray-600">
                Organic, Inorganic, Physical
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Biology</h3>
              <p className="mt-2 text-sm text-gray-600">
                Microbiology, Anatomy, Ecology
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Engineering</h3>
              <p className="mt-2 text-sm text-gray-600">
                Mechanical, Electrical, Civil
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Business</h3>
              <p className="mt-2 text-sm text-gray-600">
                Accounting, Economics, Management
              </p>
            </div>
            
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Humanities</h3>
              <p className="mt-2 text-sm text-gray-600">
                Literature, History, Philosophy
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/search">
              <Button>
                Browse All Subjects
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 bg-white md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Students Say
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
              Hear from students who have used our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">
                "I was struggling with my Computer Science assignments until I found a peer tutor through this platform. The 1-on-1 help made all the difference!"
              </p>
              <div className="flex items-center mt-4">
                <div className="flex-shrink-0">
                  <img 
                    className="w-10 h-10 rounded-full" 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Alex Johnson"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-sm text-gray-600">Computer Science Student</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">
                "As a tutor, I've been able to help other students while reinforcing my own knowledge. The scheduling system makes it easy to manage my tutoring sessions."
              </p>
              <div className="flex items-center mt-4">
                <div className="flex-shrink-0">
                  <img 
                    className="w-10 h-10 rounded-full" 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Jane Smith"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                  <p className="text-sm text-gray-600">Mathematics Tutor</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">
                "The resource sharing feature has been invaluable. I've been able to access study guides and practice problems that have helped me prepare for exams."
              </p>
              <div className="flex items-center mt-4">
                <div className="flex-shrink-0">
                  <img 
                    className="w-10 h-10 rounded-full" 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Michael Jones"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Michael Jones</p>
                  <p className="text-sm text-gray-600">Chemistry Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-primary md:py-20">
        <div className="container px-4 mx-auto text-center md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-primary-foreground/90">
            Join our community of students helping students achieve academic success.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/register">
              <Button 
                className="bg-white text-primary hover:bg-gray-100"
                size="lg"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
