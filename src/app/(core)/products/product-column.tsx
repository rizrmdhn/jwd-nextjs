/* eslint-disable @next/next/no-img-element */
import DataTableActionCell from "@/components/data-table-action-cell";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { env } from "@/env";
import { globalErrorToast, globalSuccessToast } from "@/lib/toast";
import { api } from "@/trpc/react";
import type { Products } from "@/types/products.types";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { Text, Trash } from "lucide-react";

interface AtlitColumnProps {
  currentPage: number;
  perPage: number;
}

const ActionCell = ({ row }: { row: Row<Products> }) => {
  const utils = api.useUtils();

  const { mutate, status } = api.product.delete.useMutation({
    onSuccess: async () => {
      globalSuccessToast("Berhasil menghapus produk");
      await utils.product.paginate.invalidate();
    },
    onError: (error) => {
      globalErrorToast(error.message);
    },
  });

  return (
    <DataTableActionCell
      icon={<Trash className="mr-4 size-4" />}
      isLoading={status === "pending"}
      editText="Edit"
      triggerText="Hapus"
      dialogTitle="Hapus data"
      dialogDescription="Apakah anda yakin ingin menghapus data ini?"
      btnClassName="bg-red-600 text-white hover:bg-red-500"
      onEditAction={`products/${row.original.id}/edit`}
      onConfirm={() => {
        mutate({ id: row.original.id });
      }}
    />
  );
};

export default function getProductColumn({
  currentPage,
  perPage,
}: AtlitColumnProps): ColumnDef<Products>[] {
  return [
    {
      id: "no",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="No" />
      ),
      cell: ({ row }) => (
        <div>{row.index + 1 + (currentPage - 1) * perPage}</div>
      ),
    },
    {
      id: "fotoUrl",
      accessorKey: "fotoUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gambar" />
      ),
      cell: ({ row }) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const fotoUrl = row.getValue("fotoUrl") as string;
        return (
          <div className="flex items-center">
            <img
              src={env.NEXT_PUBLIC_APP_URL + fotoUrl}
              alt="Product"
              className="size-32 rounded object-cover"
            />
          </div>
        );
      },
    },
    {
      id: "produk",
      accessorKey: "produk",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("produk")}</div>
      ),
      meta: {
        label: "Nama Produk",
        placeholder: "Cari nama produk...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      id: "kategori",
      accessorKey: "kategori",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Kategori" />
      ),
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("kategori")}</div>
      ),
      meta: {
        label: "Nama Kategori",
        placeholder: "Cari kategori...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      id: "price",
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Harga" />
      ),
      cell: ({ row }) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const price = row.getValue("price") as number;
        return <span>Rp {price.toLocaleString("id-ID")}</span>;
      },
    },
    {
      id: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Aksi" />
      ),
      cell: ({ row }) => <ActionCell row={row} />,
    },
  ];
}
