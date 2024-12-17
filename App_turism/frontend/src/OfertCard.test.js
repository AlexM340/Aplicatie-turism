import React from "react"; // Add this import to fix the error
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OfertCard from "./OfertCard"; // Assuming the component is named OfertCard

describe("OfertCard Component", () => {
  const mockProps = {
    image: "https://example.com/image.jpg",
    price: 299,
    location: "Paris, France",
    description: "A wonderful trip to the city of lights."
  };

  test("should display the image with the correct 'src' attribute", async () => {
    render(<OfertCard {...mockProps} />);
    const imgElement = screen.getByRole("img", { name: mockProps.location });
    expect(imgElement).toHaveAttribute("src", mockProps.image);
  });

  test("should display the location correctly", async () => {
    render(<OfertCard {...mockProps} />);
    expect(screen.getByText(mockProps.location)).toBeInTheDocument();
  });

  test("should display the description correctly", async () => {
    render(<OfertCard {...mockProps} />);
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  test("should display the price correctly", async () => {
    render(<OfertCard {...mockProps} />);
    expect(screen.getByText(`Price: $${mockProps.price}`)).toBeInTheDocument();
  });

  test("should display the 'Book Now' button", async () => {
    render(<OfertCard {...mockProps} />);
    const buttonElement = screen.getByRole("link", { name: /Book Now/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
