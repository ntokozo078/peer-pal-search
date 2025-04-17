
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { findUserById } from '@/lib/mock-data';
import { Button } from '@/components/ui/buttonShadcn';
import { StarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LeaveFeedback: React.FC = () => {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Mock session data (in a real app, this would come from a backend)
  const mockSession = {
    id: sessionId || 'session-1',
    tutorId: '1',
    tutorName: 'John Doe',
    subject: 'Mathematics',
    dateTime: new Date().toLocaleDateString(),
    duration: 60,
  };
  
  // Redirect if not logged in
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              You need to be logged in to leave feedback
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/login')}>Log in</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your feedback.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submitting feedback
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
      variant: "default"
    });
    
    setIsSubmitting(false);
    navigate('/dashboard');
  };
  
  return (
    <Layout>
      <div className="container max-w-2xl px-4 py-8 mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Rate Your Session</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Session Details</h2>
            <div className="mt-2 space-y-2 text-gray-600">
              <p>Tutor: {mockSession.tutorName}</p>
              <p>Subject: {mockSession.subject}</p>
              <p>Date: {mockSession.dateTime}</p>
              <p>Duration: {mockSession.duration} minutes</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rate your tutor
                </label>
                <div className="flex items-center justify-center">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 focus:outline-none"
                      >
                        <StarIcon 
                          className={`w-10 h-10 ${
                            (hoveredRating !== 0 ? star <= hoveredRating : star <= rating)
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                {rating > 0 && (
                  <p className="mt-2 text-center text-sm text-gray-600">
                    {rating === 5 ? 'Excellent' : 
                     rating === 4 ? 'Very Good' : 
                     rating === 3 ? 'Good' : 
                     rating === 2 ? 'Fair' : 'Poor'}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Comments (optional)
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Share your experience with this tutor..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveFeedback;
