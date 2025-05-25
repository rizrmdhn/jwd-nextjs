import { type Metadata } from "next";

const generateMetadata = (metadata?: Metadata) => {
  const title = typeof metadata?.title === "string" ? metadata.title : "JWD";

  return {
    title: `${title} | Aplikasi Pendataan Produk.`,
    description: metadata?.description ?? "Aplikasi Pendataan Produk.",
    icons: metadata?.icons ?? [{ rel: "icon", url: "/favicon.ico" }],
  };
};

export default generateMetadata;
