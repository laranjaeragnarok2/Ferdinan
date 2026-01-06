export interface ProposalService {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  type: 'setup' | 'monthly';
}

export interface TechnicalIntegration {
  id: string;
  name: string;
  price: number;
  type: 'setup';
}

export interface ProposalData {
  id?: string;
  clientName: string;
  title: string;
  subtitle: string;
  services: ProposalService[];
  integrations: TechnicalIntegration[];
  taxRate: number; // e.g., 0.17 for 17%
  updatedAt: string;
}
