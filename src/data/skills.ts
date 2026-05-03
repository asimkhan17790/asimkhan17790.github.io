export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Web & Frontend',
    skills: ['React', 'Angular', 'Redux', 'Node.js', 'CSS', 'Bootstrap', 'jQuery'],
  },
  {
    category: 'Frameworks & Backend',
    skills: ['Spring', 'Spring Boot', 'Spring Batch', 'J2EE', 'REST', 'Hibernate', 'Mockito'],
  },
  {
    category: 'Big Data',
    skills: ['Hadoop', 'MapReduce', 'Apache Spark', 'AWS Glue', 'AWS EMR'],
  },
  {
    category: 'Databases',
    skills: ['Snowflake', 'PostgreSQL', 'MongoDB', 'Oracle', 'IBM DB2', 'Sybase IQ'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS S3', 'AWS Lambda', 'AWS EC2', 'AWS Glue', 'CloudFormation'],
  },
  {
    category: 'AI Tools',
    skills: ['Claude Code', 'GitHub Copilot', 'Cursor', 'Devin'],
  },
]
