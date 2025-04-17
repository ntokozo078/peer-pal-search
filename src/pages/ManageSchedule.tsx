
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { getTutorSessions } from '@/lib/mock-data';
import { TutorSession } from '@/types';
import { Button } from '@/components/ui/buttonShadcn';
import { CalendarIcon, ClockIcon, CheckIcon, XIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const ManageSchedule: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState<TutorSession[]>([]);
  const [availability, setAvailability] = useState<{
    [key: string]: boolean[];
  }>({
    Monday: Array(timeSlots.length).fill(false),
    Tuesday: Array(timeSlots.length).fill(false),
    Wednesday: Array(timeSlots.length).fill(false),
    Thursday: Array(timeSlots.length).fill(false),
    Friday: Array(timeSlots.length).fill(false),
    Saturday: Array(timeSlots.length).fill(false),
    Sunday: Array(timeSlots.length).fill(false),
  });
  const [activeTab, setActiveTab] = useState<'sessions' | 'availability'>('sessions');
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (user && user.role === 'tutor') {
      const tutorSessions = getTutorSessions(user.id);
      setSessions(tutorSessions);
      
      // If this was a real app, we would load the tutor's availability from the backend
      // For now, we'll just set some arbitrary availability
      if (user.id === '1') {
        const mondayAvail = Array(timeSlots.length).fill(false);
        mondayAvail[8] = true; // 16:00
        mondayAvail[9] = true; // 17:00
        mondayAvail[10] = true; // 18:00
        mondayAvail[11] = true; // 19:00
        
        const wednesdayAvail = Array(timeSlots.length).fill(false);
        wednesdayAvail[7] = true; // 15:00
        wednesdayAvail[8] = true; // 16:00
        wednesdayAvail[9] = true; // 17:00
        wednesdayAvail[10] = true; // 18:00
        
        const saturdayAvail = Array(timeSlots.length).fill(false);
        saturdayAvail[2] = true; // 10:00
        saturdayAvail[3] = true; // 11:00
        saturdayAvail[4] = true; // 12:00
        saturdayAvail[5] = true; // 13:00
        saturdayAvail[6] = true; // 14:00
        
        setAvailability({
          ...availability,
          Monday: mondayAvail,
          Wednesday: wednesdayAvail,
          Saturday: saturdayAvail,
        });
      }
    }
  }, [user]);
  
  // Redirect if not logged in or not a tutor
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              You need to be logged in as a tutor to manage your schedule
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/login')}>Log in</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (user.role !== 'tutor') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Only tutors can manage schedules
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleAvailabilityToggle = (day: string, index: number) => {
    const newAvailability = { ...availability };
    newAvailability[day][index] = !newAvailability[day][index];
    setAvailability(newAvailability);
  };
  
  const handleSaveAvailability = async () => {
    setIsSaving(true);
    
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Availability Updated",
      description: "Your availability has been successfully updated.",
      variant: "default"
    });
    
    setIsSaving(false);
  };
  
  const handleSessionAction = async (sessionId: string, action: 'accept' | 'decline') => {
    // Find the session
    const sessionIndex = sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) return;
    
    // Clone the sessions array
    const newSessions = [...sessions];
    
    // Update the session status
    if (action === 'accept') {
      newSessions[sessionIndex] = {
        ...newSessions[sessionIndex],
        status: 'confirmed'
      };
    } else {
      newSessions[sessionIndex] = {
        ...newSessions[sessionIndex],
        status: 'cancelled'
      };
    }
    
    // Update the state
    setSessions(newSessions);
    
    // Show toast
    toast({
      title: action === 'accept' ? "Session Confirmed" : "Session Declined",
      description: action === 'accept' 
        ? "The tutoring session has been confirmed. The student will be notified."
        : "The tutoring session has been declined. The student will be notified.",
      variant: "default"
    });
  };
  
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold">Manage Your Schedule</h1>
        
        <div className="mt-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'sessions'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('sessions')}
            >
              Tutoring Sessions
            </button>
            <button
              className={`ml-8 py-2 px-4 text-sm font-medium ${
                activeTab === 'availability'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('availability')}
            >
              Set Availability
            </button>
          </div>
          
          <div className="mt-6">
            {activeTab === 'sessions' ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
                
                {sessions.filter(s => 
                  new Date(s.dateTime) > new Date() && 
                  (s.status === 'confirmed' || s.status === 'requested')
                ).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sessions
                      .filter(s => 
                        new Date(s.dateTime) > new Date() && 
                        (s.status === 'confirmed' || s.status === 'requested')
                      )
                      .map((session) => (
                        <div 
                          key={session.id} 
                          className={`bg-white rounded-lg shadow p-4 ${
                            session.status === 'requested' 
                              ? 'border-l-4 border-yellow-400' 
                              : 'border-l-4 border-green-400'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{session.subject.name}</h3>
                              <p className="text-sm text-gray-600">
                                Student: Emily Davis
                              </p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              session.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {session.status === 'confirmed' ? 'Confirmed' : 'Requested'}
                            </span>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {new Date(session.dateTime).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {' - '}
                              {new Date(new Date(session.dateTime).getTime() + session.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              Mode: {session.mode === 'online' ? 'Online' : 'In-person'}
                            </div>
                          </div>
                          
                          {session.notes && (
                            <div className="mt-4">
                              <p className="text-sm font-medium text-gray-700">Notes:</p>
                              <p className="text-sm text-gray-600">{session.notes}</p>
                            </div>
                          )}
                          
                          {session.status === 'requested' && (
                            <div className="mt-4 flex space-x-2">
                              <Button 
                                className="flex-1" 
                                onClick={() => handleSessionAction(session.id, 'accept')}
                              >
                                <CheckIcon className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleSessionAction(session.id, 'decline')}
                              >
                                <XIcon className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
                    <p className="text-gray-600">
                      You don't have any upcoming tutoring sessions.
                    </p>
                  </div>
                )}
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Past Sessions</h2>
                
                {sessions.filter(s => 
                  new Date(s.dateTime) < new Date() || 
                  s.status === 'completed' || 
                  s.status === 'cancelled'
                ).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sessions
                      .filter(s => 
                        new Date(s.dateTime) < new Date() || 
                        s.status === 'completed' || 
                        s.status === 'cancelled'
                      )
                      .map((session) => (
                        <div 
                          key={session.id} 
                          className={`bg-white rounded-lg shadow p-4 ${
                            session.status === 'completed' 
                              ? 'border-l-4 border-blue-400' 
                              : 'border-l-4 border-red-400'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{session.subject.name}</h3>
                              <p className="text-sm text-gray-600">
                                Student: Emily Davis
                              </p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              session.status === 'completed' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {session.status === 'completed' ? 'Completed' : 'Cancelled'}
                            </span>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {new Date(session.dateTime).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {' - '}
                              {new Date(new Date(session.dateTime).getTime() + session.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No past sessions</h3>
                    <p className="text-gray-600">
                      You don't have any past tutoring sessions.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Set Your Availability</h2>
                  <Button 
                    onClick={handleSaveAvailability}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            Day
                          </th>
                          {timeSlots.map((time, index) => (
                            <th 
                              key={index} 
                              className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {time}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {daysOfWeek.map((day) => (
                          <tr key={day}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {day}
                            </td>
                            {timeSlots.map((_, index) => (
                              <td key={index} className="px-2 py-4 whitespace-nowrap text-center">
                                <div className="flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    checked={availability[day][index]}
                                    onChange={() => handleAvailabilityToggle(day, index)}
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                  />
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  Check the boxes to indicate when you're available to tutor. Students will only be able to book sessions during these times.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageSchedule;
