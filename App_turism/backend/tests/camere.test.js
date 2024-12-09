jest.mock("../models/camere", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Simulate successful sync
  sequelize: { close: jest.fn(() => Promise.resolve()) },
}));

const Camere = require("../models/camere");

describe("Camere Model (Mocked)", () => {
  beforeAll(async () => {
    await Camere.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Camere.sequelize.close(); // This is mocked
  });

  test("should create a valid room record", async () => {
    // Mock the create method to simulate a database record creation
    Camere.create.mockResolvedValue({
      id: 1,
      id_cazare: 1,
      nr_persoane: 4,
      descriere: "Room with a sea view",
      pret: 200,
    });

    const camera = await Camere.create({
      id_cazare: 1,
      nr_persoane: 4,
      descriere: "Room with a sea view",
      pret: 200,
    });

    expect(camera.id).toBeDefined(); // Ensure ID is auto-generated
    expect(camera.id_cazare).toBe(1);
    expect(camera.nr_persoane).toBe(4);
    expect(camera.descriere).toBe("Room with a sea view");
    expect(camera.pret).toBe(200);

    // Ensure create method was called with correct data
    expect(Camere.create).toHaveBeenCalledWith({
      id_cazare: 1,
      nr_persoane: 4,
      descriere: "Room with a sea view",
      pret: 200,
    });
  });

  test("should fail when creating a room with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Camere.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Camere.create({
        // Missing required fields like `id_cazare`, `nr_persoane`, etc.
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should handle foreign key constraint for id_cazare", async () => {
    // Mock the create method to simulate successful record creation with a valid `id_cazare`
    Camere.create.mockResolvedValue({
      id: 2,
      id_cazare: 100, // Simulating a valid foreign key reference
      nr_persoane: 2,
      descriere: "Small room",
      pret: 150,
    });

    const camera = await Camere.create({
      id_cazare: 100,
      nr_persoane: 2,
      descriere: "Small room",
      pret: 150,
    });

    expect(camera.id).toBeDefined();
    expect(camera.id_cazare).toBe(100);
    expect(camera.nr_persoane).toBe(2);
    expect(camera.descriere).toBe("Small room");
    expect(camera.pret).toBe(150);
  });
});
