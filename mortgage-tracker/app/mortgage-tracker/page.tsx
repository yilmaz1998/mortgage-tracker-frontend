"use client"

import React from 'react'
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export function MortgageTracker({ onSubmit }: { onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void }) {
  return (
    <Card className="w-full max-w-5xl">
      <form className="space-y-8" onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Mortgage Tracker</CardTitle>
          <CardDescription>
          Enter your application ID to track your application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="application_id">Application ID</Label>
                <Input id="application_id" name="application_id" required />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
        <Button className='mr-2' variant='destructive'>
          <Link href="/">
            Go Back
          </Link>
        </Button>
          <Button type="submit">
            Track Application
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

const page = () => {
  const router = useRouter()

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      const applicationId = formData.get('application_id') as string
      router.push(`/mortgage/${applicationId}`)
    }
    catch (error) {
      console.error("Error tracking application:", error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <MortgageTracker onSubmit={handleSubmit} />
    </div>
  )
}

export default page