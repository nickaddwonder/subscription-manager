import Image from 'next/image';
import { ComponentProps } from 'react';

type Props = {
  title: string;
  img: ComponentProps<typeof Image>;
};

export default function Card({ title, img }: Props) {
  return (
    <div className="relative aspect-video flex justify-center items-center text-center">
      <h2 className="text-white absolute z-10 text-xl font-semibold">
        {title}
      </h2>
      <div className="relative z-0 w-full h-full before:z-3 before:absolute before:content-[''] before:bg-gradient-to-t before:from-[rgba(0,0,0,0.85)] before:to-[rgba(0,0,0,0.1)] before:w-full before:h-full before:inline-block before:top-0 before:left-0">
        <Image
          className="z-1 min-w-full min-h-full object-cover"
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
        />
      </div>
    </div>
  );
}
