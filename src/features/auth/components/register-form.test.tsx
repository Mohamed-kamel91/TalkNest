import { Login } from '@/app/routes/auth/login';
import { paths } from '@/config/paths';
import { createUser } from '@/tests/data-generators';
import {
  renderApp,
  screen,
  createUser as createUserInDB,
  userEvent,
  waitForElementToBeRemoved,
} from '@/tests/test-utils';

import { RegisterForm } from './register-form';

describe('RegisterForm', () => {
  describe('form validation', () => {
    test('displays validation errors when form is submitted with empty fields', async () => {
      const user = userEvent.setup();
      await renderApp(<RegisterForm />);

      // No validation errors initially
      expect(screen.queryAllByRole('alert')).toHaveLength(0);

      const signupButton = screen.getByRole('button', { name: /sign up/i });

      await user.click(signupButton);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
      expect(lastNameInput).toHaveAttribute('aria-invalid', 'true');
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      expect(passwordInput).toHaveAttribute('aria-invalid', 'true');

      // Validation errors are visible
      expect(screen.getByTestId(`${firstNameInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${lastNameInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${emailInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${passwordInput.id}-field-error`)).toBeVisible();
    });

    test('clears validation errors when user enters valid input', async () => {
      const user = userEvent.setup();
      await renderApp(<RegisterForm />, { user: null });

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const signupButton = screen.getByRole('button', { name: /sign up/i });

      await user.type(firstNameInput, 'ab');
      await user.type(lastNameInput, 'ab');
      await user.type(emailInput, 'invalidemail@');
      await user.type(passwordInput, 'invalidpassword');

      await user.click(signupButton);

      expect(screen.getByTestId(`${firstNameInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${lastNameInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${emailInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${passwordInput.id}-field-error`)).toBeVisible();

      // Clear and enter valid data
      await user.clear(firstNameInput);
      await user.clear(lastNameInput);
      await user.clear(emailInput);
      await user.clear(passwordInput);

      await user.type(firstNameInput, 'Mohamed');
      await user.type(lastNameInput, 'Kamel');
      await user.type(emailInput, 'validemail@gmail.com');
      await user.type(passwordInput, 'Hello@world1');

      // Validation errors disappeared
      expect(screen.queryByTestId(`${firstNameInput.id}-field-error`)).not.toBeInTheDocument();
      expect(screen.queryByTestId(`${lastNameInput.id}-field-error`)).not.toBeInTheDocument();
      expect(screen.queryByTestId(`${emailInput.id}-field-error`)).not.toBeInTheDocument();
      expect(screen.queryByTestId(`${passwordInput.id}-field-error`)).not.toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    test('displays "email already exists" error message', async () => {
      const mockUser = await createUserInDB();

      const user = userEvent.setup();
      await renderApp(<RegisterForm />, { user: null });

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const signupButton = screen.getByRole('button', { name: /sign up/i });

      await user.type(firstNameInput, mockUser.firstName);
      await user.type(lastNameInput, mockUser.lastName);
      await user.type(emailInput, mockUser.email);
      await user.type(passwordInput, mockUser.password);

      await user.click(signupButton);

      // Spinner should disappear
      await waitForElementToBeRemoved(() => {
        return screen.queryByRole('status', { name: /loading/i });
      });

      // Email exists error message appears
      const errorMessage = await screen.findByTestId('auth-form-error');
      expect(errorMessage).toBeVisible();
      expect(errorMessage).toHaveTextContent(/email already exists/i);
    });
  });

  describe('user interactions', () => {
    test('navigates to sign up page when link is clicked', async () => {
      const user = userEvent.setup();
      await renderApp(<RegisterForm />, {
        user: null,
        path: paths.auth.register.path,
        url: '/register',
        routes: [
          {
            path: paths.auth.login.path,
            Component: Login,
          },
        ],
      });

      const loginLink = screen.getByRole('link', { name: /login/i });

      await user.click(loginLink);

      expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeVisible();
    });
  });

  describe('form submission', () => {
    test('Sign up user successfully and redirect user to posts page', async () => {
      const mockUser = createUser();

      const user = userEvent.setup();
      await renderApp(<RegisterForm />, {
        user: null,
        path: paths.auth.register.path,
        url: '/register?redirectTo=%2Fposts',
        routes: [
          {
            path: '/posts',
            element: <div data-testid="posts-page">Posts Page</div>,
          },
        ],
      });

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const signupButton = screen.getByRole('button', { name: /sign up/i });

      await user.type(firstNameInput, mockUser.firstName);
      await user.type(lastNameInput, mockUser.lastName);
      await user.type(emailInput, mockUser.email);
      await user.type(passwordInput, mockUser.password);

      await user.click(signupButton);

      const spinner = await screen.findByRole('status', { name: /loading/i });

      expect(spinner).toBeVisible();
      expect(signupButton).toBeDisabled();

      // Verify that user is redirected to posts page
      await screen.findByTestId('posts-page');
    });
  });

  describe('accessibility', () => {
    test('shows accessible validation errors', async () => {
      const user = userEvent.setup();
      await renderApp(<RegisterForm />);

      const signupButton = screen.getByRole('button', { name: /sign up/i });

      await user.click(signupButton);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      // Errors are visible
      expect(screen.getByTestId(`${firstNameInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${lastNameInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${emailInput.id}-field-error`)).toBeVisible();
      expect(screen.getByTestId(`${passwordInput.id}-field-error`)).toBeVisible();

      // Inputs are properly linked with errors
      expect(firstNameInput).toHaveAttribute('aria-describedby');
      expect(firstNameInput).toHaveAccessibleDescription(/required/i);

      expect(lastNameInput).toHaveAttribute('aria-describedby');
      expect(lastNameInput).toHaveAccessibleDescription(/required/i);

      expect(emailInput).toHaveAttribute('aria-describedby');
      expect(emailInput).toHaveAccessibleDescription(/required/i);

      expect(passwordInput).toHaveAttribute('aria-describedby');
      expect(passwordInput).toHaveAccessibleDescription(/required/i);
    });
  });
});
