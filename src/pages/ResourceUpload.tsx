
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { subjects } from '@/lib/mock-data';
import { Button } from '@/components/ui/buttonShadcn';
import { FileUpIcon, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResourceUpload: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Redirect if not logged in or not a tutor
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              You need to be logged in as a tutor to upload resources
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
              Only tutors can upload resources
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/resources')}>Browse Resources</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !subjectId || !file) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select a file",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 10MB",
        variant: "destructive"
      });
      return;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/zip', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOCX, PPT, ZIP, JPEG, or PNG file",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Resource Uploaded",
      description: `${title} has been successfully uploaded.`,
      variant: "default"
    });
    
    setIsUploading(false);
    navigate('/resources');
  };
  
  return (
    <Layout>
      <div className="container max-w-3xl px-4 py-8 mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => navigate('/resources')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
          <h1 className="text-3xl font-bold">Upload New Resource</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Resource Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="E.g., Calculus Formulas Cheat Sheet"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Briefly describe this resource..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.level}) - R{subject.hourlyRate}/hr
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File
                </label>
                <div 
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="space-y-1 text-center">
                    <FileUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, PPT, ZIP up to 10MB
                    </p>
                  </div>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Resource'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceUpload;
