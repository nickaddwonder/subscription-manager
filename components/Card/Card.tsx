'use client';

import Image from 'next/image';
import { ComponentProps, ReactElement, useState } from 'react';
import TernaryComponent from '../TernaryWrapper/TernaryWrapper';

type Props = {
  mode?: 'button' | 'div';
  button?: ComponentProps<'button'>;
  title: string;
  img: ComponentProps<typeof Image>;
};

type DivProps = {
  children: ReactElement;
};

function Button({ children, ...props }: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      onClick={() => console.log('hello')}
      className="w-full relative aspect-video flex justify-center items-center text-center"
    >
      {children}
    </button>
  );
}

function Div({ children }: DivProps) {
  return (
    <div className="w-full relative aspect-video flex justify-center items-center text-center">
      {children}
    </div>
  );
}

export default function Card({ mode = 'div', button, title, img }: Props) {
  const [src, setSrc] = useState(img.src);

  return (
    <TernaryComponent
      condition={mode === 'button'}
      wrapperTrue={(children) => <Button {...button}>{children}</Button>}
      wrapperFalse={(children) => <Div>{children}</Div>}
    >
      <>
        <h2 className="text-white absolute z-10 text-xl font-semibold">
          {title}
        </h2>
        <div className="relative z-0 w-full h-full before:z-3 before:absolute before:content-[''] before:bg-gradient-to-t before:from-[rgba(0,0,0,0.85)] before:to-[rgba(0,0,0,0.1)] before:w-full before:h-full before:inline-block before:top-0 before:left-0">
          <Image
            className="z-1 min-w-full min-h-full object-cover"
            src={src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            onError={() => setSrc('/public/images/default_poster.jpg')}
          />
        </div>
      </>
    </TernaryComponent>
  );
}
