/**
 * 
 * ### Business requirements

* We need to know which clients are allowed to get enrolled with the rooftop revolution. In order to offer solar product, the client's `building_type` must be **house** and it needs to have **at least 1 neighbor**.

* We have three types of offers for those clients that can have be part of the rooftop revolution each of them with a different discount percentage and with their conditions:
    1. **Standard offer**: No discount, no conditions.
    2. **Basic discount**: 5% discount. Conditions: its neighbors should have `p1` and `p2` powers lower than the current client's supply point.
    3. **Special discount**: 12% discount. Conditions: the addition of the `invoiced_amount` of its neighbors should be more than 100 euros.
 */

import { Client, SupplyPoint } from "@/domain/entities";

/**
 * Determines if a client is eligible based on their information and supply points.
 * @param client - The client object.
 * @param supplyPoints - The array of supply points.
 * @returns True if the client is eligible, false otherwise.
 */
const isClientEligible = (
  client: Client,
  supplyPoints: SupplyPoint[]
): boolean => {
  const clientSupplyPoint = supplyPoints.find((sp) => sp.cups === client.cups);
  if (client.buildingType !== "house" || !clientSupplyPoint) {
    return false;
  }
  return clientSupplyPoint.neighbors.length > 0;
};

/**
 * Calculates the discount for a client based on their supply points.
 * @param client - The client for whom the discount is being calculated.
 * @param supplyPoints - The list of supply points.
 * @returns The type of discount: "Special discount", "Basic discount", or "Standard offer".
 * @throws Error if the client's supply point is not found.
 */
const getDiscount = (client: Client, supplyPoints: SupplyPoint[]): string => {
  const clientSupplyPoint = supplyPoints.find((sp) => sp.cups === client.cups);
  if (!clientSupplyPoint) {
    throw Error("Supply point not found");
  }

  const neighbors = supplyPoints.filter((sp) =>
    clientSupplyPoint.neighbors.includes(sp.cups)
  );

  const { p1, p2 } = clientSupplyPoint.power;

  if (p1 > 0 && p2 > 0) {
    const neighborsP1 = neighbors.map((sp) => sp.power.p1);
    const neighborsP2 = neighbors.map((sp) => sp.power.p2);

    const isBasicDiscountEligible =
      neighborsP1.every((p) => p < p1) && neighborsP2.every((p) => p < p2);
    const neighborsInvoicedAmount = neighbors.reduce(
      (acc, neighbor) => acc + neighbor.invoicedAmount,
      0
    );

    if (isBasicDiscountEligible && neighborsInvoicedAmount > 100) {
      return "Special discount";
    } else if (isBasicDiscountEligible) {
      return "Basic discount";
    }
  }

  return "Standard offer";
};

export { isClientEligible, getDiscount };
