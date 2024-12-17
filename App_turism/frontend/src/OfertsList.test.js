import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OfertsList from "./OfertsList.jsx";
import '@testing-library/jest-dom'; // Extensii pentru aserțiuni (ex. .toBeInTheDocument())

global.fetch = jest.fn();

describe("OfertsList Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("ar trebui să afiseze butonul de încărcare", () => {
    render(<OfertsList />);
    const button = screen.getByText(/Încarcă ofertele/i);
    expect(button).toBeInTheDocument();
  });

  test("ar trebui să afiseze mesajul de încărcare", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ pret: 100, descriere: "Pachet turistic 1" }],
    });

    render(<OfertsList />);
    const button = screen.getByText(/Încarcă ofertele/i);
    fireEvent.click(button);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("ar trebui să afișeze un mesaj de eroare dacă cererea de date eșuează", async () => {
    fetch.mockRejectedValueOnce(new Error("Eroare la obținerea ofertelor"));

    render(<OfertsList />);
    const button = screen.getByText(/Încarcă ofertele/i);
    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText(/Eroare la obținerea ofertelor/i)).toBeInTheDocument());
  });
});
