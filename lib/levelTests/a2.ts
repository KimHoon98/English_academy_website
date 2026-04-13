import type { GradeTest } from './types';

export const A2Test: GradeTest = {
  grade: 'a2',
  gradeLabel: '초등학교 2학년',
  reading: {
    passage1: {
      passage: 
      `Tom is a boy. He lives in Seoul. He has a sister. 
      Her name is Jina. They play together every day.`,
      questions: [
        { id: 1, type: 'reading', question: 'Where does Tom live?', options: ['Busan', 'Seoul', 'Daegu', 'Incheon'], answer: 1 },
        { id: 2, type: 'reading', question: "What is Tom's sister's name?", options: ['Mina', 'Sora', 'Jina', 'Yuna'], answer: 2 },
        { id: 3, type: 'reading', question: 'How often do they play together?', options: ['Once a week', 'Every day', 'Sometimes', 'Never'], answer: 1 },
        { id: 4, type: 'reading', question: 'Who is Jina?', options: ["Tom's friend", "Tom's mother", "Tom's sister", "Tom's teacher"], answer: 2 },
        { id: 5, type: 'reading', question: 'Is Tom a girl?', options: ["Yes, he is", "No, he isn't", "Yes, she is", "No, she isn't"], answer: 1 },
      ],
    },
    passage2: {
      passage: 
      `I wake up at 7 o'clock. I eat breakfast with my family. 
      Then I go to school by bus. School starts at 9 o'clock.`,
      questions: [
        { id: 6, type: 'reading', question: 'What time does the writer wake up?', options: ["6 o'clock", "7 o'clock", "8 o'clock", "9 o'clock"], answer: 1 },
        { id: 7, type: 'reading', question: 'How does the writer go to school?', options: ['By car', 'By subway', 'By bus', 'On foot'], answer: 2 },
        { id: 8, type: 'reading', question: 'Who does the writer eat breakfast with?', options: ['Friends', 'Teacher', 'Family', 'Alone'], answer: 2 },
        { id: 9, type: 'reading', question: 'What time does school start?', options: ["7 o'clock", "8 o'clock", "9 o'clock", "10 o'clock"], answer: 2 },
        { id: 10, type: 'reading', question: 'What does the writer do after waking up?', options: ['Goes to school', 'Eats breakfast', 'Watches TV', 'Plays outside'], answer: 1 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'I ___ breakfast every morning.', options: ['eat', 'eats', 'eating', 'ate'], answer: 0 },
    { id: 12, type: 'grammar', question: 'She ___ to school by bus.', options: ['go', 'goes', 'going', 'went'], answer: 1 },
    { id: 13, type: 'grammar', question: 'There ___ two cats on the sofa.', options: ['is', 'are', 'am', 'be'], answer: 1 },
    { id: 14, type: 'grammar', question: '___ he like soccer?', options: ['Do', 'Does', 'Is', 'Are'], answer: 1 },
    { id: 15, type: 'grammar', question: 'I ___ my homework after school.', options: ['does', 'do', 'doing', 'did'], answer: 1 },
    { id: 16, type: 'grammar', question: 'This bag is ___. (나의 가방)', options: ['my', 'me', 'mine', 'I'], answer: 0 },
    { id: 17, type: 'grammar', question: 'We ___ soccer in the park.', options: ['plays', 'play', 'playing', 'played'], answer: 1 },
    { id: 18, type: 'grammar', question: 'The dog ___ very fast.', options: ['run', 'runs', 'running', 'ran'], answer: 1 },
    { id: 19, type: 'grammar', question: '___ is your favorite color?', options: ['Who', 'Where', 'What', 'When'], answer: 2 },
    { id: 20, type: 'grammar', question: 'I have ___ eraser. (에러이저 하나)', options: ['a', 'an', 'the', 'some'], answer: 1 },
  ],
};