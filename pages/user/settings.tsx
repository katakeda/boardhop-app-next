import type { ReactElement } from 'react';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { Dashboard } from '../../components/User/Dashboard';
import type { NextPageWithLayout } from '../../types/common';

const UserPage: NextPageWithLayout = () => {
  return (
    <Dashboard />
  );
}

UserPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default UserPage;