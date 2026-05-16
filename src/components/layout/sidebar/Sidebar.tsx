"use client";

import React, { useState } from "react";
import {
    Home,
    Package,
    ChevronDown,
    Menu,
    LayoutDashboard,
    Box,
    Layers
} from "lucide-react";
import styles from "./sidebar.module.css";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    path?: string;
    children?: MenuItem[];
}

interface SidebarProps {
    items?: MenuItem[];
    defaultCollapsed?: boolean;
}

const defaultMenuItems: MenuItem[] = [
    {
        id: "home",
        label: "Home",
        icon: <Home size={20} />,
        path: "/",
    },
    {
        id: "products",
        label: "Products",
        icon: <Package size={20} />,
        children: [
            {
                id: "master-product",
                label: "Master Product",
                icon: <Box size={18} />,
                path: "/products/master",
            },
            {
                id: "product-category",
                label: "Product Category",
                icon: <Layers size={18} />,
                path: "/products/category",
            },
        ],
    },
    {
        id: "sales",
        label: "Sales Channels",
        icon: <LayoutDashboard size={20} />,
        children: [
            { id: "online-store", label: "Online Store", icon: <Box size={18} />, path: "/sales/online" },
            { id: "pos", label: "POS", icon: <Box size={18} />, path: "/sales/pos" },
        ],
    },
    {
        id: "inventory",
        label: "Inventory",
        icon: <Box size={20} />,
        children: [
            { id: "categories", label: "Categories", icon: <Layers size={18} />, path: "/inventory/categories" },
            { id: "stock", label: "Stock Levels", icon: <Box size={18} />, path: "/inventory/stock" },
            { id: "warehouses", label: "Warehouses", icon: <Box size={18} />, path: "/inventory/warehouses" },
        ],
    },
];

export function Sidebar({ items = defaultMenuItems, defaultCollapsed = false }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleMenu = (id: string) => {
        setOpenMenus((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <aside className={cn(styles.sidebar, isCollapsed ? styles.collapsed : styles.expanded)}>
            <div className={styles.header}>
                {!isCollapsed && (
                    <div className="flex items-center gap-3 px-2 flex-1">
                        <Image 
                            src="/assets/Logo-White.png" 
                            alt="Logo" 
                            width={120} 
                            height={40} 
                            className="h-8 w-auto object-contain"
                        />
                    </div>
                )}
                <button onClick={toggleSidebar} className={styles.toggleBtn}>
                    <Menu size={20} />
                </button>
            </div>

            <nav className={styles.menu}>
                {items.map((item) => (
                    <SidebarItem
                        key={item.id}
                        item={item}
                        isCollapsed={isCollapsed}
                        isOpen={openMenus.includes(item.id)}
                        onToggle={() => toggleMenu(item.id)}
                    />
                ))}
            </nav>
        </aside>
    );
}

interface SidebarItemProps {
    item: MenuItem;
    isCollapsed: boolean;
    isOpen: boolean;
    onToggle: () => void;
}

function SidebarItem({ item, isCollapsed, isOpen, onToggle }: SidebarItemProps) {
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div className={styles.menuItemContainer}>
            <div
                className={cn(styles.menuItem, isOpen && hasChildren && styles.active)}
                onClick={hasChildren ? onToggle : undefined}
            >
                <div className={styles.icon}>{item.icon}</div>
                {!isCollapsed && <span className={styles.label}>{item.label}</span>}

                {hasChildren && !isCollapsed && (
                    <ChevronDown
                        size={16}
                        className={cn(styles.arrow, isOpen && styles.open)}
                    />
                )}

                {isCollapsed && (
                    <div className={styles.tooltip}>
                        {item.label}
                    </div>
                )}
            </div>

            {hasChildren && !isCollapsed && (
                <div className={cn(styles.subMenu, isOpen && styles.show)}>
                    {item.children?.map((child) => (
                        <a key={child.id} href={child.path} className={styles.subMenuItem}>
                            {child.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
