import type { GradeTest } from './types';

export const A5Test: GradeTest = {
  grade: 'a5',
  gradeLabel: '초등학교 5학년',
  reading: {
    passage1: {
      passage: 
      `The Han River is one of the most important rivers in South Korea. 
      It flows through the heart of Seoul, the capital city, and has played a major role in Korean history and culture for thousands of years. In the past, the river was used for transportation and trade. 
      Goods were carried by boat from one region to another. However, as Korea modernized rapidly during the 20th century, the Han River transformed significantly. 
      Today, the Han River Park stretches along both sides of the river and is one of the most popular recreational areas in Seoul. 
      On weekends, millions of citizens visit the park to ride bicycles, have picnics, play sports, and watch the sunset over the water. The park also hosts various cultural events and festivals throughout the year. 
      During summer, outdoor swimming pools open along the river, and fireworks festivals light up the night sky. 
      The Han River is not just a body of water — it is a symbol of Seoul's growth and the daily lives of its people.`,
      questions: [
        { id: 1, type: 'reading', question: 'What was the Han River used for in the past?', options: ['Swimming and fishing', 'Transportation and trade', 'Drinking water only', 'Military purposes'], answer: 1 },
        { id: 2, type: 'reading', question: 'Where is the Han River located?', options: ['Busan', 'Incheon', 'Seoul', 'Daegu'], answer: 2 },
        { id: 3, type: 'reading', question: 'What do citizens do at Han River Park on weekends?', options: ['Only swim', 'Ride bicycles, have picnics, and watch the sunset', 'Go fishing only', 'Attend school events'], answer: 1 },
        { id: 4, type: 'reading', question: 'What opens along the river during summer?', options: ['Ice skating rinks', 'Outdoor swimming pools', 'Amusement parks', 'Night markets'], answer: 1 },
        { id: 5, type: 'reading', question: 'What does the Han River symbolize according to the passage?', options: ["Korea's military power", "Seoul's growth and people's daily lives", 'Ancient Korean trade routes', 'Modern Korean technology'], answer: 1 },
      ],
    },
    passage2: {
      passage: 
      `Plastic pollution has become one of the most serious environmental problems in the world today. 
      Every year, millions of tons of plastic waste are produced globally, and a large portion of it ends up in the ocean. 
      Scientists estimate that by 2050, there could be more plastic in the ocean than fish. 
      Plastic is harmful to marine life because animals such as sea turtles, dolphins, and seabirds often mistake plastic bags and bottle caps for food. 
      When they eat plastic, it can block their digestive systems and cause them to die. 
      In South Korea, the government has taken steps to reduce plastic use. Since 2019, many coffee shops and restaurants have been banned from using single-use plastic cups inside their stores. 
      Customers are encouraged to bring their own reusable cups and bags. Schools across the country have also started environmental education programs to teach students about the importance of reducing, reusing, and recycling. 
      Young Koreans are increasingly becoming aware of their responsibility to protect the planet for future generations.`,
      questions: [
        { id: 6, type: 'reading', question: 'What do scientists estimate about the ocean by 2050?', options: ['Fish will disappear completely', 'There will be more plastic than fish', 'The ocean will be clean', 'Plastic will dissolve in water'], answer: 1 },
        { id: 7, type: 'reading', question: 'Why is plastic harmful to marine animals?', options: ['It makes the water too cold', 'Animals mistake it for food and it blocks their digestion', 'It reduces sunlight in the water', 'It makes the water smell bad'], answer: 1 },
        { id: 8, type: 'reading', question: 'What did South Korea ban in coffee shops since 2019?', options: ['Paper cups', 'Single-use plastic cups inside stores', 'Plastic straws only', 'All plastic items'], answer: 1 },
        { id: 9, type: 'reading', question: 'What are Korean schools teaching students about?', options: ['How to make plastic products', 'The importance of reducing, reusing, and recycling', 'Marine biology only', 'Government environmental policies'], answer: 1 },
        { id: 10, type: 'reading', question: 'What is the main topic of this passage?', options: ['Ocean fishing in Korea', 'Plastic pollution and efforts to reduce it', 'Korean government policies', 'Marine animals in Korea'], answer: 1 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'Plastic pollution ___ one of the most serious problems today.', options: ['am', 'is', 'are', 'were'], answer: 1 },
    { id: 12, type: 'grammar', question: 'By 2050, there ___ more plastic in the ocean than fish.', options: ['is', 'was', 'could be', 'have been'], answer: 2 },
    { id: 13, type: 'grammar', question: 'Animals often mistake plastic bags ___ food.', options: ['as', 'for', 'with', 'to'], answer: 1 },
    { id: 14, type: 'grammar', question: 'The government has ___ steps to reduce plastic use.', options: ['take', 'takes', 'taken', 'took'], answer: 2 },
    { id: 15, type: 'grammar', question: 'Customers are encouraged ___ their own reusable cups.', options: ['bring', 'brings', 'to bring', 'bringing'], answer: 2 },
    { id: 16, type: 'grammar', question: 'The Han River ___ through the heart of Seoul.', options: ['flow', 'flows', 'flowed', 'flowing'], answer: 1 },
    { id: 17, type: 'grammar', question: 'Millions of citizens ___ the park every weekend.', options: ['visit', 'visits', 'visited', 'visiting'], answer: 0 },
    { id: 18, type: 'grammar', question: 'Schools ___ environmental programs since last year.', options: ['start', 'started', 'have started', 'starting'], answer: 2 },
    { id: 19, type: 'grammar', question: 'If we ___ more careful, the environment will improve.', options: ['are', 'were', 'be', 'is'], answer: 0 },
    { id: 20, type: 'grammar', question: 'Young Koreans are ___ aware of their responsibility.', options: ['increase', 'increased', 'increasingly', 'increasing'], answer: 2 },
  ],
};