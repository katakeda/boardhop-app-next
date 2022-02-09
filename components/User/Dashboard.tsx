import React from 'react';
import { useRouter } from 'next/router';
import { useGetUser } from '../../utils/user';

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const { user, isLoading, isError } = useGetUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>
  if (isError) router.push('/user/login');

  return (
    <div>
      <p>User: {user.email}</p>
    </div>
  );
}