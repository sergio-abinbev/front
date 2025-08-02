import React from 'react';
import styles from './_input.module.scss';
import classNames from 'classnames';
import { InputProps } from '@/lib/types';

const Input: React.FC<InputProps> = ({ hasError, className, ...props }) => {
  return (
    <input
      className={classNames(
        styles['input-field'],
        { [styles['input-field--error']]: hasError }, 
        className
      )}
      {...props}
    />
  );
};

export default Input;