import Link from 'next/link';
import { ComponentProps, FC } from 'react';

const NavigationLink: FC<ComponentProps<typeof Link>> = ({
  href,
  children,
}) => {
  return (
    <Link
      className={
        'text-[#667085] uppercase font-bold rounded-lg bg-opacity-0 tw-border-[#667085] py-1 px-3 mx-1 first:ml-0 last:mr-0 border-2'
      }
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
