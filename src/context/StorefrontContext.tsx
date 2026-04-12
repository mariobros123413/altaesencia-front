import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storefrontController } from '../controllers/storefrontController';
import { storefrontBootstrapFallback } from '../data/storefrontFallback';
import type { CategoryId, CategorySummary, StorefrontBootstrap } from '../types/storefront';

interface StorefrontContextValue {
  bootstrap: StorefrontBootstrap;
  isLoading: boolean;
  getCategoryById: (categoryId: CategoryId) => CategorySummary | undefined;
}

const StorefrontContext = createContext<StorefrontContextValue | undefined>(undefined);

export const StorefrontProvider = ({ children }: { children: ReactNode }) => {
  const [bootstrap, setBootstrap] = useState<StorefrontBootstrap>(storefrontBootstrapFallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadStorefront = async () => {
      try {
        const response = await storefrontController.getBootstrap();

        if (!isMounted) {
          return;
        }

        setBootstrap(response);
      } catch (error) {
        console.error('Error loading storefront bootstrap:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadStorefront();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<StorefrontContextValue>(
    () => ({
      bootstrap,
      isLoading,
      getCategoryById: (categoryId) => bootstrap.categories.find((category) => category.id === categoryId)
    }),
    [bootstrap, isLoading]
  );

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
};

export const useStorefront = () => {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error('useStorefront must be used inside StorefrontProvider');
  }

  return context;
};
