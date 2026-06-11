import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const DEV_API = 'http://192.168.0.100:8000/api';
const WEB_API = 'http://127.0.0.1:8000/api';

const getBaseUrl = () => {
  if (Platform.OS === 'web') return WEB_API;
  return DEV_API;
};

const TOKEN_KEY = 'auth_tokens';

export const getTokens = async (): Promise<{ access: string; refresh: string } | null> => {
  try {
    const raw = await AsyncStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveTokens = async (tokens: { access: string; refresh: string }) => {
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
};

export const clearTokens = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const apiRequest = async (
  path: string,
  options: RequestInit = {},
  withAuth = false,
): Promise<Response> => {
  const url = `${getBaseUrl()}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (withAuth) {
    const tokens = await getTokens();
    if (tokens?.access) {
      headers['Authorization'] = `Bearer ${tokens.access}`;
    }
  }

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 && withAuth) {
    const tokens = await getTokens();
    if (tokens?.refresh) {
      const refreshRes = await fetch(`${getBaseUrl()}/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        await saveTokens({ ...tokens, access: data.access });
        headers['Authorization'] = `Bearer ${data.access}`;
        return fetch(url, { ...options, headers });
      }
      await clearTokens();
    }
  }

  return res;
};

export const api = {
  get: (path: string, auth = false) => apiRequest(path, { method: 'GET' }, auth),
  post: (path: string, body: unknown, auth = false) =>
    apiRequest(path, { method: 'POST', body: JSON.stringify(body) }, auth),
  put: (path: string, body: unknown, auth = false) =>
    apiRequest(path, { method: 'PUT', body: JSON.stringify(body) }, auth),
};

