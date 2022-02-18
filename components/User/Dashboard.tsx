import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  // Make sure we don't get value.state and destructure { user }
  // since this will cause the component to listen for all state changes
  const user = useAuthContext((value) => value.state.user);

  if (!user) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div>
      <p>User: {user.email}</p>
    </div>
  );
}