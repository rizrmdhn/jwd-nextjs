import { api, HydrateClient } from "@/trpc/server";
import UpdateProductForm from "./update-form";

interface UpdateProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpdateProductPage({
  params,
}: UpdateProductPageProps) {
  const { id } = await params;

  void api.product.getById.prefetch({
    id,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:p-4">
      <h1 className="self-start text-3xl font-bold">Update Produk</h1>
      <HydrateClient>
        <UpdateProductForm id={id} />
      </HydrateClient>
    </div>
  );
}
