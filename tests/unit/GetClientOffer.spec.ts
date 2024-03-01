import { Client, SupplyPoint } from "@/domain/entities";
import { getDiscount, isClientEligible } from "@/domain/services";
import { GetClientOffer } from "@/application/usercases";

jest.mock("@/domain/services");

describe("GetClientOffer()", () => {
  const mockedGetDiscount = getDiscount as jest.Mock;
  const mockedIsClientEligible = isClientEligible as jest.Mock;

  it("should return 'NOT_ELIGIBLE' if client is not eligible", () => {
    mockedIsClientEligible.mockReturnValueOnce(false);
    const result = GetClientOffer(
      {} as Client,
      {} as SupplyPoint,
      [] as SupplyPoint[]
    );
    expect(result).toBe("NOT_ELIGIBLE");
  });

  it("should return the correct discount value if client is eligible", () => {
    mockedIsClientEligible.mockReturnValueOnce(true);
    mockedGetDiscount.mockReturnValueOnce("BASIC_DISCOUNT");
    const result = GetClientOffer(
      {} as Client,
      {} as SupplyPoint,
      {} as SupplyPoint[]
    );
    expect(result).toBe("BASIC_DISCOUNT");
  });

  it("should return the correct discount value if client is eligible", () => {
    mockedIsClientEligible.mockReturnValueOnce(true);
    mockedGetDiscount.mockReturnValueOnce("SPECIAL_DISCOUNT");
    const result = GetClientOffer(
      {} as Client,
      {} as SupplyPoint,
      {} as SupplyPoint[]
    );
    expect(result).toBe("SPECIAL_DISCOUNT");
  });

  it("should return the correct discount value if client is eligible", () => {
    mockedIsClientEligible.mockReturnValueOnce(true);
    mockedGetDiscount.mockReturnValueOnce("STANDARD_OFFER");
    const result = GetClientOffer(
      {} as Client,
      {} as SupplyPoint,
      {} as SupplyPoint[]
    );
    expect(result).toBe("STANDARD_OFFER");
  });

  it("should return 'NOT_ELIGIBLE' if an error occurs", () => {
    mockedIsClientEligible.mockReturnValueOnce(false);
    mockedGetDiscount.mockImplementationOnce(() => {
      throw new Error("Error");
    });
    const result = GetClientOffer(
      {} as Client,
      {} as SupplyPoint,
      {} as SupplyPoint[]
    );
    expect(result).toBe("NOT_ELIGIBLE");
  });
});
