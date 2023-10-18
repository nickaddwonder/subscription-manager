import Header from '@/_components/Header/Header';
import UserContentTiles from '@/_components/UserContentTiles/UserContentTiles';

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
