import { ROUTE_INTERACTIONS } from "../data/route-interactions.generated";

/**
 * Maps a URL pathname to the key of `ROUTE_INTERACTIONS` (and of `INITIAL_HIDDEN_VARIANT`).
 *
 * Every real route of the site has its own key (dynamic segments included, e.g. `/work/aurel`), so a valid pathname maps
 * to itself. Anything else renders the not-found page, whose interactions are registered under `/404`.
 * Server-safe (pure, no DOM access).
 */
export function routeKey(pathname: string): string {
  let p = pathname.split(/[?#]/)[0] || "/";
  if (p.length > 1) p = p.replace(/\/+$/, "") || "/";
  return Object.prototype.hasOwnProperty.call(ROUTE_INTERACTIONS, p) ? p : "/404";
}

/** interaction ids to register for a pathname, in registration order */
export function interactionIdsFor(pathname: string): readonly string[] {
  return ROUTE_INTERACTIONS[routeKey(pathname)];
}
