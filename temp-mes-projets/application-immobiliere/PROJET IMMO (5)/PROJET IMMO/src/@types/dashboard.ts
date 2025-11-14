import { RefObject } from 'react';

// Types for data
export interface Invoice {
  id: string;
  client: string;
  montant: string;
  date: string;
  delai?: string;
  retard?: string;
  status?: string;
}

export interface Owner {
  id: string;
  nom: string;
  propriétés: number;
  revenu: string;
  contact: string;
  statut: string;
}

export interface Tenant {
  id: string;
  nom: string;
  propriété: string;
  loyer: string;
  contact: string;
  statut: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  status?: string;
}

// Types for refs
export interface ModalRefs {
  paidInvoicesModalRef: RefObject<HTMLDivElement>;
  unpaidInvoicesModalRef: RefObject<HTMLDivElement>;
  ownersModalRef: RefObject<HTMLDivElement>;
  tenantsModalRef: RefObject<HTMLDivElement>;
  invoiceDetailsModalRef: RefObject<HTMLDivElement>;
  ownerDetailsModalRef: RefObject<HTMLDivElement>;
  tenantDetailsModalRef: RefObject<HTMLDivElement>;
}

// State type
export interface DashboardState {
  timeRange: string;
  isRefreshing: boolean;
  activeTab: string;
  showAllStats: boolean;
  selectedPeriod: string;
  showPaidInvoices: boolean;
  showUnpaidInvoices: boolean;
  showOwners: boolean;
  showTenants: boolean;
  showInvoiceDetails: boolean;
  selectedInvoice: Invoice | null;
  showOwnerDetails: boolean;
  selectedOwner: Owner | null;
  showTenantDetails: boolean;
  selectedTenant: Tenant | null;
}