import { FC, ComponentProps } from "react";
import Pill from "@/app/_components/Pill/Pill";
import Button from "@/app/_components/Button/Button";

type Props = {
  title: string;
  contentType: 'Movie' | 'TV',
  date: Date;
  description: string;
  buttons?: ComponentProps<typeof Button>[];
};

const Tile: FC<Props> = ({ title, contentType, date, description, buttons }) => {
  return (
    <div className="tile flex flex-col text-left">
      <div className="bg-red-800">image</div>
      <div className="bg-[#667085] p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-white mb-1 text-xl font-bold leading-tight">{title}</h2>
          <Pill>{contentType}</Pill>
        </div>
        <div className="mb-2">
          <span className="text-white text-sm">{date.toISOString().slice(0, 10)}</span>
        </div>
        <div className="max-h-[6ch] mb-2">
          <p className="text-base">{description}</p>
        </div>
        {buttons && buttons.length > 0 && (
          <div className="flex justify-end items-center [&.justify-end_button]:mr-0 [&.justify-start_button]:ml-0">
            {buttons.map(b => <Button buttonType={b.buttonType}>{b.children}</Button>)}
          </div>
        )}
      </div>
    </div>
  )
};

export default Tile;