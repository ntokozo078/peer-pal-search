
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/buttonShadcn';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container max-w-md px-4 py-12 mx-auto">
        <Card className="border-green-200 shadow-md">
          <CardHeader className="text-center border-b pb-6">
            <div className="w-full flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-center text-gray-600">
                Your payment has been processed successfully. Your session is now confirmed and has been added to your schedule.
              </p>
              
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="font-medium text-green-800 mb-2">Payment Details:</h3>
                <dl className="space-y-1">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Transaction ID:</dt>
                    <dd className="font-medium">TXN-{Date.now().toString().slice(-6)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Date:</dt>
                    <dd className="font-medium">{new Date().toLocaleDateString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Amount:</dt>
                    <dd className="font-medium">R150.00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Status:</dt>
                    <dd className="text-green-600 font-medium">Paid</dd>
                  </div>
                </dl>
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/search')}
            >
              Find More Tutors
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
