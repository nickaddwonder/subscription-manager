import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';
import MainMenu from './MainMenu/MainMenu';

const Header: FC = () => {
  return (
    <header className="site-header w-full bg-white h-[60px]">
      <div className="container px-3 h-full mx-auto">
        <div className="w-auto h-full -mx-3 flex justify-between items-center">
          <div className="left-column h-full w-5/6 flex px-3 justify-between items-center">
            <span className="text-xl text-stone-950">Subscription Manager</span>
            <MainMenu />
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
