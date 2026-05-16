"use server";

import { Category } from "@/types/category";



export async function getCategories(token: string, search: string = "") {
  const baseUrl = process.env.AUTH_BASE_URL;
  if (!baseUrl) return { status: 0, message: "Base URL not configured" };

  try {
    const response = await fetch(`${baseUrl}/kategori/list?search=${encodeURIComponent(search)}&sort=1&limit=0&offset=0`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch categories error:", error);
    return { status: 0, message: "Failed to fetch categories" };
  }
}

export async function addCategory(token: string, category: Omit<Category, "created_at">) {
  const baseUrl = process.env.AUTH_BASE_URL;
  if (!baseUrl) return { status: 0, message: "Base URL not configured" };

  try {
    console.log("Adding category:", category);
    const response = await fetch(`${baseUrl}/kategori/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
      cache: "no-store",
    });

    const data = await response.json();
    console.log("Add category response:", data);
    return data;
  } catch (error) {
    console.error("Add category error:", error);
    return { status: 0, message: "Failed to add category" };
  }
}

export async function editCategory(token: string, category: Category) {
  const baseUrl = process.env.AUTH_BASE_URL;
  if (!baseUrl) return { status: 0, message: "Base URL not configured" };

  try {
    const response = await fetch(`${baseUrl}/kategori/edit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Edit category error:", error);
    return { status: 0, message: "Failed to edit category" };
  }
}

export async function deleteCategory(token: string, id: string) {
  const baseUrl = process.env.AUTH_BASE_URL;
  if (!baseUrl) return { status: 0, message: "Base URL not configured" };

  try {
    const response = await fetch(`${baseUrl}/kategori/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_kategori: id }),
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Delete category error:", error);
    return { status: 0, message: "Failed to delete category" };
  }
}
