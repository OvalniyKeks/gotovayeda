import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GOTOVAYEDA — План питания",
    short_name: "GOTOVAYEDA",
    description:
      "Домашний план питания на месяц: меню, закупки, бюджет и рецепты.",
    start_url: "/",
    display: "standalone",
    lang: "ru",
    theme_color: "#c4704a",
    background_color: "#fff8f0",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
