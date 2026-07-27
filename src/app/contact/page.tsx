"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { HeroSection } from "@/components/common/HeroSection"
import { Container } from "@/components/common/Container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Mail, Phone, Clock, Send, Sparkles } from "lucide-react"

// Zod Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Contact form submitted data:", data)
    setIsSubmitting(false)
    setSuccessMessage("Thank you! Your inquiry was successfully sent. A career advisor will contact you shortly.")
    reset()
  }

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        title="Contact Our Team"
        highlightedWord="Academic Support"
        subtitle="Have questions about internship coordination, partner registration, or mentorship setups? Get in touch with our advisors."
        badge="Contact Us"
      />

      <section className="w-full py-16 md:py-24 flex justify-center items-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-start">
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  ICT Career Services
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our department office oversees all active internship placements, partner employer registries, 
                  and mentorship scheduling programs.
                </p>
              </div>

              {/* Info details lists */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent border border-border/40 shrink-0">
                    <MapPin className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Department Office</h4>
                    <p className="text-sm font-medium text-foreground">ICT Department, Wing B, Room 402</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent border border-border/40 shrink-0">
                    <Mail className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email Support</h4>
                    <p className="text-sm font-medium text-foreground">catalyst-support@university.edu</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent border border-border/40 shrink-0">
                    <Phone className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Phone Support</h4>
                    <p className="text-sm font-medium text-foreground">+233 (0) 50 123 4567</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-slate-800 dark:text-accent border border-border/40 shrink-0">
                    <Clock className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Office Hours</h4>
                    <p className="text-sm font-medium text-foreground">Monday – Friday, 8:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Validation Form */}
            <div className="lg:col-span-7">
              <Card className="p-8 border border-border/60 bg-card shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1.5">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Send a Message
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Fill out the form below and our career coordination desk will review it.
                    </p>
                  </div>

                  {successMessage && (
                    <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold leading-relaxed flex items-start gap-2.5">
                      <Sparkles className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Full Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Alex Johnson" 
                      className={errors.name ? "border-destructive focus-visible:ring-destructive/30" : ""}
                      {...register("name")} 
                    />
                    {errors.name && (
                      <p className="text-[10px] font-bold text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Academic / Corporate Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="alex.johnson@student.edu" 
                      className={errors.email ? "border-destructive focus-visible:ring-destructive/30" : ""}
                      {...register("email")} 
                    />
                    {errors.email && (
                      <p className="text-[10px] font-bold text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="Internship application guidance request" 
                      className={errors.subject ? "border-destructive focus-visible:ring-destructive/30" : ""}
                      {...register("subject")} 
                    />
                    {errors.subject && (
                      <p className="text-[10px] font-bold text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Message details
                    </label>
                    <textarea 
                      id="message" 
                      rows={5}
                      placeholder="Please write the details of your request here..."
                      className={`flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 ${
                        errors.message ? "border-destructive focus-visible:ring-ring/0 focus-visible:border-destructive" : ""
                      }`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-[10px] font-bold text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-6 py-5 h-auto rounded-xl shadow-md border-0 cursor-pointer"
                  >
                    <Send className="size-4 mr-2" />
                    {isSubmitting ? "Sending inquiry..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

          </div>
        </Container>
      </section>
    </div>
  )
}
