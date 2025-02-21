// src/types.ts

export interface User {
  id: number;
  username: string;
  bio: string;
  age?: number;
  gender?: string;
  interests?: string[];
  location?: string;
  occupation?: string;
  personality_tags?: string[];
  profile_picture?: string;
}
