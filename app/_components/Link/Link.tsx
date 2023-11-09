import NextLink from 'next/link';
import { ComponentProps, FC } from 'react';

const Link: FC<ComponentProps<typeof NextLink>> = ({ href, children }) => {
  return (
    <NextLink className={'text-black font-medium text-sm'} href={href}>
      {children}
    </NextLink>
  );
};

export default Link;
