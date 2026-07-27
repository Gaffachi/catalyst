"use client"

import * as React from "react"
import { NotificationInbox } from "@/features/shared/components/NotificationInbox"

export default function EmployerNotificationsPage() {
  return <NotificationInbox audience="Employers" portalLabel="Employer" />
}
