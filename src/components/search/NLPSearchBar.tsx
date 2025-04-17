
import React, { useState } from 'react';
import { SearchQuery } from '@/types';
import { parseNaturalLanguageQuery } from '@/lib/nlp-search';
import Button from '@/components/ui/Button';

interface NLPSearchBarProps {
  onSearch: (query: SearchQuery) => void;
}

const NLPSearchBar: React.FC<NLPSearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchText.trim()) return;
    
    setIsLoading(true);
    
    // Parse the natural language query
    const parsedQuery = parseNaturalLanguageQuery(searchText);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSearch(parsedQuery);
    setIsLoading(false);
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col items-center w-full space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg 
              className="w-5 h-5 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="nlp-search-bar block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="What are you looking for? (e.g., 'Python tutor available on weekends')"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="absolute right-2.5 bottom-2.5"
            isLoading={isLoading}
          >
            Search
          </Button>
        </div>
        <div className="text-sm text-center text-gray-600 w-full">
          <p>Try searches like: "Math tutor for Thursday evenings" or "Beginner Python programming help"</p>
        </div>
      </form>
    </div>
  );
};

export default NLPSearchBar;
