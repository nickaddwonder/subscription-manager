'use client';

import { FC, useState } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';
import { useSearchContext } from '@context/SearchContentContext';
import MagnifyingGlass from '../icons/MagnifyingGlass/MagnifyingGlass';
import cx from 'classnames';

const SearchBar: FC = () => {
  const { searchContent, setSearchContent } = useSearchContext();
  const [query, setQuery] = useState('');
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    search(e.target.value);
  };

  const search = async (value: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          value
        )}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      if (response.status === 200) {
        setSearchContent(response.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="relative flex gap-2">
      <div className="pointer-events-none absolute left-[16px] top-1/2 -translate-y-1/2">
        <MagnifyingGlass />
      </div>
      <input
        name="search"
        type="search"
        className={cx(
          'h-20 min-h-[2.75rem] grow rounded-2xl border border-solid border-[#d0d5dd] bg-white py-6 pl-[calc(16px+16px+24px)] pr-4 text-2xl text-base text-[#101828]',
          { 'rounded-b-none': searchContent.length > 0 }
        )}
        placeholder="Search something"
        value={query}
        onChange={handleSearch}
      />
    </form>
  );
};

export default SearchBar;
