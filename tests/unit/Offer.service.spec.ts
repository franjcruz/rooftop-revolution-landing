import { Client, SupplyPoint } from "@/domain/entities";
import { getDiscount, isClientEligible } from "@/domain/services";

describe("isClientEligible()", () => {
  it("should return true if client is eligible", () => {
    const client: Client = {
      fullname: "John Doe",
      address: "Calle Falsa 123",
      cups: "1234567890123456",
      role: "customer",
      buildingType: "house",
    };
    const supplyPoints: SupplyPoint[] = [
      {
        cups: "1234567890123456",
        tariff: "One price",
        invoicedAmount: 50,
        power: {
          p1: 100,
          p2: 100,
        },
        neighbors: ["9876543210123456", "3412567893456546"],
      },
    ];
    expect(isClientEligible(client, supplyPoints)).toBe(true);
  });

  it("should return false if client is not eligible due to building type", () => {
    const client: Client = {
      fullname: "John Doe",
      address: "Calle Falsa 12",
      cups: "9876543210123456",
      role: "customer",
      buildingType: "apartment",
    };
    const supplyPoints: SupplyPoint[] = [
      {
        cups: "9876543210123456",
        tariff: "Two price",
        invoicedAmount: 40,
        power: {
          p1: 85,
          p2: 85,
        },
        neighbors: ["5681237963314"],
      },
    ];
    expect(isClientEligible(client, supplyPoints)).toBe(false);
  });

  it("should return false if client is not eligible due to lack of neighbors", () => {
    const client: Client = {
      fullname: "John Doe",
      address: "Calle Falsa 123",
      cups: "1234567890123456",
      role: "customer",
      buildingType: "house",
    };
    const supplyPoints: SupplyPoint[] = [
      {
        cups: "1234567890123456",
        tariff: "One price",
        invoicedAmount: 50,
        power: {
          p1: 100,
          p2: 100,
        },
        neighbors: [],
      },
    ];
    expect(isClientEligible(client, supplyPoints)).toBe(false);
  });
});

describe("getDiscount()", () => {
  it("should thown error due to supply point is not found", () => {
    const client: Client = {
      fullname: "John Doe",
      address: "Calle Falsa 123",
      cups: "1234567890123456",
      role: "customer",
      buildingType: "house",
    };
    const supplyPoints: SupplyPoint[] = [
      {
        cups: "9876543210123456",
        tariff: "One price",
        invoicedAmount: 50,
        power: {
          p1: 100,
          p2: 100,
        },
        neighbors: [],
      },
    ];
    try {
      getDiscount(client, supplyPoints);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("should return the correct discount value (Special discount)", () => {
    const client: Client = {
      fullname: "John Doe",
      address: "Calle Falsa 123",
      cups: "1234567890123456",
      role: "customer",
      buildingType: "house",
    };
    const supplyPoints: SupplyPoint[] = [
      {
        cups: "1234567890123456",
        tariff: "One price",
        invoicedAmount: 50,
        power: {
          p1: 100,
          p2: 100,
        },
        neighbors: ["9876543210123456"],
      },
      {
        cups: "9876543210123456",
        tariff: "Two price",
        invoicedAmount: 140,
        power: {
          p1: 85,
          p2: 85,
        },
        neighbors: ["5681237963314"],
      },
    ];
    expect(getDiscount(client, supplyPoints)).toBe("Special discount");
  });

  it("should return the correct discount value (Basic discount)", () => {
    const client: Client = {
      fullname: "John Doe",
      address: "Calle Falsa 123",
      cups: "1234567890123456",
      role: "customer",
      buildingType: "house",
    };
    const supplyPoints: SupplyPoint[] = [
      {
        cups: "1234567890123456",
        tariff: "One price",
        invoicedAmount: 50,
        power: {
          p1: 100,
          p2: 100,
        },
        neighbors: ["9876543210123456"],
      },
      {
        cups: "9876543210123456",
        tariff: "Two price",
        invoicedAmount: 40,
        power: {
          p1: 85,
          p2: 85,
        },
        neighbors: ["5681237963314"],
      },
    ];
    expect(getDiscount(client, supplyPoints)).toBe("Basic discount");
  });

  it("should return the correct discount value (Standard offer)", () => {
    const client: Client = {
      fullname: "John Doe",
      address: "Calle Falsa 123",
      cups: "1234567890123456",
      role: "customer",
      buildingType: "house",
    };
    const supplyPoints: SupplyPoint[] = [
      {
        cups: "1234567890123456",
        tariff: "One price",
        invoicedAmount: 50,
        power: {
          p1: 100,
          p2: 100,
        },
        neighbors: ["9876543210123456"],
      },
      {
        cups: "9876543210123456",
        tariff: "Two price",
        invoicedAmount: 40,
        power: {
          p1: 185,
          p2: 185,
        },
        neighbors: ["5681237963314"],
      },
    ];
    expect(getDiscount(client, supplyPoints)).toBe("Standard offer");
  });
});
