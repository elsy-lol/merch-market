export interface Artist {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_color: string;
  is_musician: boolean;
}

export interface ProductItem {
  id: number;
  artist: Artist;
  name: string;
  price: number;
  description?: string;
  condition: 'new' | 'secondhand';
  size?: string;
  stock: number;
  is_original: boolean;
  image_sticker_type: string;
  sticker_color: string;
}

export interface CartItem extends ProductItem {
  quantity: number;
}

export interface UserData {
  username: string;
  display_name?: string;
  favorite_artist?: string;
}
