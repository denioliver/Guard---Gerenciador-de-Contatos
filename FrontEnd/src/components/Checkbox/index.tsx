import React from 'react';
import * as Styles from './styles';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  name,
  id = name
}) => {
  return (
    <Styles.CheckboxContainer>
      <Styles.CheckboxInput
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
      />
      <Styles.CheckboxLabel htmlFor={id}>{label}</Styles.CheckboxLabel>
    </Styles.CheckboxContainer>
  );
};
