import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';
import NavigationLink from '@components/NavigationLink/NavigationLink';
import SearchBar from '../SearchBar/SearchBar';

type Props = {
  title: string;
  subtitle?: string;
  search?: boolean;
};

const Header: FC<Props> = ({ title = 'Title', subtitle, search = false }) => {
  return (
    <header className="site-header w-full bg-[#f2f4f7] text-black">
      <div className="w-full flex justify-between items-start md:items-center p-2">
        <div className="left-column w-5/6 flex flex-col justify-center items-start md:flex-row md:items-center">
          <div className="titles w-full flex flex-col justify-center items-start">
            <span className="text-4xl text-[#272b33]">{title}</span>
            {subtitle && (
              <span className="text-lg text-[#667085]">{subtitle}</span>
            )}
          </div>
          <div className="navigation w-full my-3 md:flex md:justify-end md:items-start">
            <NavigationLink href={'/'}>Search</NavigationLink>
            <NavigationLink href={'/watchlist'}>Watchlist</NavigationLink>
          </div>
        </div>
        <div className="right-column w-1/6 h-full flex justify-end items-start">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      {search && (
        <div className="w-full p-2">
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default Header;
