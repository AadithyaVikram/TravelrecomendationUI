// src/test/States.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import States from "../pages/Destinations/States";
import { fetchStatesByCountry } from "../api/DestinationServices";
import { useNavigate, BrowserRouter } from "react-router-dom";
import { Place } from "../types";

// Mock the API call
vi.mock("../api/DestinationServices", () => ({
  fetchStatesByCountry: vi.fn(),
}));

// Mock configuration in States.test.tsx
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({
      state: { countryName: "Mock Country" },
    }),
    useNavigate: vi.fn(),
    useParams: vi.fn().mockReturnValue({ countryId: "1" }),
  };
});

describe("States Component", () => {
  const mockFetchStatesByCountry = fetchStatesByCountry as ReturnType<typeof vi.fn>;
  const mockUseNavigate = useNavigate as ReturnType<typeof vi.fn>;
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockFetchStatesByCountry.mockReset();
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it("renders states when API returns data", async () => {
    const mockData: Place[] = [
      {
        stateId: 1,
        imageUrl: "https://example.com/image1.jpg",
        stateName: "State 1",
        regionName:"Mock Country"
      },
      {
        stateId: 2,
        imageUrl: "https://example.com/image2.jpg",
        stateName: "State 2",
        regionName:"Mock Country"
      },
    ];

    // Mock the API response
    mockFetchStatesByCountry.mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <States />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('State 1')).toBeInTheDocument();
      expect(screen.getByText('State 2')).toBeInTheDocument();
    });
  });

  it("shows an error message when API call fails", async () => {
    mockFetchStatesByCountry.mockRejectedValue(new Error("Failed to fetch"));

    render(
      <BrowserRouter>
        <States />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No Destinations Found")).toBeInTheDocument();
    });
  });

  it("shows a message when no states are available", async () => {
    mockFetchStatesByCountry.mockResolvedValue([]);

    render(
      <BrowserRouter>
        <States />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No Destinations Found")).toBeInTheDocument();
    });
  });

  it("navigates to the correct destination when a state card is clicked", async () => {
    const mockData: Place[] = [
      {
        stateId: 1,
        imageUrl: "https://example.com/image1.jpg",
        stateName: "State 1",
        regionName:"Mock Country"

      },
    ];

    mockFetchStatesByCountry.mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <States />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('State 1')).toBeInTheDocument();
    });

    // Click the state card
    const stateCard = screen.getByText('State 1');
    fireEvent.click(stateCard);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/countries/Mock Country/State 1/destinations/1",
        { state: { stateName: "State 1" } }
      );
    });
  });
});
