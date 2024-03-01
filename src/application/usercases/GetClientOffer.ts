/**
 * Retrieves the client's offer based on their eligibility and available supply points.
 * @param client - The client for whom to retrieve the offer.
 * @param clientSupplyPoint - The client supply point.
 * @param supplyPoints - The list of supply points associated with the client.
 * @returns The client's offer as a string, or "NOT_ELIGIBLE" if the client is not eligible.
 */
import { Client, SupplyPoint } from "@/domain/entities";
import { getDiscount, isClientEligible } from "@/domain/services";

const GetClientOffer = (
  client: Client,
  clientSupplyPoint: SupplyPoint,
  supplyPoints: SupplyPoint[]
): string => {
  const isEligible = isClientEligible(client, clientSupplyPoint);

  if (!isEligible) {
    return "NOT_ELIGIBLE";
  }

  try {
    const discount = getDiscount(client, supplyPoints);

    return discount;
  } catch (error) {
    return "NOT_ELIGIBLE";
  }
};

export { GetClientOffer };
