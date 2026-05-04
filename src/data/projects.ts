export interface Project {
  name: string
  description: string
  url: string
  language: string
}

export const projects: Project[] = [
  {
    name: "The Sorcerer's Board",
    description: 'Harry Potter themed chess game',
    url: 'https://github.com/asimkhan17790/harryPotterChess',
    language: 'TypeScript',
  },
  {
    name: 'My Music',
    description: 'Online music library with music fingerprinting, and personalized recommendations',
    url: 'https://github.com/asimkhan17790/webdev-project-musicApp',
    language: 'JavaScript',
  },
  {
    name: 'Reel Raider',
    description: 'Automated viral YouTube clip pipeline — find, clip, caption, upload',
    url: 'https://github.com/asimkhan17790/reelraider',
    language: 'Python',
  },
  {
    name: 'Mind Therapy',
    description: 'Mental wellness and therapy companion app',
    url: 'https://github.com/asimkhan17790/mindtherapy',
    language: 'Dart',
  },
]
