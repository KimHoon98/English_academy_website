import type { GradeTest } from './types';

export const B2Test: GradeTest = {
  grade: 'b2',
  gradeLabel: '중학교 2학년',
  reading: {
    passage1: {
      passage:
      `Climate change is arguably the most pressing global challenge of the 21st century. 
      The Earth's average temperature has risen by approximately 1.1 degrees Celsius since the pre-industrial era, 
      primarily due to the burning of fossil fuels such as coal, oil, and natural gas. 
      These activities release large quantities of greenhouse gases, particularly carbon dioxide and methane, 
      into the atmosphere, trapping heat and causing the planet to warm. 
      The consequences of this warming are already being felt around the world. 
      Glaciers and polar ice caps are melting at an alarming rate, causing sea levels to rise 
      and threatening low-lying coastal communities and island nations. 
      Extreme weather events such as hurricanes, droughts, and wildfires have become more frequent and intense. 
      In South Korea, climate change has led to longer and more intense heat waves during summer, 
      heavier rainfall during the monsoon season, and disruptions to traditional agricultural patterns. 
      The Korean government has committed to achieving carbon neutrality by 2050, 
      meaning it aims to balance the amount of greenhouse gases emitted with the amount removed from the atmosphere. 
      To achieve this goal, Korea is investing heavily in renewable energy sources such as solar and wind power, 
      promoting electric vehicles, and implementing stricter regulations on industrial emissions. 
      Scientists warn that without immediate and decisive global action, 
      the consequences of climate change will become increasingly severe and potentially irreversible.`,
      questions: [
        { id: 1, type: 'reading', question: 'By how much has the Earth\'s average temperature risen since the pre-industrial era?', options: ['0.5 degrees Celsius', '1.1 degrees Celsius', '2.0 degrees Celsius', '3.5 degrees Celsius'], answer: 1 },
        { id: 2, type: 'reading', question: 'What is the primary cause of climate change according to the passage?', options: ['Deforestation alone', 'Burning of fossil fuels', 'Ocean pollution', 'Nuclear energy use'], answer: 1 },
        { id: 3, type: 'reading', question: 'What has climate change caused in South Korea specifically?', options: ['More snowfall in winter', 'Longer and more intense heat waves and heavier monsoon rainfall', 'Decreased agricultural production only', 'Rising coastal land'], answer: 1 },
        { id: 4, type: 'reading', question: 'What does "carbon neutrality by 2050" mean for Korea?', options: ['Stop all industrial activity by 2050', 'Balance greenhouse gases emitted with those removed', 'Reduce carbon emissions by 50%', 'Ban all fossil fuels immediately'], answer: 1 },
        { id: 5, type: 'reading', question: 'Which of the following is NOT mentioned as part of Korea\'s climate strategy?', options: ['Solar and wind power', 'Electric vehicles', 'Nuclear energy expansion', 'Stricter industrial emission regulations'], answer: 2 },
      ],
    },
    passage2: {
      passage:
      `The concept of the "smart city" is transforming urban living across the globe, 
      and South Korea is at the forefront of this technological revolution. 
      A smart city uses digital technology and data to improve the efficiency of city services 
      and enhance the quality of life for its residents. 
      Songdo, located near Incheon, is often cited as one of the world's most advanced smart cities. 
      Built largely from scratch on reclaimed land, Songdo was designed from the beginning 
      to integrate cutting-edge technology into every aspect of urban life. 
      The city features a pneumatic waste disposal system that transports garbage underground through tubes, 
      eliminating the need for traditional garbage trucks. 
      Sensors embedded throughout the city monitor traffic flow, air quality, and energy consumption in real time, 
      allowing city administrators to respond quickly to any issues. 
      Buildings in Songdo are connected to a central network that controls lighting, heating, and security systems. 
      Residents can access city services, pay bills, and monitor their home energy usage through a single smart device. 
      Furthermore, Songdo was designed with sustainability in mind — 
      40% of the city's area is dedicated to parks and green spaces, 
      and the city recycles approximately 75% of its waste. 
      While Songdo represents an impressive vision of the future, 
      critics argue that smart cities raise important questions about data privacy and surveillance, 
      as the constant monitoring of residents generates enormous amounts of personal data.`,
      questions: [
        { id: 6, type: 'reading', question: 'Where is Songdo located?', options: ['Seoul', 'Busan', 'Near Incheon', 'Daejeon'], answer: 2 },
        { id: 7, type: 'reading', question: 'How does Songdo\'s waste disposal system work?', options: ['Robots collect garbage', 'Garbage is transported underground through tubes', 'Residents must bring waste to recycling centers', 'Garbage trucks operate 24 hours'], answer: 1 },
        { id: 8, type: 'reading', question: 'What percentage of Songdo\'s area is dedicated to parks and green spaces?', options: ['20%', '30%', '40%', '50%'], answer: 2 },
        { id: 9, type: 'reading', question: 'What concern do critics raise about smart cities?', options: ['They are too expensive to build', 'They raise questions about data privacy and surveillance', 'They are not environmentally friendly', 'They are difficult to navigate'], answer: 1 },
        { id: 10, type: 'reading', question: 'What can Songdo residents do through a single smart device?', options: ['Only pay bills', 'Access city services, pay bills, and monitor home energy usage', 'Control traffic lights', 'Communicate with city administrators only'], answer: 1 },
      ],
    },
  },
  grammar: [
    { id: 11, type: 'grammar', question: 'The Earth\'s temperature ___ by 1.1 degrees since the pre-industrial era.', options: ['rises', 'has risen', 'rose', 'is rising'], answer: 1 },
    { id: 12, type: 'grammar', question: 'Songdo ___ from scratch on reclaimed land near Incheon.', options: ['builds', 'built', 'was built', 'has built'], answer: 2 },
    { id: 13, type: 'grammar', question: 'Without immediate action, the consequences ___ increasingly severe.', options: ['become', 'will become', 'became', 'have become'], answer: 1 },
    { id: 14, type: 'grammar', question: 'Sensors ___ throughout the city monitor air quality and traffic in real time.', options: ['embed', 'embedded', 'embedding', 'are embed'], answer: 1 },
    { id: 15, type: 'grammar', question: 'Korea is investing in renewable energy ___ achieve carbon neutrality.', options: ['for', 'so that', 'in order to', 'because'], answer: 2 },
    { id: 16, type: 'grammar', question: 'Critics argue that smart cities raise questions ___ data privacy.', options: ['about', 'for', 'with', 'on'], answer: 0 },
    { id: 17, type: 'grammar', question: 'The city recycles approximately 75% of ___ waste.', options: ['it', 'its', 'their', 'his'], answer: 1 },
    { id: 18, type: 'grammar', question: 'Extreme weather events ___ more frequent due to climate change.', options: ['become', 'became', 'have become', 'are become'], answer: 2 },
    { id: 19, type: 'grammar', question: '___ the constant monitoring, enormous amounts of personal data are generated.', options: ['Because of', 'Despite', 'Although', 'Unless'], answer: 0 },
    { id: 20, type: 'grammar', question: 'If fossil fuels ___ replaced by renewable energy, emissions would decrease significantly.', options: ['are', 'were', 'will be', 'have been'], answer: 1 },
  ],
};