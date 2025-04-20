export interface Book {
  id: string;
  title: string;
  tags: string[];
  summary: string;
}

// Static list of books with their tags and summaries
export const books: Book[] = [
  {
    id: "1",
    title: "The Magic of Ordinary Days",
    tags: ["magical", "heartwarming", "romance", "peaceful"],
    summary: "A gentle story about finding wonder in the simplicity of everyday life, following a woman who discovers magic in the most ordinary of days."
  },
  {
    id: "2",
    title: "Thrilling Heights",
    tags: ["adventurous", "exciting", "suspense", "thriller"],
    summary: "An adrenaline-pumping narrative that follows the journey of mountain climbers facing impossible odds and dangerous conditions."
  },
  {
    id: "3",
    title: "Seeds of Inspiration",
    tags: ["motivational", "inspiring", "self-improvement", "growth"],
    summary: "A collection of stories and practical advice to help readers overcome obstacles and achieve their dreams."
  },
  {
    id: "4",
    title: "Laugh Until Dawn",
    tags: ["humorous", "comedy", "funny", "light-hearted"],
    summary: "A delightful compilation of amusing anecdotes that will have you chuckling from the first page to the last."
  },
  {
    id: "5",
    title: "Shadows in the Mind",
    tags: ["mysterious", "dark", "psychological", "suspense"],
    summary: "A psychological thriller that explores the hidden corners of human consciousness and the secrets we keep from ourselves."
  },
  {
    id: "6",
    title: "Technological Horizons",
    tags: ["futuristic", "technology", "innovation", "science"],
    summary: "An exploration of cutting-edge technologies and their potential impact on our future society and daily lives."
  },
  {
    id: "7",
    title: "Whispers of the Heart",
    tags: ["romantic", "emotional", "love", "relationships"],
    summary: "A touching love story that navigates the complexities of relationships, loss, and the enduring power of true connection."
  },
  {
    id: "8",
    title: "Beyond the Stars",
    tags: ["sci-fi", "space", "adventure", "futuristic"],
    summary: "An epic science fiction adventure set in a distant galaxy, following pioneers exploring the unknown reaches of space."
  }
];
