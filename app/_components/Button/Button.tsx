import { FC, ComponentProps } from "react";

const secondaryStyle = 'text-[#667085] bg-[#d0d5dd]';

const primaryStyle = 'text-[#145dfa] bg-[#b3cbff]';

type Props = ComponentProps<"button"> & {
  buttonType: 'primary' | 'secondary'
}

const Button: FC<Props> = ({ buttonType, children, ...props }) => {
  return <button className={`button ${buttonType === 'secondary' ? secondaryStyle : primaryStyle} text-center tracking-tighter mx-4 text-uppercase py-[0.375rem] rounded-lg px-[0.875rem] font-bold`} {...props}>{children}</button>
};

export default Button;