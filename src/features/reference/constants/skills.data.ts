/**
 * Skills Reference Data
 * Canonical list of all tech skills on the Catalyst platform.
 * This is the single source of truth — all portals (Student, Mentor, Employer, Portfolio) reference this list.
 */
import { Skill } from "../types/reference.types"

export const SKILLS_DATA: Skill[] = [
  // ── Frontend ────────────────────────────────────────────────
  { id: 1,  name: "React",           category: "Frontend",     aliases: ["React.js", "ReactJS"],             isActive: true, displayOrder: 1,  description: "UI component library by Meta", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 2,  name: "Next.js",         category: "Frontend",     aliases: ["NextJS", "Next JS"],              isActive: true, displayOrder: 2,  description: "React framework for production", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 3,  name: "TypeScript",      category: "Frontend",     aliases: ["TS"],                            isActive: true, displayOrder: 3,  description: "Typed superset of JavaScript", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 4,  name: "JavaScript",      category: "Frontend",     aliases: ["JS", "ES6"],                     isActive: true, displayOrder: 4,  description: "Web scripting language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 5,  name: "Vue.js",          category: "Frontend",     aliases: ["Vue", "VueJS"],                  isActive: true, displayOrder: 5,  description: "Progressive JavaScript framework", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 6,  name: "Angular",         category: "Frontend",     aliases: ["AngularJS"],                    isActive: true, displayOrder: 6,  description: "Google web framework", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 7,  name: "HTML / CSS",      category: "Frontend",     aliases: ["HTML5", "CSS3", "HTML", "CSS"],  isActive: true, displayOrder: 7,  description: "Web markup and styling", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 8,  name: "Tailwind CSS",    category: "Frontend",     aliases: ["TailwindCSS"],                  isActive: true, displayOrder: 8,  description: "Utility-first CSS framework", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 9,  name: "Figma",           category: "Design",       aliases: [],                               isActive: true, displayOrder: 9,  description: "UI/UX design tool", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 10, name: "UI/UX Design",    category: "Design",       aliases: ["UX Design", "UI Design"],       isActive: true, displayOrder: 10, description: "User interface and experience design", createdAt: "2026-01-01", updatedAt: "2026-01-01" },

  // ── Backend ─────────────────────────────────────────────────
  { id: 11, name: "Node.js",         category: "Backend",      aliases: ["NodeJS", "Node JS"],             isActive: true, displayOrder: 11, description: "JavaScript server-side runtime", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 12, name: "Python",          category: "Backend",      aliases: ["Python 3", "Python3"],           isActive: true, displayOrder: 12, description: "General-purpose programming language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 13, name: "Django",          category: "Backend",      aliases: [],                               isActive: true, displayOrder: 13, description: "Python web framework", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 14, name: "FastAPI",         category: "Backend",      aliases: ["Fast API"],                     isActive: true, displayOrder: 14, description: "Modern Python API framework", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 15, name: "Express.js",      category: "Backend",      aliases: ["Express", "ExpressJS"],         isActive: true, displayOrder: 15, description: "Node.js web framework", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 16, name: "Java",            category: "Backend",      aliases: [],                               isActive: true, displayOrder: 16, description: "Enterprise programming language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 17, name: "Spring Boot",     category: "Backend",      aliases: ["Spring"],                       isActive: true, displayOrder: 17, description: "Java application framework", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 18, name: "PHP",             category: "Backend",      aliases: [],                               isActive: true, displayOrder: 18, description: "Server-side scripting language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 19, name: "Go",              category: "Backend",      aliases: ["Golang"],                       isActive: true, displayOrder: 19, description: "Google systems language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 20, name: "REST API",        category: "Backend",      aliases: ["RESTful API", "REST APIs"],      isActive: true, displayOrder: 20, description: "HTTP-based API architecture", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 21, name: "GraphQL",         category: "Backend",      aliases: [],                               isActive: true, displayOrder: 21, description: "Query language for APIs", createdAt: "2026-01-01", updatedAt: "2026-01-01" },

  // ── Database ─────────────────────────────────────────────────
  { id: 22, name: "PostgreSQL",      category: "Database",     aliases: ["Postgres"],                     isActive: true, displayOrder: 22, description: "Open-source relational database", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 23, name: "MySQL",           category: "Database",     aliases: [],                               isActive: true, displayOrder: 23, description: "Relational database system", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 24, name: "MongoDB",         category: "Database",     aliases: ["Mongo"],                        isActive: true, displayOrder: 24, description: "NoSQL document database", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 25, name: "SQL",             category: "Database",     aliases: ["Structured Query Language"],    isActive: true, displayOrder: 25, description: "Database query language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 26, name: "Redis",           category: "Database",     aliases: [],                               isActive: true, displayOrder: 26, description: "In-memory data store", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 27, name: "Firebase",        category: "Database",     aliases: ["Firebase Firestore"],           isActive: true, displayOrder: 27, description: "Google realtime database", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 28, name: "Supabase",        category: "Database",     aliases: [],                               isActive: true, displayOrder: 28, description: "Open-source Firebase alternative", createdAt: "2026-01-01", updatedAt: "2026-01-01" },

  // ── Cloud & DevOps ───────────────────────────────────────────
  { id: 29, name: "AWS",             category: "Cloud & DevOps", aliases: ["Amazon Web Services"],        isActive: true, displayOrder: 29, description: "Amazon cloud platform", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 30, name: "Google Cloud",    category: "Cloud & DevOps", aliases: ["GCP"],                        isActive: true, displayOrder: 30, description: "Google cloud platform", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 31, name: "Azure",           category: "Cloud & DevOps", aliases: ["Microsoft Azure"],            isActive: true, displayOrder: 31, description: "Microsoft cloud platform", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 32, name: "Docker",          category: "Cloud & DevOps", aliases: [],                             isActive: true, displayOrder: 32, description: "Container platform", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 33, name: "Kubernetes",      category: "Cloud & DevOps", aliases: ["K8s"],                        isActive: true, displayOrder: 33, description: "Container orchestration", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 34, name: "Linux",           category: "Cloud & DevOps", aliases: ["Unix"],                       isActive: true, displayOrder: 34, description: "Open-source operating system", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 35, name: "CI/CD",           category: "Cloud & DevOps", aliases: ["Continuous Integration", "GitHub Actions"], isActive: true, displayOrder: 35, description: "Automated build and deploy pipelines", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 36, name: "Git",             category: "Cloud & DevOps", aliases: ["GitHub", "GitLab"],            isActive: true, displayOrder: 36, description: "Version control system", createdAt: "2026-01-01", updatedAt: "2026-01-01" },

  // ── Mobile ───────────────────────────────────────────────────
  { id: 37, name: "Flutter",         category: "Mobile",       aliases: [],                               isActive: true, displayOrder: 37, description: "Google cross-platform mobile framework", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 38, name: "Dart",            category: "Mobile",       aliases: [],                               isActive: true, displayOrder: 38, description: "Flutter programming language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 39, name: "React Native",    category: "Mobile",       aliases: [],                               isActive: true, displayOrder: 39, description: "Cross-platform mobile with React", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 40, name: "Swift",           category: "Mobile",       aliases: [],                               isActive: true, displayOrder: 40, description: "Apple iOS programming language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 41, name: "Kotlin",          category: "Mobile",       aliases: [],                               isActive: true, displayOrder: 41, description: "Android programming language", createdAt: "2026-01-01", updatedAt: "2026-01-01" },

  // ── Data & AI ───────────────────────────────────────────────
  { id: 42, name: "Data Analysis",   category: "Data & AI",    aliases: ["Data Analytics"],               isActive: true, displayOrder: 42, description: "Extracting insights from data", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 43, name: "Machine Learning", category: "Data & AI",   aliases: ["ML"],                          isActive: true, displayOrder: 43, description: "AI model training and inference", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 44, name: "Pandas",          category: "Data & AI",    aliases: [],                               isActive: true, displayOrder: 44, description: "Python data manipulation library", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 45, name: "Scikit-Learn",    category: "Data & AI",    aliases: ["sklearn"],                      isActive: true, displayOrder: 45, description: "Python ML library", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 46, name: "TensorFlow",      category: "Data & AI",    aliases: [],                               isActive: true, displayOrder: 46, description: "Deep learning framework by Google", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 47, name: "PowerBI",         category: "Data & AI",    aliases: ["Power BI"],                     isActive: true, displayOrder: 47, description: "Microsoft data visualization", createdAt: "2026-01-01", updatedAt: "2026-01-01" },

  // ── Security ─────────────────────────────────────────────────
  { id: 48, name: "Cybersecurity",   category: "Security",     aliases: ["Information Security", "InfoSec"], isActive: true, displayOrder: 48, description: "Systems security practices", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 49, name: "Network Security", category: "Security",    aliases: [],                               isActive: true, displayOrder: 49, description: "Network protection and monitoring", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 50, name: "Penetration Testing", category: "Security", aliases: ["Pentesting", "Pen Testing"],    isActive: true, displayOrder: 50, description: "Ethical hacking", createdAt: "2026-01-01", updatedAt: "2026-01-01" },

  // ── Other ────────────────────────────────────────────────────
  { id: 51, name: "System Design",   category: "Other",        aliases: [],                               isActive: true, displayOrder: 51, description: "Large-scale architecture design", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 52, name: "Agile / Scrum",   category: "Other",        aliases: ["Agile", "Scrum"],               isActive: true, displayOrder: 52, description: "Iterative development methodology", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 53, name: "Problem Solving", category: "Other",        aliases: [],                               isActive: true, displayOrder: 53, description: "Analytical reasoning skills", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: 54, name: "Microservices",   category: "Other",        aliases: [],                               isActive: true, displayOrder: 54, description: "Distributed service architecture", createdAt: "2026-01-01", updatedAt: "2026-01-01" },
]

export const SKILL_CATEGORIES: Skill["category"][] = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud & DevOps",
  "Mobile",
  "Data & AI",
  "Security",
  "Design",
  "Other",
]
