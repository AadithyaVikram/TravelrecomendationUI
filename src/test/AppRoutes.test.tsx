// src/routes/AppRoutes.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import "@testing-library/jest-dom";

describe("AppRoutes", () => {
  const renderWithRouter = (initialEntries: string[]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <AppRoutes />
      </MemoryRouter>
    );
  };

  it('should render Dashboard component for route "/"', () => {
    renderWithRouter(["/"]);
    expect(screen.getByText(/plan your trip/i)).toBeInTheDocument();
  });

  it('should render Countries component for route "/countries"', () => {
    renderWithRouter(["/countries"]);

    // Use a function matcher to handle text split across multiple elements
    const heading = screen.getByText((content, element) => {
      return (
        content.includes("Journey Across") &&
        element?.tagName.toLowerCase() === "h1"
      );
    });

    expect(heading).toBeInTheDocument();
  });

  it('should render States component for route "/countries/:countryName/states/:countryId"', () => {
    renderWithRouter(["/countries/:countryName/states/:countryId"]);
    expect(screen.getByText(/journey through the states/i)).toBeInTheDocument();
  });

  it('should render Destinations component for route "/countries/:countryName/:stateName/destinations/1"', () => {
    renderWithRouter(["/countries/:countryName/:stateName/destinations/1"]);
    expect(screen.getByText(/places worth exploring in/i)).toBeInTheDocument();
  });

  it("should render PageNotFound component for unknown route", () => {
    renderWithRouter(["/unknown-route"]);
    expect(screen.getByText(/looks like you're lost/i)).toBeInTheDocument();
  });
});
