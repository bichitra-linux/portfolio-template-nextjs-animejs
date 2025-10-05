'use client';

import React, { HTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';
import styles from './Card.module.css';

// Card variants
type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat' | 'gradient' | 'glass';
type CardSize = 'small' | 'medium' | 'large';

// Card props
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  interactive?: boolean;
  loading?: boolean;
  skeleton?: boolean;
  horizontal?: boolean;
}

/**
 * Card Component
 * 
 * A flexible container component with multiple variants and layouts.
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" interactive>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardBody>
 *     Content goes here
 *   </CardBody>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      size = 'medium',
      interactive = false,
      loading = false,
      skeleton = false,
      horizontal = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.card,
      styles[variant],
      styles[size],
      interactive && styles.interactive,
      loading && styles.loading,
      skeleton && styles.skeleton,
      horizontal && styles.horizontal,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader Component
 * 
 * Header section of a card, typically contains title and actions.
 * 
 * @example
 * ```tsx
 * <CardHeader noBorder>
 *   <CardTitle>Card Title</CardTitle>
 *   <button>Action</button>
 * </CardHeader>
 * ```
 */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ noBorder = false, className = '', children, ...props }, ref) => {
    const classNames = [
      styles.cardHeader,
      noBorder && styles.noBorder,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle Component
 * 
 * Title element for the card header.
 * 
 * @example
 * ```tsx
 * <CardTitle>My Card Title</CardTitle>
 * ```
 */
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className = '', children, ...props }, ref) => {
    const classNames = `${styles.cardTitle} ${className}`.trim();

    return (
      <Component ref={ref} className={classNames} {...props}>
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * CardSubtitle Component
 * 
 * Subtitle element for the card header.
 * 
 * @example
 * ```tsx
 * <CardSubtitle>Additional information</CardSubtitle>
 * ```
 */
export const CardSubtitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = `${styles.cardSubtitle} ${className}`.trim();

    return (
      <p ref={ref} className={classNames} {...props}>
        {children}
      </p>
    );
  }
);

CardSubtitle.displayName = 'CardSubtitle';

/**
 * CardBody Component
 * 
 * Main content area of the card.
 * 
 * @example
 * ```tsx
 * <CardBody compact>
 *   Your content here
 * </CardBody>
 * ```
 */
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
  spacious?: boolean;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ compact = false, spacious = false, className = '', children, ...props }, ref) => {
    const classNames = [
      styles.cardBody,
      compact && styles.compact,
      spacious && styles.spacious,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * CardDescription Component
 * 
 * Description text for the card body.
 * 
 * @example
 * ```tsx
 * <CardDescription>
 *   This is a detailed description of the card content.
 * </CardDescription>
 * ```
 */
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = `${styles.cardDescription} ${className}`.trim();

    return (
      <p ref={ref} className={classNames} {...props}>
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

/**
 * CardFooter Component
 * 
 * Footer section of the card, typically contains actions.
 * 
 * @example
 * ```tsx
 * <CardFooter noBorder center>
 *   <Button>Action</Button>
 * </CardFooter>
 * ```
 */
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
  center?: boolean;
  end?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ noBorder = false, center = false, end = false, className = '', children, ...props }, ref) => {
    const classNames = [
      styles.cardFooter,
      noBorder && styles.noBorder,
      center && styles.center,
      end && styles.end,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

/**
 * CardImage Component
 * 
 * Image element for the card using Next.js Image optimization.
 * 
 * @example
 * ```tsx
 * <CardImage src="/image.jpg" alt="Card image" width={400} height={300} cover />
 * ```
 */
interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  cover?: boolean;
  tall?: boolean;
  short?: boolean;
  className?: string;
  priority?: boolean;
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ cover = false, tall = false, short = false, className = '', src, alt, width = 400, height = 300, priority = false }, ref) => {
    const classNames = [
      styles.cardImage,
      cover && styles.cover,
      tall && styles.tall,
      short && styles.short,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={styles.cardImageWrapper}>
        <Image 
          src={src} 
          alt={alt} 
          width={width} 
          height={height} 
          className={classNames}
          priority={priority}
        />
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

/**
 * CardActions Component
 * 
 * Container for card action buttons.
 * 
 * @example
 * ```tsx
 * <CardActions vertical>
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </CardActions>
 * ```
 */
interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
}

export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ vertical = false, className = '', children, ...props }, ref) => {
    const classNames = [
      styles.cardActions,
      vertical && styles.vertical,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardActions.displayName = 'CardActions';

/**
 * CardBadge Component
 * 
 * Badge element positioned at the top-right of the card.
 * 
 * @example
 * ```tsx
 * <CardBadge variant="success">New</CardBadge>
 * ```
 */
interface CardBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export const CardBadge = forwardRef<HTMLSpanElement, CardBadgeProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    const classNames = [
      styles.cardBadge,
      variant && styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {children}
      </span>
    );
  }
);

CardBadge.displayName = 'CardBadge';

/**
 * CardOverlay Component
 * 
 * Overlay content that appears on hover.
 * 
 * @example
 * ```tsx
 * <CardOverlay>
 *   <CardTitle>Overlay Title</CardTitle>
 *   <CardDescription>Overlay description</CardDescription>
 * </CardOverlay>
 * ```
 */
export const CardOverlay = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = `${styles.cardOverlay} ${className}`.trim();

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardOverlay.displayName = 'CardOverlay';

/**
 * CardGrid Component
 * 
 * Grid layout for displaying multiple cards.
 * 
 * @example
 * ```tsx
 * <CardGrid>
 *   <Card>...</Card>
 *   <Card>...</Card>
 *   <Card>...</Card>
 * </CardGrid>
 * ```
 */
export const CardGrid = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = `${styles.cardGrid} ${className}`.trim();

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardGrid.displayName = 'CardGrid';

export default Card;
