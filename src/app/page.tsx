"use client";

import { useState } from "react";
import BookSearch from "@/components/BookSearch";
import BookResults from "@/components/BookResults";
import { Book, books } from "@/data/books";
import { conceptMapping } from "@/data/concepts";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [matchedBooks, setMatchedBooks] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchMode, setSearchMode] = useState<"concept" | "ai">("concept");
  const [error, setError] = useState<string | null>(null);
  const [aiThoughts, setAiThoughts] = useState<string | null>(null);

  // Function to search using our concept mapping (client-side approach)
  const handleConceptSearch = (query: string) => {
    if (!query.trim()) {
      setMatchedBooks([]);
      return;
    }

    // Convert query to lowercase and split into individual words
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    
    // Expand search terms to include related concepts and synonyms
    const expandedQueryTerms = new Set<string>();
    
    // Add original terms first
    queryTerms.forEach(term => expandedQueryTerms.add(term));
    
    // Add related concepts for each query term
    queryTerms.forEach(term => {
      // Check if this term has mapped concepts
      Object.entries(conceptMapping).forEach(([concept, relatedTerms]) => {
        // If concept contains or is contained in the query term
        if (concept.includes(term) || term.includes(concept)) {
          // Add the concept and all its related terms
          expandedQueryTerms.add(concept);
          relatedTerms.forEach(relatedTerm => expandedQueryTerms.add(relatedTerm));
        }
      });
    });
    
    console.log('Original search terms:', queryTerms);
    console.log('Expanded search terms:', [...expandedQueryTerms]);
    
    // Find books that match any of the expanded query terms
    const results = books.filter(book => {
      return [...expandedQueryTerms].some(term => 
        book.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
    });
    
    setMatchedBooks(results);
  };

  // Function to search using OpenAI (server-side AI approach)
  const handleAiSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI recommendations');
      }

      const data = await response.json();
      setMatchedBooks(data.books);
      
      // Log AI thoughts to console for debugging
      if (data.aiThoughts) {
        console.log('AI Thought Process:', data.aiThoughts);
        setAiThoughts(data.aiThoughts);
      }
      
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during AI search');
      setMatchedBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Main search handler that delegates to the appropriate search method
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    setAiThoughts(null); // Reset AI thoughts when starting a new search
    
    if (!query.trim()) {
      setMatchedBooks([]);
      return;
    }

    if (searchMode === 'ai') {
      await handleAiSearch(query);
    } else {
      handleConceptSearch(query);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <main className="max-w-3xl w-full mx-auto mt-10 mb-20">
        <h1 className="text-3xl font-bold text-center mb-8">AI Book Recommender</h1>
        <p className="text-center mb-8 text-gray-600">
          Tell us how you're feeling or what mood you're in, and we'll recommend some books for you.
        </p>
        
        <BookSearch 
          onSearch={handleSearch} 
          searchMode={searchMode}
          onSearchModeChange={setSearchMode}
          isLoading={isLoading}
        />
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            <p><strong>Error:</strong> {error}</p>
            <p className="mt-2 text-sm">
              Note: To use AI search, you need to set up an OpenAI API key in the .env.local file.
            </p>
          </div>
        )}
        
        {hasSearched && (
          <BookResults 
            books={matchedBooks} 
            searchQuery={searchQuery} 
            isAiPowered={searchMode === 'ai'} 
            isLoading={isLoading}
          />
        )}
        
        {/* Display AI Thoughts */}
        {aiThoughts && searchMode === 'ai' && !isLoading && (
          <div className="mt-8 p-4 bg-gray-50 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              AI Thought Process
            </h3>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
              {aiThoughts}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
