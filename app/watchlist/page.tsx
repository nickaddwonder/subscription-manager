import Header from '@components/Header/Header';
import UserContentTiles from '@components/UserContentTiles/UserContentTiles';

const Watchlist = async () => {
  return (
    <>
      <main>
        <Header title={'Your Watchlist'} subtitle={'Start Watching.'} />
        <UserContentTiles />
      </main>
    </>
  );
};

export default Watchlist;
