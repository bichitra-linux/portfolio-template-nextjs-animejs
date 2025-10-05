'use client';

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';

// Base button props
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
}

// Button element props
type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    as?: 'button';
  };

// Anchor element props
type ButtonAsAnchor = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    as: 'a';
    href: string;
  };

// Combined button props
export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Can render as a button or anchor element.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="large">
 *   Click Me
 * </Button>
 * 
 * <Button as="a" href="/about" variant="outline">
 *   Learn More
 * </Button>
 * 
 * <Button loading icon={<Icon />}>
 *   Submit
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      className = '',
      children,
      as = 'button',
      ...restProps
    } = props;

    // Build class names
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Button content with icon
    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className={`${styles.icon} ${styles[size]}`}>{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className={`${styles.icon} ${styles[size]}`}>{icon}</span>
        )}
      </>
    );

    // Render as anchor
    if (as === 'a') {
      const { href, ...anchorProps } = restProps as ButtonAsAnchor;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classNames}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    // Render as button
    const { type = 'button', disabled, ...buttonProps } = restProps as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || loading}
        className={classNames}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * IconButton Component
 * 
 * A circular button that only contains an icon.
 * 
 * @example
 * ```tsx
 * <IconButton variant="primary" aria-label="Menu">
 *   <MenuIcon />
 * </IconButton>
 * ```
 */
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  'aria-label': string;
  children: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className = '', variant = 'primary', size = 'medium', children, ...props }, ref) => {
    const classNames = [
      styles.button,
      styles.iconButton,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');
    
    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * ButtonGroup Component
 * 
 * Groups multiple buttons together with connected borders.
 * 
 * @example
 * ```tsx
 * <ButtonGroup size="small">
 *   <Button variant="outline">Left</Button>
 *   <Button variant="outline">Middle</Button>
 *   <Button variant="outline">Right</Button>
 * </ButtonGroup>
 * ```
 */
interface ButtonGroupProps {
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  size = 'medium',
  className = '',
  children,
}) => {
  const classNames = `${styles.buttonGroup} ${styles[size]} ${className}`.trim();

  return <div className={classNames}>{children}</div>;
};

ButtonGroup.displayName = 'ButtonGroup';

export default Button;
