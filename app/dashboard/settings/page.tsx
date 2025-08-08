"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Store, ArrowLeft, Save, Trash2, Shield, Bell, Eye, Globe, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    // Brand Information
    brandName: "Fashion Forward",
    email: "contact@fashionforward.com",
    contactPerson: "Sarah Johnson",
    phone: "+1-555-0101",
    website: "https://fashionforward.com",
    description: "Trendy clothing for the modern lifestyle",
    category: "clothing",

    // Address
    address: "123 Fashion Ave",
    city: "New York",
    state: "NY",
    zipCode: "10001",

    // Notification Settings
    emailNotifications: true,
    offerExpiry: true,
    newCustomers: true,
    weeklyReports: false,

    // Privacy Settings
    profileVisible: true,
    showContactInfo: true,
    allowMessages: true,

    // Account Settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [activeTab, setActiveTab] = useState("profile")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSave = (section: string) => {
    console.log(`Saving ${section}:`, formData)
    // Handle save logic here
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Eye },
    { id: "security", label: "Security", icon: Shield },
    { id: "account", label: "Account", icon: Mail },
  ]

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
                <h1 className="text-xl font-bold">Settings</h1>
              </div>
            </div>
            <Badge variant="secondary">Fashion Forward</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your brand account</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                          activeTab === tab.id ? "bg-muted text-primary" : "text-muted-foreground"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Brand Information</CardTitle>
                    <CardDescription>Update your brand's public information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="brandName">Brand Name</Label>
                        <Input
                          id="brandName"
                          value={formData.brandName}
                          onChange={(e) => handleInputChange("brandName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>

                    <Button onClick={() => handleSave("profile")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Update your contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person</Label>
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Business Address</h4>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={() => handleSave("contact")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={formData.emailNotifications}
                        onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Offer Expiry Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when offers are about to expire</p>
                      </div>
                      <Switch
                        checked={formData.offerExpiry}
                        onCheckedChange={(checked) => handleInputChange("offerExpiry", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Customer Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified about new customer interactions</p>
                      </div>
                      <Switch
                        checked={formData.newCustomers}
                        onCheckedChange={(checked) => handleInputChange("newCustomers", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">Receive weekly performance reports</p>
                      </div>
                      <Switch
                        checked={formData.weeklyReports}
                        onCheckedChange={(checked) => handleInputChange("weeklyReports", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("notifications")}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your brand's visibility and privacy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Public Profile</Label>
                        <p className="text-sm text-muted-foreground">Make your brand profile visible to customers</p>
                      </div>
                      <Switch
                        checked={formData.profileVisible}
                        onCheckedChange={(checked) => handleInputChange("profileVisible", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Contact Information</Label>
                        <p className="text-sm text-muted-foreground">Display contact details on public profile</p>
                      </div>
                      <Switch
                        checked={formData.showContactInfo}
                        onCheckedChange={(checked) => handleInputChange("showContactInfo", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Customer Messages</Label>
                        <p className="text-sm text-muted-foreground">Let customers send you direct messages</p>
                      </div>
                      <Switch
                        checked={formData.allowMessages}
                        onCheckedChange={(checked) => handleInputChange("allowMessages", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("privacy")}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange("newPassword", e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("security")}>
                    <Shield className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Manage your account status and subscription</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Account Status</Label>
                        <div className="mt-1">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Member Since</Label>
                        <p className="text-sm text-muted-foreground mt-1">January 15, 2023</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Plan</Label>
                        <p className="text-sm text-muted-foreground mt-1">Free Plan</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Verification Status</Label>
                        <div className="mt-1">
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline">
                      <Globe className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible and destructive actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
