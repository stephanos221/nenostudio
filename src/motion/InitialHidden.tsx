import { INITIAL_HIDDEN_CSS, INITIAL_HIDDEN_VARIANT } from "./data/initial-hidden.generated";
import { routeKey } from "./engine/route-key";

/**
 * Server component. Emits the pre-animation hidden state of one page (`html.js:not(.motion-ready) ...` rules) as a
 * `<style href precedence>`: React hoists it into `<head>` (present in the first HTML, so no flash) and de-duplicates it
 * by `href`, so pages that share a variant emit it once. Render it from every page (or route-group layout) with the
 * page's own path: `<InitialHidden route="/about-us" />`; unknown paths resolve to the not-found variant.
 *
 * React keeps a hoisted style in `<head>` after its page unmounts, so a long client-side session accumulates the variants of
 * every page visited. That is harmless: on every route the union of all variants hides exactly the elements the page's own
 * variant hides (checked for all 32 routes at 1440, 991, 767 and 375 px), and `motion-ready` lifts them all together.
 */
export default function InitialHidden({ route }: { route: string }) {
  const variant = INITIAL_HIDDEN_VARIANT[routeKey(route)];
  return (
    <style href={`initial-hidden-${variant}`} precedence="motion">
      {INITIAL_HIDDEN_CSS[variant]}
    </style>
  );
}
