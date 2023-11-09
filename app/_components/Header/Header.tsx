import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';
import NavigationLink from '@components/NavigationLink/NavigationLink';

const Header: FC = () => {
  return (
    <header className="site-header w-full bg-[#f2f4f7] h-[60px]">
      <div className="container px-3 h-full mx-auto">
        <div className="w-auto h-full -mx-3 flex justify-between items-center">
          <div className="left-column h-full w-5/6 flex px-3 flex-col justify-center items-start">
            <div className="titles w-full flex flex-col justify-center items-start">
              <span className="text-xl text-stone-950">
                Subscription Manager
              </span>
            </div>
            {/* <div className="navigation w-full my-3 md:flex md:justify-end md:items-start">
            <NavigationLink href={'/'}>Search</NavigationLink>
            <NavigationLink href={'/watchlist'}>Watchlist</NavigationLink>
          </div> */}
          </div>
          <div className="right-column px-3 w-1/6 h-full flex justify-end items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
