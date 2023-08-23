import { ReactElement, FunctionComponent } from "react"

type Props = {
  condition: boolean;
  wrapperTrue: (children: ReactElement) => ReactElement;
  wrapperFalse: (children: ReactElement) => ReactElement;
  children: ReactElement;
}
export default function ConditionalWrapper({ condition, wrapperTrue, wrapperFalse, children }: Props) {
  return condition ? wrapperTrue(children) : wrapperFalse(children);
}