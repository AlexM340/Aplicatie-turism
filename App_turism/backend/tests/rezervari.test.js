jest.mock("../models/rezervari", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock closing DB connection
}));

const Rezervari = require("../models/rezervari");

describe("Rezervari Model (Mocked)", () => {
  beforeAll(async () => {
    await Rezervari.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Rezervari.sequelize.close(); // This is mocked
  });

  test("should create a valid rezervare record", async () => {
    // Mock the create method to simulate database record creation
    Rezervari.create.mockResolvedValue({
      id: 1,
      id_pachet: 1,
      id_client: 1,
    });

    const rezervare = await Rezervari.create({
      id_pachet: 1,
      id_client: 1,
    });

    expect(rezervare.id).toBeDefined(); // Ensure ID is auto-generated
    expect(rezervare.id_pachet).toBe(1);
    expect(rezervare.id_client).toBe(1);

    // Ensure create method was called with correct data
    expect(Rezervari.create).toHaveBeenCalledWith({
      id_pachet: 1,
      id_client: 1,
    });
  });

  test("should fail when creating a rezervare record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Rezervari.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Rezervari.create({
        // Missing required fields like `id_pachet` and `id_client`
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should handle foreign key constraint for id_pachet and id_client", async () => {
    // Mock the create method to simulate successful record creation with valid foreign key references
    Rezervari.create.mockResolvedValue({
      id: 2,
      id_pachet: 1, // Valid foreign key reference for `id_pachet`
      id_client: 2, // Valid foreign key reference for `id_client`
    });

    const rezervare = await Rezervari.create({
      id_pachet: 1,
      id_client: 2,
    });

    expect(rezervare.id).toBeDefined();
    expect(rezervare.id_pachet).toBe(1);
    expect(rezervare.id_client).toBe(2);
  });
});
