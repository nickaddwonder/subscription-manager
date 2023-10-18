import Header from '@/_components/Header/Header';
import { UserContentProvider } from '@/_context/UserContentContext';
import UserContentTiles from '@/_components/UserContentTiles/UserContentTiles';

const Watchlist = () => {
  return (
    <main>
      <Header title={'Your Watchlist'} subtitle={'Start Watching.'} />
      <UserContentProvider>
        <UserContentTiles />
      </UserContentProvider>
    </main>
  );
};

export default Watchlist;
