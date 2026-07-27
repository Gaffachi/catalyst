import { EmployerVerification } from "@/features/admin/types/admin.types"

const mockEmployers: (EmployerVerification & { openPositions: number; description: string })[] = [
  {
    id: "emp-paystack",
    employerId: "paystack-01",
    companyName: "Paystack Africa",
    industry: "Fintech & Payments",
    companySize: "250-500 Employees",
    location: "Accra, Ghana & Lagos, Nigeria",
    status: "Verified",
    submittedDate: "2024-01-10",
    openPositions: 4,
    description: "Modern online and offline payment processing infrastructure powering growth for African businesses.",
  },
  {
    id: "emp-google",
    employerId: "google-gh",
    companyName: "Google Ghana AI Lab",
    industry: "Artificial Intelligence & Cloud",
    companySize: "1000+ Employees",
    location: "Airport City, Accra",
    status: "Verified",
    submittedDate: "2024-02-15",
    openPositions: 6,
    description: "Leading AI research center driving machine learning innovation and software engineering across Africa.",
  },
  {
    id: "emp-hubtel",
    employerId: "hubtel-gh",
    companyName: "Hubtel Ghana",
    industry: "E-Commerce & Digital Payments",
    companySize: "100-250 Employees",
    location: "Kokomlemle, Accra",
    status: "Verified",
    submittedDate: "2024-03-01",
    openPositions: 3,
    description: "Ghana's leading messaging and payments aggregator enabling digital commerce for merchants.",
  },
  {
    id: "emp-expresspay",
    employerId: "expresspay-gh",
    companyName: "ExpressPay Ghana",
    industry: "Fintech & Digital Banking",
    companySize: "50-100 Employees",
    location: "Cantonments, Accra",
    status: "Verified",
    submittedDate: "2024-03-20",
    openPositions: 2,
    description: "e-Commerce payment gateway and financial services provider specializing in mobile financial integration.",
  },
]

export class StudentEmployerDirectoryService {
  static async getEmployers(): Promise<typeof mockEmployers> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockEmployers]), 150)
    })
  }
}
