import { useRouter } from 'next/router';
import React from 'react';

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>User: {id}</p>
    </div>
  );
}