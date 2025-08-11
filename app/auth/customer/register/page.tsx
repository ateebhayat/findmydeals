'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Store, Mail, Lock, User, ArrowRight, Eye, EyeOff, Gift, Users, Shield, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';

// Zod validation schema
const customerRegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .regex(/^[a-zA-Z\s-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters')
      .regex(/^[a-zA-Z\s-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
    email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
    phone: z
      .string()
      .optional()
      .refine(phone => {
        if (!phone || phone.trim() === '') return true;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
      }, 'Please enter a valid phone number'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be less than 100 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
    subscribeNewsletter: z.boolean().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type CustomerRegisterForm = z.infer<typeof customerRegisterSchema>;

export default function CustomerRegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerRegisterForm, string>>>({});
  const [isValidating, setIsValidating] = useState(false);
  const { register , registrationPending} = useAuth();

  // Handle input changes with real-time validation
  const handleInputChange = (field: keyof CustomerRegisterForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Real-time validation for specific fields (simplified approach)
    if (typeof value === 'string' && value.length > 0) {
      // Only validate specific fields individually to avoid complex refinement issues
      let fieldError: string | undefined;

      switch (field) {
        case 'firstName':
        case 'lastName':
          if (value.length < 2) {
            fieldError = `${field === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
          } else if (!/^[a-zA-Z\s-']+$/.test(value)) {
            fieldError = `${field === 'firstName' ? 'First' : 'Last'} name can only contain letters, spaces, hyphens, and apostrophes`;
          }
          break;
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            fieldError = 'Please enter a valid email address';
          }
          break;
        case 'password':
          if (value.length < 8) {
            fieldError = 'Password must be at least 8 characters';
          } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            fieldError = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
          }
          break;
        case 'phone':
          if (value && value.trim() !== '') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
              fieldError = 'Please enter a valid phone number';
            }
          }
          break;
      }

      if (fieldError) {
        setErrors(prev => ({
          ...prev,
          [field]: fieldError,
        }));
      }
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    setIsValidating(true);
    try {
      customerRegisterSchema.parse(formData);
      setErrors({});
      setIsValidating(false);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Partial<Record<keyof CustomerRegisterForm, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            formErrors[err.path[0] as keyof CustomerRegisterForm] = err.message;
          }
        });
        setErrors(formErrors);
      }
      setIsValidating(false);
      return false;
    }
  };
console.log({registrationPending})
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    await register(formData, 'user');
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
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Store className="h-8 w-8 text-white" />
                </div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">BrandOffers</span>
            </Link>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Join the
                <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Smart Shopping</span>
                Revolution
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">Create your free account and start saving money with exclusive deals from top brands.</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Exclusive Member Deals</h3>
                <p className="text-gray-600">Access special offers only for registered members</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Personalized Recommendations</h3>
                <p className="text-gray-600">Get offers tailored to your interests and preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">100% Free Forever</h3>
                <p className="text-gray-600">No hidden fees, no subscriptions, completely free</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
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
                  <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">BrandOffers</span>
                </Link>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Create Account</CardTitle>
              <CardDescription className="text-lg text-gray-600">Join thousands of smart shoppers saving money every day</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={e => handleInputChange('firstName', e.target.value)}
                        className={`pl-10 border-2 ${
                          errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        } focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl h-12`}
                        required
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={e => handleInputChange('lastName', e.target.value)}
                        className={`pl-10 border-2 ${
                          errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        } focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl h-12`}
                        required
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      className={`pl-10 border-2 ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      } focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl h-12`}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number (Optional)
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      className={`pl-10 border-2 ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      } focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl h-12`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create password"
                        value={formData.password}
                        onChange={e => handleInputChange('password', e.target.value)}
                        className={`pl-10 pr-10 border-2 ${
                          errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        } focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl h-12`}
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
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={e => handleInputChange('confirmPassword', e.target.value)}
                        className={`pl-10 pr-10 border-2 ${
                          errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        } focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl h-12`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={checked => handleInputChange('agreeToTerms', checked === 'indeterminate' ? false : checked)}
                      className={`border-2 ${
                        errors.agreeToTerms ? 'border-red-500' : 'border-gray-300'
                      } data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1`}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                      I agree to the{' '}
                      <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="newsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={checked => handleInputChange('subscribeNewsletter', checked === 'indeterminate' ? false : checked)}
                      className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1"
                    />
                    <Label htmlFor="newsletter" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                      Subscribe to our newsletter for exclusive deals and updates (recommended)
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={registrationPending || !formData.agreeToTerms || isValidating}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg font-semibold hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {registrationPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 transform h-12"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 transform h-12"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/auth/customer/login" className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-300">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Are you a brand?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
                Brand Registration
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
  );
}
