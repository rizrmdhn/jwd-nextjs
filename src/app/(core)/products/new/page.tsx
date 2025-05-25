import CreateProductForm from "./create-form";

export default function CreateProductPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:p-4">
      <h1 className="self-start text-3xl font-bold">Tambah Produk Baru</h1>
      <CreateProductForm />
    </div>
  );
}
