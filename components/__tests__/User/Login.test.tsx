import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../contexts/AuthContext';
import { User } from '../../../types/common';
import * as UserUtil from '../../../utils/user';
import { Login } from '../../User/Login';

const MOCK_USER: User = {
  id: 'test-id',
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'test',
  avatarUrl: '',
}

const renderWithAuthContext = (children: React.ReactElement) => {
  render(<AuthProvider>{children}</AuthProvider>)
}

describe('User.Login component', () => {
  beforeEach(jest.resetAllMocks);

  it('should render empty form', async () => {
    jest.spyOn(UserUtil, 'login').mockResolvedValue({ user: MOCK_USER, error: null });

    renderWithAuthContext(<Login />);

    expect(await screen.findByPlaceholderText('Eメール')).toBeInTheDocument();
  })

  it('should display form error', async () => {
    jest.spyOn(UserUtil, 'login').mockResolvedValue({ user: null, error: 'Bad Input' });

    renderWithAuthContext(<Login />);

    fireEvent.click(screen.getByRole('button'));

    // One for email, one for password
    expect((await screen.findAllByText('必須')).length).toBe(2);
  })
})