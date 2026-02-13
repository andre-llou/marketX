"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full glass border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        M
                    </div>
                    <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                        Market<span className="text-primary font-black">X</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {!user ? (
                        <>
                            <Link href="/login" className="font-semibold text-gray-600 hover:text-primary transition-colors">
                                Entrar
                            </Link>
                            <Link href="/signup" className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                                Começar Agora
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-foreground">{user.name}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{user.role}</span>
                            </div>

                            <div className="h-8 w-[1px] bg-gray-200"></div>

                            {user.role === "ADMIN" && (
                                <Link href="/admin/dashboard" className="font-bold text-gray-600 hover:text-primary transition-colors">
                                    Admin
                                </Link>
                            )}
                            <Link href="/user/dashboard" className="font-bold text-gray-600 hover:text-primary transition-colors">
                                Portfólio
                            </Link>
                            <button
                                onClick={logout}
                                className="px-5 py-2 border-2 border-red-50 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-all"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
