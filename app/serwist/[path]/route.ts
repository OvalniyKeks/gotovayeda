import { spawnSync } from "node:child_process";
import { createSerwistRoute } from "@serwist/turbopack";
import { dishes } from "@/data/dishes";

const revision =
  spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ||
  crypto.randomUUID();

const coreRoutes = ["/", "/menu", "/shopping", "/budget", "/cooking", "/dishes"];
const dishRoutes = dishes.map((d) => `/dishes/${d.slug}`);

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    swSrc: "app/sw.ts",
    useNativeEsbuild: true,
    additionalPrecacheEntries: [
      { url: "/~offline", revision },
      ...coreRoutes.map((url) => ({ url, revision })),
      ...dishRoutes.map((url) => ({ url, revision })),
    ],
  });
