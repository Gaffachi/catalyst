"use client"

import * as React from "react"
import { PartnershipService } from "@/features/admin/services/partnership.service"
import { Partnership } from "@/features/admin/types/admin.types"
import { PartnershipCard } from "@/features/admin/components/PartnershipCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Handshake } from "lucide-react"

export default function PartnershipManagementPage() {
  const [partnerships, setPartnerships] = React.useState<Partnership[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showAddForm, setShowAddForm] = React.useState(false)

  // Form state
  const [partnerName, setPartnerName] = React.useState("")
  const [partnerType, setPartnerType] = React.useState<Partnership["partnerType"]>("Company")
  const [contactPerson, setContactPerson] = React.useState("")
  const [contactEmail, setContactEmail] = React.useState("")

  const loadPartnerships = React.useCallback(async () => {
    try {
      const data = await PartnershipService.getPartnerships()
      setPartnerships(data)
    } catch (err) {
      console.error("Failed to load partnerships:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadPartnerships()
  }, [loadPartnerships])

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!partnerName || !contactEmail) return
    setIsLoading(true)
    try {
      const updated = await PartnershipService.addPartnership({
        partnerName,
        partnerType,
        contactPerson,
        contactEmail,
        status: "Active",
      })
      setPartnerships(updated)
      setShowAddForm(false)
      setPartnerName("")
      setContactPerson("")
      setContactEmail("")
    } catch (err) {
      console.error("Failed to add partner:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async (id: string, status: Partnership["status"]) => {
    const updated = await PartnershipService.updatePartnershipStatus(id, status)
    setPartnerships(updated)
  }

  if (isLoading && partnerships.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center select-none">
        <Loader2 className="size-8 text-accent animate-spin" />
        <span className="mt-4 text-xs font-semibold text-muted-foreground">
          Loading institutional partnerships...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-4 select-none">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Partnership Management
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage academic university affiliations, corporate enterprise alliances, training academies, and program sponsors.
          </p>
        </div>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-accent hover:bg-accent/90 text-white border-0 h-9 rounded-xl font-bold text-xs cursor-pointer shrink-0"
        >
          <Plus className="size-4 mr-1.5" />
          Add Partner
        </Button>
      </div>

      {/* Add Partner Overlay */}
      {showAddForm && (
        <Card className="p-6 border border-orange-200 bg-orange-50/20 shadow-md select-none space-y-4 animate-in slide-in-from-top-3 duration-250">
          <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
            <h3 className="font-heading text-sm font-bold text-slate-800 border-b border-orange-200/60 pb-2 flex items-center gap-1.5">
              <Handshake className="size-4 text-accent" />
              Register New Catalyst Partner Institution
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Partner Institution Name</label>
                <Input value={partnerName} onChange={(e) => setPartnerName(e.target.value)} required placeholder="E.g. Ashesi University / Paystack Africa" className="h-9 text-xs bg-background" />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Partnership Type</label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value as Partnership["partnerType"])}
                  className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none"
                >
                  <option value="University">University</option>
                  <option value="Company">Company</option>
                  <option value="Training Partner">Training Partner</option>
                  <option value="Sponsor">Sponsor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Primary Contact Person</label>
                <Input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required placeholder="E.g. Dr. Ayorkor Korsah" className="h-9 text-xs bg-background" />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 uppercase text-[10px]">Contact Email</label>
                <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required placeholder="partnerships@institution.org" className="h-9 text-xs bg-background" />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <Button type="button" onClick={() => setShowAddForm(false)} variant="outline" className="h-9 rounded-xl font-bold text-xs cursor-pointer border-slate-200">
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white h-9 rounded-xl font-bold text-xs cursor-pointer border-0">
                Save Partner
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partnerships.map((item) => (
          <PartnershipCard
            key={item.id}
            partnership={item}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>
    </div>
  )
}
