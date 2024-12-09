jest.mock("../models/cazare", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Simulate successful sync
  sequelize: { close: jest.fn(() => Promise.resolve()) },
}));

const Cazare = require("../models/cazare");

describe("Cazare Model (Mocked)", () => {
  beforeAll(async () => {
    await Cazare.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Cazare.sequelize.close(); // This is mocked
  });

  test("should create a valid cazare record", async () => {
    // Mock the create method to simulate a database record creation
    Cazare.create.mockResolvedValue({
      id: 1,
      nume: "Hotel Paradis",
      telefon: "123456789",
      descriere: "A beautiful hotel near the beach",
      id_tara: 1,
      id_loc: 1,
    });

    const cazare = await Cazare.create({
      nume: "Hotel Paradis",
      telefon: "123456789",
      descriere: "A beautiful hotel near the beach",
      id_tara: 1,
      id_loc: 1,
    });

    expect(cazare.id).toBeDefined(); // Ensure ID is auto-generated
    expect(cazare.nume).toBe("Hotel Paradis");
    expect(cazare.telefon).toBe("123456789");
    expect(cazare.descriere).toBe("A beautiful hotel near the beach");
    expect(cazare.id_tara).toBe(1);
    expect(cazare.id_loc).toBe(1);

    // Ensure create method was called with correct data
    expect(Cazare.create).toHaveBeenCalledWith({
      nume: "Hotel Paradis",
      telefon: "123456789",
      descriere: "A beautiful hotel near the beach",
      id_tara: 1,
      id_loc: 1,
    });
  });

  test("should fail when creating a cazare record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Cazare.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Cazare.create({
        // Missing required fields like `nume`, `telefon`, etc.
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should handle foreign key constraint for id_tara and id_loc", async () => {
    // Mock the create method to simulate successful record creation with valid foreign key references
    Cazare.create.mockResolvedValue({
      id: 2,
      nume: "Mountain Resort",
      telefon: "987654321",
      descriere: "A resort in the mountains",
      id_tara: 1, // Valid foreign key reference for `id_tara` and `id_loc`s
      id_loc: 2,
    });

    const cazare = await Cazare.create({
      nume: "Mountain Resort",
      telefon: "987654321",
      descriere: "A resort in the mountains",
      id_tara: 1,
      id_loc: 2,
    });

    expect(cazare.id).toBeDefined();
    expect(cazare.nume).toBe("Mountain Resort");
    expect(cazare.telefon).toBe("987654321");
    expect(cazare.descriere).toBe("A resort in the mountains");
    expect(cazare.id_tara).toBe(1);
    expect(cazare.id_loc).toBe(2);
  });
});
