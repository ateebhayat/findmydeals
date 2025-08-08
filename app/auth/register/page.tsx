"use client"

import type React from "react"
import { ArrowRight } from "lucide-react" // Import ArrowRight here

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Store, ArrowLeft, User, Mail, Phone, Globe, MapPin, Lock, Shield, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    brandName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactPerson: "",
    phone: "",
    website: "",
    description: "",
    category: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    { number: 1, title: "Brand Info", description: "Tell us about your brand" },
    { number: 2, title: "Contact Details", description: "How can we reach you?" },
    { number: 3, title: "Security", description: "Secure your account" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const newErrors: Record<string, string> = {}

    if (!formData.brandName.trim()) newErrors.brandName = "Brand name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Handle successful registration
      console.log("Registration successful:", formData)
      // Redirect to dashboard or login
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative container mx-auto max-w-4xl">
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

        {/* Progress Steps */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-white/50 text-gray-400 border-2 border-gray-200"
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`font-medium ${currentStep >= step.number ? "text-blue-600" : "text-gray-400"}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                      currentStep > step.number ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
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
              Register Your Brand
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Join our platform and start sharing your offers with thousands of customers
            </CardDescription>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure Registration</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Free to start</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Brand Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="brandName" className="text-gray-700 font-medium">
                        Brand Name *
                      </Label>
                      <div className="relative group">
                        <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <Input
                          id="brandName"
                          value={formData.brandName}
                          onChange={(e) => handleInputChange("brandName", e.target.value)}
                          placeholder="Enter your brand name"
                          className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          aria-describedby={errors.brandName ? "brandName-error" : undefined}
                          aria-invalid={!!errors.brandName}
                        />
                      </div>
                      {errors.brandName && (
                        <p id="brandName-error" className="text-sm text-red-500 animate-fade-in-up" role="alert">
                          {errors.brandName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-700 font-medium">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger
                          id="category"
                          className="border-2 border-gray-200 focus:border-blue-500 py-3 bg-white/50 backdrop-blur-sm"
                          aria-describedby={errors.category ? "category-error" : undefined}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clothing">Clothing & Fashion</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="beauty">Health & Beauty</SelectItem>
                          <SelectItem value="home">Home & Garden</SelectItem>
                          <SelectItem value="sports">Sports & Recreation</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p id="category-error" className="text-sm text-red-500 animate-fade-in-up" role="alert">
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-700 font-medium">
                      Brand Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Tell customers about your brand..."
                      className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-700 font-medium">
                      Website URL
                    </Label>
                    <div className="relative group">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://www.yourbrand.com"
                        className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson" className="text-gray-700 font-medium">
                        Contact Person *
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                          placeholder="Full name"
                          className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          aria-describedby={errors.contactPerson ? "contactPerson-error" : undefined}
                          aria-invalid={!!errors.contactPerson}
                        />
                      </div>
                      {errors.contactPerson && (
                        <p id="contactPerson-error" className="text-sm text-red-500 animate-fade-in-up" role="alert">
                          {errors.contactPerson}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Phone Number
                      </Label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email Address *
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="contact@yourbrand.com"
                        className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={!!errors.email}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-500 animate-fade-in-up" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Address Information */}
                  <div className="space-y-6">
                    <h4 className="font-semibold text-gray-900 text-lg">Business Address</h4>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700 font-medium">
                        Street Address
                      </Label>
                      <div className="relative group">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="123 Main Street"
                          className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700 font-medium">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="New York"
                          className="py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-gray-700 font-medium">
                          State
                        </Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="NY"
                          className="py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-gray-700 font-medium">
                          ZIP Code
                        </Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          placeholder="10001"
                          className="py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">
                        Password *
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="Create a strong password"
                          className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          aria-describedby={errors.password ? "password-error" : undefined}
                          aria-invalid={!!errors.password}
                        />
                      </div>
                      {errors.password && (
                        <p id="password-error" className="text-sm text-red-500 animate-fade-in-up" role="alert">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                        Confirm Password *
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          placeholder="Confirm your password"
                          className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                          aria-invalid={!!errors.confirmPassword}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p id="confirmPassword-error" className="text-sm text-red-500 animate-fade-in-up" role="alert">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
                        className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1"
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor="agreeToTerms"
                          className="text-sm font-medium cursor-pointer text-gray-700 leading-relaxed"
                        >
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                        {errors.agreeToTerms && (
                          <p id="terms-error" className="text-sm text-red-500 animate-fade-in-up" role="alert">
                            {errors.agreeToTerms}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:scale-105 transform px-6 py-3 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform px-6 py-3"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform px-8 py-3"
                  >
                    Register Brand
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105 transform">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-700 mb-2">Secure & Protected</h4>
            <p className="text-sm text-gray-600">Your data is encrypted and secure</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105 transform">
            <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-700 mb-2">Easy Setup</h4>
            <p className="text-sm text-gray-600">Get started in just a few minutes</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105 transform">
            <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-700 mb-2">Free to Start</h4>
            <p className="text-sm text-gray-600">No setup fees or hidden costs</p>
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
