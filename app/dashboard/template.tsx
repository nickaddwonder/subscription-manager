import { FC, ReactNode } from 'react';
import { UserContentProvider } from '@/_context/UserContentContext';

type Props = {
  children: ReactNode;
};

const DashboardTemplate: FC<Props> = ({ children }) => {
  return <UserContentProvider>{children}</UserContentProvider>;
};

export default DashboardTemplate;
