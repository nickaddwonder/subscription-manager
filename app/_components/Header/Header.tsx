import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';
import MainMenu from './MainMenu/MainMenu';

const Header: FC = () => {
  return (
    <header className="site-header h-[60px] w-full bg-white">
      <div className="container mx-auto h-full px-3">
        <div className="-mx-3 flex h-full w-auto items-center justify-between">
          <div className="left-column flex h-full w-auto grow items-center justify-between px-3">
            <span className="text-xl text-stone-950">Subscription Manager</span>
            <MainMenu />
          </div>
          <div className="right-column flex h-full w-auto shrink-0 items-center justify-end px-3">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
