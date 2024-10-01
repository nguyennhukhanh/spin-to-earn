import { useUserStore } from '@/stores';

/**
 * * Override useSession to have more clean code
 * @returns session with isLoggedIn to check auth
 */
export const useAuth = () => {
  const user = useUserStore.use.user();
  return {
    isLoggedIn: !!user?.id,
    user,
  };
};
