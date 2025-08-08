"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Store, ArrowLeft, TrendingUp, Eye, MousePointer, Calendar, Download, BarChart3 } from "lucide-react"
import Link from "next/link"

const analyticsData = {
  overview: {
    totalViews: 15420,
    totalClicks: 892,
    clickRate: 5.8,
    activeOffers: 3,
    totalOffers: 8,
  },
  monthlyData: [
    { month: "Jan", views: 1200, clicks: 65 },
    { month: "Feb", views: 1450, clicks: 78 },
    { month: "Mar", views: 1680, clicks: 89 },
    { month: "Apr", views: 1890, clicks: 102 },
    { month: "May", views: 2100, clicks: 125 },
    { month: "Jun", views: 2340, clicks: 145 },
    { month: "Jul", views: 2560, clicks: 168 },
  ],
  topOffers: [
    {
      id: 1,
      title: "50% Off Summer Collection",
      views: 5420,
      clicks: 312,
      clickRate: 5.8,
      status: "active",
    },
    {
      id: 2,
      title: "Free Shipping Weekend",
      views: 3890,
      clicks: 234,
      clickRate: 6.0,
      status: "active",
    },
    {
      id: 3,
      title: "Student Discount",
      views: 2100,
      clicks: 89,
      clickRate: 4.2,
      status: "active",
    },
  ],
}

export default function AnalyticsPage() {
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
                <BarChart3 className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Analytics</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="30days">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalClicks}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.clickRate}%</div>
              <p className="text-xs text-muted-foreground">-0.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.activeOffers}</div>
              <p className="text-xs text-muted-foreground">{analyticsData.overview.totalOffers} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4K</div>
              <p className="text-xs text-muted-foreground">Engagement score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Views and clicks over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Views</span>
                          <span className="font-medium">{data.views}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(data.views / 3000) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Clicks</span>
                          <span className="font-medium">{data.clicks}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(data.clicks / 200) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Offers */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Offers</CardTitle>
                <CardDescription>Your best performing offers this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.topOffers.map((offer, index) => (
                  <div key={offer.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm line-clamp-2">{offer.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{offer.views} views</span>
                          <span>•</span>
                          <span>{offer.clicks} clicks</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {offer.clickRate}%
                      </Badge>
                    </div>
                    {index < analyticsData.topOffers.length - 1 && <div className="border-b" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/offers/new">
                    <Store className="h-4 w-4 mr-2" />
                    Create New Offer
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/settings">
                    <Eye className="h-4 w-4 mr-2" />
                    View Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Offer Performance</CardTitle>
              <CardDescription>Detailed breakdown of all your offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topOffers.map((offer) => (
                  <div key={offer.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{offer.title}</h4>
                      <Badge variant={offer.status === "active" ? "default" : "secondary"}>{offer.status}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-medium">{offer.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-medium">{offer.clicks}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rate</p>
                        <p className="font-medium">{offer.clickRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights & Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions to improve performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Optimize Timing</h4>
                <p className="text-sm text-blue-800">
                  Your offers perform 23% better when posted on weekdays. Consider scheduling future offers accordingly.
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Trending Category</h4>
                <p className="text-sm text-green-800">
                  Summer fashion offers are trending 45% higher this month. Consider creating more seasonal content.
                </p>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Engagement Opportunity</h4>
                <p className="text-sm text-orange-800">
                  Your click rate is below average. Try using more compelling call-to-action phrases.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
