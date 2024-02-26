export interface PowerSupplyPoint {
  p1: number;
  p2: number;
}

export interface SupplyPoint {
  cups: string;
  tariff: string;
  invoicedAmount: number;
  power: PowerSupplyPoint;
  neighbors: string[];
}

/**
 * 
 * ## Glossary
- **CUPS**: Universal acronym for the supply point identifier number in Spanish
- **Neighbors**: Clients that live near by identified by CUPS.
- **Tariff**: Name of the contracted supply point product.
- **Power**: Divided by two different periods, represents the provided energy to the supply point in Watts.
- **Invoiced amount**: Price that the client is paying monthly for the contracted power in euros.
 */
