export interface fetchCategory{
    _id: string,
    id: number,
    category: string
}

export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    id: number; // Optional, as it's added later
}

export interface DifficultyLevel {
    easy: Question[];
    medium: Question[];
    hard: Question[];
}

export interface Category {
    category: string;
    questions: DifficultyLevel;
}

export interface Data {
    [key: string]: Category;
    
}
