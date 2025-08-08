import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../lib/api';

interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}
interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  preferences: {
    categories: string[];
    notifications: boolean;
    newsletter: boolean;
  };
}

export function useCustomerLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) =>
      apiRequest('/api/auth/customer/login', {
        method: 'POST',
        data: input,
      }),
  });
}

export function useCustomerSignup() {
  return useMutation({
    mutationFn: (input: SignupInput) =>
      apiRequest('/api/auth/customer/register', {
        method: 'POST',
        data: input,
      }),
  });
}

export function useBrandLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) =>
      apiRequest('/api/auth/brand/login', {
        method: 'POST',
        data: input,
      }),
  });
}

export function useBrandSignup() {
  return useMutation({
    mutationFn: (input: any) =>
      apiRequest('/api/auth/brand/register', {
        method: 'POST',
        data: input,
      }),
  });
}