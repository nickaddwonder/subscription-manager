'use client';

import { FC, useEffect } from 'react';
import HamburgerMenu from '@components/icons/HamburgerMenu/HamburgerMenu';
import { useState } from 'react';
import Link from '@components/Link/Link';
import { useMediaQuery, useIsomorphicLayoutEffect } from 'usehooks-ts';
import { usePathname } from 'next/navigation';

const MainMenu: FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [mobileMenuDisabled, setMobileMenuDisabled] = useState<boolean>(false);
  const isLg = useMediaQuery(`(min-width: 769px)
  `);

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <div className="main-menu relative z-10 flex items-center justify-center text-black">
      <button
        className="md:hidden"
        disabled={mobileMenuDisabled}
        onClick={handleClick}
      >
        <HamburgerMenu />
      </button>
      <div
        className={`main-menu-navigation absolute right-0 top-full rounded bg-white px-3 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.10)] md:relative md:right-auto md:top-auto md:block md:rounded-none md:drop-shadow-none
          ${open && 'block'}
          ${!open && 'hidden'}`}
      >
        <nav>
          <ul className="md:flex md:items-center md:justify-center">
            <li className="my-3 md:mx-3 md:my-0">
              <Link
                href={'/dashboard'}
                onClick={() => console.log('dash clicked')}
              >
                Dashboard
              </Link>
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