// Cart & wishlist persistence
export const loadCart = async (): Promise<any[]> => {
  try {
    const raw = await AsyncStorage.getItem('sticker_cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = async (items: any[]) => {
  await AsyncStorage.setItem('sticker_cart', JSON.stringify(items));
};

export const loadWishlist = async (): Promise<any[]> => {
  try {
    const raw = await AsyncStorage.getItem('sticker_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveWishlist = async (items: any[]) => {
  await AsyncStorage.setItem('sticker_wishlist', JSON.stringify(items));
};

export const MOCK_ARTISTS = [
  { id: 1, name: 'GONE.Fludd', slug: 'gonefludd', description: 'Российский рэп-исполнитель', avatar_color: 'pink', is_musician: true },
  { id: 2, name: 'ЛСП', slug: 'lsp', description: 'Легендарный проект Олега ЛСП', avatar_color: 'cyan', is_musician: true },
  { id: 3, name: 'Pharaoh', slug: 'pharaoh', description: 'Глеб Голубин', avatar_color: 'orange', is_musician: true },
  { id: 4, name: 'Oxxxymiron', slug: 'oxxxymiron', description: 'Мирон Фёдоров', avatar_color: 'green', is_musician: true },
  { id: 5, name: 'Скриптонит', slug: 'skryptonite', description: 'Адиль Жалелов', avatar_color: 'yellow', is_musician: true },
  { id: 6, name: 'Гуф', slug: 'guf', description: 'Алексей Долматов', avatar_color: 'orange', is_musician: true },
  { id: 7, name: 'Miyagi', slug: 'miyagi', description: 'Осетинский дуэт', avatar_color: 'cyan', is_musician: true },
  { id: 8, name: 'Boulevard Depo', slug: 'boulevard-depo', description: 'Артём Шатохин', avatar_color: 'pink', is_musician: true },
  { id: 9, name: 'ATL', slug: 'atl', description: 'Алексей Орлов', avatar_color: 'green', is_musician: true },
  { id: 10, name: 'FACE', slug: 'face', description: 'Иван Дрёмин', avatar_color: 'yellow', is_musician: true },
];

export const MOCK_ITEMS: any[] = [
  { id: 1, artist: { id: 1, name: 'GONE.Fludd', slug: 'gonefludd' }, name: 'Футболка GONE.Fludd "Neon"', price: 2990, description: 'Оригинальная футболка с принтом', condition: 'new', size: 'M', stock: 15, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'pink' },
  { id: 2, artist: { id: 1, name: 'GONE.Fludd', slug: 'gonefludd' }, name: 'Футболка GONE.Fludd "Logo"', price: 2490, description: 'Классическая футболка с логотипом', condition: 'new', size: 'L', stock: 20, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'pink' },
  { id: 3, artist: { id: 1, name: 'GONE.Fludd', slug: 'gonefludd' }, name: 'Худи GONE.Fludd "Boys Don\'t Cry"', price: 5990, description: 'Лимитированное худи', condition: 'new', size: 'XL', stock: 8, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'pink' },
  { id: 4, artist: { id: 1, name: 'GONE.Fludd', slug: 'gonefludd' }, name: 'Штаны GONE.Fludd "Cargo"', price: 4990, description: 'Удобные карго штаны', condition: 'new', size: 'M', stock: 10, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'pink' },
  { id: 5, artist: { id: 1, name: 'GONE.Fludd', slug: 'gonefludd' }, name: 'Кепка GONE.Fludd', price: 2990, description: 'Бейсболка с вышивкой', condition: 'new', size: 'M', stock: 25, is_original: true, image_sticker_type: 'cap', sticker_color: 'pink' },
  { id: 6, artist: { id: 1, name: 'GONE.Fludd', slug: 'gonefludd' }, name: 'Сумка GONE.Fludd "Saints"', price: 3490, description: 'Шопер с принтом', condition: 'new', size: 'M', stock: 12, is_original: true, image_sticker_type: 'accessory', sticker_color: 'pink' },
  { id: 7, artist: { id: 1, name: 'GONE.Fludd', slug: 'gonefludd' }, name: 'Футболка GONE.Fludd "Neon" (Б/У)', price: 1990, description: 'В хорошем состоянии', condition: 'secondhand', size: 'L', stock: 1, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'pink' },
  { id: 8, artist: { id: 2, name: 'ЛСП', slug: 'lsp' }, name: 'Футболка ЛСП "Безумие"', price: 2590, description: 'Официальный мерч', condition: 'new', size: 'M', stock: 18, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'cyan' },
  { id: 9, artist: { id: 2, name: 'ЛСП', slug: 'lsp' }, name: 'Худи ЛСП "Огни"', price: 5490, description: 'Тёплое худи', condition: 'new', size: 'L', stock: 7, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'cyan' },
  { id: 10, artist: { id: 2, name: 'ЛСП', slug: 'lsp' }, name: 'Винил ЛСП "Tragic City"', price: 4200, description: 'Виниловая пластинка', condition: 'new', size: 'M', stock: 5, is_original: true, image_sticker_type: 'vinyl', sticker_color: 'cyan' },
  { id: 11, artist: { id: 2, name: 'ЛСП', slug: 'lsp' }, name: 'Кассета ЛСП "One More City"', price: 1200, description: 'Лимитированная кассета', condition: 'new', size: 'M', stock: 15, is_original: true, image_sticker_type: 'cassette', sticker_color: 'cyan' },
  { id: 12, artist: { id: 2, name: 'ЛСП', slug: 'lsp' }, name: 'Кепка ЛСП', price: 2400, description: 'Бейсболка с лого', condition: 'new', size: 'M', stock: 20, is_original: true, image_sticker_type: 'cap', sticker_color: 'cyan' },
  { id: 13, artist: { id: 2, name: 'ЛСП', slug: 'lsp' }, name: 'Футболка ЛСП "Траур" (Б/У)', price: 1790, description: 'С состояния good', condition: 'secondhand', size: 'M', stock: 1, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'cyan' },
  { id: 14, artist: { id: 2, name: 'ЛСП', slug: 'lsp' }, name: 'Футболка ЛСП "Безумие" (Б/У)', price: 1690, description: 'Отличное состояние', condition: 'secondhand', size: 'L', stock: 1, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'cyan' },
  { id: 15, artist: { id: 3, name: 'Pharaoh', slug: 'pharaoh' }, name: 'Pink Phloyd Футболка', price: 3200, description: 'Футболка с принтом', condition: 'secondhand', size: 'L', stock: 1, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'orange' },
  { id: 16, artist: { id: 3, name: 'Pharaoh', slug: 'pharaoh' }, name: 'Cold Siemens Beanie', price: 2200, description: 'Тёплая шапка', condition: 'new', size: 'M', stock: 20, is_original: true, image_sticker_type: 'cap', sticker_color: 'orange' },
  { id: 17, artist: { id: 3, name: 'Pharaoh', slug: 'pharaoh' }, name: 'Phosphor Cassette (Signed)', price: 4500, description: 'Подписанная кассета', condition: 'secondhand', size: 'M', stock: 1, is_original: true, image_sticker_type: 'cassette', sticker_color: 'orange' },
  { id: 18, artist: { id: 3, name: 'Pharaoh', slug: 'pharaoh' }, name: 'Dead Dynasty Hoodie', price: 5800, description: 'Официальное худи', condition: 'new', size: 'XL', stock: 7, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'orange' },
  { id: 19, artist: { id: 4, name: 'Oxxxymiron', slug: 'oxxxymiron' }, name: 'Горгород Hoodie', price: 4900, description: 'Худи с принтом', condition: 'new', size: 'L', stock: 10, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'green' },
  { id: 20, artist: { id: 4, name: 'Oxxxymiron', slug: 'oxxxymiron' }, name: 'Красота и Уродство Vinyl', price: 6200, description: 'Винил mixtape', condition: 'new', size: 'M', stock: 8, is_original: true, image_sticker_type: 'vinyl', sticker_color: 'green' },
  { id: 21, artist: { id: 4, name: 'Oxxxymiron', slug: 'oxxxymiron' }, name: 'Биполярочка Футболка', price: 2900, description: 'Футболка', condition: 'new', size: 'XL', stock: 14, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'green' },
  { id: 22, artist: { id: 5, name: 'Скриптонит', slug: 'skryptonite' }, name: 'ДСНЯ Hoodie', price: 4700, description: 'Худи с принтом', condition: 'new', size: 'L', stock: 9, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'yellow' },
  { id: 23, artist: { id: 5, name: 'Скриптонит', slug: 'skryptonite' }, name: 'Праздник на Улице 36 Vinyl', price: 5800, description: 'Винил', condition: 'new', size: 'M', stock: 7, is_original: true, image_sticker_type: 'vinyl', sticker_color: 'yellow' },
  { id: 24, artist: { id: 5, name: 'Скриптонит', slug: 'skryptonite' }, name: 'Musica36 Футболка', price: 2600, description: 'Футболка', condition: 'new', size: 'XL', stock: 20, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'yellow' },
  { id: 25, artist: { id: 6, name: 'Гуф', slug: 'guf' }, name: 'Centr Hoodie Original (Б/У)', price: 4200, description: 'Худи в хорошем состоянии', condition: 'secondhand', size: 'XL', stock: 1, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'orange' },
  { id: 26, artist: { id: 6, name: 'Гуф', slug: 'guf' }, name: 'Город Дорог Vinyl (Б/У)', price: 3500, description: 'Винил б/у', condition: 'secondhand', size: 'M', stock: 2, is_original: true, image_sticker_type: 'vinyl', sticker_color: 'orange' },
  { id: 27, artist: { id: 6, name: 'Гуф', slug: 'guf' }, name: 'Сплетни Футболка', price: 2300, description: 'Футболка', condition: 'new', size: 'L', stock: 6, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'orange' },
  { id: 28, artist: { id: 7, name: 'Miyagi', slug: 'miyagi' }, name: 'Hajime Hoodie', price: 5100, description: 'Худи с лого', condition: 'new', size: 'L', stock: 11, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'cyan' },
  { id: 29, artist: { id: 7, name: 'Miyagi', slug: 'miyagi' }, name: 'UMAMI Vinyl', price: 4900, description: 'Винил', condition: 'new', size: 'M', stock: 9, is_original: true, image_sticker_type: 'vinyl', sticker_color: 'cyan' },
  { id: 30, artist: { id: 7, name: 'Miyagi', slug: 'miyagi' }, name: 'Кислород Футболка', price: 2700, description: 'Футболка', condition: 'new', size: 'XL', stock: 18, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'cyan' },
  { id: 31, artist: { id: 8, name: 'Boulevard Depo', slug: 'boulevard-depo' }, name: 'Rapp 2 Hoodie', price: 4600, description: 'Худи', condition: 'new', size: 'L', stock: 7, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'pink' },
  { id: 32, artist: { id: 8, name: 'Boulevard Depo', slug: 'boulevard-depo' }, name: 'Sweet Dreams Vinyl', price: 4200, description: 'Винил', condition: 'new', size: 'M', stock: 6, is_original: true, image_sticker_type: 'vinyl', sticker_color: 'pink' },
  { id: 33, artist: { id: 8, name: 'Boulevard Depo', slug: 'boulevard-depo' }, name: 'NEON Футболка', price: 2500, description: 'Футболка', condition: 'new', size: 'XL', stock: 13, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'pink' },
  { id: 34, artist: { id: 9, name: 'ATL', slug: 'atl' }, name: 'Лес Hoodie', price: 4300, description: 'Худи с принтом', condition: 'new', size: 'L', stock: 6, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'green' },
  { id: 35, artist: { id: 9, name: 'ATL', slug: 'atl' }, name: 'Марабу Vinyl', price: 5400, description: 'Винил', condition: 'new', size: 'M', stock: 5, is_original: true, image_sticker_type: 'vinyl', sticker_color: 'green' },
  { id: 36, artist: { id: 9, name: 'ATL', slug: 'atl' }, name: 'Крим Футболка', price: 2400, description: 'Футболка', condition: 'new', size: 'XL', stock: 14, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'green' },
  { id: 37, artist: { id: 10, name: 'FACE', slug: 'face' }, name: 'Пути Исповедины Hoodie', price: 4400, description: 'Худи', condition: 'new', size: 'XL', stock: 10, is_original: true, image_sticker_type: 'hoodie', sticker_color: 'yellow' },
  { id: 38, artist: { id: 10, name: 'FACE', slug: 'face' }, name: 'Статика Vinyl', price: 4700, description: 'Винил', condition: 'new', size: 'M', stock: 7, is_original: true, image_sticker_type: 'vinyl', sticker_color: 'yellow' },
  { id: 39, artist: { id: 10, name: 'FACE', slug: 'face' }, name: 'Anti Tragedy Футболка', price: 2500, description: 'Футболка', condition: 'new', size: 'L', stock: 16, is_original: true, image_sticker_type: 'tshirt', sticker_color: 'yellow' },
  { id: 40, artist: { id: 10, name: 'FACE', slug: 'face' }, name: 'Sticker Bomb Pack', price: 450, description: 'Набор стикеров', condition: 'new', size: 'M', stock: 55, is_original: true, image_sticker_type: 'accessory', sticker_color: 'yellow' },
];
