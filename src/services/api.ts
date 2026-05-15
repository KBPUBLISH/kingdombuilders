import axios, { type AxiosInstance } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://backendgk2-0.onrender.com";

const FAITH_DEFENCE_API_BASE_URL =
  import.meta.env.VITE_FAITH_DEFENCE_API_BASE_URL ||
  "https://faithdefence.onrender.com";

export const PORTAL_URL =
  import.meta.env.VITE_PORTAL_URL || "https://portalgk2-0.netlify.app";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete (config.headers as Record<string, unknown>)["Content-Type"];
  }
  return config;
});

export const faithDefenceClient: AxiosInstance = axios.create({
  baseURL: FAITH_DEFENCE_API_BASE_URL,
  timeout: 60_000,
  headers: { "Content-Type": "application/json" },
});

export function getMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("blob:") || url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("/uploads")) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}/${url}`;
}

export type Book = {
  _id: string;
  title: string;
  author?: string;
  description?: string;
  category?: string;
  categories?: string[];
  status?: "draft" | "published" | string;
  isFeatured?: boolean;
  featuredOrder?: number;
  isMembersOnly?: boolean;
  readCount?: number;
  favoriteCount?: number;
  likeCount?: number;
  minAge?: number;
  bookType?: string;
  coverImage?: string;
  files?: { coverImage?: string };
  createdAt?: string;
  updatedAt?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasMore?: boolean;
};

export type BooksResponse = {
  data: Book[];
  pagination: Pagination;
};

export type BooksQuery = {
  page?: number;
  limit?: number;
  status?: "published" | "draft";
  isFeatured?: boolean;
  category?: string;
  search?: string;
};

export function bookCoverUrl(book: Book): string {
  return getMediaUrl(book.coverImage || book.files?.coverImage);
}

export const booksApi = {
  list: async (params: BooksQuery = {}): Promise<BooksResponse> => {
    const { data } = await apiClient.get<BooksResponse>("/api/books", {
      params: { status: "published", limit: 24, ...params },
    });
    return data;
  },
  byId: async (id: string): Promise<Book> => {
    const { data } = await apiClient.get<Book>(`/api/books/${id}`);
    return data;
  },
};

export type PlaylistItem = {
  _id: string;
  title: string;
  author?: string;
  description?: string;
  coverImage?: string;
  audioUrl?: string;
  order?: number;
  playCount?: number;
  isMembersOnly?: boolean;
  isFeatured?: boolean;
};

export type Playlist = {
  _id: string;
  title: string;
  author?: string;
  description?: string;
  coverImage?: string;
  category?: string;
  categories?: string[];
  type?: string;
  items?: PlaylistItem[];
  isFeatured?: boolean;
  featuredOrder?: number;
};

export const playlistsApi = {
  list: async (params: {
    isFeatured?: boolean;
    limit?: number;
    page?: number;
  } = {}): Promise<Playlist[]> => {
    const { data } = await apiClient.get("/api/playlists", {
      params: { limit: 50, ...params },
    });
    if (Array.isArray(data)) return data as Playlist[];
    return (data?.data || []) as Playlist[];
  },
};

export type AmazonReview = {
  _id?: string;
  author?: string;
  rating?: number;
  text?: string;
  date?: string;
};

export type AmazonBook = {
  _id: string;
  title: string;
  author?: string;
  description?: string;
  amazonUrl?: string;
  asin?: string;
  price?: string;
  coverImage?: string;
  images?: string[];
  promoVideoUrl?: string;
  reviews?: AmazonReview[];
  category?: string;
  categories?: string[];
  status?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  badgeText?: string;
  badgeColor?: string;
};

export const amazonBooksApi = {
  list: async (params: { isFeatured?: boolean; limit?: number } = {}): Promise<{
    data: AmazonBook[];
    pagination?: Pagination;
  }> => {
    const { data } = await apiClient.get("/api/amazon-books", {
      params: { status: "published", limit: 50, ...params },
    });
    if (Array.isArray(data)) return { data: data as AmazonBook[] };
    return data as { data: AmazonBook[]; pagination?: Pagination };
  },
};

export type FaithDefenceCategory = {
  _id: string;
  name: string;
  icon?: string;
  color?: string;
  order?: number;
  coverImageUrl?: string;
};

export type FaithDefenceCollection = {
  _id: string;
  name: string;
  subtitle?: string;
  icon?: string;
  order?: number;
  showOnHome?: boolean;
  createdAt?: string;
};

export type FaithDefenceContent = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  author?: string;
  script?: string;
  coverImageUrl?: string;
  narrationUrl?: string;
  effectsUrl?: string;
  duration?: number;
  order?: number;
  status?: string;
  publishedAt?: string;
  collectionIds?: string[];
  categoryId?: FaithDefenceCategory | string;
};

export const faithDefenceApi = {
  categories: async (): Promise<FaithDefenceCategory[]> => {
    const { data } = await faithDefenceClient.get<FaithDefenceCategory[]>(
      "/categories",
    );
    return Array.isArray(data) ? data : [];
  },
  collections: async (): Promise<FaithDefenceCollection[]> => {
    const { data } = await faithDefenceClient.get<FaithDefenceCollection[]>(
      "/collections",
    );
    return Array.isArray(data) ? data : [];
  },
  content: async (
    params: {
      limit?: number;
      categoryId?: string;
      collectionId?: string;
    } = {},
  ): Promise<FaithDefenceContent[]> => {
    const { data } = await faithDefenceClient.get<FaithDefenceContent[]>(
      "/content",
      { params: { limit: 24, ...params } },
    );
    return Array.isArray(data) ? data : [];
  },
};

export const emailApi = {
  subscribe: async (payload: {
    email: string;
    source?: string;
    platform?: string;
    parentName?: string;
    optInUpdates?: boolean;
  }): Promise<{ message: string; isNewSubscriber?: boolean }> => {
    const { data } = await apiClient.post("/api/email-subscribers", {
      source: "kbpublish_site",
      platform: "web",
      optInUpdates: true,
      ...payload,
    });
    return data;
  },
};

export type ContactPayload = {
  reason: string;
  firstName: string;
  lastName?: string;
  email: string;
  organization?: string;
  message: string;
};

export const contactApi = {
  submit: async (payload: ContactPayload) => {
    return emailApi.subscribe({
      email: payload.email,
      parentName: `${payload.firstName} ${payload.lastName || ""}`.trim(),
      source: `contact_${payload.reason}`,
    });
  },
};
