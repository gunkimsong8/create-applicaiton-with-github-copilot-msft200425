"use client";

import { Book } from "../data/books";

interface BookResultsProps {
  books: Book[];
  searchQuery: string;
  isAiPowered?: boolean;
  isLoading?: boolean;
}

export default function BookResults({ 
  books, 
  searchQuery, 
  isAiPowered = false, 
  isLoading = false 
}: BookResultsProps) {
  // Show loading state if search is in progress
  if (isLoading) {
    return (
      <div className="mt-8 text-center p-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Searching for books with AI...</p>
      </div>
    );
  }

  // Show empty state if no books match
  if (books.length === 0 && searchQuery.trim() !== "") {
    return (
      <div className="mt-8 text-center p-6 border rounded-lg bg-gray-50">
        <p className="text-lg text-gray-600">No books match your mood. Try different words!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {books.length > 0 ? (
          <>
            Books matching your mood "{searchQuery}":
            {isAiPowered && (
              <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-3 h-3 mr-1"
                >
                  <path d="M16.5 7.5h-9v9h9v-9z" />
                  <path d="M8.25 2.25h-4.5v4.5h4.5v-4.5z" />
                  <path d="M8.25 17.25h-4.5v4.5h4.5v-4.5z" />
                  <path d="M20.25 2.25h-4.5v4.5h4.5v-4.5z" />
                  <path d="M20.25 17.25h-4.5v4.5h4.5v-4.5z" />
                </svg>
                AI-Powered
              </span>
            )}
          </>
        ) : (
          ""
        )}
      </h2>
      
      <div className="space-y-6">
        {books.map((book) => (
          <div key={book.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {book.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
