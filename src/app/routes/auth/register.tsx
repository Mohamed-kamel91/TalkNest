import { AuthLayout } from '@/components/layouts/auth-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card';
import { RegisterForm } from '@/features/auth/components/register-form';

export const Register = () => {
  return (
    <AuthLayout
      title="Register"
      description="Join TalkNest and start sharing your ideas."
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            <h1>Create an account</h1>
          </CardTitle>
          <CardDescription>
            Join TalkNest and start sharing your ideas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};
