import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Store, Search, HelpCircle, Book, MessageCircle, Mail } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    faqs: [
      {
        question: "How do I register my brand on FindMyDeals?",
        answer:
          "To register your brand, click the 'Register Brand' button on our homepage. Fill out the registration form with your brand information, contact details, and business address. After submission, our team will review your application within 1-2 business days.",
      },
      {
        question: "What information do I need to provide during registration?",
        answer:
          "You'll need to provide your brand name, category, description, contact person details, email, phone number, website URL, and business address. You'll also need to create a secure password for your account.",
      },
      {
        question: "How long does the verification process take?",
        answer:
          "Brand verification typically takes 1-2 business days. We'll send you an email confirmation once your brand has been verified and approved.",
      },
    ],
  },
  {
    id: "managing-offers",
    title: "Managing Offers",
    icon: Store,
    faqs: [
      {
        question: "How do I create a new offer?",
        answer:
          "Log into your dashboard and click 'Create Offer'. Fill out the offer details including title, description, discount type and value, validity period, and any terms and conditions. You can preview your offer before publishing.",
      },
      {
        question: "Can I edit offers after they're published?",
        answer:
          "Yes, you can edit most offer details from your dashboard. However, some changes like discount value may require the offer to be republished. Active offers can be modified without losing their current performance data.",
      },
      {
        question: "How do I deactivate or delete an offer?",
        answer:
          "In your dashboard, find the offer you want to manage and click the three-dot menu. You can choose to deactivate (temporarily hide) or permanently delete the offer. Deactivated offers can be reactivated later.",
      },
      {
        question: "What's the difference between active and inactive offers?",
        answer:
          "Active offers are visible to customers and appear in search results. Inactive offers are hidden from public view but remain in your dashboard for future activation or reference.",
      },
    ],
  },
  {
    id: "account-settings",
    title: "Account & Settings",
    icon: HelpCircle,
    faqs: [
      {
        question: "How do I update my brand information?",
        answer:
          "Go to your dashboard and click on 'Settings'. In the Profile tab, you can update your brand name, description, category, contact information, and business address.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Yes, you can change your email address in the Settings > Profile section. You'll need to verify the new email address before the change takes effect.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "If you're logged in, go to Settings > Security to change your password. If you're locked out, use the 'Forgot Password' link on the login page to reset it via email.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Account deletion is permanent and cannot be undone. Go to Settings > Account > Danger Zone and click 'Delete Account'. All your offers and data will be permanently removed.",
      },
    ],
  },
  {
    id: "analytics-reporting",
    title: "Analytics & Reporting",
    icon: MessageCircle,
    faqs: [
      {
        question: "What analytics are available?",
        answer:
          "You can view offer views, clicks, click-through rates, performance over time, and top-performing offers. Analytics are available in your dashboard under the Analytics section.",
      },
      {
        question: "How often is analytics data updated?",
        answer:
          "Analytics data is updated in real-time for views and clicks. Performance reports and insights are updated daily.",
      },
      {
        question: "Can I export my analytics data?",
        answer:
          "Yes, you can export your analytics data as CSV or PDF reports from the Analytics page. This includes performance metrics, offer statistics, and time-based reports.",
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
     

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Help Center</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions and get the help you need to make the most of FindMyDeals.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search for help..." className="pl-10 pr-4 py-3 text-lg" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Book className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Getting Started</CardTitle>
              <CardDescription>Learn the basics of using FindMyDeals</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Store className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Managing Offers</CardTitle>
              <CardDescription>Create, edit, and manage your offers</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <HelpCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Account Settings</CardTitle>
              <CardDescription>Update your profile and preferences</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Analytics</CardTitle>
              <CardDescription>Understand your performance metrics</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <div key={category.id}>
                <div className="flex items-center space-x-3 mb-6">
                  <IconComponent className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <Badge variant="secondary">{category.faqs.length} articles</Badge>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`} className="px-6">
                          <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Contact Support */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Still Need Help?</CardTitle>
              <CardDescription>Can't find what you're looking for? Our support team is here to help.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="mailto:support@FindMyDeals.com">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Email Us
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
