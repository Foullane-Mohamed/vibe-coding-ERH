import { render, screen } from '@testing-library/react';
import { FormInput } from './form-input';

describe('FormInput', () => {
  it('renders label and input', () => {
    render(<FormInput label="Username" name="username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<FormInput label="Username" name="username" error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });
});
