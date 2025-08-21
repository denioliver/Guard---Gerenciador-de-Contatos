import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import * as Styles from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Styles.Container>
        {label && <Styles.Label>{label}</Styles.Label>}
        <Styles.InputField ref={ref} hasError={!!error} {...props} />
        {error && <Styles.ErrorMessage>{error}</Styles.ErrorMessage>}
      </Styles.Container>
    );
  }
);

export default Input;
