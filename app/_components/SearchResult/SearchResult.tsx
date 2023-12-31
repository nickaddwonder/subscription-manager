'use client';

import Image from 'next/image';
import { ComponentProps, FC, useState } from 'react';
import { MediaType } from '@customTypes/tmdb/Multi';
import Add from '@components/icons/Add/Add';
import Close from '@components/icons/Close/Close';
import { TMDBDate } from '@functions/date';

type Props = {
  title: string;
  contentType: MediaType;
  date: TMDBDate;
  image: ComponentProps<typeof Image>;
  mode: 'add' | 'remove';
  handleClick: () => void;
};

const ActionButton: FC<ComponentProps<'button'>> = ({ children, ...props }) => {
  return (
    <button {...props} className="rounded bg-green-500">
      {children}
    </button>
  );
};

const SearchResult: FC<Props> = ({
  title,
  contentType,
  date,
  image,
  mode = 'add',
  handleClick,
}) => {
  return (
    <div className="flex gap-3 bg-white p-4 text-white">
      <div className="w-11 shrink-0">
        <img
          className="z-1 min-h-full min-w-full object-cover"
          src={image.src as string}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      </div>
      <div className="grow text-left">
        {title ? (
          <h2 className="w-full text-sm font-medium text-stone-950">{title}</h2>
        ) : null}
        {date !== 'N/A' ? (
          <h3 className="inline text-xs font-medium text-stone-500">
            {date!.getFullYear()}
          </h3>
        ) : (
          <h3 className="inline text-xs font-medium text-stone-500">{date}</h3>
        )}
        <span className="inline text-stone-500"> · </span>
        {contentType ? (
          <h3 className="inline text-xs font-medium text-stone-500">
            {contentType}
          </h3>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center text-stone-950">
        <ActionButton onClick={handleClick}>
          {mode === 'add' && <Add />}
          {mode === 'remove' && <Close />}
        </ActionButton>
      </div>
    </div>
  );
};

export default SearchResult;
