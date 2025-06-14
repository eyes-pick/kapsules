import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  beforeEach(() => {
    console.log('🧪 Starting Button component test');
  });

  afterEach(() => {
    console.log('✅ Button component test completed');
  });

  it('renders button with text', () => {
    console.log('📝 Testing button rendering...');

    render(<Button>Click me</Button>);

    console.log('🔍 Looking for button element...');
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();

    console.log('✅ Button rendered with correct text');
  });

  it('handles click events', () => {
    console.log('📝 Testing button click handling...');

    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    console.log('🔍 Finding button and simulating click...');
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);

    console.log('📊 Checking if click handler was called...');
    expect(handleClick).toHaveBeenCalledTimes(1);
    console.log('✅ Click event handled correctly');
  });

  it('applies custom className', () => {
    console.log('📝 Testing custom className application...');

    render(<Button className="custom-class">Styled button</Button>);

    console.log('🔍 Checking for custom class...');
    const button = screen.getByRole('button', { name: /styled button/i });
    expect(button).toHaveClass('custom-class');

    console.log('✅ Custom className applied correctly');
  });

  it('renders different variants', () => {
    console.log('📝 Testing button variants...');

    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

    variants.forEach(variant => {
      console.log(`🎨 Testing ${variant} variant...`);

      const { container } = render(<Button variant={variant}>{variant} button</Button>);
      const button = container.querySelector('button');

      expect(button).toBeInTheDocument();
      console.log(`✅ ${variant} variant rendered correctly`);
    });
  });

  it('handles disabled state', () => {
    console.log('📝 Testing disabled button state...');

    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled button
      </Button>
    );

    console.log('🔍 Finding disabled button...');
    const button = screen.getByRole('button', { name: /disabled button/i });

    expect(button).toBeDisabled();
    console.log('🚫 Button is properly disabled');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    console.log('✅ Disabled button correctly prevents clicks');
  });
});
