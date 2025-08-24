import type { ButtonHTMLAttributes } from 'react';
import * as Styles from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
};

function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <Styles.Container variant={variant} fullWidth={fullWidth} {...props}>
      {children}
    </Styles.Container>
  );
}

export default Button;
