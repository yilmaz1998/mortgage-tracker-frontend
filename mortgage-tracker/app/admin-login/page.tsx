"use client"

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
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';


const page = () => {
    const router = useRouter();


    const handleLogin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const formData = new FormData(event.currentTarget)
            const data = {
                username: formData.get("username"),
                password: formData.get("password"),
            }

            const response = await axiosInstance.post("/admin/login", data)

            if (response.status === 200) {
                const token = response.data.token
                localStorage.setItem("adminToken", token)
                toast.success("Admin login successful!")
                router.push("/admin-dashboard")
            }
        } catch (error: any) {
            console.error("Login failed:", error)
            if(error.response) {
                const errorMessage = error.response.data?.message || error.response.data?.error || "Login failed"
                toast.error(errorMessage)
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-3xl">
                <form className="space-y-8" onSubmit={handleLogin}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Mortgage Tracker</CardTitle>
                        <CardDescription>
                            Enter your information below to log in as an admin.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">   
                        <div className="grid gap-2">                        
                        <Label htmlFor="email">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full mt-2">
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default page