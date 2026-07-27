"use client"

import * as React from "react"
import { NotificationInbox } from "@/features/shared/components/NotificationInbox"

export default function StudentNotificationsPage() {
  return <NotificationInbox audience="Students" portalLabel="Student" />
}
