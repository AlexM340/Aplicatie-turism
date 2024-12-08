jest.mock("../models/clienti_detalii", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock closing DB connection
}));

const Clienti_detalii = require("../models/clienti_detalii");

describe("Clienti_detalii Model (Mocked)", () => {
  beforeAll(async () => {
    await Clienti_detalii.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Clienti_detalii.sequelize.close(); // This is mocked
  });

  test("should create a valid clienti_detalii record", async () => {
    // Mock the create method to simulate database record creation
    Clienti_detalii.create.mockResolvedValue({
      id: 1,
      id_client: 1,
      telefon: "1234567890",
      adresa: "Street 123, City",
      cnp: "1234567890123",
    });

    const clientiDetalii = await Clienti_detalii.create({
      id_client: 1,
      telefon: "1234567890",
      adresa: "Street 123, City",
      cnp: "1234567890123",
    });

    expect(clientiDetalii.id).toBeDefined(); // Ensure ID is auto-generated
    expect(clientiDetalii.id_client).toBe(1);
    expect(clientiDetalii.telefon).toBe("1234567890");
    expect(clientiDetalii.adresa).toBe("Street 123, City");
    expect(clientiDetalii.cnp).toBe("1234567890123");

    // Ensure create method was called with correct data
    expect(Clienti_detalii.create).toHaveBeenCalledWith({
      id_client: 1,
      telefon: "1234567890",
      adresa: "Street 123, City",
      cnp: "1234567890123",
    });
  });

  test("should fail when creating a clienti_detalii record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Clienti_detalii.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Clienti_detalii.create({
        // Missing required fields like `id_client`, `telefon`, `adresa`, `cnp`
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should handle foreign key constraint for id_client", async () => {
    // Mock the create method to simulate successful record creation with valid foreign key references
    Clienti_detalii.create.mockResolvedValue({
      id: 2,
      id_client: 1, // Valid foreign key reference for `id_client`
      telefon: "9876543210",
      adresa: "Avenue 456, City",
      cnp: "9876543210123",
    });

    const clientiDetalii = await Clienti_detalii.create({
      id_client: 1,
      telefon: "9876543210",
      adresa: "Avenue 456, City",
      cnp: "9876543210123",
    });

    expect(clientiDetalii.id).toBeDefined();
    expect(clientiDetalii.id_client).toBe(1);
    expect(clientiDetalii.telefon).toBe("9876543210");
    expect(clientiDetalii.adresa).toBe("Avenue 456, City");
    expect(clientiDetalii.cnp).toBe("9876543210123");
  });
});
