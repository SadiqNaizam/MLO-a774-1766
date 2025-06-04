import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthFormContainer from '@/components/AuthFormContainer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Terminal } from 'lucide-react';

const resetSchema = z.object({
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});

type ResetFormValues = z.infer<typeof resetSchema>;

const PasswordResetPage = () => {
  console.log('PasswordResetPage loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Example: how to get token from URL

  const [alertState, setAlertState] = useState<{ message: string; variant: 'default' | 'destructive'; title?: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  // Effect to check for token (optional, depends on actual implementation)
  React.useEffect(() => {
    if (!token) {
      setAlertState({ message: "Invalid or missing password reset token.", variant: 'destructive', title: "Error" });
      // Optionally redirect or disable form
    }
    console.log("Reset token from URL:", token);
  }, [token]);

  const onSubmit: SubmitHandler<ResetFormValues> = async (data) => {
    console.log('Password reset form submitted:', data, "with token:", token);
    setAlertState(null);

    if (!token) {
      setAlertState({ message: "Cannot reset password without a valid token.", variant: 'destructive', title: "Error" });
      return;
    }
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success
    setAlertState({ message: "Password has been reset successfully! You can now login with your new password.", variant: 'default', title: "Password Updated" });
    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <AuthFormContainer
      title="Reset Your Password"
      description="Enter your new password below. Make sure it's strong and memorable."
      alertMessage={alertState?.message}
      alertVariant={alertState?.variant}
      alertTitle={alertState?.title}
      footerContent={
        <Link to="/login">
          <Button variant="link" className="text-sm">Back to Login</Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="••••••••"
            {...register("newPassword")}
            disabled={!token}
          />
          {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
          <Input
            id="confirmNewPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmNewPassword")}
            disabled={!token}
          />
          {errors.confirmNewPassword && <p className="text-sm text-destructive">{errors.confirmNewPassword.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={!token}>
          Reset Password
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default PasswordResetPage;