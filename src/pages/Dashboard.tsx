import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/buttonShadcn';
import { getTutorSessions, getTuteeSessions } from '@/lib/mock-data';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              You need to be logged in to view your dashboard
            </h1>
            <div className="mt-4">
              <Link to="/login">
                <Button>Log in</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Get relevant data based on user role
  const sessions = user.role === 'tutor' 
    ? getTutorSessions(user.id)
    : getTuteeSessions(user.id);
  
  const upcomingSessions = sessions.filter(session => 
    new Date(session.dateTime) > new Date() && 
    (session.status === 'confirmed' || session.status === 'requested')
  );
  
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto md:px-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <p className="mt-2 text-gray-600">
          {user.role === 'tutor' 
            ? 'Manage your tutoring sessions and resources.'
            : 'Find tutors and manage your learning sessions.'}
        </p>
        
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <div className="mt-4 space-y-3">
              {user.role === 'tutee' ? (
                <>
                  <Link to="/search">
                    <Button className="w-full">Find a Tutor</Button>
                  </Link>
                  <Link to="/resources">
                    <Button variant="outline" className="w-full">Browse Resources</Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="outline" className="w-full">Messages</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/schedule">
                    <Button className="w-full">Manage Schedule</Button>
                  </Link>
                  <Link to="/resources/upload">
                    <Button variant="outline" className="w-full">Upload Resources</Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="outline" className="w-full">Messages</Button>
                  </Link>
                  <Link to="/subject/add">
                    <Button variant="outline" className="w-full">Add New Subject</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
            {upcomingSessions.length > 0 ? (
              <div className="mt-4 space-y-3">
                {upcomingSessions.slice(0, 3).map((session) => (
                  <div key={session.id} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{session.subject.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(session.dateTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          session.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {upcomingSessions.length > 3 && (
                  <Link to="/schedule" className="block mt-3 text-sm font-medium text-primary hover:text-primary/90">
                    View all sessions
                  </Link>
                )}
              </div>
            ) : (
              <p className="mt-4 text-gray-600">No upcoming sessions.</p>
            )}
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {/* Mock activity items */}
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">
                      {user.role === 'tutor' ? 'New session request' : 'Session request status updated'}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        New
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {user.role === 'tutor' 
                          ? 'Mathematics tutoring session requested by Emily Davis'
                          : 'Your Python programming session with Jane Smith was confirmed'}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        1 hour ago
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">
                      {user.role === 'tutor' ? 'New feedback received' : 'Resource added to your subject'}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        New
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {user.role === 'tutor' 
                          ? 'Emily Davis gave you a 5-star rating'
                          : 'Calculus Cheat Sheet added by John Doe'}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        3 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
