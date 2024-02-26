import { SupplyPointApiService } from "@/infrastructure/api";
import { InMemorySupplyPointRepository } from "@/infrastructure/repositories";

jest.mock("../../src/infrastructure/api/SupplyPoint.api", () => ({
  SupplyPointApiService: {
    getSupplyPoint: jest.fn(() => ({
      cups: "1234567890123456",
      tariff: "one",
      invoiced_amount: "100",
      power: {
        p1: "100",
        p2: "100",
      },
      neighbors: ["2222222222222222"],
    })),
    getSupplyPoints: jest.fn(() => [
      {
        cups: "9876543210987654",
        tariff: "one",
        invoiced_amount: "100",
        power: {
          p1: "100",
          p2: "100",
        },
        neighbors: ["5678901234567890"],
      },
      {
        cups: "5678901234567890",
        tariff: "one",
        invoiced_amount: "100",
        power: {
          p1: "100",
          p2: "100",
        },
        neighbors: ["9876543210987654"],
      },
    ]),
  },
}));

describe("InMemorySupplyPointRepository", () => {
  it("should return a list of supplyPoints", async () => {
    const supplyPoints = await InMemorySupplyPointRepository.getAll();
    expect(supplyPoints).toBeInstanceOf(Array);
    expect(supplyPoints).toHaveLength(2);
    expect(supplyPoints[0]).toHaveProperty("cups");
  });

  it("should return a supplyPoint by its cups", async () => {
    const supplyPoint = await InMemorySupplyPointRepository.getById(
      "1234567890123456"
    );
    expect(supplyPoint).toEqual({
      cups: "1234567890123456",
      tariff: "one",
      invoicedAmount: 100,
      power: {
        p1: 100,
        p2: 100,
      },
      neighbors: ["2222222222222222"],
    });
  });

  it("should return null due to cups is not associated to supplyPoint", async () => {
    jest
      .spyOn(SupplyPointApiService, "getSupplyPoint")
      .mockResolvedValueOnce(null);
    const supplyPoint = await InMemorySupplyPointRepository.getById(
      "11111111111"
    );
    expect(supplyPoint).toBeNull();
  });
});
