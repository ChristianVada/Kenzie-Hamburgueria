import { forwardRef } from 'react';
import { TextFieldProps } from '@mui/material';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

type IInputProps = {
  label: string;
  error?: string;
} & TextFieldProps;

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type, error, ...rest }, ref) => (
    <fieldset>
      <StyledTextField label={label} type={type} ref={ref} {...rest} />
      <StyledParagraph fontColor='red'>{error}</StyledParagraph>
    </fieldset>
  )
);

export default Input;
