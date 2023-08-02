import { ReactElement, FunctionComponent } from "react"

type Props = {
  condition: boolean;
  wrapperTrue: FunctionComponent;
  wrapperFalse: FunctionComponent;
  children: ReactElement;
}
export default function ConditionalWrapper({ condition, wrapperTrue, wrapperFalse, children }: Props) {
  return condition ? wrapperTrue(children) : wrapperFalse(children);
}