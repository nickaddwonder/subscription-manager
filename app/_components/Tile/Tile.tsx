'use client';

import Image from 'next/image';
import { FC, ComponentProps, useState } from 'react';
import Pill from '@components/Pill/Pill';
import Button from '@components/Button/Button';
import { v4 as uuid } from 'uuid';
import { MediaType } from '@customTypes/tmdb/Multi';
import { TMDBDate } from '@functions/date';

type Props = {
  title: string;
  contentType: MediaType;
  date: TMDBDate;
  description: string;
  image: ComponentProps<typeof Image>;
  buttons?: ComponentProps<typeof Button>[];
};

const Tile: FC<Props> = ({
  title,
  contentType,
  date,
  description,
  image,
  buttons,
}) => {
  const [src, setSrc] = useState(image.src);
  return (
    <div className="tile flex w-full flex-col text-left md:h-full md:flex-row">
      <div className="flex-shrink-0 bg-red-800 md:w-1/2 lg:w-1/3">
        <Image
          className="z-1 min-h-full min-w-full object-cover"
          src={src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          onError={() => setSrc('/public/images/default_poster.jpg')}
        />
      </div>
      <div className="bg-[#667085] p-4 md:flex md:flex-grow md:flex-col">
        <div className="flex items-start justify-between">
          <h2 className="mb-1 text-xl font-bold leading-tight text-white">
            {title}
          </h2>
          <Pill>{contentType}</Pill>
        </div>
        <div className="mb-2">
          <span className="text-sm text-white">
            {date.toString() !== 'Invalid Date'
              ? (date as Date).toISOString().slice(0, 10)
              : 'NA'}
          </span>
        </div>
        <div className="mb-2">
          <p className="line-clamp-4 text-base">{description}</p>
        </div>
        {buttons && buttons.length > 0 && (
          <div className="flex items-center justify-end md:mt-auto [&.justify-end_button]:mr-0 [&.justify-start_button]:ml-0">
            {buttons.map((b) => (
              <Button
                key={uuid()}
                buttonType={b.buttonType}
                onClick={b.onClick}
              >
                {b.children}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tile;
