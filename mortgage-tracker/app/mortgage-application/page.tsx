import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
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
  SelectLabel,
  SelectGroup
} from "@/components/ui/select"

export function MortgageApplicationCard() {
  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Mortgage Application</CardTitle>
        <CardDescription>
          Please fill out the form below to apply for a mortgage.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6">
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="loan_amount">Loan Amount</Label>
              <Input id="loan_amount" name="loan_amount" type="number" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="loan_term_years">Loan Term (Years)</Label>
              <Input id="loan_term_years" name="loan_term_years" type="number" placeholder="Between 1 and 30 years" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="annual_income">Annual Income</Label>
              <Input id="annual_income" name="annual_income" type="number" required />
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
        </form>
      </CardContent>

      <CardFooter>
        <Button type="submit" className="w-full mt-2">
          Submit Application
        </Button>
      </CardFooter>
    </Card>
  )
}

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <MortgageApplicationCard />
    </div>
  )
}

export default page