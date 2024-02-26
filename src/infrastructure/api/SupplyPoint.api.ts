import { SupplyPointDTO } from "../dto";
import SupplyPointsData from "../data/supply-points.json";

export const SupplyPointApiService = {
  async getSupplyPoints(): Promise<SupplyPointDTO[]> {
    const supplyPoints = await getSupplyPointsData();

    return supplyPoints;
  },
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
