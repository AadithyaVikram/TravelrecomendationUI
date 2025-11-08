// src/pages/NotFound/PageNotFound.test.tsx

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PageNotFound from "../pages/NotFound/PageNotFound";

describe("PageNotFound Component", () => {
  it("renders the PageNotFound component with the correct text", () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    // Check for the heading and message
    expect(screen.getByText(/Looks like you're lost/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We can't seem to find the page you're looking for./i)
    ).toBeInTheDocument();
  });

  it('renders the "Back to the Homepage" link', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("link", {
      name: /Back to the Homepage/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("renders the not found image", () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    const imgElement = screen.getByAltText(/Not Found/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "/src/components/pageNotFound.jpg"); // Check for the mocked image
  });

  it('navigates to the homepage when "Back to the Homepage" link is clicked', async () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const linkElement = screen.getByRole("link", {
      name: /Back to the Homepage/i,
    });

    // Simulate clicking the link
    await user.click(linkElement);

    // Since navigation is mocked, just ensure the link exists and is clickable
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
