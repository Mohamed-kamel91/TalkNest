import { Register } from '@/app/routes/auth/register';
import { paths } from '@/config/paths';
import {
  createUser,
  renderApp,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '@/tests/test-utils';

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  describe('form validation', () => {
    test('displays validation errors when form is submitted with empty fields', async () => {
      const user = userEvent.setup();
      await renderApp(<LoginForm />, { user: null });

      // No validation errors initially
      expect(screen.queryAllByRole('alert')).toHaveLength(0);

      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.click(loginButton);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      expect(passwordInput).toHaveAttribute('aria-invalid', 'true');

      // Validation errors are visible
      expect(screen.getByTestId(`${emailInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${passwordInput.id}-field-error`)).toBeVisible();
    });

    test('clears validation errors when user enters valid input', async () => {
      const user = userEvent.setup();
      await renderApp(<LoginForm />, { user: null });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'invalidemail@');
      await user.type(passwordInput, 'invalidpassword');

      await user.click(loginButton);

      expect(screen.getByTestId(`${emailInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${passwordInput.id}-field-error`)).toBeVisible();

      // Clear and enter valid data
      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.type(emailInput, 'validemail@gmail.com');
      await user.type(passwordInput, 'Valid@password1');

      // Validation errors disappear
      expect(screen.queryByTestId(`${emailInput.id}-field-error`)).not.toBeInTheDocument();
      expect(screen.queryByTestId(`${passwordInput.id}-field-error`)).not.toBeInTheDocument();
    });
  });

  describe('form submission', () => {
    test('redirects user to home page after user login successfully', async () => {
      const mockUser = await createUser();

      const user = userEvent.setup();
      await renderApp(<LoginForm />, {
        user: null,
        path: paths.auth.login.path,
        url: '/login?redirectTo=%2Fposts',
        routes: [{ path: '/posts', element: <div data-testid="posts-page">Posts Page</div> }],
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, mockUser.email);
      await user.type(passwordInput, mockUser.password);

      await user.click(loginButton);

      // Show spinner and disable login button
      const spinner = await screen.findByRole('status', { name: /loading/i });

      expect(spinner).toBeVisible();
      expect(loginButton).toBeDisabled();

      // Redirect user to posts page
      await screen.findByTestId('posts-page');
    });
  });

  describe('error handling', () => {
    test('displays "invalid credentials" error message', async () => {
      const mockUser = await createUser();

      const user = userEvent.setup();
      await renderApp(<LoginForm />, { user: null });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'wrongemail@gmail.com');
      await user.type(passwordInput, mockUser.password);

      await user.click(loginButton);

      // Spinner should disappear
      await waitForElementToBeRemoved(() => {
        return screen.queryByRole('status', { name: /loading/i });
      });

      // Invalid credentials error message appears
      const errorMessage = await screen.findByTestId('auth-form-error');
      expect(errorMessage).toBeVisible();
      expect(errorMessage).toHaveTextContent(/invalid email or password/i);
    });
  });

  describe('user interactions', () => {
    test('navigates to sign up page when link is clicked', async () => {
      const user = userEvent.setup();
      await renderApp(<LoginForm />, {
        user: null,
        path: paths.auth.login.path,
        url: '/login',
        routes: [
          {
            path: paths.auth.register.path,
            Component: Register,
          },
        ],
      });

      const signupLink = screen.getByRole('link', { name: /sign up/i });

      await user.click(signupLink);

      expect(await screen.findByRole('heading', { name: /create an account/i })).toBeVisible();
    });
  });

  describe('accessibility', () => {
    test('shows accessible validation errors', async () => {
      const user = userEvent.setup();
      await renderApp(<LoginForm />, { user: null });

      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.click(loginButton);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      // show validation errors
      expect(screen.getByTestId(`${emailInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${passwordInput.id}-field-error`)).toBeVisible();

      // Inputs are properly linked with errors
      expect(emailInput).toHaveAttribute('aria-describedby');
      expect(emailInput).toHaveAccessibleDescription(/required/i);

      expect(passwordInput).toHaveAttribute('aria-describedby');
      expect(passwordInput).toHaveAccessibleDescription(/required/i);
    });
  });
});
