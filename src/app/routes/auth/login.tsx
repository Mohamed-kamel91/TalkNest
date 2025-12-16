import { AuthLayout } from '@/components/layouts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card';
import { LoginForm } from '@/features/auth/components/login-form';

export const Login = () => {
  return (
    <AuthLayout
      title="Login"
      description="Welcome back! Login to your account to continue."
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            <h1>Welcome back</h1>
          </CardTitle>
          <CardDescription>
            Login to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};
