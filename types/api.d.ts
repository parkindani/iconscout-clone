export type AssetType = "lottie" | "illustration" | "icon" | "3d";

type AssetUrls<T extends AssetType> = T extends "icon"
  ? {
      png_64?: string;
      png_128?: string;
      png_256?: string;
      thumb?: never; // can't use thumb in 'icon'
    }
  : {
      png_64?: never;
      png_128?: never;
      png_256?: never;
      thumb?: string;
    };

type AssetData<T extends AssetType = AssetType> = {
  id: number;
  uuid: string;
  asset: T;
  name: string;
  slug: string;
  price: number;
  _score?: number;
  urls: AssetUrls<T>;
  color_codes: {
    decimal_color: number;
    color_id: number;
  }[];
};

export type SearchAssetResponse<T extends AssetType = AssetType> = {
  status: string;
  response: {
    items: {
      current_page: number;
      data: AssetData<T>[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      next_page_url: string;
      path: string;
      per_page: number;
      prev_page_url: null;
      to: number;
      total: number;
    };
  };
  meta: {
    total_time: number;
    db_query_time: number;
    db_query_count: number;
  };
  elements: null;
  message: null;
};

export type SearchAssetRequestQuery = {
  type: AssetType;
  limit: number;
  page: number;
};
