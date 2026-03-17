export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Suite {
  id: string;
  title: string;
  price: string;
  image: string;
  desc: string;
  fullDesc?: string;
  features?: string[];
  gallery?: string[];
}

export interface SiteContent {
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  heroTitle: string;
  heroSubtitle: string;
  amenitiesTitle?: string;
  globalAmenities?: string[];
}

// Admin credentials stored in localStorage
export interface AdminCredentials {
  email: string;
  passwordHash: string;
}

export type ContentContextType = {
  suites: Suite[];
  content: SiteContent;
  updateSuite: (suite: Suite) => void;
  addSuite: (suite: Suite) => void;
  deleteSuite: (id: string) => void;
  updateContent: (content: SiteContent) => void;
  isAuthenticated: boolean;
  isSetupComplete: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setupCredentials: (email: string, password: string) => void;
  updateCredentials: (email: string, newPassword: string) => boolean;
};