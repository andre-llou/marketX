"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:3001/users/login", { email, password });
            login(res.data.user, res.data.token);
        } catch (err: any) {
            setError(err.response?.data?.error || "Erro ao fazer login");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-6 mesh-gradient relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>

                <div className="w-full max-w-lg glass p-12 rounded-[2.5rem] shadow-2xl border border-white/50 animate-fade-in">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-primary/20 mx-auto mb-6">
                            M
                        </div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">Bem-vindo de volta</h1>
                        <p className="text-gray-500 font-medium">Acesse sua conta para gerenciar seus investimentos</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-xl flex items-center gap-3 animate-shake">
                            <span className="text-xl">⚠️</span>
                            <p className="text-red-700 font-bold text-sm">{error}</p>
                        </div>
                    )}

                    <div className="mb-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col gap-2">
                        <p className="font-black text-[10px] uppercase tracking-widest text-primary mb-1">Acesso Demonstração</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600 font-bold">Admin: admin@test.com / 123</span>
                            <button onClick={() => { setEmail("admin@test.com"); setPassword("123"); }} className="text-primary font-black hover:underline">Usar</button>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600 font-bold">User: user@test.com / 123</span>
                            <button onClick={() => { setEmail("user@test.com"); setPassword("123"); }} className="text-primary font-black hover:underline">Usar</button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-gray-400 ml-1">E-mail Corporativo</label>
                            <input
                                type="email"
                                placeholder="exemplo@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-medium text-lg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-black uppercase tracking-widest text-gray-400">Senha de Acesso</label>
                                <a href="#" className="text-xs font-bold text-primary hover:underline">Esqueceu a senha?</a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-medium text-lg"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-primary text-white p-5 rounded-2xl hover:bg-primary/90 transition-all font-black text-xl shadow-xl shadow-primary/30 mt-4 active:scale-95"
                        >
                            Entrar na Plataforma
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-gray-500 font-bold">
                            Não possui uma conta? <Link href="/signup" className="text-primary hover:underline font-black">Crie sua conta agora</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
