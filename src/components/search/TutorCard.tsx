
import React from 'react';
import { Link } from 'react-router-dom';
import { TutorProfile } from '@/types';
import { Button } from '@/components/ui/buttonShadcn';

interface TutorCardProps {
  tutor: TutorProfile;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  return (
    <div className="tutor-card flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img 
              className="w-16 h-16 rounded-full" 
              src={tutor.profilePicture || '/placeholder.svg'} 
              alt={tutor.name} 
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{tutor.name}</h3>
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
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {tutor.bio?.length > 150 ? tutor.bio.substring(0, 150) + '...' : tutor.bio}
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Subjects</h4>
          <div className="flex flex-wrap mt-1 gap-1">
            {tutor.subjects.map((subject) => (
              <span 
                key={subject.id}
                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
              >
                {subject.name} ({subject.level})
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Rates</h4>
          <p className="text-sm text-gray-600">R{tutor.hourlyRate} per hour</p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Availability</h4>
          <div className="mt-1 space-y-1">
            {tutor.availability.map((avail, index) => (
              <p key={index} className="text-sm text-gray-600">
                {avail.day}: {avail.startTime} - {avail.endTime}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex mt-auto p-4 bg-gray-50 border-t border-gray-200">
        <Link to={`/profile/${tutor.id}`} className="flex-1 mr-2">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
        <Link to={`/schedule/${tutor.id}`} className="flex-1">
          <Button className="w-full">
            Book Session
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;
