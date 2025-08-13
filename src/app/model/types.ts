export type Country = {
    id_negara: number;
    kode_negara: string;
    nama_negara: string;
}

export type Harbor = {
    id_negara: string;
    id_pelabuhan: string;
    nama_pelabuhan: string;
}

export type Product = {
  id_barang: number;
  id_pelabuhan: number;
  nama_barang: string;
  description: string;
  diskon: number;
  harga: number;
};

export type FormValues = {
    country: Country | null;
    harbor: Harbor | null;
    product: Product | null;
    discount: string;
    harga: string;
    total: string;
    description: string;
}