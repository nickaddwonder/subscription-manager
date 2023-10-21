'use client';

import { FC, useState } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';

const SearchBar: FC = () => {
  const [query, setQuery] = useState('');
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    console.log(query);
  };

  //   const search = (value:string) => {

  //   };
  return (
    <form className="flex gap-2">
      <input
        type="search"
        className="text-base h-auto min-h-[2.75rem] text-[#101828] bg-white rounded-lg px-3.5 py-2 border border-[#d0d5dd] border-solid grow"
        placeholder="Search something"
        value={query}
        onChange={handleSearch}
      />
      <button
        className="text-white bg-[#145dfa] rounded-lg py-2.5 px-5 shrink-0"
        type="button"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
