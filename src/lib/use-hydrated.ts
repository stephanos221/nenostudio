import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** `false` on the server and while hydrating, `true` afterwards: lets client-only attributes stay out of the SSR markup. */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
