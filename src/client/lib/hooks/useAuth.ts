"use client";

import { create } from "zustand";
import { getAccessToken } from "../utils/token";
import { logout as apiLogout } from "../api/auth";

interface AuthState {
  isAuthenticated: boolean;
  initialize: () => void;
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,

  initialize: () => {
    const token = getAccessToken();
    set({ isAuthenticated: !!token });
  },

  logout: () => {
    apiLogout();
    set({ isAuthenticated: false });
  },

  setAuthenticated: (value: boolean) => {
    set({ isAuthenticated: value });
  },
}));