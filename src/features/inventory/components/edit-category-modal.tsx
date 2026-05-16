"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/types/category";
import { Switch } from "@/components/ui/switch";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (category: Category) => void;
  category: Category | null;
}

export function EditCategoryModal({
  isOpen,
  onClose,
  onUpdate,
  category,
}: EditCategoryModalProps) {
  const [formData, setFormData] = useState<Category | null>(category);

  useEffect(() => {
    setFormData(category);
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onUpdate(formData);
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-zinc-200 text-zinc-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="id_kategori" className="text-zinc-500">Category Slug (ID)</Label>
            <Input
              id="id_kategori"
              value={formData.id_kategori}
              disabled
              className="bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nama_kategori" className="text-zinc-500">Category Name</Label>
            <Input
              id="nama_kategori"
              value={formData.nama_kategori}
              onChange={(e) => setFormData({ ...formData, nama_kategori: e.target.value })}
              className="bg-zinc-50 border-zinc-200 focus:border-[#434E78] text-zinc-800"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keterangan" className="text-zinc-500">Description</Label>
            <Input
              id="keterangan"
              value={formData.keterangan}
              onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
              className="bg-zinc-50 border-zinc-200 focus:border-[#434E78] text-zinc-800"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="status" className="text-zinc-500">Active Status</Label>
            <Switch
              id="status"
              checked={formData.status === 1}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, status: checked ? 1 : 0 })
              }
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#434E78] hover:bg-[#323b5c] text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
