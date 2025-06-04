import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthFormContainer from '@/components/AuthFormContainer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Terminal } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState<{ message: string; variant: 'default' | 'destructive'; title?: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "user@example.com", // Default credential
      password: "password123", // Default credential
      rememberMe: false,
    }
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log('Login form submitted:', data);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email === "user@example.com" && data.password === "password123") {
      setAlertState({ message: "Login successful! Redirecting...", variant: 'default', title: "Success" });
      // In a real app, set auth token, then navigate
      setTimeout(() => navigate('/'), 1500); // Redirect to homepage after successful login
    } else {
      setAlertState({ message: "Invalid email or password.", variant: 'destructive', title: "Login Failed" });
    }
  };

  return (
    <AuthFormContainer
      title="Login to Your Account"
      description="Enter your credentials below to access your dashboard."
      alertMessage={alertState?.message}
      alertVariant={alertState?.variant}
      alertTitle={alertState?.title}
      footerContent={
        <>
          <Link to="/forgot-password">
            <Button variant="link" className="text-sm">Forgot Password?</Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Need an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" {...register("rememberMe")} />
            <Label htmlFor="rememberMe" className="text-sm font-normal">Remember Me</Label>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default LoginPage;