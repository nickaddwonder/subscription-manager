'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState, ReactNode, FC } from 'react';

type Props = {
  children: ReactNode;
};

const ReactQueryProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
