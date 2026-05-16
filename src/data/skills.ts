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
    skills: ['React', 'Angular', 'Redux', 'Node.js'],
  },
  {
    category: 'Frameworks & Backend',
    skills: ['Spring', 'Flutter', 'J2EE', 'Hibernate', 'Mockito'],
  },
  {
    category: 'Big Data',
    skills: ['Hadoop', 'MapReduce', 'Apache Spark'],
  },
  {
    category: 'Databases',
    skills: ['Snowflake', 'Supabase', 'PostgreSQL', 'MongoDB', 'Oracle', 'IBM DB2', 'Sybase IQ'],
  },
  {
    category: 'AI Tools & Frameworks',
    skills: ['Claude Code', 'GitHub Copilot', 'Cursor', 'Devin', 'LangChain','Google ADK'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS'],
  },
]
