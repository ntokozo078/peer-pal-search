
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { resources, subjects } from '@/lib/mock-data';
import { Resource, Subject } from '@/types';
import { Button } from '@/components/ui/buttonShadcn';
import { Link } from 'react-router-dom';
import { FileIcon, FileTextIcon, ImageIcon, FileArchiveIcon } from 'lucide-react';

const Resources: React.FC = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter resources based on selected subject and search query
  const filteredResources = resources.filter(resource => {
    const matchesSubject = selectedSubject === 'all' || resource.subject.id === selectedSubject;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileTextIcon className="h-8 w-8 text-red-500" />;
      case 'docx':
        return <FileIcon className="h-8 w-8 text-blue-500" />;
      case 'jpg':
      case 'png':
        return <ImageIcon className="h-8 w-8 text-green-500" />;
      default:
        return <FileArchiveIcon className="h-8 w-8 text-gray-500" />;
    }
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          {user?.role === 'tutor' && (
            <Link to="/resources/upload">
              <Button>Upload New Resource</Button>
            </Link>
          )}
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} ({subject.level})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="w-full md:w-3/4">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        {getFileIcon(resource.fileType)}
                        <h3 className="ml-2 text-lg font-medium">{resource.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          {new Date(resource.createdAt).toLocaleDateString()}
                        </span>
                        <span>{formatFileSize(resource.size)}</span>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {resource.subject.name}
                        </span>
                        <a 
                          href={resource.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/90 text-sm font-medium"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-8">
                <p className="text-gray-600 mb-4">No resources found matching your criteria.</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
