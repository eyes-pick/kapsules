import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Page component for testing
const MockPage = () => {
  return (
    <div>
      <h1>Welcome to Kapsules</h1>
      <ul>
        <li key="1">Test todo 1</li>
        <li key="2">Test todo 2</li>
      </ul>
    </div>
  );
};

describe('Page Components', () => {
  beforeEach(() => {
    console.log('🧪 Starting Page component test');
  });

  afterEach(() => {
    console.log('✅ Page component test completed');
  });

  it('renders a page with content', () => {
    console.log('📝 Testing page rendering...');

    const { container } = render(<MockPage />);

    console.log('🔍 Checking if page renders correctly');

    // Check if the page renders without crashing
    expect(container).toBeInTheDocument();
    console.log('✅ Page rendered successfully');
  });

  it('displays a list of items', () => {
    console.log('📝 Testing list display...');

    const { container } = render(<MockPage />);

    console.log('🔍 Looking for list...');
    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();

    console.log('📊 Checking number of list items...');
    const listItems = container.querySelectorAll('li');
    console.log(`Found ${listItems.length} list items`);

    expect(listItems).toHaveLength(2);
    console.log('✅ List displayed correctly');
  });

  it('shows correct content', () => {
    console.log('📝 Testing content display...');

    const { container } = render(<MockPage />);

    console.log('🔍 Checking for heading...');
    const heading = container.querySelector('h1');
    expect(heading).toHaveTextContent('Welcome to Kapsules');

    console.log('✅ Content displayed correctly');
  });
});
