"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

interface SubscriptionState {
  planId: string;
  loading: boolean;
}

export function useSubscription() {
  const { isAuthenticated } = useAuth();
  const [state, setState] = useState<SubscriptionState>({
    planId: "free",
    loading: false
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setState({ planId: "free", loading: false });
    }
  }, [isAuthenticated]);

  return state;
}