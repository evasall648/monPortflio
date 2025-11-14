import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_ENDPOINTS } from '@/config/api';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  telephone?: string;
  genre?: string;
  photo_url?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: User, token: string) => {
        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true });
      },
      logout: async () => {
        try {
          const response = await fetch(API_ENDPOINTS.auth.logout, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${get().token}`,
            },
          });

          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
        } catch (error) {
          console.error('Erreur de déconnexion:', error);
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
        }
      },
      loadUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ user: null, token: null, isAuthenticated: false });
          return;
        }

        try {
          const response = await fetch(API_ENDPOINTS.auth.getUser, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              set({ user: data.user, token, isAuthenticated: true });
            } else {
              localStorage.removeItem('token');
              set({ user: null, token: null, isAuthenticated: false });
            }
          } else {
            localStorage.removeItem('token');
            set({ user: null, token: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 