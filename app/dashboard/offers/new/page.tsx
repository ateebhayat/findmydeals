"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, CalendarIcon, Store, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function NewOfferPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountType: "",
    discountValue: "",
    category: "",
    validFrom: new Date(),
    validUntil: undefined as Date | undefined,
    isActive: true,
    terms: "",
    location: "",
    maxRedemptions: "",
    promoCode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.discountType) newErrors.discountType = "Discount type is required"
    if (!formData.discountValue.trim()) newErrors.discountValue = "Discount value is required"
    if (!formData.validUntil) newErrors.validUntil = "End date is required"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Offer created:", formData)
      // Redirect to dashboard
      window.location.href = "/dashboard"
    }
  }

  const handleInputChange = (field: string, value: string | boolean | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Store className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Create New Offer</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" type="button">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button form="offer-form" type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Offer
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form id="offer-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Provide the essential details about your offer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Offer Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., 50% Off Summer Collection"
                      aria-describedby={errors.title ? "title-error" : undefined}
                      aria-invalid={!!errors.title}
                    />
                    {errors.title && (
                      <p id="title-error" className="text-sm text-destructive" role="alert">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your offer in detail..."
                      className="min-h-[100px]"
                      aria-describedby={errors.description ? "description-error" : undefined}
                      aria-invalid={!!errors.description}
                    />
                    {errors.description && (
                      <p id="description-error" className="text-sm text-destructive" role="alert">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="discountType">Discount Type *</Label>
                      <Select
                        value={formData.discountType}
                        onValueChange={(value) => handleInputChange("discountType", value)}
                      >
                        <SelectTrigger
                          id="discountType"
                          aria-describedby={errors.discountType ? "discountType-error" : undefined}
                        >
                          <SelectValue placeholder="Select discount type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage Off</SelectItem>
                          <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                          <SelectItem value="bogo">Buy One Get One</SelectItem>
                          <SelectItem value="free-shipping">Free Shipping</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.discountType && (
                        <p id="discountType-error" className="text-sm text-destructive" role="alert">
                          {errors.discountType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discountValue">Discount Value *</Label>
                      <Input
                        id="discountValue"
                        value={formData.discountValue}
                        onChange={(e) => handleInputChange("discountValue", e.target.value)}
                        placeholder="e.g., 50, $25, Free"
                        aria-describedby={errors.discountValue ? "discountValue-error" : undefined}
                        aria-invalid={!!errors.discountValue}
                      />
                      {errors.discountValue && (
                        <p id="discountValue-error" className="text-sm text-destructive" role="alert">
                          {errors.discountValue}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger id="category">
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
                  </div>
                </CardContent>
              </Card>

              {/* Validity Period */}
              <Card>
                <CardHeader>
                  <CardTitle>Validity Period</CardTitle>
                  <CardDescription>Set when your offer is valid</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Valid From</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.validFrom && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.validFrom ? format(formData.validFrom, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.validFrom}
                            onSelect={(date) => handleInputChange("validFrom", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Valid Until *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.validUntil && "text-muted-foreground",
                            )}
                            aria-describedby={errors.validUntil ? "validUntil-error" : undefined}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.validUntil ? format(formData.validUntil, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.validUntil}
                            onSelect={(date) => handleInputChange("validUntil", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.validUntil && (
                        <p id="validUntil-error" className="text-sm text-destructive" role="alert">
                          {errors.validUntil}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                  <CardDescription>Optional information to enhance your offer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="terms">Terms & Conditions</Label>
                    <Textarea
                      id="terms"
                      value={formData.terms}
                      onChange={(e) => handleInputChange("terms", e.target.value)}
                      placeholder="Enter any terms and conditions..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="e.g., New York, NY or Online"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxRedemptions">Max Redemptions</Label>
                      <Input
                        id="maxRedemptions"
                        type="number"
                        value={formData.maxRedemptions}
                        onChange={(e) => handleInputChange("maxRedemptions", e.target.value)}
                        placeholder="Leave empty for unlimited"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promoCode">Promo Code</Label>
                    <Input
                      id="promoCode"
                      value={formData.promoCode}
                      onChange={(e) => handleInputChange("promoCode", e.target.value)}
                      placeholder="e.g., SUMMER50"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                    />
                    <Label htmlFor="isActive">{formData.isActive ? "Active" : "Inactive"}</Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {formData.isActive
                      ? "This offer will be visible to customers"
                      : "This offer will be saved as draft"}
                  </p>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold">{formData.title || "Offer Title"}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formData.description || "Offer description will appear here..."}
                    </p>
                    {formData.discountValue && (
                      <div className="text-sm font-medium text-green-600">
                        {formData.discountValue}
                        {formData.discountType === "percentage" ? "% OFF" : " OFF"}
                      </div>
                    )}
                    {formData.validUntil && (
                      <p className="text-xs text-muted-foreground">
                        Valid until {format(formData.validUntil, "MMM dd, yyyy")}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium">Write compelling titles</h5>
                    <p className="text-muted-foreground">Use action words and specific discount amounts</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Clear descriptions</h5>
                    <p className="text-muted-foreground">Explain what's included and any restrictions</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Set realistic dates</h5>
                    <p className="text-muted-foreground">Give customers enough time to take advantage</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
