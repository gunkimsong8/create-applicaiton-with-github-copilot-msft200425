// A mapping of terms to related concepts, synonyms, and intents
// This simulates AI-based understanding of user intent
export const conceptMapping: Record<string, string[]> = {
  // Magic related concepts
  "magic": ["magical", "wizard", "witch", "sorcery", "spell", "enchantment", "supernatural", "mystical"],
  "wizard": ["magic", "magical", "sorcerer", "witch", "mage", "warlock", "spell-caster"],
  "witch": ["magic", "magical", "wizard", "sorcerer", "spell", "enchantress", "mage"],
  "mage": ["magic", "magical", "wizard", "sorcerer", "witch", "warlock", "spell-caster"],
  
  // Emotions and feelings
  "happy": ["joy", "cheerful", "uplifting", "positive", "light-hearted", "humorous", "comedy", "funny"],
  "sad": ["melancholy", "depressing", "emotional", "tearful", "moving", "heartbreaking"],
  "angry": ["rage", "fury", "intense", "passionate", "dark", "vengeful", "thriller"],
  
  // Adventure related
  "adventure": ["exciting", "journey", "quest", "action", "exploration", "discovery", "travel"],
  "journey": ["adventure", "quest", "travel", "exploration", "discovery", "path"],
  "quest": ["adventure", "journey", "mission", "challenge", "heroic"],
  
  // Intellectual concepts
  "science": ["scientific", "research", "technology", "innovation", "discovery", "futuristic"],
  "technology": ["innovation", "futuristic", "science", "scientific", "digital", "modern"],
  "future": ["futuristic", "technology", "innovation", "science fiction", "sci-fi", "space"],
  
  // Mystery and suspense
  "mystery": ["mysterious", "puzzle", "detective", "suspense", "thriller", "enigma", "secrets"],
  "suspense": ["thriller", "mysterious", "tension", "psychological", "dark", "suspenseful"],
  "detective": ["mystery", "investigation", "crime", "puzzle", "suspense"],
  
  // Romance and relationships
  "love": ["romance", "romantic", "relationship", "emotional", "heartwarming", "passion"],
  "romance": ["love", "romantic", "relationship", "passion", "emotional", "heartwarming"],
  "relationship": ["romance", "love", "emotional", "family", "connection", "heartwarming"],
  
  // Personal growth
  "inspiration": ["inspiring", "motivational", "self-improvement", "growth", "hopeful", "uplifting"],
  "motivation": ["motivational", "inspiring", "self-improvement", "growth", "ambition", "success"],
  "growth": ["development", "self-improvement", "inspiring", "motivational", "journey", "evolution"],
  
  // Humor
  "funny": ["comedy", "humorous", "light-hearted", "amusing", "laugh", "wit", "entertaining"],
  "comedy": ["funny", "humorous", "light-hearted", "amusing", "laugh", "wit"],
  "laugh": ["funny", "comedy", "humorous", "light-hearted", "amusing", "entertainment"]
};
