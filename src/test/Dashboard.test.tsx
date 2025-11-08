// src/pages/Homepage/Homepage.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom';
import Homepage from "../pages/Homepage/Homepage";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";

// Mock the components and hooks
vi.mock("../../components/Hero/Hero", () => ({
  default: ({ destinations }: { destinations: any[] }) => (
    <div>
      {destinations.map((destination: any, index: number) => (
        <div key={index}>
          <img src={destination.image} alt={destination.alt} />
          <p>{destination.description}</p>
        </div>
      ))}
    </div>
  ),
}));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Homepage Component', () => {
  const mockNavigate = vi.fn();
  const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

  beforeEach(() => {
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it('renders Homepage component without crashing', () => {
    render(<Homepage />);
    expect(screen.getByText('PLAN YOUR TRIP')).toBeInTheDocument();
    expect(screen.getByText('Where to next?')).toBeInTheDocument();
  });

  it('renders Hero component with correct destinations data', () => {
    render(<Homepage />);
    const images = screen.getAllByRole('img');
    const descriptions = screen.getAllByText(/.*explore.*|.*beach.*|.*retreat.*/i);

    // Log the number of img and p elements to debug
    console.log("Number of img elements:", images.length);
    console.log("Number of description elements:", descriptions.length);

    expect(images[0]).toHaveAttribute('src', 'https://img.freepik.com/premium-photo/amazing-top-view-beach-aerial-view-tropical-beach-sea-beautiful-phuket-island-located-freedom-beach-phuket-thailand_34362-4347.jpg?w=740');
    expect(descriptions[0]).toHaveTextContent('The best beach to visit this summer');

    expect(images[1]).toHaveAttribute('src', 'https://www.thomascook.in/blog/wp-content/uploads/2020/03/winter-destinations-india.jpg');
    expect(descriptions[1]).toHaveTextContent('A peaceful retreat in the mountains');

    expect(images[2]).toHaveAttribute('src', 'https://www.planetware.com/wpimages/2020/03/best-hot-air-balloon-rides-cappadocia-turkey.jpg');
    expect(descriptions[2]).toHaveTextContent('Explore the vibrant life in the Air');
  });

  it('navigates to /countries when the "View all destinations" button is clicked', () => {
    render(<Homepage />);
    const button = screen.getByText('View all destinations');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/countries');
  });
});
