"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { useDataTable } from "@/hooks/use-data-table";
import { useMemo } from "react";
import { api } from "@/trpc/react";
import { useQueryStates } from "nuqs";
import { DataTableFilterMenu } from "@/components/data-table/data-table-filter-menu";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { getProductSearchParams } from "@/schema/product.schema";
import getProductColumn from "./product-column";

export default function DataTableProduct() {
  const [params] = useQueryStates(getProductSearchParams);

  const [data] = api.product.paginate.useSuspenseQuery({
    ...params,
    filters: params.filters,
  });

  const columns = useMemo(
    () =>
      getProductColumn({
        currentPage: params.page,
        perPage: params.perPage,
      }),
    [params.page, params.perPage],
  );

  const { table } = useDataTable({
    data: data.data,
    columns,
    pageCount: data.pageCount,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    getRowId: (row) => row.id,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableFilterMenu table={table} />
        <DataTableSortList table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
