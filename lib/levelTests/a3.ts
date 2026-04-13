import type { GradeTest } from './types';

export const A3Test: GradeTest = {
  grade: 'a3',
  gradeLabel: '초등학교 3학년',
  reading: {
    passage1: {
      passage: 
      `Junho loves animals very much. 
      He has a dog named Bori and two goldfish in a glass tank. 
      Every morning before school, he feeds Bori and puts food in the fish tank. 
      On weekends, he takes Bori to the park for a walk. 
      Junho's dream is to become a vet so he can help sick animals.`,
      questions: [
        { id: 1, type: 'reading', question: 'What animals does Junho have?', options: ['A cat and a dog', 'A dog and two goldfish', 'Two dogs and a fish', 'A rabbit and goldfish'], answer: 1 },
        { id: 2, type: 'reading', question: 'What does Junho do every morning before school?', options: ['He plays with Bori at the park', 'He feeds Bori and the fish', 'He cleans his room', 'He reads animal books'], answer: 1 },
        { id: 3, type: 'reading', question: 'Where does Junho take Bori on weekends?', options: ['To the vet', 'To school', 'To the park', 'To the market'], answer: 2 },
        { id: 4, type: 'reading', question: "What is Junho's dream job?", options: ['A doctor', 'A teacher', 'A vet', 'A zookeeper'], answer: 2 },
        { id: 5, type: 'reading', question: "What is the dog's name?", options: ['Momo', 'Coco', 'Bori', 'Nabi'], answer: 2 },
      ],
    },
    passage2: {
      passage: 
      `Last Sunday, Sumi's family visited Gyeongbokgung Palace in Seoul. 
      They rented hanbok near the palace and wore them all day. 
      Sumi and her younger brother took many photos in front of the palace gate. 
      Inside, they watched a royal guard changing ceremony. 
      Sumi thought the ceremony was very exciting. 
      After that, they ate bibimbap at a traditional restaurant nearby.`,
      questions: [
        { id: 6, type: 'reading', question: "Where did Sumi's family go last Sunday?", options: ['Lotte World', 'Gyeongbokgung Palace', 'Namsan Tower', 'Everland'], answer: 1 },
        { id: 7, type: 'reading', question: 'What did they wear?', options: ['School uniforms', 'Hanbok', 'Costumes', 'Sports clothes'], answer: 1 },
        { id: 8, type: 'reading', question: 'What did they watch inside the palace?', options: ['A movie', 'A dance show', 'A royal guard changing ceremony', 'A concert'], answer: 2 },
        { id: 9, type: 'reading', question: 'How did Sumi feel about the ceremony?', options: ['Boring', 'Scary', 'Exciting', 'Sad'], answer: 2 },
        { id: 10, type: 'reading', question: 'What did they eat after visiting the palace?', options: ['Tteokbokki', 'Samgyeopsal', 'Bibimbap', 'Japchae'], answer: 2 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'She ___ TV last night.', options: ['watch', 'watches', 'watched', 'watching'], answer: 2 },
    { id: 12, type: 'grammar', question: '___ you like kimchi?', options: ['Are', 'Is', 'Do', 'Does'], answer: 2 },
    { id: 13, type: 'grammar', question: 'My brother is ___ than me. (키가 더 크다)', options: ['tall', 'taller', 'tallest', 'more tall'], answer: 1 },
    { id: 14, type: 'grammar', question: 'We ___ to Busan last summer.', options: ['go', 'goes', 'went', 'going'], answer: 2 },
    { id: 15, type: 'grammar', question: "I ___ play outside. It's raining. (불가능)", options: ['can', "can't", 'will', 'am'], answer: 1 },
    { id: 16, type: 'grammar', question: 'There ___ a lot of students in the classroom.', options: ['is', 'are', 'am', 'was'], answer: 1 },
    { id: 17, type: 'grammar', question: 'The book is ___ the table. (위에)', options: ['under', 'behind', 'on', 'in'], answer: 2 },
    { id: 18, type: 'grammar', question: '___ does your school start?', options: ['What', 'Where', 'When', 'Who'], answer: 2 },
    { id: 19, type: 'grammar', question: 'I ___ like spicy food. (부정)', options: ['not', "don't", "doesn't", "isn't"], answer: 1 },
    { id: 20, type: 'grammar', question: 'She ___ her homework before dinner every day.', options: ['finish', 'finishes', 'finished', 'finishing'], answer: 1 },
  ],
};