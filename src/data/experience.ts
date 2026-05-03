export interface Role {
  title: string
  period: string
  summary: string
  bullets: string[]
}

export interface Job {
  company: string
  location: string
  logo: string
  roles: Role[]
}

export const experience: Job[] = [
  {
    company: 'Goldman Sachs',
    location: 'Jersey City, NJ',
    logo: 'GS',
    roles: [
      {
        title: 'Vice President',
        period: 'Dec 2022 – Present',
        summary: 'Leading cloud-native regulatory reporting infrastructure and globally distributed engineering teams.',
        bullets: [
          'Architected migration of regulatory reporting workflows to cloud-native AWS Lambda & Glue stack — reduced production support cost by 70%.',
          'Built configurable ETL averaging pipeline on AWS Glue + Snowflake processing 100M records/quarter and 2M records/day across 3 data sources.',
          'Led production support for 150+ regulatory workflows across 40+ FED reports; managed globally distributed US/India team.',
          'Acted as SME providing technical guidance and driving recurring-issue resolution to systematically reduce support overhead.',
        ],
      },
      {
        title: 'Technology Associate',
        period: 'Dec 2020 – Dec 2022',
        summary: 'Led onboarding of 70+ US and EMEA regulatory reports to Axiom cloud platform.',
        bullets: [
          'Led onboarding of 70+ US and EMEA regulatory reports over 2.5-year lifecycle into Axiom cloud-based reporting platform.',
          'Built high-availability Java/Spring middleware as central integration layer between internal systems and Axiom.',
        ],
      },
      {
        title: 'Technology Analyst',
        period: 'Feb 2019 – Dec 2020',
        summary: 'Built Java/Spring middleware streaming 500K+ records/day to automate regulatory report generation.',
        bullets: [
          'Developed Java/Spring middleware streaming 500K+ records/day to Workiva WData, enabling automated regulatory report generation and reducing manual effort by 70%.',
          'Automated 5+ critical reporting workflows with Spring Batch, cutting manual processing by 30%.',
        ],
      },
      {
        title: 'Technology Summer Analyst',
        period: 'May 2018 – Aug 2018',
        summary: 'Requirements analysis, UI design, and data modeling for a CCAR filing web application.',
        bullets: [
          'Conducted requirements analysis, UI design, workflow design, and data modeling for CCAR filing web application.',
        ],
      },
    ],
  },
  {
    company: 'Nok Nok Labs',
    location: 'Palo Alto, CA',
    logo: 'NNL',
    roles: [
      {
        title: 'Software Engineering Intern',
        period: 'May 2017 – Dec 2017',
        summary: 'Designed security modules and won company hackathon for a biometric account recovery feature.',
        bullets: [
          'Designed OWASP CSRF Guard security module in Java.',
          'Built pluggable SSO module using JAAS and Reflection API.',
          'Won company Hackathon for biometric Account Recovery module using face and voice recognition.',
        ],
      },
    ],
  },
  {
    company: 'Citi',
    location: 'Pune, India',
    logo: 'C',
    roles: [
      {
        title: 'Software Engineer',
        period: 'Feb 2015 – Aug 2016',
        summary: 'Built high net-worth client onboarding application in Java J2EE, reducing onboarding time by 50%.',
        bullets: [
          'Contributed to high net-worth client onboarding app in Java J2EE — reduced client onboarding time by 50%.',
          'Designed 20+ RESTful web services using Spring REST to expose client data across internal systems.',
          'Led migration of legacy codebase to Spring/Maven — cut development effort 25%, deployment time 30%.',
        ],
      },
    ],
  },
  {
    company: 'Accenture',
    location: 'Pune, India',
    logo: 'ACC',
    roles: [
      {
        title: 'Software Engineering Analyst',
        period: 'Jun 2012 – Feb 2015',
        summary: 'Developed Angular + Java SPA delivering retail banking functionality for an Italian banking client.',
        bullets: [
          'Developed Angular + Java SPA delivering retail banking functionality for Italian banking client.',
          'Created Swing-based utility to automate screenshot capture, reducing testing effort by 40%.',
        ],
      },
    ],
  },
]
