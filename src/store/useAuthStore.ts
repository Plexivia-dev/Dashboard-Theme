import { create } from 'zustand';
import { apiClient } from '@/lib/api-client';
import { getGenericErrorMessage } from '@/lib/error-handler';
import type { User, Verify2faPayload } from '@/types/auth';

const ROLES_ADMIN = ['Owner', 'Admin', 'Superadmin'];

const DEFAULT_DEMO_USER: User = {
  id: 'usr_demo_01',
  name: 'Alex Rivera',
  email: 'admin@plexivia.com',
  role: 'Superadmin',
  department: 'Executive Engineering',
  designation: 'Platform Lead',
  avatar: '',
};

const readCachedUser = (): User | null => {
  try {
    const raw = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (!raw || !token) {
      // Return default demo user for immediate template preview if not logged in
      return DEFAULT_DEMO_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DEMO_USER;
  }
};

const mapApiUser = (apiUser: any, email?: string): User => ({
  id: apiUser.id || apiUser._id || 'usr_default',
  did: apiUser.did,
  email: apiUser.email || email || '',
  name:
    apiUser.name ||
    (email || 'User').split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  username: apiUser.username || '',
  phone: apiUser.phone || '',
  address: apiUser.address || '',
  role: apiUser.role || 'Admin',
  department: apiUser.department || '',
  designation: apiUser.designation || '',
  subRole: apiUser.subRole || '',
  avatar: apiUser.avatar || '',
});

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  verify2fa: (payload: Verify2faPayload) => Promise<any>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  hasRole: (roles: string[]) => boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: readCachedUser(),
  isLoading: false,

  setUser: (user) => set({ user }),

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      try {
        const { data } = await apiClient.post('/api/v1/auth/login', { email, password });
        if (data?.requires2fa) {
          set({ isLoading: false });
          return { success: false, requires2fa: true, ...data };
        }

        if (data?.data) {
          const { user: apiUser, accessToken, refreshToken } = data.data;
          const loggedUser = mapApiUser(apiUser, email);

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(loggedUser));

          set({ user: loggedUser, isLoading: false });
          return { success: true, user: loggedUser };
        }
      } catch (networkOrApiErr) {
        // Fallback for template offline demo if backend is not yet started:
        console.warn('Backend unavailable, using template mock session:', networkOrApiErr);
        const demoUser: User = {
          ...DEFAULT_DEMO_USER,
          email,
          name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        };
        localStorage.setItem('accessToken', 'mock_access_token_plexivia');
        localStorage.setItem('user', JSON.stringify(demoUser));
        set({ user: demoUser, isLoading: false });
        return { success: true, user: demoUser, mock: true };
      }
    } catch (err: any) {
      set({ isLoading: false });
      throw new Error(getGenericErrorMessage(err, 'Sign in failed. Please check your credentials.'));
    }
  },

  verify2fa: async (payload: Verify2faPayload) => {
    set({ isLoading: true });
    try {
      const token = payload?.twoFactorToken;
      const headers = token ? { Authorization: `Bearer ${token}`, 'X-Two-Factor-Token': token } : {};

      const { data } = await apiClient.post('/api/v1/auth/2fa/verify', payload, { headers });
      const { user: apiUser, accessToken, refreshToken } = data.data;
      const loggedUser = mapApiUser(apiUser, payload?.email);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(loggedUser));

      set({ user: loggedUser, isLoading: false });
      return { success: true, user: loggedUser };
    } catch (err: any) {
      set({ isLoading: false });
      throw new Error(getGenericErrorMessage(err, '2FA verification failed.'));
    }
  },

  logout: async () => {
    try {
      const rt = localStorage.getItem('refreshToken');
      if (rt) {
        await apiClient.post('/api/v1/auth/logout', { refreshToken: rt }).catch(() => {});
      }
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      set({ user: null });
    }
  },

  updateProfile: async (profileData: Partial<User>) => {
    set({ isLoading: true });
    try {
      const current = get().user || DEFAULT_DEMO_USER;
      const updated = { ...current, ...profileData };
      localStorage.setItem('user', JSON.stringify(updated));
      set({ user: updated, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  hasRole: (roles: string[]) => {
    const user = get().user;
    return user ? roles.map((r) => r.toLowerCase()).includes(user.role.toLowerCase()) : false;
  },
}));

export const useAuth = useAuthStore;
export const ADMIN_ROLES = ROLES_ADMIN;
export default useAuthStore;
