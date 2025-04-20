import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { books } from '@/data/books';

// Initialize OpenAI client
// In production, you should use environment variables for the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Get search query from request
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid query parameter' },
        { status: 400 }
      );
    }

    // Format books into a simple string for the AI prompt
    const booksData = books.map(book => {
      return `Book ID: ${book.id}
Title: ${book.title}
Tags: ${book.tags.join(', ')}
Summary: ${book.summary}`;
    }).join('\n\n');

    // Call OpenAI API
    console.log('Sending query to OpenAI:', query);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: 
          `You are a book recommendation assistant.
You will be given a user query about their mood or interests and a list of books with their details.
Your task is to identify which books from the list would best match the user's query, based on semantic understanding of both the query intent and the book content.

First, explain your thought process about how you're analyzing the query and which books might match and why.
Then, return your final recommendation in this JSON format: 
{"thoughts": "Your detailed explanation here of how you analyzed the query and selected the books...", "bookIds": ["1", "3", "5"]}

Make sure to include both the thoughts field with your reasoning and the bookIds field with your final recommendations.`
        },
        {
          role: "user",
          content: `User query: "${query}"\n\nAvailable books:\n${booksData}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    // Parse the response
    const responseContent = completion.choices[0].message.content;
    let bookIds;
    let aiThoughts;
    
    try {
      const parsedResponse = JSON.parse(responseContent || '{"bookIds":[], "thoughts":"No explanation provided"}');
      bookIds = parsedResponse.bookIds || [];
      aiThoughts = parsedResponse.thoughts || "No explanation provided";
      
      console.log('\n=== AI Reasoning ===\n', aiThoughts, '\n==================\n');
      console.log('Selected Book IDs:', bookIds);
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    // Find the recommended books from our book list
    const recommendedBooks = books.filter(book => bookIds.includes(book.id));

    return NextResponse.json({ 
      books: recommendedBooks,
      aiPowered: true,
      aiThoughts: aiThoughts
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
