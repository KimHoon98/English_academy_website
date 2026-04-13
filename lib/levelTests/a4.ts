import type { GradeTest } from './types';

export const A4Test: GradeTest = {
  grade: 'a4',
  gradeLabel: '초등학교 4학년',
  reading: {
    passage1: {
      passage: 
      `Korea is a country with four distinct seasons, and each season has its own special characteristics. 
      Spring begins in March and brings warm weather and beautiful cherry blossoms. 
      Many families visit parks to enjoy the flowers. Summer comes in June and is very hot and humid. 
      Korean students have summer vacation in July and August, and many families go to the beach or the mountains to cool down. 
      Fall arrives in September with cool, comfortable weather. The mountains turn red, orange, and yellow, and many people go hiking to enjoy the colorful leaves. Winter starts in December and can be very cold. 
      It often snows in the northern parts of Korea. Many children love winter because they can play in the snow and enjoy activities like sledding. Each season brings different foods, festivals, and outdoor activities for Koreans to enjoy.`,
      questions: [
        { id: 1, type: 'reading', question: 'When does spring begin in Korea?', options: ['February', 'March', 'April', 'May'], answer: 1 },
        { id: 2, type: 'reading', question: 'What do many families do in spring?', options: ['Go skiing', 'Visit parks to see cherry blossoms', 'Go to the beach', 'Go hiking'], answer: 1 },
        { id: 3, type: 'reading', question: 'When do Korean students have summer vacation?', options: ['June and July', 'July and August', 'August and September', 'June and August'], answer: 1 },
        { id: 4, type: 'reading', question: 'What happens to the mountains in fall?', options: ['They get covered in snow', 'They turn red, orange, and yellow', 'Cherry blossoms bloom', 'They become green'], answer: 1 },
        { id: 5, type: 'reading', question: 'What do many children love about winter?', options: ['Going to the beach', 'Seeing cherry blossoms', 'Playing in the snow and sledding', 'Hiking in the mountains'], answer: 2 },
      ],
    },
    passage2: {
      passage: 
      `Jiho is a fourth-grade student at Hanbit Elementary School in Daejeon. 
      His favorite subject is science because he loves doing experiments. 
      Last week, his science teacher, Mr. Park, taught the class about chemical reactions. 
      Jiho and his partner Sora did an experiment using vinegar and baking soda. 
      When they mixed the two substances together in a bottle, the mixture started to bubble and fizz rapidly. 
      The bubbles overflowed from the bottle, and everyone in the class was surprised. 
      Mr. Park explained that when vinegar and baking soda react, they produce carbon dioxide gas, which creates the bubbles. 
      After the experiment, Jiho wrote a report about what he observed. 
      His teacher was very impressed and gave him a gold star sticker. That evening, Jiho told his parents all about the experiment. 
      He said he wants to become a scientist and discover new things for the world.`,
      questions: [
        { id: 6, type: 'reading', question: 'Where does Jiho go to school?', options: ['Seoul', 'Busan', 'Daejeon', 'Incheon'], answer: 2 },
        { id: 7, type: 'reading', question: 'What did the class learn about last week?', options: ['Physics', 'Chemical reactions', 'Biology', 'Astronomy'], answer: 1 },
        { id: 8, type: 'reading', question: 'What gas is produced when vinegar and baking soda react?', options: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Carbon dioxide'], answer: 3 },
        { id: 9, type: 'reading', question: "What did Mr. Park give Jiho as a reward?", options: ['A prize', 'A gold star sticker', 'Extra homework', 'A book'], answer: 1 },
        { id: 10, type: 'reading', question: 'What does Jiho want to be in the future?', options: ['A teacher', 'A doctor', 'A scientist', 'An engineer'], answer: 2 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'Korea has four ___ seasons.', options: ['distinct', 'distinction', 'distinctive', 'distinctly'], answer: 0 },
    { id: 12, type: 'grammar', question: 'She ___ her report after the experiment.', options: ['write', 'writes', 'wrote', 'written'], answer: 2 },
    { id: 13, type: 'grammar', question: 'The mountains ___ red and yellow in fall.', options: ['turn', 'turns', 'turned', 'turning'], answer: 0 },
    { id: 14, type: 'grammar', question: 'Many families ___ to the beach last summer.', options: ['go', 'goes', 'gone', 'went'], answer: 3 },
    { id: 15, type: 'grammar', question: 'This is the ___ experiment I have ever done. (최고의)', options: ['good', 'better', 'best', 'well'], answer: 2 },
    { id: 16, type: 'grammar', question: '___ mixing the substances, the bubbles overflowed.', options: ['After', 'Before', 'During', 'While'], answer: 2 },
    { id: 17, type: 'grammar', question: 'Jiho and Sora ___ the experiment together.', options: ['do', 'does', 'did', 'doing'], answer: 2 },
    { id: 18, type: 'grammar', question: 'He wants to become a scientist ___ discover new things.', options: ['but', 'and', 'or', 'so'], answer: 1 },
    { id: 19, type: 'grammar', question: 'The teacher was ___ impressed by his report.', options: ['very', 'much', 'too', 'so'], answer: 0 },
    { id: 20, type: 'grammar', question: 'Carbon dioxide gas ___ when the two substances react.', options: ['produce', 'produces', 'is produced', 'producing'], answer: 2 },
  ],
};