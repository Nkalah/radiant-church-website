export interface MinistryEvent {
  year: string;
  title: string;
  description?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

// Existing shape (unchanged) — name/category/leader/meetingTime keep their
// current meaning: "name" is the role title, "category" the rank/position,
// "leader" the person's name, "meetingTime" the region.
export interface Minister {
  id: number;
  name: string;
  category: string;
  leader: string;
  meetingTime: string;
  description: string;
  imageUrl: string;

  // Profile-page additions
  bio?: string;
  quote?: string;
  vision?: string;
  mission?: string[];
  responsibilities?: string[];
  favoriteScripture?: string;
  scriptureReference?: string;
  yearsInMinistry?: number;
  assembly?: string;
  state?: string;
  email?: string;
  phone?: string;
  languages?: string[];
  galleryImages?: string[];
  recentEvents?: MinistryEvent[];
  socialLinks?: SocialLinks;
}