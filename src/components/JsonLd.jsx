/**
 * Renders a JSON-LD script tag. Server component; pass a single schema object
 * or an @graph.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be embedded as raw JSON; content is fully server-controlled.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
