'use client';

import Image from 'next/image';
import { ComponentProps, FC, useState } from 'react';
import { MediaType } from '@customTypes/tmdb/Multi';
import Add from '@components/icons/Add/Add';
import Close from '@components/icons/Close/Close';

type Props = {
  title?: string;
  contentType?: MediaType;
  date?: Date;
  image: ComponentProps<typeof Image>;
  mode: 'add' | 'remove';
  onClick: () => void;
};

const AddButton: FC<ComponentProps<'button'>> = ({ children }) => {
  return <button className="rounded bg-green-500">{children}</button>;
};

const SearchResult: FC<Props> = ({
  title,
  contentType,
  date,
  image,
  mode = 'add',
  onClick,
}) => {
  const [src, setSrc] = useState(image.src);
  return (
    <div className="flex gap-3 bg-white p-4 text-white">
      <div className="w-11 shrink-0">
        <Image
          className="z-1 min-h-full min-w-full object-cover"
          src={src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={true}
        />
      </div>
      <div className="grow text-left">
        {title ? (
          <h2 className="w-full text-sm font-medium text-stone-950">{title}</h2>
        ) : null}
        {date ? (
          <h3 className="inline text-xs font-medium text-stone-500">
            {date.getFullYear()}
          </h3>
        ) : null}
        <span className="inline text-stone-500"> · </span>
        {contentType ? (
          <h3 className="inline text-xs font-medium text-stone-500">
            {contentType}
          </h3>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center text-stone-950">
        <AddButton onClick={onClick}>
          {mode === 'add' && <Add />}
          {mode === 'remove' && <Close />}
        </AddButton>
      </div>
    </div>
  );
};

export default SearchResult;
