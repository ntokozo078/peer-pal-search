
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import NLPSearchBar from '@/components/search/NLPSearchBar';
import TutorCard from '@/components/search/TutorCard';
import { TutorProfile, SearchQuery, Subject } from '@/types';
import { searchTutors } from '@/lib/nlp-search';
import { tutors, subjects } from '@/lib/mock-data';

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<TutorProfile[]>(tutors);
  const [activeFilters, setActiveFilters] = useState<{
    subjects: string[];
    levels: string[];
    days: string[];
  }>({
    subjects: [],
    levels: [],
    days: [],
  });
  
  // Unique levels extracted from subjects
  const uniqueLevels = Array.from(new Set(subjects.map(subject => subject.level)));
  
  // Unique days for availability
  const uniqueDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  const handleSearch = (query: SearchQuery) => {
    const results = searchTutors(query);
    setSearchResults(results);
    
    // Update active filters based on query
    const newFilters = { ...activeFilters };
    
    if (query.subject) {
      newFilters.subjects = [query.subject];
    }
    
    if (query.level) {
      newFilters.levels = [query.level];
    }
    
    if (query.availability?.day) {
      newFilters.days = [query.availability.day];
    }
    
    setActiveFilters(newFilters);
  };
  
  const handleFilterChange = (filterType: 'subjects' | 'levels' | 'days', value: string) => {
    const newFilters = { ...activeFilters };
    
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    } else {
      newFilters[filterType] = [...newFilters[filterType], value];
    }
    
    setActiveFilters(newFilters);
    
    // Apply filters to tutors
    let filtered = [...tutors];
    
    if (newFilters.subjects.length > 0) {
      filtered = filtered.filter(tutor => 
        tutor.subjects.some(subject => 
          newFilters.subjects.includes(subject.name)
        )
      );
    }
    
    if (newFilters.levels.length > 0) {
      filtered = filtered.filter(tutor => 
        tutor.subjects.some(subject => 
          newFilters.levels.includes(subject.level)
        )
      );
    }
    
    if (newFilters.days.length > 0) {
      filtered = filtered.filter(tutor => 
        tutor.availability.some(avail => 
          newFilters.days.includes(avail.day)
        )
      );
    }
    
    setSearchResults(filtered);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Find Your Perfect Tutor</h1>
          <div className="max-w-3xl mx-auto mb-10">
            <NLPSearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="lg:w-64 bg-white rounded-lg shadow p-4">
              <h2 className="font-medium text-lg mb-4">Filters</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-sm mb-2">Subjects</h3>
                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center">
                      <input
                        id={`subject-${subject.id}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        checked={activeFilters.subjects.includes(subject.name)}
                        onChange={() => handleFilterChange('subjects', subject.name)}
                      />
                      <label htmlFor={`subject-${subject.id}`} className="ml-2 text-sm text-gray-700">
                        {subject.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-sm mb-2">Level</h3>
                <div className="space-y-2">
                  {uniqueLevels.map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        id={`level-${level}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        checked={activeFilters.levels.includes(level)}
                        onChange={() => handleFilterChange('levels', level)}
                      />
                      <label htmlFor={`level-${level}`} className="ml-2 text-sm text-gray-700">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Availability</h3>
                <div className="space-y-2">
                  {uniqueDays.map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        id={`day-${day}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        checked={activeFilters.days.includes(day)}
                        onChange={() => handleFilterChange('days', day)}
                      />
                      <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <h2 className="font-medium">
                  {searchResults.length} {searchResults.length === 1 ? 'tutor' : 'tutors'} found
                </h2>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {searchResults.map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tutors found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search filters or try a different search query.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
