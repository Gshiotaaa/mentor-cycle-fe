import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";

export type buttonVariant = "primary" | "secondary";

export type buttonSize = "regular" | "small";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize;
  variant?: buttonVariant;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  Icon?: IconType;
}

export interface IconProps {
  icon: IconType;
  size?: number;
  className?: string;
}

export interface ButtonWithIcon
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  > {
  Icon: React.FC<IconProps>;
}
