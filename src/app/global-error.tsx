"use client";

/**
 * Last resort for a failure in the root layout itself. It replaces the whole document, so none of the site's stylesheet
 * or fonts are available: plain inline styles that follow the site's colours.
 */
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeContent: "center",
          gap: "1rem",
          padding: "1rem",
          background: "#f5f4f0",
          color: "#0a0a0a",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 600 }}>Something went wrong.</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>The page could not be shown. Please try again.</p>
        <div>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              font: "inherit",
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              border: 0,
              background: "#0a0a0a",
              color: "#f5f4f0",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
