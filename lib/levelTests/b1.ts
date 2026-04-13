import type { GradeTest } from './types';

export const B1Test: GradeTest = {
  grade: 'b1',
  gradeLabel: '중학교 1학년',
  reading: {
    passage1: {
      passage:
      `Artificial intelligence, commonly known as AI, is rapidly changing the way we live and work. 
      AI refers to computer systems that can perform tasks that normally require human intelligence, 
      such as recognizing speech, making decisions, and translating languages. 
      In South Korea, AI technology is being applied in many fields. 
      Hospitals are using AI to analyze medical images and detect diseases like cancer at an early stage, 
      which significantly improves the chances of successful treatment. 
      In education, AI-powered programs can personalize learning by identifying each student's strengths and weaknesses 
      and providing customized study plans. 
      Major Korean companies such as Kakao and Naver have developed their own AI systems 
      that power services like voice assistants, recommendation algorithms, and translation tools. 
      However, AI also raises important concerns. 
      Some people worry that AI will replace human workers in many industries, leading to unemployment. 
      Others are concerned about privacy, as AI systems often collect and analyze large amounts of personal data. 
      Despite these challenges, most experts agree that AI will continue to advance rapidly 
      and that society must find ways to use it responsibly for the benefit of all people.`,
      questions: [
        { id: 1, type: 'reading', question: 'How are Korean hospitals using AI?', options: ['To replace doctors entirely', 'To analyze medical images and detect diseases early', 'To manage hospital finances', 'To communicate with patients'], answer: 1 },
        { id: 2, type: 'reading', question: 'How does AI personalize education according to the passage?', options: ['By replacing teachers', 'By identifying strengths and weaknesses and providing customized plans', 'By grading all student tests', 'By creating new textbooks'], answer: 1 },
        { id: 3, type: 'reading', question: 'Which Korean companies have developed their own AI systems?', options: ['Samsung and LG', 'Hyundai and Kia', 'Kakao and Naver', 'Lotte and SK'], answer: 2 },
        { id: 4, type: 'reading', question: 'What is one concern people have about AI?', options: ['AI uses too much electricity', 'AI will replace human workers and cause unemployment', 'AI is too expensive to develop', 'AI cannot understand Korean'], answer: 1 },
        { id: 5, type: 'reading', question: 'What do most experts agree about AI?', options: ['AI will stop advancing soon', 'AI is too dangerous to use', 'AI will continue to advance and must be used responsibly', 'AI should be banned in schools'], answer: 2 },
      ],
    },
    passage2: {
      passage:
      `The issue of mental health among Korean teenagers has become a growing concern in recent years. 
      South Korea has one of the most competitive education systems in the world, 
      and students often face enormous pressure to achieve high scores on exams, 
      particularly the College Scholastic Ability Test, known as the CSAT or Suneung. 
      Many students study for more than 12 hours a day, attending regular school during the day 
      and private tutoring academies, called hagwons, in the evening. 
      This intense academic pressure has been linked to high levels of stress, anxiety, and depression among young people. 
      According to a recent government survey, more than 30% of Korean middle and high school students 
      reported feeling extreme stress related to their studies. 
      In response, the Korean government has introduced policies to limit hagwon operating hours 
      and promote a more balanced lifestyle for students. 
      Schools are also beginning to offer mental health counseling services and mindfulness programs. 
      Experts emphasize that academic success is important, but students also need time to rest, 
      pursue hobbies, spend time with family and friends, and develop their emotional well-being. 
      A healthy mind is just as important as good grades.`,
      questions: [
        { id: 6, type: 'reading', question: 'What is the CSAT (Suneung)?', options: ['A university entrance exam', 'A middle school placement test', 'A national sports competition', 'A government scholarship program'], answer: 0 },
        { id: 7, type: 'reading', question: 'What are hagwons?', options: ['Public libraries', 'Private tutoring academies', 'Government study centers', 'School clubs'], answer: 1 },
        { id: 8, type: 'reading', question: 'According to the survey, what percentage of students reported extreme stress?', options: ['More than 10%', 'More than 20%', 'More than 30%', 'More than 40%'], answer: 2 },
        { id: 9, type: 'reading', question: 'What has the government done to help students?', options: ['Cancelled all exams', 'Limited hagwon hours and promoted balanced lifestyles', 'Reduced school hours to 4 hours a day', 'Made all education free'], answer: 1 },
        { id: 10, type: 'reading', question: 'What is the main message of the passage?', options: ['Korean students should study harder', 'Mental health is just as important as academic success', 'Hagwons should be completely banned', 'Only grades determine a student\'s future'], answer: 1 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'AI ___ tasks that normally require human intelligence.', options: ['perform', 'performs', 'can perform', 'performing'], answer: 2 },
    { id: 12, type: 'grammar', question: 'Many students ___ for more than 12 hours a day.', options: ['study', 'studies', 'studied', 'are studying'], answer: 3 },
    { id: 13, type: 'grammar', question: 'The government has introduced policies ___ hagwon operating hours.', options: ['limit', 'limiting', 'to limit', 'limited'], answer: 2 },
    { id: 14, type: 'grammar', question: 'If students ___ enough rest, their mental health would improve.', options: ['get', 'got', 'gets', 'getting'], answer: 1 },
    { id: 15, type: 'grammar', question: 'AI systems often collect data, ___ raises privacy concerns.', options: ['that', 'who', 'which', 'what'], answer: 2 },
    { id: 16, type: 'grammar', question: 'Students need time to rest ___ pursue their hobbies.', options: ['but', 'or', 'and', 'so'], answer: 2 },
    { id: 17, type: 'grammar', question: 'Mental health counseling services ___ in schools recently.', options: ['introduce', 'introduced', 'have been introduced', 'are introducing'], answer: 2 },
    { id: 18, type: 'grammar', question: 'The pressure students face ___ linked to stress and anxiety.', options: ['is', 'are', 'was', 'been'], answer: 0 },
    { id: 19, type: 'grammar', question: 'Experts emphasize that a healthy mind is just as important ___ good grades.', options: ['than', 'as', 'like', 'with'], answer: 1 },
    { id: 20, type: 'grammar', question: 'AI technology ___ in many fields since it was developed.', options: ['applies', 'applied', 'has been applied', 'is apply'], answer: 2 },
  ],
};