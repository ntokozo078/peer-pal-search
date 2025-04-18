
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { subjects, addSubject } from '@/lib/mock-data';
import { Subject } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/buttonShadcn';
import { AlertCircle } from 'lucide-react';

interface AddSubjectProps {
  onSubjectAdded?: (subject: Subject) => void;
}

const AddSubject: React.FC<AddSubjectProps> = ({ onSubjectAdded }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user || user.role !== 'tutor') {
      toast({
        title: 'Error',
        description: 'Only tutors can add subjects.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (!name || !level || !description || !hourlyRate) {
      toast({
        title: 'Error',
        description: 'All fields are required.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const newSubject: Subject = {
      id: `subject-${Date.now()}`,
      name,
      level,
      description,
      tutorId: user.id,
      hourlyRate,
    };

    // Add the new subject to the mock data using the addSubject function
    addSubject(newSubject);

    toast({
      title: 'Success',
      description: `${name} added successfully.`,
    });

    if (onSubjectAdded) {
      onSubjectAdded(newSubject);
    }

    // Clear form and redirect
    setName('');
    setLevel('Beginner');
    setDescription('');
    setHourlyRate(undefined);
    setIsLoading(false);
    
    // Redirect to dashboard after success
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Subject</CardTitle>
            <CardDescription>
              Fill out the form below to add a new subject to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                >
                  Subject Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="e.g., Mathematics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                >
                  Level
                </label>
                <select
                  id="level"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="e.g., A comprehensive introduction to mathematics."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="hourlyRate"
                  className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                >
                  Hourly Rate (R)
                </label>
                <Input
                  type="number"
                  id="hourlyRate"
                  placeholder="e.g., 250"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                />
                <p className="text-sm text-gray-500 mt-1">Enter amount in South African Rand (ZAR)</p>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Subject'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            {isLoading && (
              <div className="flex items-center text-sm text-muted-foreground">
                <AlertCircle className="mr-2 h-4 w-4" />
                Adding subject...
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AddSubject;
