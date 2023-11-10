'use client';

import { FC } from 'react';
import HamburgerMenu from '@components/icons/HamburgerMenu/HamburgerMenu';
import cx from 'classnames';
import { useState } from 'react';
import Link from '@components/Link/Link';
import { useMediaQuery, useIsomorphicLayoutEffect } from 'usehooks-ts';

const MainMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isTablet = useMediaQuery(`(min-width: 641px)`);

  const handleResize = () => {
    if (isTablet) {
      console.log('does this ever fire?');
      setOpen(false);
    }
  };
  const handleClick = () => {
    if (!isTablet) {
      setOpen(!open);
    }
  };

  useIsomorphicLayoutEffect(() => {
    handleResize();
  });
  return (
    <div className="main-menu text-black flex justify-center items-center relative">
      <button onClick={handleClick}>
        <HamburgerMenu />
      </button>
      <div
        className={cx(
          'main-menu-navigation absolute bg-white top-full right-0 rounded px-3 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.10)]',
          { block: open },
          { hidden: !open }
        )}
      >
        <nav>
          <ul>
            <li className="my-3">
              <Link href={'/'}>Dashboard</Link>
            </li>
            <li className="my-3">
              <Link href={'/watchlist'}>Watch List</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainMenu;
