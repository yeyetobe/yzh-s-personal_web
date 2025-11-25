import { Category, Profile, Project, BlogPost } from './types';

/**
 * =================================================================
 * CONTENT CONFIGURATION
 * 
 * Images: 
 * Place your images in a folder named 'public/images' in your root.
 * Then reference them here as '/images/your-image.jpg'.
 * =================================================================
 */

export const PROFILE: Profile = {
  name: "Ye Zhanghua",
  title: "欢迎来到我的网站",
  //bio: "Crafting digital interfaces with a focus on typography, motion, and clarity. I bridge the gap between rigorous engineering and artistic intent.",
  bio:"Fake it till I make it.",
  avatar: "", // No longer used in the minimal layout, but kept for types
  socials: {
    github: "https://github.com/yeyetobe",
    twitter: "https://x.com/yeyeyeyeeeeeeye?s=21",
    //linkedin: "https://linkedin.com",
    email: "1113037050@qq.com"
  },
  skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Design Systems", "AI Agents"]
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "英语学习DailyRow",
    description: "一个英语学习的应用，阅读->单词->写作，实现每日高反馈路径",
    techStack: ["React", "D3.js", "TypeScript"],
    link: "http://39.107.109.4",
    //github: "https://github.com",
    // Update this path to your local image: e.g. "/images/ecotrack.jpg"
    // For demo purposes, we use a placeholder that matches the aesthetic.
    imageUrl: "/images/project2-EnglishLearning.png", 
    featured: true
  },
  {
    id: "2",
    title: "文化小船游南北网页",
    description: "第一个网站制作，用于假期社会实践成果汇总。关于南北文化。",
    techStack: ["html"],
    github: "https://yeyetobe.github.io/SN_culture_bridge/",
    link: "https://yeyetobe.github.io/SN_culture_bridge/",
    imageUrl: "/images/project1-snCulture.jpg",
    featured: true
  },
  {
    id: "3",
    title: "Art works",
    description: "关于我的绘画作品",
    techStack: [""],
    imageUrl: "/images/artwork.PNG",
    featured: false,
    gallery: [
      "/images/artworks/painting1.PNG",
      "/images/artworks/painting2.PNG",
      "/images/artworks/painting3.PNG"
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "minimalism-code",
    title: "On Minimalism in Code",
    summary: "Why writing less code is the ultimate form of optimization. A reflection on complexity and maintenance.",
    date: "Oct 2023",
    category: Category.THOUGHTS,
    readTime: "4 min",
    content: `
# Less is More

We often confuse lines of code with productivity. In reality, every line of code is a liability. It is something to be read, understood, tested, and maintained.

## The Aesthetic of Logic

Just as a designer removes elements until nothing else can be taken away, a developer should refactor until the logic is crystalline.

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." - Antoine de Saint-Exupéry

### Practical Steps

1. **Delete dead code.**
2. **Abstract responsibly.**
3. **Question dependencies.**
    `
  },
  {
    id: "typography-screen",
    title: "Typography on the Screen",
    summary: "Exploring the nuances of rendering serif fonts on digital displays and the importance of vertical rhythm.",
    date: "Nov 2023",
    category: Category.TECH,
    readTime: "6 min",
    content: `
# The Serif Return

For years, sans-serif ruled the web. Helvetica, Arial, Inter. They are safe. But they lack the soul of ink on paper.

## Vertical Rhythm

Setting type is about the space *between* the lines as much as the lines themselves. In CSS, \`line-height\` is your most powerful tool for readability.

\`\`\`css
p {
  font-family: 'Playfair Display', serif;
  line-height: 1.6;
  max-width: 65ch;
}
\`\`\`

When we constrain the width of our text, we invite the reader to finish the sentence.
    `
  }
];