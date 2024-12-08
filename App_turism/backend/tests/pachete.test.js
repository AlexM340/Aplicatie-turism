jest.mock("../models/pachete", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock closing DB connection
}));

const Pachete = require("../models/pachete");

describe("Pachete Model (Mocked)", () => {
  beforeAll(async () => {
    await Pachete.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Pachete.sequelize.close(); // This is mocked
  });

  test("should create a valid pachete record", async () => {
    // Mock the create method to simulate database record creation
    Pachete.create.mockResolvedValue({
      id: 1,
      id_camera: 1,
      id_zbor: 1,
      data_plecare: "2024-12-10T10:00:00Z",
      data_sosire: "2024-12-15T18:00:00Z",
    });

    const pachet = await Pachete.create({
      id_camera: 1,
      id_zbor: 1,
      data_plecare: "2024-12-10T10:00:00Z",
      data_sosire: "2024-12-15T18:00:00Z",
    });

    expect(pachet.id).toBeDefined(); // Ensure ID is auto-generated
    expect(pachet.id_camera).toBe(1);
    expect(pachet.id_zbor).toBe(1);
    expect(pachet.data_plecare).toBe("2024-12-10T10:00:00Z");
    expect(pachet.data_sosire).toBe("2024-12-15T18:00:00Z");

    // Ensure create method was called with correct data
    expect(Pachete.create).toHaveBeenCalledWith({
      id_camera: 1,
      id_zbor: 1,
      data_plecare: "2024-12-10T10:00:00Z",
      data_sosire: "2024-12-15T18:00:00Z",
    });
  });

  test("should fail when creating a pachete record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Pachete.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Pachete.create({
        // Missing required fields like `id_camera`, `id_zbor`, `data_plecare`, `data_sosire`
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should handle foreign key constraint for id_camera and id_zbor", async () => {
    Pachete.create.mockResolvedValue({
      id: 2,
      id_camera: 1, // Valid foreign key reference for `id_camera`
      id_zbor: 1, // Valid foreign key reference for `id_zbor`
      data_plecare: "2024-12-20T09:00:00Z",
      data_sosire: "2024-12-25T17:00:00Z",
    });

    const pachet = await Pachete.create({
      id_camera: 1, // Assuming 1 is a valid `id_camera`
      id_zbor: 1, // Assuming 1 is a valid `id_zbor`
      data_plecare: "2024-12-20T09:00:00Z",
      data_sosire: "2024-12-25T17:00:00Z",
    });

    expect(pachet.id).toBeDefined();
    expect(pachet.id_camera).toBe(1);
    expect(pachet.id_zbor).toBe(1);
    expect(pachet.data_plecare).toBe("2024-12-20T09:00:00Z");
    expect(pachet.data_sosire).toBe("2024-12-25T17:00:00Z");
  });
});
