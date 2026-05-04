export interface Degree {
  institution: string
  degree: string
  field: string
  period: string
  courses: string[]
  logoUrl?: string
}

export const education: Degree[] = [
  {
    institution: 'Northeastern University',
    degree: 'Master of Science',
    field: 'Computer & Information Sciences',
    period: 'Sep 2016 – Dec 2018',
    logoUrl: '/NU_RGB_Notched-N_wordmark_RB-1-2.svg',
    courses: ['Algorithms', 'Parallel Data Processing', 'Web Development', 'Information Retrieval', 'DBMS', 'Managing S/W Development'],
  },
  {
    institution: 'Dr. APJ Abdul Kalam Technical University',
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering',
    period: 'Jul 2008 – Jun 2012',
    logoUrl: '/Dr._A.P.J._Abdul_Kalam_Technical_University_logo.png',
    courses: ['Data Structures', 'Algorithms', 'OOP', 'Web Technology', 'Operating Systems', 'Compilers'],
  },
]
