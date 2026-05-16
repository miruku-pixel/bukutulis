"use client";

import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  RotateCcw,
  FileText,
  FileSpreadsheet,
  Printer,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryTable } from "./category-table";
import { AddCategoryModal } from "./add-category-modal";
import { EditCategoryModal } from "./edit-category-modal";
import { Category } from "@/types/category";

import { 
  getCategories, 
  addCategory, 
  editCategory, 
  deleteCategory 
} from "../actions/categories";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<"initializing" | "authenticated" | "unauthenticated">("initializing");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async (search: string = "") => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("bukutulis_auth_token");
    
    if (!token) {
      setAuthState("unauthenticated");
      setLoading(false);
      return;
    }

    setAuthState("authenticated");
    setLoading(true);
    const result = await getCategories(token, search);
    if (result.status === 1) {
      setCategories(result.data || []);
    } else {
      console.error("Failed to fetch:", result.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories(searchQuery);
    }, 500); // Debounce search

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleAdd = async (newCategory: Omit<Category, "created_at">) => {
    const token = localStorage.getItem("bukutulis_auth_token");
    console.log("handleAdd token:", token ? "Found" : "Not found");
    if (!token) {
      alert("Authentication token not found. Please login again.");
      return;
    }

    console.log("Sending addCategory request:", newCategory);
    const result = await addCategory(token, newCategory);
    console.log("addCategory result:", result);
    if (result.status === 1) {
      fetchCategories(searchQuery);
      setIsAddModalOpen(false);
    } else {
      alert(result.message || "Failed to add category");
    }
  };

  const handleUpdate = async (updatedCategory: Category) => {
    const token = localStorage.getItem("bukutulis_auth_token");
    if (!token) return;

    const result = await editCategory(token, updatedCategory);
    if (result.status === 1) {
      fetchCategories();
      setIsEditModalOpen(false);
    } else {
      alert(result.message || "Failed to update category");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const token = localStorage.getItem("bukutulis_auth_token");
      if (!token) return;

      const result = await deleteCategory(token, id);
      if (result.status === 1) {
        fetchCategories();
      } else {
        alert(result.message || "Failed to delete category");
      }
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.nama_kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id_kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-800">Category</h1>
          <p className="text-zinc-500">Manage your categories</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white p-1 rounded-md border border-zinc-200 shadow-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100">
                  <FileText size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>PDF</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100">
                  <FileSpreadsheet size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Excel</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100">
                  <Printer size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Printer</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100">
                  <RotateCcw size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100">
                  <ChevronUp size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Collapse</TooltipContent>
            </Tooltip>
          </div>
          
          <Button 
            className="bg-[#434E78] hover:bg-[#323b5c] text-white gap-2 shadow-md"
            onClick={() => setIsAddModalOpen(true)}
          >
            <PlusCircle size={18} />
            Add New Category
          </Button>
        </div>
      </div>

      {/* Product List Card */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          {/* Table Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <Input 
                  placeholder="Search" 
                  className="pl-10 bg-zinc-50 border-zinc-200 focus:border-[#434E78] text-zinc-800 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className={`border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 ${isFilterVisible ? 'bg-[#434E78]/10 text-[#434E78] border-[#434E78]/50' : ''}`}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
              >
                <Filter size={18} />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[140px] bg-white border-zinc-200 text-zinc-800">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-200 text-zinc-800">
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="az">A - Z</SelectItem>
                  <SelectItem value="za">Z - A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters */}
          {isFilterVisible && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-200 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 uppercase">Choose Category</label>
                <Select>
                  <SelectTrigger className="bg-white border-zinc-200 text-zinc-800">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-zinc-200 text-zinc-800">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 uppercase">Status</label>
                <Select>
                  <SelectTrigger className="bg-white border-zinc-200 text-zinc-800">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-zinc-200 text-zinc-800">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-[#434E78] hover:bg-[#323b5c] text-white">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {/* Table Area */}
          {authState === "initializing" ? (
            <div className="flex items-center justify-center h-64 text-zinc-500">
              <RotateCcw className="animate-spin mr-2" />
              Initializing...
            </div>
          ) : authState === "unauthenticated" ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-500 gap-4">
              <p>You are not authenticated or your session has expired.</p>
              <div className="flex gap-2">
                <Button onClick={() => window.location.href = "/login"} className="bg-[#434E78] hover:bg-[#323b5c] text-white">
                  Go to Login
                </Button>
                <Button onClick={() => alert("Current storage: " + JSON.stringify(localStorage))} variant="outline">
                  Debug Storage
                </Button>
              </div>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-64 text-zinc-500">
              <RotateCcw className="animate-spin mr-2" />
              Loading categories...
            </div>
          ) : (
            <CategoryTable 
              data={filteredCategories} 
              onEdit={(cat) => {
                setSelectedCategory(cat);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <AddCategoryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAdd}
      />
      
      <EditCategoryModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        category={selectedCategory}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
