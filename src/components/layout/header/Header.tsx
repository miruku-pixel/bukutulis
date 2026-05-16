"use client";

import React, { useState, useEffect } from "react";
import {
    Search,
    Bell,
    Mail,
    Maximize,
    Minimize,
    ChevronDown
} from "lucide-react";
import Image from "next/image";
import styles from "./header.module.css";
import { cn } from "@/lib/utils";

export function Header() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <div className={cn(styles.searchWrapper, "group")}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#434E78] transition-all duration-300 group-focus-within:w-full" />
                </div>
            </div>

            <div className={styles.rightSection}>
                <button 
                    className={styles.iconBtn} 
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>

                <button className={styles.iconBtn} title="Messages">
                    <Mail size={20} />
                    <span className={styles.badge} />
                </button>

                <button className={styles.iconBtn} title="Notifications">
                    <Bell size={20} />
                    <span className={styles.badge} />
                </button>

                <div className={styles.divider} />

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        <Image 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
                            alt="User Avatar"
                            width={32}
                            height={32}
                            unoptimized
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>John Doe</span>
                        <span className={styles.userRole}>Master Admin</span>
                    </div>
                    <ChevronDown size={14} className={styles.headerText} />
                </div>
            </div>
        </header>
    );
}
