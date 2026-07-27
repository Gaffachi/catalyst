"use client"

import * as React from "react"
import { SkillsService } from "@/features/student/services/skills.service"
import { Skill } from "@/features/student/types/student.types"
import { SkillRecommendationCard } from "@/features/student/components/SkillRecommendationCard"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Award } from "lucide-react"

export default function StudentSkillsPage() {
  const [skills, setSkills] = React.useState<Skill[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showAddForm, setShowAddForm] = React.useState(false)
  
  // Add Skill Form State
  const [name, setName] = React.useState("")
  const [level, setLevel] = React.useState(75)
  const [category, setCategory] = React.useState<"Frontend" | "Backend" | "Database" | "Cloud" | "Networking">("Frontend")

  React.useEffect(() => {
    async function loadData() {
      try {
        const data = await SkillsService.getSkills()
        setSkills(data)
      } catch (err) {
        console.error("Failed to load skills:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return
    setIsLoading(true)
    try {
      const updated = await SkillsService.addSkill({ name, level, category })
      setSkills(updated)
      setName("")
      setShowAddForm(false)
    } catch (err) {
      console.error("Failed to add skill:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Frontend": return "bg-blue-50 text-blue-700 border-blue-200"
      case "Backend": return "bg-purple-50 text-purple-700 border-purple-200"
      case "Database": return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Cloud": return "bg-sky-50 text-sky-700 border-sky-200"
      case "Networking": return "bg-orange-50 text-accent border-orange-200"
      default: return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  if (isLoading && skills.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading skills matrix...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border/40 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Skills Development
          </h1>
          <p className="text-xs text-muted-foreground">
            Track your professional skills profile and align with curriculum requirements.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-semibold text-xs cursor-pointer select-none"
        >
          <Plus className="size-3.5 mr-1.5" />
          Add Skill
        </Button>
      </div>

      {/* Add Skill Form Widget */}
      {showAddForm && (
        <form onSubmit={handleAddSkill} className="p-4 rounded-xl border border-orange-200 bg-orange-50/20 max-w-md space-y-4 animate-in fade-in duration-200">
          <h4 className="text-xs font-bold text-slate-700">Add Technical Competency</h4>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Skill Name</label>
            <Input type="text" placeholder="E.g. AWS S3" value={name} onChange={(e) => setName(e.target.value)} required className="h-8 text-xs bg-background" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Competency Level (%)</label>
              <Input type="number" min={10} max={100} value={level} onChange={(e) => setLevel(Number(e.target.value))} required className="h-8 text-xs bg-background" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Skill Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value as Skill["category"])}
                className="flex h-8 w-full rounded-lg border border-input bg-background px-3 py-1 text-xs shadow-sm focus-visible:outline-none"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Cloud">Cloud</option>
                <option value="Networking">Networking</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="outline" type="button" onClick={() => setShowAddForm(false)} className="h-7 text-[10px]">
              Cancel
            </Button>
            <Button size="sm" type="submit" className="bg-slate-900 text-white hover:bg-slate-800 border-0 h-7 text-[10px]">
              Add Competency
            </Button>
          </div>
        </form>
      )}

      {/* Grid: Skills metrics & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Current Skills list (2 columns on md) */}
        <Card className="md:col-span-2 p-6 border border-border/60 bg-card shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold text-foreground border-b border-border/40 pb-2 flex items-center gap-1.5 select-none">
            <Award className="size-4 text-accent" />
            Technical Competency Strengths
          </h3>
          <div className="space-y-4 pt-1">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-1 select-none">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">{skill.name}</span>
                  <Badge variant="outline" className={`text-[9px] font-bold uppercase ${getCategoryColor(skill.category)}`}>
                    {skill.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 w-8 text-right">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Skill Category Breakdown */}
        <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4 h-fit">
          <h3 className="font-heading text-sm font-bold text-foreground border-b border-border/40 pb-2 select-none">
            Category Map
          </h3>
          <div className="space-y-2 select-none">
            {["Frontend", "Backend", "Database", "Cloud", "Networking"].map((cat) => {
              const count = skills.filter((s) => s.category === cat).length
              return (
                <div key={cat} className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-600">{cat}</span>
                  <span className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-500">
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>

      </div>

      {/* Recommendations Box */}
      <SkillRecommendationCard />

    </div>
  )
}
