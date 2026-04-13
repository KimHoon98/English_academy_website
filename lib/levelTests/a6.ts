import type { GradeTest } from './types';

export const A6Test: GradeTest = {
  grade: 'a6',
  gradeLabel: '초등학교 6학년',
  reading: {
    passage1: {
      passage: 
      `Sejong the Great was one of the most celebrated kings in Korean history. 
      He ruled the Joseon Dynasty from 1418 to 1450 and made enormous contributions to Korean culture, science, and language. 
      His most famous achievement was the creation of Hangul, the Korean alphabet, in 1443. 
      Before Hangul was invented, most Koreans could not read or write because the only writing system available was Chinese characters, which were extremely difficult to learn. 
      Sejong believed that every person, regardless of social class, deserved the ability to read and write. 
      He gathered a group of brilliant scholars called the Hall of Worthies to help develop the new alphabet. 
      Hangul was designed to be simple and logical, with characters that represent the sounds of the Korean language. 
      Today, Hangul is recognized worldwide as one of the most scientifically designed writing systems ever created. 
      In addition to Hangul, King Sejong also supported the development of scientific inventions such as the rain gauge, the water clock, and sundials. 
      His legacy continues to inspire Koreans, and his portrait appears on the 10,000 won banknote.`,
      questions: [
        { id: 1, type: 'reading', question: 'What is King Sejong most famous for?', options: ['Building palaces', 'Creating Hangul', 'Winning wars', 'Trading with China'], answer: 1 },
        { id: 2, type: 'reading', question: 'Why could most Koreans not read before Hangul?', options: ['They had no schools', 'Chinese characters were too difficult to learn', 'Books were too expensive', 'The king banned reading'], answer: 1 },
        { id: 3, type: 'reading', question: 'What was the Hall of Worthies?', options: ['A royal palace', 'A group of brilliant scholars', 'A library', 'A government office'], answer: 1 },
        { id: 4, type: 'reading', question: 'Which scientific invention is NOT mentioned in the passage?', options: ['Rain gauge', 'Water clock', 'Telescope', 'Sundials'], answer: 2 },
        { id: 5, type: 'reading', question: 'Where can you find King Sejong\'s portrait today?', options: ['The 1,000 won note', 'The 5,000 won note', 'The 10,000 won note', 'The 50,000 won note'], answer: 2 },
      ],
    },
    passage2: {
      passage: 
      `South Korea is widely known for its remarkable economic transformation, often referred to as the "Miracle on the Han River." 
      After the Korean War ended in 1953, South Korea was one of the poorest countries in the world. 
      The country had very few natural resources and its infrastructure had been almost completely destroyed by the war. 
      However, within just a few decades, South Korea transformed itself into one of the world's leading economies. 
      This rapid growth was driven by strong government investment in education and industry, as well as the hard work of the Korean people. 
      Companies like Samsung, Hyundai, and LG grew from small businesses into global corporations that are recognized around the world. 
      Today, South Korea is the world's 12th largest economy and is a major exporter of electronics, automobiles, and cultural products. 
      Korean pop music, known as K-pop, and Korean dramas have spread Korean culture to every corner of the globe in what is called the "Korean Wave" or Hallyu. 
      Young people from countries across Asia, Europe, and the Americas are learning the Korean language and visiting Korea as tourists. 
      South Korea's story is one of the most inspiring examples of national development in modern history.`,
      questions: [
        { id: 6, type: 'reading', question: 'What does "Miracle on the Han River" refer to?', options: ["Korea's military victories", "Korea's rapid economic growth", "Korea's cultural exports", "Korea's scientific discoveries"], answer: 1 },
        { id: 7, type: 'reading', question: 'What was South Korea like after the Korean War?', options: ['One of the richest countries', 'One of the poorest countries', 'A powerful military nation', 'A major trading country'], answer: 1 },
        { id: 8, type: 'reading', question: 'Which of the following is NOT mentioned as a Korean global company?', options: ['Samsung', 'Hyundai', 'Sony', 'LG'], answer: 2 },
        { id: 9, type: 'reading', question: 'What is "Hallyu"?', options: ['A Korean food festival', 'The Korean Wave of culture spreading globally', 'A Korean economic policy', 'A type of Korean music instrument'], answer: 1 },
        { id: 10, type: 'reading', question: 'What is South Korea\'s rank in the world economy?', options: ['5th largest', '8th largest', '10th largest', '12th largest'], answer: 3 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'Hangul ___ in 1443 by King Sejong.', options: ['created', 'was created', 'has created', 'is creating'], answer: 1 },
    { id: 12, type: 'grammar', question: 'South Korea ___ from a poor country into a leading economy.', options: ['transform', 'transforms', 'transformed', 'transforming'], answer: 2 },
    { id: 13, type: 'grammar', question: 'K-pop ___ all over the world in recent years.', options: ['spread', 'spreads', 'has spread', 'is spreading'], answer: 2 },
    { id: 14, type: 'grammar', question: 'King Sejong believed that every person ___ the ability to read.', options: ['deserve', 'deserves', 'deserved', 'deserving'], answer: 2 },
    { id: 15, type: 'grammar', question: 'The country ___ very few natural resources after the war.', options: ['has', 'had', 'have', 'having'], answer: 1 },
    { id: 16, type: 'grammar', question: 'Korean dramas ___ popular among young people around the world.', options: ['become', 'becomes', 'have become', 'becoming'], answer: 2 },
    { id: 17, type: 'grammar', question: 'If Korea ___ not invested in education, the economy would not have grown.', options: ['has', 'had', 'have', 'did'], answer: 1 },
    { id: 18, type: 'grammar', question: 'Hangul is recognized ___ one of the most scientific writing systems.', options: ['as', 'for', 'by', 'with'], answer: 0 },
    { id: 19, type: 'grammar', question: 'Young people ___ the Korean language since K-pop became popular.', options: ['learn', 'learned', 'have been learning', 'are learn'], answer: 2 },
    { id: 20, type: 'grammar', question: 'South Korea\'s story is one of the most ___ examples of national development.', options: ['inspire', 'inspired', 'inspiring', 'inspiration'], answer: 2 },
  ],
};