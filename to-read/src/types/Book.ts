export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  isRead: boolean;
  rating: number;
  addedAt: Date;
} 