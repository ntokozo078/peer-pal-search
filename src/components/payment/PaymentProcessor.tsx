
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/buttonShadcn';
import { toast } from '@/components/ui/use-toast';
import { Subject, TutorProfile } from '@/types';
import { CreditCard, DollarSign } from 'lucide-react';

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
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      setTimeout(() => {
        // In a real implementation, this would call a Stripe API
        toast({
          title: 'Payment Successful',
          description: 'Your payment has been processed successfully',
        });
        
        // Redirect to success page
        navigate('/payment-success');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
      
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
          <span className="font-medium">R{subject.hourlyRate}/hour</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total:</span>
          <span>R{sessionAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button 
          onClick={handlePayment} 
          className="w-full" 
          disabled={isProcessing}
        >
          {isProcessing ? (
            'Processing...'
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Now
            </>
          )}
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
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Secure payment processed by Stripe</p>
        <div className="flex justify-center items-center mt-2">
          <DollarSign className="h-3 w-3 mr-1" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessor;
