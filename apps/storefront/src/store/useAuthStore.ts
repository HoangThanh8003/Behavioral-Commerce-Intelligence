import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      
      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      updateUser: (updatedFields) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null
        })),
    }),
    {
      name: 'zento-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
