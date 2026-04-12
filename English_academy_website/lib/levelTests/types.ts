export type Question = {
  id: number;
  type: 'reading' | 'grammar';
  question: string;
  options: string[];
  answer: number;
};

export type ReadingSection = {
  passage: string;
  questions: Question[];
};

export type GradeTest = {
  grade: string;
  gradeLabel: string;
  reading: {
    passage1: ReadingSection;
    passage2: ReadingSection;
  };
  grammar: Question[];
};