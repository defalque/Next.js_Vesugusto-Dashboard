"use client";

import { createContext, ReactNode, useCallback, useContext } from "react";

import {
  useRouter,
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type DateRangeContext = {
  router: AppRouterInstance;
  pathname: string;
  urlSearchParams: ReadonlyURLSearchParams;
  createQueryString: (name: string, value: string) => string;
};

const DateRangeContext = createContext<DateRangeContext | null>(null);

export function DateRangeProvider({ children }: { children: ReactNode }) {
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
    <DateRangeContext.Provider
      value={{
        router,
        pathname,
        urlSearchParams,
        createQueryString,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRangeContext() {
  const context = useContext(DateRangeContext);

  if (!context) {
    throw new Error(
      "useDateRangeContext va usato all'interno di DateRangeProvider",
    );
  }

  return context;
}
