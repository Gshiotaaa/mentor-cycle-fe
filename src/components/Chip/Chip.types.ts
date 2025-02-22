import { ReactNode } from "react";

export type ChipVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quartenary"
  | "primary_dark"
  | "secondary_dark"
  | "outlined";

export type ChipProps = {
  variant?: ChipVariant;
  children: any;
  className?: string;
  size?: string;
  onClick?: () => void;
};
