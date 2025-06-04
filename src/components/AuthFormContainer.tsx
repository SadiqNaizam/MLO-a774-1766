import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Assuming AlertTitle might be useful
import { Terminal } from 'lucide-react'; // Example icon for Alert

interface AuthFormContainerProps {
  title: string;
  description?: string; // Optional description below the title
  children: React.ReactNode; // For the form elements (Input, Button, Checkbox etc.)
  alertMessage?: string;
  alertVariant?: 'default' | 'destructive';
  alertTitle?: string; // Optional title for the alert
  footerContent?: React.ReactNode; // For links like "Forgot password?", "Sign up"
  className?: string; // Allow additional styling
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  description,
  children,
  alertMessage,
  alertVariant = 'default',
  alertTitle,
  footerContent,
  className,
}) => {
  console.log("Rendering AuthFormContainer with title:", title);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 ${className}`}>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {alertMessage && (
            <Alert variant={alertVariant}>
              {/* You can add an icon based on variant if desired */}
              {/* <Terminal className="h-4 w-4" /> */}
              {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
              <AlertDescription>
                {alertMessage}
              </AlertDescription>
            </Alert>
          )}
          {children}
        </CardContent>
        {footerContent && (
          <CardFooter className="flex flex-col items-center space-y-2 pt-4">
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthFormContainer;