"use client";

import { useState, FormEvent } from "react";

interface BookSearchProps {
  onSearch: (query: string) => void;
  searchMode: "concept" | "ai";
  onSearchModeChange: (mode: "concept" | "ai") => void;
  isLoading: boolean;
}

export default function BookSearch({ 
  onSearch, 
  searchMode, 
  onSearchModeChange,
  isLoading 
}: BookSearchProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="w-full mb-10">
      <div className="mb-4 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              searchMode === 'concept'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => onSearchModeChange('concept')}
          >
            Concept-Based Search
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              searchMode === 'ai'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => onSearchModeChange('ai')}
          >
            AI-Powered Search
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your mood or feelings (e.g., magical, motivated)"
          className="flex-grow px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Enter your mood"
        />
        <button
          type="submit"
          className={`px-6 py-3 ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition-colors`}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {searchMode === 'ai' && (
        <div className="mt-3 text-sm text-gray-600">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            <span>AI-powered search understands complex intent and language nuances</span>
          </div>
        </div>
      )}
    </div>
  );
}
