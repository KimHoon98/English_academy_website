import type { GradeTest } from './types';

export const A1Test: GradeTest = {
  grade: 'a1',
  gradeLabel: '초등학교 1학년',
  reading: {
    passage1: {
      passage: `I have a cat. Her name is Nabi. Nabi is white. She likes fish. I love Nabi.`,
      questions: [
        { id: 1, type: 'reading', question: "What is the cat's name?", options: ['Mimi', 'Nabi', 'Coco', 'Lulu'], answer: 1 },
        { id: 2, type: 'reading', question: 'What color is Nabi?', options: ['Black', 'Brown', 'White', 'Orange'], answer: 2 },
        { id: 3, type: 'reading', question: 'What does Nabi like?', options: ['Milk', 'Fish', 'Chicken', 'Rice'], answer: 1 },
        { id: 4, type: 'reading', question: 'What animal does the writer have?', options: ['Dog', 'Bird', 'Cat', 'Fish'], answer: 2 },
        { id: 5, type: 'reading', question: 'How does the writer feel about Nabi?', options: ['Scared', 'Sad', 'Angry', 'Loves her'], answer: 3 },
      ],
    },
    passage2: {
      passage: `My name is Minho. I am seven years old. I go to school. My school is big. I like my school.`,
      questions: [
        { id: 6, type: 'reading', question: 'How old is Minho?', options: ['Six', 'Seven', 'Eight', 'Nine'], answer: 1 },
        { id: 7, type: 'reading', question: "What is the boy's name?", options: ['Junho', 'Minho', 'Sinho', 'Jiho'], answer: 1 },
        { id: 8, type: 'reading', question: 'How is his school?', options: ['Small', 'Old', 'Big', 'New'], answer: 2 },
        { id: 9, type: 'reading', question: 'Where does Minho go?', options: ['Park', 'Market', 'School', 'Hospital'], answer: 2 },
        { id: 10, type: 'reading', question: 'Does Minho like his school?', options: ["Yes, he does", "No, he doesn't", 'Maybe', "I don't know"], answer: 0 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'I ___ a student.', options: ['am', 'is', 'are', 'be'], answer: 0 },
    { id: 12, type: 'grammar', question: 'She ___ a dog.', options: ['have', 'has', 'had', 'haves'], answer: 1 },
    { id: 13, type: 'grammar', question: 'This is ___ apple.', options: ['a', 'an', 'the', 'some'], answer: 1 },
    { id: 14, type: 'grammar', question: 'They ___ happy.', options: ['am', 'is', 'are', 'be'], answer: 2 },
    { id: 15, type: 'grammar', question: 'I like ___. (고양이를 좋아한다)', options: ['dogs', 'cats', 'birds', 'fish'], answer: 1 },
    { id: 16, type: 'grammar', question: 'He ___ to school every day.', options: ['go', 'goes', 'going', 'went'], answer: 1 },
    { id: 17, type: 'grammar', question: 'What color is this? ___ is red.', options: ['He', 'She', 'It', 'They'], answer: 2 },
    { id: 18, type: 'grammar', question: '___ your name?', options: ['What are', 'What is', 'Who are', 'Who is'], answer: 1 },
    { id: 19, type: 'grammar', question: 'I have ___ pencils. (연필 두 자루)', options: ['one', 'two', 'three', 'four'], answer: 1 },
    { id: 20, type: 'grammar', question: 'The cat ___ sleeping now.', options: ['am', 'is', 'are', 'be'], answer: 1 },
  ],
};