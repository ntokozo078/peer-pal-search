
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { tutors, tutees, findUserById, getSessionFeedback } from '@/lib/mock-data';
import { User, TutorProfile, TuteeProfile, Feedback } from '@/types';
import { Button } from '@/components/ui/buttonShadcn';
import { CalendarDaysIcon, BookOpenIcon, UserIcon, GraduationCap, StarIcon } from 'lucide-react';

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  
  useEffect(() => {
    // Determine if this is the user's own profile or someone else's
    let userToShow: User | null = null;
    
    if (userId) {
      // Viewing someone else's profile
      userToShow = findUserById(userId);
      setIsOwnProfile(false);
    } else if (user) {
      // Viewing own profile
      userToShow = user;
      setIsOwnProfile(true);
    }
    
    if (userToShow) {
      setProfileUser(userToShow);
      
      // If this is a tutor, we want to fetch their feedback
      if (userToShow.role === 'tutor') {
        const mockFeedback = [
          {
            id: "f1",
            sessionId: "s1",
            fromId: "101",
            toId: userToShow.id,
            rating: 5,
            comment: "Excellent tutor! Made complex concepts easy to understand.",
            createdAt: new Date("2023-03-15")
          },
          {
            id: "f2",
            sessionId: "s2",
            fromId: "102",
            toId: userToShow.id,
            rating: 4,
            comment: "Very helpful and patient. Would recommend.",
            createdAt: new Date("2023-03-10")
          }
        ];
        setFeedbacks(mockFeedback);
      }
    }
  }, [userId, user]);
  
  if (!profileUser) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">User not found</h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const isTutor = profileUser.role === 'tutor';
  const tutorProfile = isTutor ? tutors.find(t => t.id === profileUser.id) as TutorProfile : null;
  const tuteeProfile = !isTutor ? tutees.find(t => t.id === profileUser.id) as TuteeProfile : null;
  
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-8 sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-shrink-0">
                <img 
                  className="h-24 w-24 rounded-full object-cover" 
                  src={profileUser.profilePicture || '/placeholder.svg'} 
                  alt={profileUser.name} 
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-8">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-900">{profileUser.name}</h1>
                  {isTutor && (
                    <div className="ml-4 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(tutorProfile?.rating || 0) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">
                        {tutorProfile?.rating} ({tutorProfile?.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-gray-600">
                  {isTutor 
                    ? "Tutor"
                    : "Student"
                  }
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Member since {new Date(profileUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-0">
              {isOwnProfile ? (
                <Button onClick={() => navigate('/profile/edit')}>
                  Edit Profile
                </Button>
              ) : isTutor ? (
                <Button onClick={() => navigate(`/schedule/${profileUser.id}`)}>
                  Book Session
                </Button>
              ) : (
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold">About</h2>
                <p className="mt-2 text-gray-600">
                  {profileUser.bio || "No bio provided."}
                </p>
                
                {isTutor && (
                  <>
                    <h2 className="text-xl font-semibold mt-6">Subjects</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tutorProfile?.subjects.map((subject) => (
                        <div 
                          key={subject.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          <BookOpenIcon className="h-4 w-4 mr-1" />
                          {subject.name} ({subject.level})
                        </div>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-semibold mt-6">Qualifications</h2>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {tutorProfile?.qualifications.map((qualification, index) => (
                        <li key={index} className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                          {qualification}
                        </li>
                      ))}
                    </ul>
                    
                    <h2 className="text-xl font-semibold mt-6">Availability</h2>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tutorProfile?.availability.map((avail, index) => (
                        <div 
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary" />
                          {avail.day}: {avail.startTime} - {avail.endTime}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Hourly Rate</h2>
                      <span className="text-2xl font-bold text-primary">
                        R{tutorProfile?.hourlyRate}
                      </span>
                    </div>
                  </>
                )}
                
                {!isTutor && (
                  <>
                    <h2 className="text-xl font-semibold mt-6">Interests</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tuteeProfile?.interests.map((subject) => (
                        <div 
                          key={subject.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          <BookOpenIcon className="h-4 w-4 mr-1" />
                          {subject.name} ({subject.level})
                        </div>
                      ))}
                    </div>
                    
                    {tuteeProfile?.learningPreferences && (
                      <>
                        <h2 className="text-xl font-semibold mt-6">Learning Preferences</h2>
                        <ul className="mt-2 space-y-1 text-gray-600">
                          {tuteeProfile.learningPreferences.map((preference, index) => (
                            <li key={index} className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-2 text-primary" />
                              {preference}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </>
                )}
              </div>
              
              <div className="lg:col-span-1">
                {isTutor && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    
                    {feedbacks.length > 0 ? (
                      <div className="mt-4 space-y-4">
                        {feedbacks.map((feedback) => (
                          <div key={feedback.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon 
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < feedback.rating 
                                          ? 'text-yellow-400 fill-current' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                              {feedback.comment}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              From: Student
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-gray-600">No reviews yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
