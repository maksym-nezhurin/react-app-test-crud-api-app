// components/StyledLink.tsx
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface StyledLinkProps extends VariantProps<typeof linkStyles> {
  to: string;
  children: React.ReactNode;
  className?: string | ((isActive: boolean) => string) | undefined;
}

const linkStyles = cva(
  "inline-flex items-center font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-gray-700 hover:text-gray-900",
        primary:
          "text-blue-600 hover:text-blue-800 underline underline-offset-4",
        secondary:
          "text-gray-500 hover:text-gray-700 underline underline-offset-4",
        subtle: "text-gray-400 hover:text-gray-600 no-underline",
      },
      size: {
        default: "",
        sm: "text-sm py-1 px-2",
        md: "text-base py-2 px-3",
        lg: "text-lg py-2 px-4",
      },
      state: {
        disabled: "cursor",
        enabled: "text-brandRed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "enabled",
    },
  },
);

const StyledLink: React.FC<StyledLinkProps> = ({
  to,
  children,
  variant,
  state = "enabled",
  size,
  className,
}) => {
  return (
    <NavLink
      to={state === "disabled" ? "#" : to}
      aria-disabled={state === "disabled"}
      className={cn(linkStyles({ variant, size }), className, {
        [linkStyles({ state })]: true,
      })}
    >
      {children}
    </NavLink>
  );
};

export default StyledLink;
