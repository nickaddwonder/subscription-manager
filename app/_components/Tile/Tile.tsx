'use client'

import Image from "next/image";
import { FC, ComponentProps, useState } from "react";
import Pill from "@/app/_components/Pill/Pill";
import Button from "@/app/_components/Button/Button";
import { v4 as uuid } from "uuid";

type Props = {
  title: string;
  contentType: 'Movie' | 'TV',
  date: Date;
  description: string;
  image: ComponentProps<typeof Image>;
  buttons?: ComponentProps<typeof Button>[];
};

const Tile: FC<Props> = ({ title, contentType, date, description, image, buttons }) => {
  const [src, setSrc] = useState(image.src);
  return (
    <div className="tile flex flex-col text-left w-full md:flex-row md:h-full">
      <div className="bg-red-800 flex-shrink-0 md:w-1/2">
        <Image
          className="z-1 min-w-full min-h-full object-cover"
          src={src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          onError={() => setSrc('/public/images/default_poster.jpg')}
        />
      </div>
      <div className="bg-[#667085] p-4 md:flex md:flex-col md:flex-grow">
        <div className="flex justify-between items-start">
          <h2 className="text-white mb-1 text-xl font-bold leading-tight">{title}</h2>
          <Pill>{contentType}</Pill>
        </div>
        <div className="mb-2">
          <span className="text-white text-sm">{date.toISOString().slice(0, 10)}</span>
        </div>
        <div className="mb-2">
          <p className="text-base line-clamp-4">{description}</p>
        </div>
        {buttons && buttons.length > 0 && (
          <div className="flex justify-end items-center [&.justify-end_button]:mr-0 [&.justify-start_button]:ml-0 md:mt-auto">
            {buttons.map(b => <Button key={uuid()} buttonType={b.buttonType} onClick={b.onClick}>{b.children}</Button>)}
          </div>
        )}
      </div>
    </div>
  )
};

export default Tile;