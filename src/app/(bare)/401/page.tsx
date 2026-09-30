import { PasswordScreen } from "@/components/sections/contact/PasswordScreen";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/401");

/** `true` when the query carries `e=1`, the mark `/api/unlock` leaves on a wrong password. */
function hasFailedAttempt(e: string | string[] | undefined): boolean {
  return [e].flat().includes("1");
}

export default async function ProtectedPage({ searchParams }: PageProps<"/401">) {
  const { e } = await searchParams;

  return (
    <>
      <InitialHidden route="/401" />
      <main className="main-wrapper">
        <PasswordScreen failed={hasFailedAttempt(e)} />
      </main>
    </>
  );
}
