// components/ui/Button/Button.tsx
import React from 'react';
import styles from './_button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large'; // Opcional: se quiser tamanhos diferentes
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', // Valor padrão
  className, 
  ...props 
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`], // Aplica classe de tamanho
        className // Permite classes adicionais de fora
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;