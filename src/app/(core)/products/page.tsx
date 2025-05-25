import { getValidFilters } from "@/lib/data-table";
import type { SearchParams } from "@/types/search-params.types";
import { api, HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProductSearchParamsCache } from "@/schema/product.schema";
import DataTableProduct from "./product-data-table";

interface AtlitPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function AtlitPage(props: AtlitPageProps) {
  const searchParams = await props.searchParams;
  const search = getProductSearchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  void api.product.paginate.prefetch({
    ...search,
    filters: validFilters,
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Produk</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <Button asChild>
            <Link href="products/new">Tambah Produk</Link>
          </Button>
        </div>
        <HydrateClient>
          <DataTableProduct />
        </HydrateClient>
      </div>
    </>
  );
}
