import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { tutors, subjects } from '@/lib/mock-data';
import { TutorProfile, Subject } from '@/types';
import { Button } from '@/components/ui/buttonShadcn';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import PaymentProcessor from '@/components/payment/PaymentProcessor';

const BookSession: React.FC = () => {
  const { tutorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [mode, setMode] = useState<'online' | 'in-person'>('online');
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'payment'>('details');
  
  useEffect(() => {
    // Find the tutor based on the ID from URL params
    const foundTutor = tutors.find(t => t.id === tutorId);
    if (foundTutor) {
      setTutor(foundTutor);
    }
  }, [tutorId]);
  
  // Get subject object from selected ID
  const getSelectedSubjectObject = () => {
    return tutor?.subjects.find(s => s.id === selectedSubject) || null;
  };
  
  // Redirect if not logged in or not a tutee
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              You need to be logged in as a student to book a session
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/login')}>Log in</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (user.role !== 'tutee') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Only students can book tutoring sessions
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/search')}>Find Tutors</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!tutor) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Tutor not found
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/search')}>Find Tutors</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Get available time slots based on selected date and tutor availability
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];
    
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedDate);
    
    // Find availability for the selected day
    const dayAvailability = tutor.availability.find(
      avail => avail.day === dayOfWeek
    );
    
    if (!dayAvailability) return [];
    
    // Generate time slots in 1-hour increments
    const startTime = parseInt(dayAvailability.startTime.split(':')[0]);
    const endTime = parseInt(dayAvailability.endTime.split(':')[0]);
    
    const timeSlots = [];
    for (let hour = startTime; hour < endTime; hour++) {
      timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
    }
    
    return timeSlots;
  };
  
  const handleContinueToPayment = () => {
    if (!selectedSubject || !selectedDate || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a subject, date, and time slot",
        variant: "destructive"
      });
      return;
    }
    
    setStep('payment');
  };
  
  const handleBackToDetails = () => {
    setStep('details');
  };
  
  return (
    <Layout>
      <div className="container max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <h1 className="text-3xl font-bold">Book a Session with {tutor.name}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <img 
                  src={tutor.profilePicture || '/placeholder.svg'} 
                  alt={tutor.name}
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{tutor.name}</h2>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">
                        {tutor.rating} ({tutor.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Rate</h3>
                <p className="text-sm text-gray-600">R{tutor.hourlyRate} per hour</p>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Subjects</h3>
                <div className="flex flex-wrap mt-1 gap-1">
                  {tutor.subjects.map((subject) => (
                    <span 
                      key={subject.id}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                    >
                      {subject.name} ({subject.level}) - R{subject.hourlyRate}/hr
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Availability</h3>
                <div className="mt-1 space-y-1">
                  {tutor.availability.map((avail, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {avail.day}: {avail.startTime} - {avail.endTime}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {step === 'details' ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Session Details</h2>
                  
                  <form onSubmit={(e) => { e.preventDefault(); handleContinueToPayment(); }} className="space-y-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select a subject</option>
                        {tutor.subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name} ({subject.level}) - R{subject.hourlyRate}/hr
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Session Mode
                      </label>
                      <div className="mt-1 flex space-x-4">
                        <div className="flex items-center">
                          <input
                            id="online"
                            name="session-mode"
                            type="radio"
                            checked={mode === 'online'}
                            onChange={() => setMode('online')}
                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <label htmlFor="online" className="ml-2 block text-sm text-gray-700">
                            Online
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="in-person"
                            name="session-mode"
                            type="radio"
                            checked={mode === 'in-person'}
                            onChange={() => setMode('in-person')}
                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <label htmlFor="in-person" className="ml-2 block text-sm text-gray-700">
                            In-person
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <div className="border rounded-md p-2">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              setSelectedTimeSlot('');
                            }}
                            disabled={(date) => {
                              const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
                              return !tutor.availability.some(avail => avail.day === day) || 
                                    date < new Date(new Date().setHours(0, 0, 0, 0));
                            }}
                            className="rounded-md border"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time Slot
                        </label>
                        {selectedDate ? (
                          getAvailableTimeSlots().length > 0 ? (
                            <div className="space-y-2 border rounded-md p-4 h-72 overflow-y-auto">
                              {getAvailableTimeSlots().map((timeSlot, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    id={`time-slot-${index}`}
                                    name="time-slot"
                                    type="radio"
                                    value={timeSlot}
                                    checked={selectedTimeSlot === timeSlot}
                                    onChange={() => setSelectedTimeSlot(timeSlot)}
                                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                  />
                                  <label htmlFor={`time-slot-${index}`} className="ml-2 block text-sm text-gray-700">
                                    {timeSlot}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-72 border rounded-md p-4 text-gray-500">
                              No available time slots for the selected date
                            </div>
                          )
                        ) : (
                          <div className="flex items-center justify-center h-72 border rounded-md p-4 text-gray-500">
                            Please select a date first
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Session Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="Tell your tutor what you'd like to focus on in this session..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                    
                    <div className="mt-8">
                      <Button 
                        type="submit" 
                        className="w-full"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Payment</h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleBackToDetails}
                    >
                      Edit Details
                    </Button>
                  </div>
                  
                  {selectedSubject && selectedDate && selectedTimeSlot && (
                    <PaymentProcessor
                      tutor={tutor}
                      subject={getSelectedSubjectObject()!}
                      sessionDate={selectedDate}
                      sessionTime={selectedTimeSlot}
                      duration={60} // Default 1 hour
                      notes={notes}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookSession;
