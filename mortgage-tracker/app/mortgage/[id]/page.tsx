"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { axiosInstance } from "@/lib/axios"
import Mortgage from "@/types/types"

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
        <div>
            <h1>Mortgage Detail Page</h1>
            <p><strong>Applicant Name:</strong> {mortgage.first_name} {mortgage.last_name}</p>
            <p><strong>Email:</strong> {mortgage.email}</p>
            <p><strong>Phone:</strong> {mortgage.phone}</p>
            <p><strong>Property Price:</strong> {formatCurrency(mortgage.property_price)}</p>
            <p><strong>Down Payment:</strong> {formatCurrency(mortgage.down_payment)}</p>
            <p><strong>Annual Income:</strong> {formatCurrency(mortgage.annual_income)}</p>
            <p><strong>Loan Term (Years):</strong> {mortgage.loan_term_years}</p>
            <p><strong>Credit Score:</strong> {mortgage.credit_score}</p>
            <p><strong>Employment Type:</strong> {mortgage.employment_type}</p>
            <p><strong>Interest Type:</strong> {mortgage.interest_type}</p>
        </div>
    )
}
