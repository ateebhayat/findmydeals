"use client"

import type React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Store, ArrowLeft, Eye, EyeOff, Mail, Lock, Sparkles, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

// Define validation schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false)
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login, loginError, loginPending } = useAuth()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      // Use the login function from AuthContext
      await login(data.email, data.password, "brand")
      
    } catch (error) {
      console.error("Login error:", error)
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <div className="mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            className="hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 group"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Main Card */}
        <Card
          className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader className="text-center pb-8 pt-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-3xl transform group-hover:scale-110 transition-transform duration-300">
                  <Store className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Sign in to manage your offers and connect with customers
            </CardDescription>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Trusted by 2,500+ brands</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className={`pl-12 pr-4 py-3 border-2 ${
                      errors.email ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    } focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-white/50 backdrop-blur-sm`}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    disabled={isLoading || loginPending}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500 mt-1 animate-fade-in-up" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter your password"
                    className={`pl-12 pr-12 py-3 border-2 ${
                      errors.password ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    } focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-white/50 backdrop-blur-sm`}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    aria-invalid={!!errors.password}
                    disabled={isLoading || loginPending}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-500 mt-1 animate-fade-in-up" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    {...register("rememberMe")}
                    disabled={isLoading || loginPending}
                    className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="rememberMe" className="text-sm font-medium cursor-pointer text-gray-700">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-medium hover:scale-[1.02] transform disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading || loginPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">New to BrandOffers?</span>
                </div>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
                >
                  Register your brand
                </Link>
              </p>
            </div>

            {/* Support Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Need help? Our support team is here for you</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:scale-105 transform bg-transparent"
                  asChild
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
