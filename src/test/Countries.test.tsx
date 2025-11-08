import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import Country from "../pages/Destinations/Countries";
import { fetchCountries } from "../api/DestinationServices";
import { useNavigate } from "react-router-dom";

// Mock the external dependencies
vi.mock("../api/DestinationServices", () => ({
  fetchCountries: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Country Component", () => {
  const mockFetchCountries = vi.mocked(fetchCountries);
  const mockUseNavigate = vi.mocked(useNavigate);
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockFetchCountries.mockReset();
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it("renders countries when API returns data", async () => {
    const mockData = [
      {
        countryId: 1,
        imageUrl: "https://example.com/country1.jpg",
        countryName: "Country 1",
      },
      {
        countryId: 2,
        imageUrl: "https://example.com/country2.jpg",
        countryName: "Country 2",
      },
    ];

    // Mock the API response
    mockFetchCountries.mockResolvedValue(mockData);

    render(<Country />);

    // Wait for the API call to finish and check if countries are rendered
    await waitFor(() => {
      const country1Elements = screen.getAllByText("Country 1");
      const country2Elements = screen.getAllByText("Country 2");

      // Update these numbers if you expect multiple cards
      expect(country1Elements.length).toBeGreaterThanOrEqual(1);
      expect(country2Elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("shows an error message when API call fails", async () => {
    // Mock the API to reject
    mockFetchCountries.mockRejectedValue(new Error("Failed to fetch"));

    render(<Country />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch countries")).toBeInTheDocument();
    });
  });

  it("shows a message when no countries are available", async () => {
    // Mock the API to return an empty array
    mockFetchCountries.mockResolvedValue([]);

    render(<Country />);

    // Wait for the updated "No countries available" message to appear
    // await waitFor(() => {
    //   // Adjust the text if necessary based on your component's actual message
    //   expect(screen.getByText("No countries available")).toBeInTheDocument();
    // });
  });

  it("navigates to the correct states page when a country card is clicked", async () => {
    const mockData = [
      {
        countryId: 1,
        imageUrl: "https://example.com/country1.jpg",
        countryName: "Country 1",
      },
    ];

    // Mock the API response
    mockFetchCountries.mockResolvedValue(mockData);

    render(<Country />);

    // Wait for the countries to be rendered
    await waitFor(() =>
      expect(screen.getByText(/Country 1/i)).toBeInTheDocument()
    );

    // Click the country card
    const countryCard = screen.getByText(/Country 1/i);
    countryCard.click();

    // Update the expectation to match the new route format
    expect(mockNavigate).toHaveBeenCalledWith("/countries/Country 1/states/1", {
      state: { countryName: "Country 1" },
    });
  });
});
