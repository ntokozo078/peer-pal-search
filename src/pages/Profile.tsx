import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { findUserById, getSessionFeedback } from '@/lib/mock-data';
import { User, TutorProfile, TuteeProfile, Feedback, Subject } from '@/types';
import { Button } from '@/components/ui/buttonShadcn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { 
  CalendarDaysIcon, 
  BookOpenIcon, 
  UserIcon, 
  GraduationCap, 
  StarIcon, 
  Save, 
  PencilIcon,
  X,
  Plus
} from 'lucide-react';
import ProfilePictureUpload from '@/components/profile/ProfilePictureUpload';

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [editedProfilePicture, setEditedProfilePicture] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  
  // Subject editing state (for tutors)
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ name: '', level: 'Beginner' });
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  
  // Qualifications editing state (for tutors)
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [newQualification, setNewQualification] = useState('');
  const [isAddingQualification, setIsAddingQualification] = useState(false);
  
  // Availability editing state (for tutors)
  const [availability, setAvailability] = useState<{day: string, startTime: string, endTime: string}[]>([]);
  
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
      setEditedProfilePicture(userToShow.profilePicture || '');
      
      if (userToShow.role === 'tutor') {
        const tutorProfile = userToShow as TutorProfile;
        setSubjects(tutorProfile.subjects || []);
        setQualifications(tutorProfile.qualifications || []);
        setAvailability(tutorProfile.availability || []);
        
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
      profilePicture: editedProfilePicture,
    });
    
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const handleAddSubject = () => {
    if (!newSubject.name.trim()) return;
    
    const newSubjectObj: Subject = {
      id: `subject-${Date.now()}`,
      name: newSubject.name.trim(),
      level: newSubject.level,
      tutorId: profileUser?.id || '',  // Add required tutorId
      hourlyRate: 0,  // Add required hourlyRate with default value
    };
    
    setSubjects([...subjects, newSubjectObj]);
    setNewSubject({ name: '', level: 'Beginner' });
    setIsAddingSubject(false);
  };

  const handleRemoveSubject = (subjectId: string) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
  };

  const handleAddQualification = () => {
    if (!newQualification.trim()) return;
    
    setQualifications([...qualifications, newQualification.trim()]);
    setNewQualification('');
    setIsAddingQualification(false);
  };

  const handleRemoveQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
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
    subjects: subjects,
    qualifications: qualifications,
    availability: availability,
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
                  {isEditing ? (
                    <ProfilePictureUpload 
                      currentImageUrl={editedProfilePicture}
                      name={editedName}
                      onImageChange={setEditedProfilePicture}
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full overflow-hidden">
                      {profileUser.profilePicture ? (
                        <img 
                          className="h-full w-full object-cover" 
                          src={profileUser.profilePicture} 
                          alt={profileUser.name} 
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground text-xl">
                          {profileUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                        </div>
                      )}
                    </div>
                  )}
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
                      <PencilIcon className="w-4 h-4 mr-2" />
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
              <Textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="mt-2"
                placeholder="Tell us about yourself..."
                rows={4}
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
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Subjects</h2>
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setIsAddingSubject(true)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Subject
                        </Button>
                      )}
                    </div>
                    
                    {isAddingSubject && (
                      <div className="mt-2 p-3 border rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <Input
                            placeholder="Subject name"
                            value={newSubject.name}
                            onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                          />
                          <select
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary"
                            value={newSubject.level}
                            onChange={(e) => setNewSubject({...newSubject, level: e.target.value})}
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setIsAddingSubject(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={handleAddSubject}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <div 
                          key={subject.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          <BookOpenIcon className="h-4 w-4 mr-1" />
                          {subject.name} ({subject.level})
                          {isEditing && (
                            <button 
                              className="ml-1 text-blue-600 hover:text-blue-800" 
                              onClick={() => handleRemoveSubject(subject.id)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                      {subjects.length === 0 && (
                        <p className="text-gray-500 text-sm">No subjects added yet.</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <h2 className="text-xl font-semibold">Qualifications</h2>
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setIsAddingQualification(true)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Qualification
                        </Button>
                      )}
                    </div>
                    
                    {isAddingQualification && (
                      <div className="mt-2 p-3 border rounded-md">
                        <Input
                          placeholder="e.g., BSc Computer Science"
                          value={newQualification}
                          onChange={(e) => setNewQualification(e.target.value)}
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setIsAddingQualification(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={handleAddQualification}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {qualifications.map((qualification, index) => (
                        <li key={index} className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                          {qualification}
                          {isEditing && (
                            <button 
                              className="ml-1 text-red-600 hover:text-red-800" 
                              onClick={() => handleRemoveQualification(index)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </li>
                      ))}
                      {qualifications.length === 0 && (
                        <p className="text-gray-500 text-sm">No qualifications added yet.</p>
                      )}
                    </ul>
                    
                    <h2 className="text-xl font-semibold mt-6">Availability</h2>
                    {isEditing ? (
                      <div className="mt-2 space-y-2">
                        {availability.map((slot, index) => (
                          <div key={index} className="grid grid-cols-3 gap-2 items-center">
                            <select
                              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary"
                              value={slot.day}
                              onChange={(e) => {
                                const updated = [...availability];
                                updated[index].day = e.target.value;
                                setAvailability(updated);
                              }}
                            >
                              <option value="Monday">Monday</option>
                              <option value="Tuesday">Tuesday</option>
                              <option value="Wednesday">Wednesday</option>
                              <option value="Thursday">Thursday</option>
                              <option value="Friday">Friday</option>
                              <option value="Saturday">Saturday</option>
                              <option value="Sunday">Sunday</option>
                            </select>
                            <Input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => {
                                const updated = [...availability];
                                updated[index].startTime = e.target.value;
                                setAvailability(updated);
                              }}
                            />
                            <div className="flex items-center">
                              <Input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => {
                                  const updated = [...availability];
                                  updated[index].endTime = e.target.value;
                                  setAvailability(updated);
                                }}
                              />
                              <button 
                                className="ml-2 text-red-600 hover:text-red-800" 
                                onClick={() => {
                                  setAvailability(
                                    availability.filter((_, i) => i !== index)
                                  );
                                }}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setAvailability([
                              ...availability, 
                              { day: 'Monday', startTime: '09:00', endTime: '17:00' }
                            ]);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Time Slot
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {availability.map((avail, index) => (
                          <div 
                            key={index}
                            className="flex items-center text-gray-600"
                          >
                            <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary" />
                            {avail.day}: {avail.startTime} - {avail.endTime}
                          </div>
                        ))}
                        {availability.length === 0 && (
                          <p className="text-gray-500 text-sm">No availability set yet.</p>
                        )}
                      </div>
                    )}
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
                      {(!tuteeProfile?.interests || tuteeProfile.interests.length === 0) && (
                        <p className="text-gray-500 text-sm">No interests added yet.</p>
                      )}
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
                          {tuteeProfile.learningPreferences.length === 0 && (
                            <p className="text-gray-500 text-sm">No learning preferences set yet.</p>
                          )}
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
