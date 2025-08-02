import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';
import userEvent from '@testing-library/user-event';
import { InputProps } from '@/lib/types';

jest.mock('./_input.module.scss', () => ({
    'input-field': 'mock-input-field',
    'input-field--error': 'mock-input-field-error',
}));

const defaultInputProps: InputProps = {
    label: '',
    name: '',
    value: '',
    type: 'text',
    required: true,
    placeholder: '',
    onChange(event) {
        throw new Error('Function not implemented.');
    },
}
describe('Input Component', () => {
    test('renders input with correct attributes', () => {
        const props = {
            label: 'Email',
            name: 'email',
            value: 'test@email.com',
            type: 'email',
            required: true,
            placeholder: 'Digite seu email',
            onChange: defaultInputProps.onChange
        };

        render(<Input {...props} />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('name', 'email');
        expect(input).toHaveAttribute('type', 'email');
        expect(input).toHaveValue('test@email.com');
        expect(input).toBeRequired();
    });

    test('renders with initial value and calls onChange handler on input change', async () => {
        const TestWrapper = () => {
            const [value, setValue] = React.useState('initial');
            return (
                <Input
                    {...defaultInputProps}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            );
        };

        render(<TestWrapper />);

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveValue('initial');

        await userEvent.clear(inputElement);
        expect(inputElement).toHaveValue(''); // ✅ Funciona!

        await userEvent.type(inputElement, 'test');
        expect(inputElement).toHaveValue('test'); // ✅ Funciona!
    });

    test('applies error styles when hasError is true', () => {
        render(<Input {...defaultInputProps} hasError={true} value="" onChange={jest.fn()} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass('mock-input-field');
        expect(inputElement).toHaveClass('mock-input-field-error');
    });

    test('applies custom className', () => {
        render(<Input {...defaultInputProps} className="custom-style" value="" onChange={jest.fn()} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass('mock-input-field');
        expect(inputElement).toHaveClass('custom-style');
    });
});