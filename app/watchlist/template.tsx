import { UserContentProvider } from '@/_context/UserContentContext';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const WatchlistTemplate: FC<Props> = ({ children }) => {
  return <UserContentProvider>{children}</UserContentProvider>;
};

export default WatchlistTemplate;
