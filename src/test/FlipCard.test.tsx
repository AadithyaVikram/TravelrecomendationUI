import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import FlippableCard from "../components/Cards/FlipCard";

describe("FlippableCard Component", () => {
  const defaultProps = {
    id: 1,
    imageUrl: "https://example.com/image.jpg",
    destinationName: "Beautiful Place",
    description: "A lovely place to visit.",
    rating: 4.5,
  };

  it("renders the card with the correct content", () => {
    render(<FlippableCard {...defaultProps} />);

    // Check that the front side content is rendered
    expect(screen.getByAltText("Beautiful Place")).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );

    // Check that all elements with "Beautiful Place" text are present
    const titles = screen.getAllByText("Beautiful Place");
    expect(titles).toHaveLength(2); // Assuming you have 2 such elements (front and back of the card)
  });

  it("flips the card when clicked", () => {
    render(<FlippableCard {...defaultProps} />);

    // Target the card element
    const card = screen
      .getByRole("img", { name: "Beautiful Place" })
      .closest(".flippable-card");

    // Initially, the card should not be flipped
    expect(card).not.toHaveClass("flipped");

    // Click the card to flip it
    fireEvent.click(card);

    // After the click, the card should be flipped
    expect(card).toHaveClass("flipped");

    // Check that the back side content is now visible
    expect(screen.getByText("A lovely place to visit.")).toBeInTheDocument();
    expect(screen.getByText("Rating: 4.5")).toBeInTheDocument();
  });

  it("can flip the card back to the front", () => {
    render(<FlippableCard {...defaultProps} />);

    // Target the card element
    const card = screen
      .getByRole("img", { name: "Beautiful Place" })
      .closest(".flippable-card");

    // Click to flip the card
    fireEvent.click(card);

    // Click again to flip it back
    fireEvent.click(card);

    // The card should not be flipped after the second click
    expect(card).not.toHaveClass("flipped");
  });
});
