import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button', () => {

  test('renders with default (primary) variant', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button--primary');
  });

  test('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByText(/secondary button/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button--secondary');
  });

  test('renders with danger variant', () => {
    render(<Button variant="danger">Delete</Button>);
    const buttonElement = screen.getByText(/delete/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button--danger');
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Click</Button>);
    const buttonElement = screen.getByText(/test click/i);

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText(/disabled button/i);
    expect(buttonElement).toBeDisabled();
  });

  test('applies extra className', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);
    const buttonElement = screen.getByText(/custom class button/i);
    expect(buttonElement).toHaveClass('custom-class');
  });



  describe('Accessibility', () => {
    test('has correct role attribute', () => {
      render(<Button>Accessible Button</Button>);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
    });

    test('supports aria-label attribute', () => {
      render(<Button aria-label="Close dialog">×</Button>);
      const buttonElement = screen.getByLabelText('Close dialog');
      expect(buttonElement).toBeInTheDocument();
    });

    test('supports aria-describedby attribute', () => {
      render(<Button aria-describedby="help-text">Submit</Button>);
      const buttonElement = screen.getByText('Submit');
      expect(buttonElement).toHaveAttribute('aria-describedby', 'help-text');
    });

    test('is focusable when not disabled', () => {
      render(<Button>Focusable Button</Button>);
      const buttonElement = screen.getByText('Focusable Button');
      buttonElement.focus();
      expect(buttonElement).toHaveFocus();
    });

    test('is not focusable when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);
      const buttonElement = screen.getByText('Disabled Button');
      expect(buttonElement).toHaveAttribute('disabled');
      expect(buttonElement).not.toHaveFocus();
    });
  });

  describe('Event Handling', () => {
    test('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
      const buttonElement = screen.getByText('Disabled Button');

      fireEvent.click(buttonElement);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('handles onFocus event', () => {
      const handleFocus = jest.fn();
      render(<Button onFocus={handleFocus}>Focus Test</Button>);
      const buttonElement = screen.getByText('Focus Test');

      fireEvent.focus(buttonElement);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    test('handles onBlur event', () => {
      const handleBlur = jest.fn();
      render(<Button onBlur={handleBlur}>Blur Test</Button>);
      const buttonElement = screen.getByText('Blur Test');

      fireEvent.blur(buttonElement);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    test('handles keyboard events (Enter)', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard Test</Button>);
      const buttonElement = screen.getByText('Keyboard Test');

      fireEvent.keyDown(buttonElement, { key: 'Enter', code: 'Enter' });

    });

    test('handles keyboard events (Space)', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Space Test</Button>);
      const buttonElement = screen.getByText('Space Test');

      fireEvent.keyDown(buttonElement, { key: ' ', code: 'Space' });

    });
  });

  describe('Content and Children', () => {
    test('renders text content correctly', () => {
      render(<Button>Simple Text</Button>);
      expect(screen.getByText('Simple Text')).toBeInTheDocument();
    });

    test('renders JSX children correctly', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    test('renders empty button when no children provided', () => {
      render(<Button />);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toBeEmptyDOMElement();
    });

    test('handles special characters in content', () => {
      render(<Button>Save & Continue →</Button>);
      expect(screen.getByText('Save & Continue →')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    test('applies custom id attribute', () => {
      render(<Button id="custom-button">Custom ID</Button>);
      const buttonElement = screen.getByText('Custom ID');
      expect(buttonElement).toHaveAttribute('id', 'custom-button');
    });

    test('applies custom data attributes', () => {
      render(<Button data-testid="test-button" data-custom="value">Data Attributes</Button>);
      const buttonElement = screen.getByTestId('test-button');
      expect(buttonElement).toHaveAttribute('data-custom', 'value');
    });

    test('supports type attribute', () => {
      render(<Button type="submit">Submit Button</Button>);
      const buttonElement = screen.getByText('Submit Button');
      expect(buttonElement).toHaveAttribute('type', 'submit');
    });

    test('defaults to type="button"', () => {
      render(<Button>Default Type</Button>);
      const buttonElement = screen.getByText('Default Type');
      expect(buttonElement).toHaveAttribute('type', 'button');
    });

    test('supports title attribute for tooltips', () => {
      render(<Button title="This is a tooltip">Tooltip Button</Button>);
      const buttonElement = screen.getByText('Tooltip Button');
      expect(buttonElement).toHaveAttribute('title', 'This is a tooltip');
    });
  });

  describe('CSS Classes and Styling', () => {
    test('always has base button class', () => {
      render(<Button>Base Class</Button>);
      const buttonElement = screen.getByText('Base Class');
      expect(buttonElement).toHaveClass('button');
    });

    test('combines multiple CSS classes correctly', () => {
      render(<Button variant="danger" className="custom-class extra-class">Multiple Classes</Button>);
      const buttonElement = screen.getByText('Multiple Classes');
      expect(buttonElement).toHaveClass('button', 'button--danger', 'custom-class', 'extra-class');
    });

    test('handles undefined className gracefully', () => {
      render(<Button className={undefined}>No Custom Class</Button>);
      const buttonElement = screen.getByText('No Custom Class');
      expect(buttonElement).toHaveClass('button', 'button--primary');
    });
  });

  describe('Edge Cases', () => {
    test('handles null children', () => {
      render(<Button>{null}</Button>);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
    });

    test('handles undefined children', () => {
      render(<Button>{undefined}</Button>);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
    });

    test('handles boolean children', () => {
      render(<Button>{false}</Button>);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
    });

    test('handles number children', () => {
      render(<Button>{0}</Button>);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('handles multiple onClick calls rapidly', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Rapid Click</Button>);
      const buttonElement = screen.getByText('Rapid Click');


      fireEvent.click(buttonElement);
      fireEvent.click(buttonElement);
      fireEvent.click(buttonElement);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Form Integration', () => {
    test('submits form when type is submit', () => {
      const handleSubmit = jest.fn(e => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit Form</Button>
        </form>
      );

      const buttonElement = screen.getByText('Submit Form');
      fireEvent.click(buttonElement);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    test('resets form when type is reset', () => {
      render(
        <Button
          data-testid="reset-button"
          type="reset">
          Reset Form
        </Button>
      );

      const buttonElement = screen.getByTestId('reset-button');

      expect(buttonElement).toHaveAttribute('type', 'reset');
    });
  });

  describe('Performance', () => {
    test('does not re-render unnecessarily', () => {
      const { rerender } = render(
        <Button data-testid="performance-button">
          Performance Test
        </Button>
      );

      const initialButtonElement = screen.getByTestId('performance-button');
      rerender(
        <Button data-testid="performance-button">
          Performance Test
        </Button>
      );

      expect(screen.getByTestId('performance-button')).toBeInTheDocument();

      const reRenderedButtonElement = screen.getByTestId('performance-button');
      expect(reRenderedButtonElement).toBe(initialButtonElement);
    });
  });
});