export interface SeoConfig {
  page: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywords: string;
}

export interface AnalyticsConfig {
  gaMeasurementId: string;
  isEnabled: boolean;
  anonymizeIp: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt?: string;
  cvCount?: number;
}

export interface AdminAuthResponse {
  token: string;
  user: AdminUser;
}

export interface PricingSettings {
  id: string;
  cvPrice: number;
  currency: string;
  updatedAt: string;
}

export interface PaymentSummary {
  id: string;
  userId: string;
  email: string;
  cvId: string | null;
  amount: number;
  currency: string;
  status: "pending" | "successful" | "failed" | "cancelled";
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  paidAt: string | null;
}

export interface AdminStats {
  totalUsers: number;
  totalCVs: number;
  successfulPayments: number;
  totalRevenue: number;
  failedPayments: number;
}
