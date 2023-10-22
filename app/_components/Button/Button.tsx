import { FC, ComponentProps } from 'react';

const secondaryStyle = 'text-[#667085] bg-[#d0d5dd]';

const primaryStyle = 'text-[#145dfa] bg-[#b3cbff]';

const tertiaryStyle = 'text-[#145dfa] bg-[#272b33]';

type Props = ComponentProps<'button'> & {
  buttonType: 'primary' | 'secondary' | 'tertiary';
};

const buttonStyle = (style: Props['buttonType']) => {
  switch (style) {
    case 'primary':
      return primaryStyle;
    case 'secondary':
      return secondaryStyle;
    case 'tertiary':
      return tertiaryStyle;
    default:
      return primaryStyle;
  }
};

const Button: FC<Props> = ({ buttonType, children, ...props }) => {
  return (
    <button
      className={`button ${buttonStyle(
        buttonType
      )} text-center tracking-tighter mx-4 text-uppercase py-[0.375rem] rounded-lg px-[0.875rem] font-bold`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
