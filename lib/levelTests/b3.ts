import type { GradeTest } from './types';

export const B3Test: GradeTest = {
  grade: 'b3',
  gradeLabel: '중학교 3학년',
  reading: {
    passage1: {
      passage:
      `The rapid advancement of biotechnology is fundamentally reshaping our understanding of human health and medicine. 
      Among the most groundbreaking developments is CRISPR-Cas9, a gene-editing technology 
      that allows scientists to precisely modify DNA sequences within living organisms. 
      Originally discovered as part of the immune defense system of bacteria, 
      CRISPR has been adapted by researchers into a powerful tool for treating genetic diseases. 
      In theory, CRISPR could be used to eliminate inherited disorders such as sickle cell anemia, 
      cystic fibrosis, and certain forms of hereditary blindness by correcting faulty genes 
      at the molecular level before symptoms even develop. 
      South Korean research institutions, including Seoul National University and KAIST, 
      have been actively involved in CRISPR research and have published significant findings 
      in international scientific journals. 
      However, the technology is not without controversy. 
      In 2018, a Chinese scientist named He Jiankui shocked the world by claiming to have created 
      the first gene-edited human babies, bypassing established ethical guidelines. 
      This event ignited fierce global debate about the boundaries of genetic engineering. 
      Critics warn that unregulated gene editing could lead to the creation of so-called "designer babies," 
      where parents select traits such as intelligence, physical appearance, or athletic ability for their children. 
      Such possibilities raise profound ethical questions about equality, diversity, and what it means to be human. 
      The scientific community largely agrees that while the potential benefits of CRISPR are immense, 
      its application must be governed by strict international regulations and transparent ethical oversight 
      to prevent misuse and ensure that its benefits are shared equitably across all societies.`,
      questions: [
        { id: 1, type: 'reading', question: 'What was CRISPR originally discovered as?', options: ['A cancer treatment', 'Part of bacteria\'s immune defense system', 'A genetic sequencing tool', 'A protein synthesis method'], answer: 1 },
        { id: 2, type: 'reading', question: 'Which Korean institutions are mentioned as being involved in CRISPR research?', options: ['Yonsei University and Korea University', 'Seoul National University and KAIST', 'Sungkyunkwan University and POSTECH', 'Hanyang University and Ewha'], answer: 1 },
        { id: 3, type: 'reading', question: 'What did He Jiankui claim to have done in 2018?', options: ['Cured cancer using CRISPR', 'Created the first gene-edited human babies', 'Discovered a new genetic disease', 'Developed a CRISPR vaccine'], answer: 1 },
        { id: 4, type: 'reading', question: 'What are "designer babies" as referred to in the passage?', options: ['Babies born through IVF', 'Babies whose traits are selected through genetic engineering', 'Babies with naturally superior genes', 'Babies treated for genetic diseases after birth'], answer: 1 },
        { id: 5, type: 'reading', question: 'What does the scientific community agree is necessary for CRISPR\'s application?', options: ['Complete freedom for researchers', 'Strict international regulations and ethical oversight', 'Funding from private companies only', 'Immediate widespread clinical use'], answer: 1 },
      ],
    },
    passage2: {
      passage:
      `Throughout human history, the nature of work has undergone several dramatic transformations, 
      each driven by technological innovation. 
      The First Industrial Revolution in the 18th century replaced manual agricultural labor with factory work, 
      powered by steam engines. 
      The Second Industrial Revolution brought electricity, mass production, and the assembly line. 
      The Third Revolution introduced computers and automation, 
      fundamentally changing how information is processed and communicated. 
      Now, humanity stands at the threshold of a Fourth Industrial Revolution, 
      characterized by the convergence of digital, physical, and biological technologies. 
      Artificial intelligence, robotics, the Internet of Things, and quantum computing 
      are poised to reshape every sector of the global economy. 
      The World Economic Forum estimates that by 2025, machines will perform more tasks than humans in the workplace, 
      potentially displacing 85 million jobs while simultaneously creating 97 million new roles 
      that require distinctly human skills such as creativity, critical thinking, and emotional intelligence. 
      South Korea faces particular challenges in this transition. 
      Its economy is heavily dependent on manufacturing, a sector highly vulnerable to automation. 
      The Korean government has responded by investing billions of won in reskilling programs, 
      encouraging workers to develop competencies in areas such as data analysis, AI development, and green technology. 
      Universities are reforming their curricula to emphasize interdisciplinary thinking and adaptability. 
      Sociologists argue that the greatest challenge is not technological but human — 
      ensuring that the benefits of the Fourth Industrial Revolution are distributed fairly 
      and that no segment of society is left behind in the transition to an automated future.`,
      questions: [
        { id: 6, type: 'reading', question: 'What powered the First Industrial Revolution?', options: ['Electricity', 'Steam engines', 'Nuclear power', 'Wind energy'], answer: 1 },
        { id: 7, type: 'reading', question: 'According to the World Economic Forum, how many jobs might be created by 2025?', options: ['85 million', '90 million', '97 million', '100 million'], answer: 2 },
        { id: 8, type: 'reading', question: 'Why does South Korea face particular challenges in the Fourth Industrial Revolution?', options: ['Its economy relies heavily on agriculture', 'Its economy is heavily dependent on manufacturing', 'Its workforce lacks basic education', 'Its government opposes technological change'], answer: 1 },
        { id: 9, type: 'reading', question: 'What human skills does the passage say will remain important?', options: ['Physical strength and speed', 'Memorization and repetition', 'Creativity, critical thinking, and emotional intelligence', 'Language skills only'], answer: 2 },
        { id: 10, type: 'reading', question: 'According to sociologists, what is the greatest challenge of the Fourth Industrial Revolution?', options: ['Developing faster computers', 'Ensuring fair distribution of benefits and leaving no one behind', 'Building more robots', 'Reducing government spending on technology'], answer: 1 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'CRISPR ___ as part of the immune system of bacteria before being adapted for medicine.', options: ['discovers', 'discovered', 'was discovered', 'has discovered'], answer: 2 },
    { id: 12, type: 'grammar', question: 'The technology is not without controversy, ___ it has enormous potential benefits.', options: ['because', 'although', 'therefore', 'unless'], answer: 1 },
    { id: 13, type: 'grammar', question: 'By 2025, machines ___ more tasks than humans in the workplace.', options: ['perform', 'performed', 'will be performing', 'have performed'], answer: 2 },
    { id: 14, type: 'grammar', question: 'Critics warn that unregulated gene editing ___ lead to serious ethical problems.', options: ['can', 'could', 'should', 'must'], answer: 1 },
    { id: 15, type: 'grammar', question: 'The Korean government has invested billions of won ___ reskilling programs.', options: ['for', 'in', 'on', 'at'], answer: 1 },
    { id: 16, type: 'grammar', question: 'Universities are reforming their curricula ___ emphasize interdisciplinary thinking.', options: ['for', 'so', 'to', 'that'], answer: 2 },
    { id: 17, type: 'grammar', question: 'The benefits of the revolution must be ___ fairly across all societies.', options: ['distribute', 'distributes', 'distributed', 'distributing'], answer: 2 },
    { id: 18, type: 'grammar', question: 'Had strict regulations ___ in place, the gene-editing controversy might have been avoided.', options: ['be', 'been', 'being', 'is'], answer: 1 },
    { id: 19, type: 'grammar', question: 'The Fourth Industrial Revolution is characterized ___ the convergence of digital and biological technologies.', options: ['with', 'for', 'by', 'from'], answer: 2 },
    { id: 20, type: 'grammar', question: 'Sociologists argue that ensuring fair distribution is ___ challenging than developing the technology itself.', options: ['more', 'most', 'much', 'very'], answer: 0 },
  ],
};