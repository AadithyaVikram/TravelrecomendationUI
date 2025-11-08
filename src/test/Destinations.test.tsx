import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import Destinations from '../pages/Destinations/Destinations';
import { fetchDestinationsByState } from '../api/DestinationServices';
import { useLocation, useNavigate } from 'react-router-dom';

// Mock the external dependencies
vi.mock('../api/DestinationServices', () => ({
  fetchDestinationsByState: vi.fn(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
    useParams: vi.fn().mockReturnValue({ stateId: '1' }),
  };
});

describe('Destinations Component', () => {
  const mockFetchDestinationsByState = vi.mocked(fetchDestinationsByState);
  const mockUseLocation = useLocation as ReturnType<typeof vi.fn>;
  const mockUseNavigate = vi.mocked(useNavigate);
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockFetchDestinationsByState.mockReset();
    mockUseLocation.mockReturnValue({
      state: { stateName: 'Mock State' },
    });
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it('renders destinations when API returns data', async () => {
    const mockData = {
      content: [
        {
          destinationId: 1,
          imageUrl: 'https://example.com/destination1.jpg',
          destinationName: 'Destination 1',
          stateName: 'Mock State',
          countryName: 'Mock Country',
          description: 'A beautiful place to visit.',
          rating: 4.5,
        },
        {
          destinationId: 2,
          imageUrl: 'https://example.com/destination2.jpg',
          destinationName: 'Destination 2',
          stateName: 'Mock State',
          countryName: 'Mock Country',
          description: 'Another wonderful destination.',
          rating: 4.0,
        },
      ],
    };

    // Mock the API response
    mockFetchDestinationsByState.mockResolvedValue(mockData);

    render(<Destinations />);

    // Wait for the API call to finish and check if destinations are rendered
    await waitFor(() => {
      // Check for the number of destination cards
      const destination1Elements = screen.getAllByText('Destination 1');
      const destination2Elements = screen.getAllByText('Destination 2');
      
      // Update these numbers if you expect multiple cards
      expect(destination1Elements.length).toBeGreaterThanOrEqual(1);
      expect(destination2Elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('shows an error message when API call fails', async () => {
    // Mock the API to reject
    mockFetchDestinationsByState.mockRejectedValue(new Error('Failed to fetch'));

    render(<Destinations />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('No Destinations Found')).toBeInTheDocument();
    });
  });

  it('shows a message when no destinations are available', async () => {
    // Mock the API to return an empty array
    mockFetchDestinationsByState.mockResolvedValue({ content: [] });

    render(<Destinations />);

    // Wait for the updated "No destinations found" message to appear
    await waitFor(() => {
      expect(screen.getByText('No Destinations Found')).toBeInTheDocument();
    });
  });
});
