import { site } from "@/lib/site";

/**
 * PWA manifest.
 *
 * The icons point at the square app tiles generated from the brand mark, not at
 * the raw logo files. `logo-mark.webp` is 560x500 — not square — so declaring it
 * `sizes: "any"` let an OS scale a non-square image into a square slot and
 * distort it. A separate maskable variant exists because a maskable icon is
 * cropped to the platform's own shape (circle, squircle) and only the inner
 * ~80% circle is guaranteed visible.
 */
export default function manifest() {
  return {
    name: site.name,
    short_name: site.name,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#050507",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
