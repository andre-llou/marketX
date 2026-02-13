"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post("http://localhost:3001/users/signup", form);
            alert("Conta criada com sucesso! Faça login para continuar.");
            router.push("/login");
        } catch (err: any) {
            setError(err.response?.data?.error || "Erro ao criar conta");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-6 mesh-gradient relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] -z-10"></div>

                <div className="w-full max-w-lg glass p-12 rounded-[2.5rem] shadow-2xl border border-white/50 animate-fade-in">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-primary/20 mx-auto mb-6">
                            M
                        </div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">Criar Nova Conta</h1>
                        <p className="text-gray-500 font-medium">Junte-se a milhares de investidores hoje</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-xl flex items-center gap-3 animate-shake">
                            <span className="text-xl">⚠️</span>
                            <p className="text-red-700 font-bold text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-gray-400 ml-1">Nome Completo</label>
                            <input
                                type="text"
                                placeholder="João da Silva"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-gray-400 ml-1">Seu Melhor E-mail</label>
                            <input
                                type="email"
                                placeholder="joao@exemplo.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-gray-400 ml-1">Crie sua Senha</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="flex items-start gap-3 mt-2 ml-1">
                            <input type="checkbox" className="mt-1.5 w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary" required />
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Ao me cadastrar, eu concordo com os <a href="#" className="text-primary font-bold hover:underline">Termos de Uso</a> e a <a href="#" className="text-primary font-bold hover:underline">Política de Privacidade</a>.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="bg-primary text-white p-5 rounded-2xl hover:bg-primary/90 transition-all font-black text-xl shadow-xl shadow-primary/30 mt-4 active:scale-95"
                        >
                            Finalizar Cadastro
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-gray-500 font-bold">
                            Já possui uma conta? <Link href="/login" className="text-primary hover:underline font-black">Faça seu login</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
