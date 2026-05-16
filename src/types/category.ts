export interface Category {
  id_kategori: string;
  nama_kategori: string;
  keterangan: string;
  status: number; // 1 for active, 0 for inactive
  created_at?: string;
}

export interface CategoryListItem {
  category: string;
  categoryslug: string;
  createdon: string;
  status: string;
}
