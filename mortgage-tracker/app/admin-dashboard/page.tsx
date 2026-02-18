"use client"

import { useState, useEffect } from "react"
import { axiosInstance } from "@/lib/axios"
import Mortgage from "@/types/types"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';

export default function AdminDashboard() {
    const [mortgages, setMortgages] = useState<Mortgage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updatingId, setUpdatingId] = useState<number | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchMortgages = async () => {
            try {
                const response = await axiosInstance.get("/admin/applications")
                setMortgages(response.data)
            } catch (error: any) {
                if (error.response?.status === 401) {
                    localStorage.removeItem("adminToken")
                    router.push("/admin-login")
                } else {
                    setError("Failed to fetch applications")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchMortgages()
    }, [router])

    const handleStatusChange = async (
        id: number,
        status: "APPROVED" | "REJECTED"
    ) => {
        try {
            setUpdatingId(id)

            await axiosInstance.patch(`/admin/application/${id}/status`, {
                status,
            })

            setMortgages((prev) =>
                prev.map((mortgage) =>
                    mortgage.id === id ? { ...mortgage, status } : mortgage
                )
            )

            toast.success(`Application ${status.toLowerCase()} successfully`)
        } catch (error) {
            toast.error("Failed to update application status")
        } finally {
            setUpdatingId(null)
        }
    }


    if (loading) return <p className="text-center mt-10">Loading applications...</p>

    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

    if (mortgages.length === 0)
        return <p className="text-center mt-10">No mortgage applications found.</p>

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)

    return (
        <div className="p-8">
            <h1 className="text-center mb-10 text-4xl">Admin Dashboard</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {mortgages.map((mortgage) => (
                    <Card key={mortgage.id} className="relative mx-auto w-full max-w-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">
                                    {mortgage.first_name} {mortgage.last_name}
                                </CardTitle>
                                <Badge
                                    variant={
                                        mortgage.status === "APPROVED"
                                            ? "default"
                                            : mortgage.status === "REJECTED"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                    className="capitalize"
                                >
                                    {mortgage.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-2">
                                <p className="text-muted-foreground">Application ID</p>
                                <p> {mortgage.id} </p>
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
                                <p> {formatCurrency(mortgage.property_price)} </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground">Down Payment</p>
                                <p> {formatCurrency(mortgage.down_payment)} </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground">Loan Amount</p>
                                <p> {formatCurrency(mortgage.loan_amount)} </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground">Annual Income</p>
                                <p> {formatCurrency(mortgage.annual_income)} </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground">Loan Term</p>
                                <p> {mortgage.loan_term_years} years </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground">Credit Score</p>
                                <p>{mortgage.credit_score}</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground">Interest Type</p>
                                <p> {mortgage.interest_type} </p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => handleStatusChange(mortgage.id, "APPROVED")}
                                variant="outline"
                                className="flex-1"
                                disabled={
                                    updatingId === mortgage.id ||
                                    mortgage.status?.toUpperCase() === "APPROVED" ||
                                    mortgage.status?.toUpperCase() === "REJECTED"
                                }
                            >
                                {updatingId === mortgage.id ? "Processing..." : "Approve"}
                            </Button>

                            <Button
                                onClick={() => handleStatusChange(mortgage.id, "REJECTED")}
                                variant="destructive"
                                className="flex-1"
                                disabled={
                                    updatingId === mortgage.id ||
                                    mortgage.status?.toUpperCase() === "APPROVED" ||
                                    mortgage.status?.toUpperCase() === "REJECTED"
                                }
                            >
                                {updatingId === mortgage.id ? "Processing..." : "Reject"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>

    )
}