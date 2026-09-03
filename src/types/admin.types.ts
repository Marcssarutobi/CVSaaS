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
  role: "admin" | "superadmin";
}

export interface AdminAuthResponse {
  token: string;
  user: AdminUser;
}
