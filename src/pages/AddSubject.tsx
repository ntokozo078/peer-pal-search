
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { subjects } from '@/lib/mock-data';
import { Button } from '@/components/ui/buttonShadcn';
import { useToast } from '@/hooks/use-toast';
import { PlusIcon } from 'lucide-react';

const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

const AddSubject: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [subjectName, setSubjectName] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not logged in or not a tutor
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              You need to be logged in as a tutor to add subjects
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
              Only tutors can add subjects
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!subjectName || !level || !hourlyRate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const rate = parseFloat(hourlyRate);
    if (isNaN(rate) || rate <= 0) {
      toast({
        title: "Invalid Hourly Rate",
        description: "Please enter a valid hourly rate",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Subject Added",
      description: `${subjectName} (${level}) has been added to your profile.`,
      variant: "default"
    });
    
    setIsSubmitting(false);
    navigate('/profile');
  };
  
  return (
    <Layout>
      <div className="container max-w-2xl px-4 py-8 mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => navigate('/profile')}
          >
            Back to Profile
          </Button>
          <h1 className="text-3xl font-bold">Add New Subject</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name*
                </label>
                <input
                  id="subject-name"
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="E.g., Mathematics, Physics, Programming"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Level*
                </label>
                <select
                  id="level"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a level</option>
                  {levelOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Briefly describe your experience and expertise in this subject..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="hourly-rate" className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate (R)*
                </label>
                <input
                  id="hourly-rate"
                  type="number"
                  min="0"
                  step="10"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="E.g., 150"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-500">* Required fields</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Subject...' : 'Add Subject'}
                {!isSubmitting && <PlusIcon className="ml-1 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddSubject;
