"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function UserDashboard() {
    const { user, loading } = useAuth();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
            return;
        }

        if (user) {
            axios.get(`http://localhost:3001/users/${user.id}/dashboard`)
                .then(res => setDashboardData(res.data))
                .catch(err => console.error(err));
        }
    }, [user, loading, router]);

    if (loading || !user) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!dashboardData) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Sincronizando Portfólio</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                <header className="mb-16">
                    <h1 className="text-5xl font-black tracking-tight mb-4">Meu Portfólio</h1>
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-24 bg-primary rounded-full"></div>
                        <p className="text-gray-500 font-bold text-lg">Olá, {user.name}. Acompanhe seu patrimônio.</p>
                    </div>
                </header>

                {/* Global Stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="glass-dark p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/50 mb-2 relative z-10">Total Investido</p>
                        <div className="flex items-baseline gap-1 text-white relative z-10">
                            <span className="text-xl font-black opacity-50">R$</span>
                            <span className="text-4xl font-black">
                                {dashboardData.userInvestments.reduce((acc: number, inv: any) => acc + inv.amount, 0).toLocaleString('pt-BR')}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Ativos em Carteira</p>
                        <p className="text-4xl font-black text-foreground">{dashboardData.userInvestments.length}</p>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Rendimento Médio</p>
                        <p className="text-4xl font-black text-green-600">14.8% <span className="text-xs text-gray-400 italic">a.a</span></p>
                    </div>
                </section>

                {/* Detailed Assets */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-black mb-8 px-2 flex items-center justify-between">
                        Participações Ativas
                        <button className="text-sm text-primary hover:underline">Baixar Relatório PDF</button>
                    </h2>

                    {dashboardData.userInvestments && dashboardData.userInvestments.length > 0 ? (
                        <div className="grid gap-6">
                            {dashboardData.userInvestments.map((inv: any) => (
                                <div key={inv.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-center gap-10 group">
                                    <div className="w-full md:w-48 h-32 rounded-[2rem] overflow-hidden shadow-inner border border-gray-50 flex-shrink-0">
                                        {inv.investment.imageUrl ? (
                                            <img src={inv.investment.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={inv.investment.title} />
                                        ) : (
                                            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-4xl">🏢</div>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-8">
                                        <div>
                                            <h3 className="text-2xl font-black text-foreground mb-1">{inv.investment.title}</h3>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">📍 {inv.investment.location}</p>
                                            <div className="flex gap-4">
                                                <span className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary/10">Cota {inv.id}</span>
                                                <span className="bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-green-100">Ativo</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-10">
                                            <div className="text-left md:text-right">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Aporte Realizado</p>
                                                <p className="text-2xl font-black text-foreground">R$ {inv.amount.toLocaleString('pt-BR')}</p>
                                                <p className="text-[10px] font-bold text-gray-400 italic">Data: {new Date(inv.investedAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <button
                                                    onClick={() => router.push(`/investments/${inv.investmentId}`)}
                                                    className="h-full px-8 bg-secondary text-foreground rounded-2xl font-black hover:bg-primary hover:text-white transition-all shadow-sm flex items-center justify-center whitespace-nowrap"
                                                >
                                                    Ver Projeto
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-secondary/30 rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-200">
                            <p className="text-6xl mb-8">💎</p>
                            <h3 className="text-3xl font-black mb-4">Sua carteira está vazia</h3>
                            <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">
                                Comece a construir seu patrimônio hoje mesmo explorando as melhores oportunidades do mercado.
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="bg-primary text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform"
                            >
                                Fazer Primeiro Aporte
                            </button>
                        </div>
                    )}
                </section>

                {/* Admin Section (conditional) */}
                {user.role === "ADMIN" && dashboardData.createdInvestments && dashboardData.createdInvestments.length > 0 && (
                    <section className="mt-32 pt-20 border-t border-gray-100">
                        <div className="bg-gray-900 rounded-[3rem] p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                            <h2 className="text-3xl font-black mb-8 text-white relative z-10 flex items-center justify-between">
                                Ativos sob sua Gestão
                                <Link href="/admin/dashboard" className="text-sm font-bold text-primary hover:underline">Ver Painel Admin ↗</Link>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                                {dashboardData.createdInvestments.map((item: any) => (
                                    <div key={item.id} className="p-6 glass-dark rounded-3xl border border-white/10 group hover:border-white/30 transition-colors">
                                        <h4 className="font-bold text-white mb-2">{item.title}</h4>
                                        <div className="flex justify-between items-end">
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{item.location}</p>
                                            <p className="font-black text-primary">R$ {item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <footer className="py-20 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                MarketX Premium Experience • Dashboard v2.0
            </footer>
        </div>
    );
}
