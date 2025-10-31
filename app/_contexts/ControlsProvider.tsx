"use client";

import { createContext, ReactNode, useCallback, useContext } from "react";

import {
  useRouter,
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type ProductControls = {
  router: AppRouterInstance;
  pathname: string;
  urlSearchParams: ReadonlyURLSearchParams;
  createQueryString: (name: string, value: string) => string;
};

const ControlsContext = createContext<ProductControls | null>(null);

export function ControlsProvider({ children }: { children: ReactNode }) {
  const urlSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(urlSearchParams);
      params.set(name, value);

      return params.toString();
    },
    [urlSearchParams],
  );

  return (
    <ControlsContext.Provider
      value={{
        router,
        pathname,
        urlSearchParams,
        createQueryString,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
}

export function useControlsContext() {
  const context = useContext(ControlsContext);

  if (!context) {
    throw new Error(
      "useControlsContext va usato all'interno di ControlsProvider",
    );
  }

  return context;
}
