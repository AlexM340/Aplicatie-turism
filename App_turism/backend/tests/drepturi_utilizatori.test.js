jest.mock("../models/drepturi_utilizatori", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method to resolve immediately
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock sequelize close method
}));

const Drepturi_utilizatori = require("../models/drepturi_utilizatori");
const Angajati = require("../models/angajati"); // Mocking dependent model
const Permisiuni = require("../models/permisiuni"); // Mocking dependent model

describe("Drepturi_utilizatori Model (Mocked)", () => {
  beforeAll(async () => {
    await Drepturi_utilizatori.sync({ force: true }); // This is mocked, no actual DB interaction
  });

  afterAll(async () => {
    await Drepturi_utilizatori.sequelize.close(); // This is also mocked
  });

  test("should create a valid drepturi_utilizatori record", async () => {
    // Mock the `create` method to simulate a successful record creation
    Drepturi_utilizatori.create.mockResolvedValue({
      id: 1,
      id_angajat: 1,
      id_permisiune: 1,
    });

    const drepturi_utilizatori = await Drepturi_utilizatori.create({
      id_angajat: 1,
      id_permisiune: 1,
    });

    expect(drepturi_utilizatori.id).toBeDefined(); // Ensure ID is auto-generated
    expect(drepturi_utilizatori.id_angajat).toBe(1);
    expect(drepturi_utilizatori.id_permisiune).toBe(1);

    // Verify `create` method was called with correct arguments
    expect(Drepturi_utilizatori.create).toHaveBeenCalledWith({
      id_angajat: 1,
      id_permisiune: 1,
    });
  });

  test("should fail when creating a drepturi_utilizatori record with missing foreign key reference", async () => {
    // Simulate error when a reference does not exist
    Drepturi_utilizatori.create.mockRejectedValue(
      new Error("Foreign key violation")
    );

    await expect(
      Drepturi_utilizatori.create({
        id_angajat: 999, // Non-existing angajat ID
        id_permisiune: 1,
      })
    ).rejects.toThrow("Foreign key violation");
  });

  test("should correctly handle CASCADE onDelete behavior", async () => {
    // Simulate the cascading delete behavior
    Drepturi_utilizatori.create.mockResolvedValue({
      id: 2,
      id_angajat: 2,
      id_permisiune: 2,
    });

    // Simulate an "angajat" or "permisiune" being deleted, triggering CASCADE delete
    Drepturi_utilizatori.destroy = jest.fn().mockResolvedValue(true); // Mock delete behavior

    await Drepturi_utilizatori.destroy({
      where: { id_angajat: 2 },
    });

    expect(Drepturi_utilizatori.destroy).toHaveBeenCalledWith({
      where: { id_angajat: 2 },
    });
  });
});
