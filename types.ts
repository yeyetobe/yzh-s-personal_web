export enum Category {
  TECH = 'Technical',
  LIFE = 'Life',
  THOUGHTS = 'Thoughts'
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown content
  date: string;
  category: Category;
  readTime: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  imageUrl: string;
  featured: boolean;
  gallery?: string[]; // 添加 gallery 字段，用于存储图片路径数组
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  skills: string[];
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'projects' }
  | { type: 'blog' }
  | { type: 'post'; postId: string };