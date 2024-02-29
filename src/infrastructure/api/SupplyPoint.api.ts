import { SupplyPointDTO } from "../dto";
import SupplyPointsData from "../data/supply-points.json";

/**
 * Service for interacting with the Supply Point API.
 */
export const SupplyPointApiService = {
  /**
   * Retrieves all supply points.
   * @returns A promise that resolves to an array of SupplyPointDTO objects.
   */
  async getSupplyPoints(): Promise<SupplyPointDTO[]> {
    const supplyPoints = await getSupplyPointsData();

    return supplyPoints;
  },

  /**
   * Retrieves a supply point by its CUPS identifier.
   * @param cups - The CUPS identifier of the supply point.
   * @returns A promise that resolves to a SupplyPointDTO object, or null if not found.
   */
  async getSupplyPoint(cups: string): Promise<SupplyPointDTO | null> {
    const supplyPoints = await getSupplyPointsData();
    const supplyPoint = supplyPoints.find((sp) => sp.cups === cups);

    return supplyPoint || null;
  },
};

// This is a implementation to get the supplyPoint data from a json file, if we want to get data from http, we can create a "util" to request GET, POST, PUT, DELETE, etc.
const getSupplyPointsData = async () => {
  try {
    const response = SupplyPointsData;

    return response;
  } catch (error) {
    console.error("Failed to fetch supplyPoints data");
    throw error;
  }
};
