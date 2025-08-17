"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Store, Mail, Lock, ArrowRight, Eye, EyeOff, Gift, Users, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { z } from 'zod'
import { useAuth } from "@/context/AuthContext"

// Zod validation schema
const customerLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

type CustomerLoginForm = z.infer<typeof customerLoginSchema>

export default function CustomerLoginPage() {
  const [formData, setFormData] = useState<CustomerLoginForm>({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerLoginForm, string>>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const { login, loginError, loginPending } = useAuth()
  console.log(loginError)

  // Handle input changes with field-level validation
  const handleInputChange = (field: keyof CustomerLoginForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    
    // Real-time validation for specific fields
    if (field === 'email' && typeof value === 'string' && value.length > 0) {
      const emailResult = customerLoginSchema.shape.email.safeParse(value)
      if (!emailResult.success) {
        setErrors(prev => ({ ...prev, email: emailResult.error.errors[0].message }))
      }
    }
  }

  // Validate entire form
  const validateForm = (): boolean => {
    setIsValidating(true)
    const result = customerLoginSchema.safeParse(formData)
    
    if (!result.success) {
      const formErrors: Partial<Record<keyof CustomerLoginForm, string>> = {}
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          formErrors[err.path[0] as keyof CustomerLoginForm] = err.message
        }
      })
      setErrors(formErrors)
      setIsValidating(false)
      return false
    }
    
    setErrors({})
    setIsValidating(false)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

   await login(formData.email, formData.password, "user")
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8 animate-fade-in-up">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Store className="h-8 w-8 text-white" />
                </div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                BrandOffers
              </span>
            </Link>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Welcome Back,
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Smart Shopper!
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Sign in to access exclusive deals, track your savings, and discover amazing offers from your favorite
                brands.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Exclusive Offers</h3>
                <p className="text-gray-600">Access deals only available to registered customers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Personalized Experience</h3>
                <p className="text-gray-600">Get recommendations based on your preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure & Trusted</h3>
                <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-4 text-center">
              <div className="lg:hidden">
                <Link href="/" className="flex items-center justify-center space-x-3 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-xl">
                      <Store className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    BrandOffers
                  </span>
                </Link>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Customer Login</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Sign in to your account to access exclusive offers and personalized deals.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-10 border-2 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl h-12`}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`pl-10 pr-10 border-2 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'} focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl h-12`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                        
                        
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={checked => handleInputChange('rememberMe', checked === true)}
                      className="border-2 border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={loginPending || isValidating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg font-semibold hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed "
                  // className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform "
                  
                >
                  {loginPending || isValidating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isValidating ? 'Validating...' : 'Signing In...'}</span>
                    </div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                {loginError && !Object.keys(errors).length && (
                  <div className="text-red-600 text-sm mt-2 p-3 bg-red-50 rounded-lg border border-red-200">
                    {(loginError as any)?.error?.message || (loginError as any)?.message || "Login failed. Please check your credentials and try again."}
                  </div>
                )}
              </form>

              

              

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/customer/register"
                    className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

             
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Are you a brand?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
              >
                Brand Login
              </Link>
            </p>
          </div>
        </div>
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
