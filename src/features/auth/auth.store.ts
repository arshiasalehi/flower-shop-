import { create } from 'zustand';

export interface Reminder {
  id: string;
  label: string;
  date: string;
  notes?: string;
  preferredBouquet?: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  reminders: Reminder[];
}

interface AuthState {
  user: UserProfile | null;
  status: 'idle' | 'loading' | 'authenticated';
  error?: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (payload: { name: string; email: string; password: string }) => Promise<void>;
  addReminder: (reminder: Reminder) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'idle',
  async signIn(email) {
    set({ status: 'loading' });
    await new Promise((resolve) => setTimeout(resolve, 600));
    set({
      status: 'authenticated',
      user: {
        id: 'mock-user',
        name: 'Ava Florent',
        email,
        avatar: '/src/assets/logo.svg',
        addresses: [
          {
            id: 'addr-1',
            label: 'Home',
            street: '245 Rue Sainte-Catherine Ouest',
            city: 'Montréal',
            province: 'QC',
            postalCode: 'H2X 2X4'
          }
        ],
        reminders: []
      }
    });
  },
  async register({ name, email }) {
    set({ status: 'loading' });
    await new Promise((resolve) => setTimeout(resolve, 800));
    set({
      status: 'authenticated',
      user: {
        id: 'mock-user',
        name,
        email,
        addresses: [],
        reminders: []
      }
    });
  },
  signOut() {
    set({ user: null, status: 'idle' });
  },
  addReminder: (reminder) =>
    set((state) => ({
      user: state.user ? { ...state.user, reminders: [...state.user.reminders, reminder] } : null
    }))
}));
