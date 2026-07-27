"use client"

import * as React from "react"
import { AdminProfile } from "../types/admin.profile.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Mail, Phone, MapPin, Calendar, Building } from "lucide-react"

interface AdminProfileCardProps {
  profile: AdminProfile
}

export function AdminProfileCard({ profile }: AdminProfileCardProps) {
  return (
    <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-6 select-none max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left border-b border-border/30 pb-5">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-orange-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
          {profile.avatarInitials}
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="font-heading text-lg font-extrabold text-slate-850 dark:text-slate-100">
              {profile.name}
            </h2>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px]">
              <ShieldCheck className="size-3 mr-1" /> Verified Admin
            </Badge>
          </div>
          <p className="text-xs text-accent font-bold">{profile.roleTitle}</p>
          <span className="text-[11px] text-slate-400 font-semibold block">{profile.department}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <Mail className="size-3" /> Email Address
          </span>
          <p className="font-bold text-slate-700 dark:text-slate-200 truncate">{profile.email}</p>
        </div>

        <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <Phone className="size-3" /> Contact Phone
          </span>
          <p className="font-bold text-slate-700 dark:text-slate-200">{profile.phone}</p>
        </div>

        <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <Building className="size-3" /> Department
          </span>
          <p className="font-bold text-slate-700 dark:text-slate-200">{profile.department}</p>
        </div>

        <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <MapPin className="size-3" /> Location
          </span>
          <p className="font-bold text-slate-700 dark:text-slate-200">{profile.location}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-3 border-t border-border/20">
        <span className="flex items-center gap-1">
          <Calendar className="size-3" /> Admin Member Since: {profile.joinedDate}
        </span>
        <span>Last Active Session: {profile.lastLogin}</span>
      </div>
    </Card>
  )
}
