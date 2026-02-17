"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { axiosInstance } from "@/lib/axios"
import Mortgage from "@/types/types"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MortgageDetailPage() {
    const params = useParams()
    const id = params.id
    const [mortgage, setMortgage] = useState<Mortgage | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMortgage = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/mortgage/application/${id}/`)
                setMortgage(response.data)
                console.log("Fetched mortgage details:", response.data)
            } catch (error: any) {
                setError("Mortgage not found")
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            fetchMortgage()
        }
    }, [id])

    if (loading) return <p>Loading mortgage details...</p>

    if (error) return <p>{error}</p>

    if (!mortgage) return <p>No mortgage found.</p>

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-6xl shadow-xl rounded-2xl">
                <CardHeader>
                    <div className="flex mt-1 items-center justify-between">
                        <CardTitle className="text-2xl">
                            Mortgage Application Details
                        </CardTitle>

                        <Badge
                            variant={
                                mortgage.status === "approved"
                                    ? "default"
                                    : mortgage.status === "rejected"
                                        ? "destructive"
                                        : "secondary"
                            }
                            className="capitalize"
                        >
                            {mortgage.status}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="grid md:grid-cols-2 gap-6 pt-6 text-sm">

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Applicant Name</p>
                        <p>
                            {mortgage.first_name} {mortgage.last_name}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Email</p>
                        <p>{mortgage.email}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Phone</p>
                        <p>{mortgage.phone}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Employment Type</p>
                        <p>{mortgage.employment_type}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Property Price</p>
                        <p>
                            {formatCurrency(mortgage.property_price)}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Down Payment</p>
                        <p>
                            {formatCurrency(mortgage.down_payment)}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Annual Income</p>
                        <p>
                            {formatCurrency(mortgage.annual_income)}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Loan Term</p>
                        <p>
                            {mortgage.loan_term_years} years
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Credit Score</p>
                        <p>{mortgage.credit_score}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Interest Type</p>
                        <p>
                            {mortgage.interest_type}
                        </p>
                    </div>

                </CardContent>

                <CardFooter className="mt-2">
                    <Button>
                        <Link href="/">            
                        Go Back
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
