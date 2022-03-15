import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../contexts/AuthContext';
import { User } from '../../../types/common';
import * as UserUtil from '../../../utils/user';
import { Dashboard } from '../../User/Dashboard';
import { act } from 'react-dom/test-utils';

const MOCK_USER: User = {
  id: 'test-id',
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'test',
  avatarUrl: '',
}

const renderWithAuthContext = (children: React.ReactElement) => {
  render(<AuthProvider>{children}</AuthProvider>);
}

describe('User.Dashboard component', () => {
  beforeEach(jest.resetAllMocks);

  it('should be loading when user is empty', async () => {
    jest.spyOn(UserUtil, 'getUser').mockResolvedValue({ user: MOCK_USER, error: null });

    renderWithAuthContext(<Dashboard />);

    expect(await screen.findByText('Loading')).toBeInTheDocument();
  })

  it('should render a user email', async () => {
    jest.spyOn(UserUtil, 'getUser').mockResolvedValue({ user: MOCK_USER, error: null });

    renderWithAuthContext(<Dashboard />);

    await waitFor(() => {
      expect(UserUtil.getUser).toBeCalledTimes(1);
    });

    expect(await screen.findByText('User: test@test.com')).toBeInTheDocument();
  })
})
