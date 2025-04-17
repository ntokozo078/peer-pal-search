import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { findUserById, getSessionFeedback } from '@/lib/mock-data';
import { User, TutorProfile, TuteeProfile, Feedback } from '@/types';
import { Button } from '@/components/ui/buttonShadcn';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { CalendarDaysIcon, BookOpenIcon, UserIcon, GraduationCap, StarIcon, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  
  useEffect(() => {
    let userToShow: User | null = null;
    
    if (userId) {
      userToShow = findUserById(userId);
      setIsOwnProfile(false);
    } else if (user) {
      userToShow = user;
      setIsOwnProfile(true);
    }
    
    if (userToShow) {
      setProfileUser(userToShow);
      setEditedName(userToShow.name);
      setEditedBio(userToShow.bio || '');
      
      if (userToShow.role === 'tutor') {
        const tutorFeedback = getSessionFeedback(userToShow.id);
        setFeedbacks(tutorFeedback);
      }
    }
  }, [userId, user]);

  const handleSaveProfile = () => {
    if (!profileUser) return;
    
    // In a real app, this would make an API call to update the profile
    setProfileUser({
      ...profileUser,
      name: editedName,
      bio: editedBio,
    });
    
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

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
  const tutorProfile = isTutor ? {
    subjects: [],
    qualifications: [],
    availability: [],
    hourlyRate: 0,
    rating: 0,
    reviewCount: 0,
  } as TutorProfile : null;
  const tuteeProfile = !isTutor ? {
    interests: [],
    learningPreferences: [],
  } as TuteeProfile : null;

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-shrink-0">
                  <img 
                    className="h-24 w-24 rounded-full object-cover" 
                    src={profileUser.profilePicture || '/placeholder.svg'} 
                    alt={profileUser.name} 
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-8">
                  {isEditing ? (
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-xl font-bold"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-900">{profileUser.name}</h1>
                  )}
                  <p className="mt-2 text-gray-600">
                    {profileUser.role === 'tutor' ? "Tutor" : "Student"}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-0">
                {isOwnProfile ? (
                  isEditing ? (
                    <Button onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )
                ) : (
                  <Button onClick={() => navigate('/messages')}>
                    Send Message
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold">About</h2>
            {isEditing ? (
              <Input
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="mt-2"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="mt-2 text-gray-600">
                {profileUser.bio || "No bio provided."}
              </p>
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                
                
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
