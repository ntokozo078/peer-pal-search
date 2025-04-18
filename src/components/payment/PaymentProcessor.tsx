
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/buttonShadcn';
import { toast } from '@/components/ui/use-toast';
import { Subject, TutorProfile } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface PaymentProcessorProps {
  tutor: TutorProfile;
  subject: Subject;
  sessionDate: Date;
  sessionTime: string;
  duration: number; // in minutes
  notes?: string;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ 
  tutor, 
  subject, 
  sessionDate, 
  sessionTime,
  duration,
  notes 
}) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate the total amount
  const hours = duration / 60;
  const sessionAmount = subject.hourlyRate * hours;
  
  const handleBooking = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate booking processing
      setTimeout(() => {
        toast({
          title: 'Booking Successful',
          description: 'Your tutoring session has been booked successfully',
        });
        
        // Redirect to success page
        navigate('/payment-success');
      }, 1000);
    } catch (error) {
      toast({
        title: 'Booking Failed',
        description: 'There was an error processing your booking. Please try again.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Tutor:</span>
          <span className="font-medium">{tutor.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Subject:</span>
          <span className="font-medium">{subject.name} ({subject.level})</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span className="font-medium">{sessionDate.toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Time:</span>
          <span className="font-medium">{sessionTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Duration:</span>
          <span className="font-medium">{hours} hour{hours !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex justify-between">
          <span>Rate:</span>
          <span className="font-medium">{formatCurrency(subject.hourlyRate)}/hour</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total:</span>
          <span>{formatCurrency(sessionAmount)}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button 
          onClick={handleBooking} 
          className="w-full" 
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Book Session'}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate(-1)}
          disabled={isProcessing}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default PaymentProcessor;
