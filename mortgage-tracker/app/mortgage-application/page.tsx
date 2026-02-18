"use client"

import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { axiosInstance } from "@/lib/axios"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation"
import Link from "next/link"


export function MortgageApplicationCard({ onSubmit }: { onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void }) {
  return (
    <Card className="w-full max-w-5xl">
      <form className="space-y-8" onSubmit={onSubmit}>
      <CardHeader>
        <CardTitle>Mortgage Application</CardTitle>
        <CardDescription>
          Please fill out the form below to apply for a mortgage.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" name="first_name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" name="last_name" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="property_price">Property Price</Label>
              <Input id="property_price" name="property_price" type="number" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="down_payment">Down Payment</Label>
              <Input id="down_payment" name="down_payment" type="number" required />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="annual_income">Annual Income</Label>
              <Input id="annual_income" name="annual_income" type="number" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="loan_term_years">Loan Term (Years)</Label>
              <Input id="loan_term_years" name="loan_term_years" type="number" placeholder="Between 1 and 30 years" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="credit_score">Credit Score</Label>
              <Input id="credit_score" name="credit_score" type="number" placeholder="Between 300 and 850" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label>Employment Type</Label>
              <Select name="employment_type">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL_TIME">Full Time</SelectItem>
                  <SelectItem value="PART_TIME">Part Time</SelectItem>
                  <SelectItem value="SELF_EMPLOYED">Self Employed</SelectItem>
                  <SelectItem value="RETIRED">Retired</SelectItem>
                  <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Interest Type</Label>
              <Select name="interest_type">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select interest type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIXED">Fixed</SelectItem>
                  <SelectItem value="VARIABLE">Variable</SelectItem>
                  <SelectItem value="HYBRID">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

      </CardContent>

      <CardFooter>
      <Button variant="destructive" className="mr-2">
            <Link href="/">            
            Go Back
            </Link>
        </Button>
        <Button type="submit">
          Submit Application
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
      const data = {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        property_price: Number(formData.get("property_price")),
        down_payment: Number(formData.get("down_payment")),
        loan_term_years: Number(formData.get("loan_term_years")),
        annual_income: Number(formData.get("annual_income")),
        credit_score: Number(formData.get("credit_score")),
        employment_type: formData.get("employment_type"),
        interest_type: formData.get("interest_type")
      }

      const response = await axiosInstance.post("/mortgage/application", data)

      if (response.status === 201) {
        console.log("Mortgage application submitted successfully")
        toast.success("Mortgage application submitted successfully");
        router.push(`/mortgage/${response.data.id}`)
      } else {
        console.error("Failed to submit mortgage application")
        toast.error("Failed to submit mortgage application");
      }

    } catch (error: any) {
      console.error("An error occurred while submitting the mortgage application", error)

      if (error.response) {
        const backendMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Validation failed"
  
        toast.error(backendMessage)
    }
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <MortgageApplicationCard onSubmit={handleSubmit} />
    </div>
  )
}

export default page