"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Category } from "@/types/category";

interface CategoryTableProps {
  data: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryTable({ data, onEdit, onDelete }: CategoryTableProps) {
  return (
    <div className="rounded-md border border-zinc-200 shadow-sm overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow className="border-zinc-200 hover:bg-transparent">
            <TableHead className="text-zinc-500 font-semibold">Category</TableHead>
            <TableHead className="text-zinc-500 font-semibold">Category Slug</TableHead>
            <TableHead className="text-zinc-500 font-semibold">Description</TableHead>
            <TableHead className="text-zinc-500 font-semibold">Status</TableHead>
            <TableHead className="text-right text-zinc-500 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id_kategori} className="border-zinc-200 hover:bg-zinc-50 text-zinc-800">
              <TableCell className="font-medium">{item.nama_kategori}</TableCell>
              <TableCell>{item.id_kategori}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {item.keterangan || "-"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={item.status === 1 ? "outline" : "destructive"}
                  className={
                    item.status === 1
                      ? "border-emerald-500 text-emerald-500 bg-emerald-500/10"
                      : "bg-red-500/10 text-red-500 border-red-500"
                  }
                >
                  {item.status === 1 ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-[#434E78] hover:bg-[#434E78]/10"
                    onClick={() => onEdit(item)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(item.id_kategori)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
