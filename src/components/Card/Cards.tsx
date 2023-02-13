import styles from "./Cards.module.css";

import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlowCard: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={`${styles.glow} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const RetroCard: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={`${styles.retro} ${className}`} {...props}>
    {children}
  </div>
);

// interface LinkProps extends Omit<NextLinkProps, "className" | "aria-disabled"> {
//   className?: string;
//   ariaDisabled?: boolean;
//   style?: React.CSSProperties;
//   children: React.ReactNode;
// }

// export const RetroCardLink: React.FC<LinkProps> = ({
//   className,
//   ariaDisabled,
//   style,
//   children,
//   ...props
// }) => (
//   <Link
//     className={`no-underline ${className} ${styles.link}`}
//     aria-disabled={ariaDisabled !== undefined ? ariaDisabled : false}
//     {...props}
//   >
//     <RetroCard
//       className="object-cover"
//       style={{ width: "200px", height: "200px", ...style }}
//     >
//       {children}
//     </RetroCard>
//   </Link>
// );
