import { api } from "@/trpc/server";
import DetailSection from "./section";

interface DetailProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailProductPage({
  params,
}: DetailProductPageProps) {
  const { id } = await params;

  void api.product.getById.prefetch({
    id,
  });

  return (
    <div className="container mx-auto p-4">
      <DetailSection />
    </div>
  );
}
