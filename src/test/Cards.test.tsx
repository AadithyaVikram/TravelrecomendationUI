import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Add this line to enable jest-dom matchers
import Cards from '../components/Cards/Cards';

import { vi } from 'vitest';
 
describe('Cards Component', () => {
  const mockOnClick = vi.fn();
 
  const props = {
    id: 1,
    imageUrl: 'https://example.com/image.jpg',
    placeName: 'Sample Place',
    regionName: 'Sample Region',
    onClick: mockOnClick,
  };
 
  test('renders the Cards component with the correct props', () => {
    render(<Cards {...props} />);
 
    // Check if the image is rendered with the correct src and alt text
    const image = screen.getByAltText('Sample Place');
    expect(image).toBeInTheDocument(); // This will work now
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
 
    // Check if the region name is displayed correctly
    const region = screen.getByText('Sample Region');
    expect(region).toBeInTheDocument();
 
    // Check if the place name is displayed correctly
    const place = screen.getByText('Sample Place');
    expect(place).toBeInTheDocument();
  });
 
  test('renders default "Country" text when regionName is not provided', () => {
    const modifiedProps = { ...props, regionName: '' };
    render(<Cards {...modifiedProps} />);
 
    // Check if the default "Country" text is displayed
    const defaultRegion = screen.getByText('Country');
    expect(defaultRegion).toBeInTheDocument();
  });
 
  test('calls onClick when the card is clicked', () => {
    render(<Cards {...props} />);
 
    // Simulate a click event
    const card = screen.getByRole('img', { name: 'Sample Place' }).closest('div');
    fireEvent.click(card!);
 
    // Verify that the onClick function is called with the correct arguments
    expect(mockOnClick).toHaveBeenCalledWith(1, 'Sample Place');
  });
});
 