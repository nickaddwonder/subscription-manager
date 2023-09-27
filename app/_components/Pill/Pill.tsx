import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode
}

const Pill: FC<Props> = ({ children }) => {
  return <span className="pill text-[#667085] tracking-tighter text-uppercase rounded-2xl bg-[#d0d5dd] py-1 px-3 inline-block leading-none font-bold">{children}</span>

};

export default Pill;