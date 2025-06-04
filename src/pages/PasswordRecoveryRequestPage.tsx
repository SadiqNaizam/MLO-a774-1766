import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthFormContainer from '@/components/AuthFormContainer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Terminal } from 'lucide-react';

const recoverySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type RecoveryFormValues = z.infer<typeof recoverySchema>;

const PasswordRecoveryRequestPage = () => {
  console.log('PasswordRecoveryRequestPage loaded');
  const [alertState, setAlertState] = useState<{ message: string; variant: 'default' | 'destructive'; title?: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
  });

  const onSubmit: SubmitHandler<RecoveryFormValues> = async (data) => {
    console.log('Password recovery request submitted:', data);
    setAlertState(null);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate sending email
    setAlertState({
      message: "If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).",
      variant: 'default', // 'default' variant usually indicates info/success in shadcn Alert
      title: "Check Your Email"
    });
  };

  return (
    <AuthFormContainer
      title="Forgot Your Password?"
      description="Enter your email address below and we'll send you a link to reset your password."
      alertMessage={alertState?.message}
      alertVariant={alertState?.variant}
      alertTitle={alertState?.title}
      footerContent={
        <Link to="/login">
          <Button variant="link" className="text-sm">Back to Login</Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <Button type="submit" className="w-full">
          Send Password Reset Link
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default PasswordRecoveryRequestPage;