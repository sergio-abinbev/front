import React from 'react';
import styles from './_button.module.scss';
import classNames from 'classnames';
import { ButtonProps } from '@/lib/types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`], 
        className 
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;