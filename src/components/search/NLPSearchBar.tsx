
import React, { useState } from 'react';
import { SearchQuery } from '@/types';
import { parseNaturalLanguageQuery } from '@/lib/nlp-search';
import { Button } from '@/components/ui/buttonShadcn';
import { SearchIcon } from 'lucide-react';

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
            <SearchIcon className="w-5 h-5 text-gray-500" />
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
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
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
