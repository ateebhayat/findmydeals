import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store, Check, Star, Crown } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for small businesses getting started",
    icon: Store,
    popular: false,
    features: [
      "Up to 3 active offers",
      "Basic analytics",
      "Standard support",
      "Public brand profile",
      "Email notifications",
    ],
    limitations: ["Limited to 1,000 views per month", "Basic offer customization", "Standard listing priority"],
  },
  {
    name: "Professional",
    price: "$29",
    period: "per month",
    description: "Ideal for growing brands with more offers",
    icon: Star,
    popular: true,
    features: [
      "Up to 25 active offers",
      "Advanced analytics & insights",
      "Priority support",
      "Enhanced brand profile",
      "Custom offer scheduling",
      "Email & SMS notifications",
      "Export analytics data",
      "Featured listing placement",
    ],
    limitations: ["Up to 50,000 views per month"],
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For large brands with extensive offer campaigns",
    icon: Crown,
    popular: false,
    features: [
      "Unlimited active offers",
      "Advanced analytics & AI insights",
      "Dedicated account manager",
      "Premium brand profile",
      "Advanced offer customization",
      "Multi-channel notifications",
      "API access",
      "White-label options",
      "Priority listing placement",
      "Custom integrations",
      "Advanced reporting",
    ],
    limitations: ["Unlimited views"],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your brand. Start free and upgrade as you grow.
          </p>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ✨ 30-day free trial on all paid plans
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const IconComponent = plan.icon
              return (
                <Card
                  key={plan.name}
                  className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button
                      className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/auth/register">{plan.name === "Free" ? "Get Started" : "Start Free Trial"}</Link>
                    </Button>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm uppercase tracking-wide">Features Included</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Compare Plans</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what's included in each plan to find the perfect fit for your brand.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Features</th>
                        <th className="text-center p-4 font-semibold">Free</th>
                        <th className="text-center p-4 font-semibold">Professional</th>
                        <th className="text-center p-4 font-semibold">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4">Active Offers</td>
                        <td className="text-center p-4">3</td>
                        <td className="text-center p-4">25</td>
                        <td className="text-center p-4">Unlimited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">Monthly Views</td>
                        <td className="text-center p-4">1,000</td>
                        <td className="text-center p-4">50,000</td>
                        <td className="text-center p-4">Unlimited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">Analytics</td>
                        <td className="text-center p-4">Basic</td>
                        <td className="text-center p-4">Advanced</td>
                        <td className="text-center p-4">AI-Powered</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">Support</td>
                        <td className="text-center p-4">Standard</td>
                        <td className="text-center p-4">Priority</td>
                        <td className="text-center p-4">Dedicated Manager</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">API Access</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">✅</td>
                      </tr>
                      <tr>
                        <td className="p-4">White-label Options</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">✅</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate any billing differences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if I exceed my plan limits?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We'll notify you when you're approaching your limits. If you exceed them, we'll suggest upgrading to a
                  higher plan to continue service without interruption.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a setup fee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No setup fees! You only pay the monthly subscription fee. The Free plan is completely free forever.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll continue to have access to paid features
                  until the end of your billing period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of brands already using FindMyDeals to connect with customers and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
