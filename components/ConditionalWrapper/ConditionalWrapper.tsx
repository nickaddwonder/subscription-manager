import { ReactElement, FunctionComponent } from 'react';

type Props = {
  condition: boolean;
  wrapper: FunctionComponent;
  children: ReactElement;
};
export default function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: Props) {
  return condition ? wrapper(children) : children;
}
