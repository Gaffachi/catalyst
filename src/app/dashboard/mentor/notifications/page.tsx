"use client"

import * as React from "react"
import { NotificationInbox } from "@/features/shared/components/NotificationInbox"

export default function MentorNotificationsPage() {
  return <NotificationInbox audience="Mentors" portalLabel="Mentor" />
}
