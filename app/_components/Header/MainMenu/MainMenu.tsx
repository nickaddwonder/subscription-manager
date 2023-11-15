'use client';

import { FC } from 'react';
import HamburgerMenu from '@components/icons/HamburgerMenu/HamburgerMenu';
import { useState } from 'react';
import Link from '@components/Link/Link';
import { useMediaQuery, useIsomorphicLayoutEffect } from 'usehooks-ts';

const MainMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [mobileMenuDisabled, setMobileMenuDisabled] = useState<boolean>(false);
  const isLg = useMediaQuery(`(min-width: 769px)`);

  const handleResize = () => {
    if (isLg) {
      setOpen(false);
    }
  };
  const handleClick = () => {
    if (!isLg) {
      setOpen(!open);
    }
  };

  const isMobileMenuDisabled = () => {
    if (isLg) {
      setMobileMenuDisabled(true);
    } else {
      setMobileMenuDisabled(false);
    }
  };

  useIsomorphicLayoutEffect(() => {
    handleResize();
    isMobileMenuDisabled();
  });
  return (
    <div className="main-menu relative flex items-center justify-center text-black">
      <button
        className="md:hidden"
        disabled={mobileMenuDisabled}
        onClick={handleClick}
      >
        <HamburgerMenu />
      </button>
      <div
        className={`main-menu-navigation absolute right-0 top-full rounded bg-white px-3 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.10)] md:relative md:right-auto md:top-auto md:rounded-none md:drop-shadow-none
          ${open && !isLg && 'block'},
          ${!open && !isLg && 'hidden'},
          ${isLg && 'block'}`}
        suppressHydrationWarning
      >
        <nav>
          <ul className="md:flex md:items-center md:justify-center">
            <li className="my-3 md:mx-3 md:my-0">
              <Link href={'/'}>Dashboard</Link>
            </li>
            <li className="my-3 md:mx-3 md:my-0">
              <Link href={'/watchlist'}>Watch List</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainMenu;
