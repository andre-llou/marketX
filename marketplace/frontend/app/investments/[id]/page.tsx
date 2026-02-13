"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function InvestmentDetail() {
    const { user, loading: authLoading } = useAuth();
    const params = useParams();
    const router = useRouter();
    const [investment, setInvestment] = useState<any>(null);
    const [amount, setAmount] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (params.id) {
            axios.get(`http://localhost:3001/investments/${params.id}`)
                .then(res => setInvestment(res.data))
                .catch(err => console.error(err));
        }
    }, [params.id]);

    const handleInvest = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Por favor, insira um valor válido.");
            return;
        }

        try {
            await axios.post(`http://localhost:3001/investments/${params.id}/invest`, {
                userId: user.id,
                amount: Number(amount)
            });
            alert("Investimento realizado com sucesso!");
            setShowModal(false);
            router.push("/user/dashboard");
        } catch (error) {
            console.error(error);
            alert("Erro ao realizar investimento.");
        }
    };

    if (authLoading || !investment) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 text-gray-400 font-bold hover:text-primary transition-colors mb-8"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar para Vitrine
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Visuals & Info */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20">
                            {investment.imageUrl ? (
                                <img src={investment.imageUrl} alt={investment.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-8xl">🏗️</div>
                            )}
                            <div className="absolute top-6 left-6 flex gap-2">
                                <span className="glass px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest text-foreground shadow-lg">Imobiliário</span>
                                <span className="glass px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest text-foreground shadow-lg">Premium</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                            <h1 className="text-5xl font-black mb-6 tracking-tight">{investment.title}</h1>
                            <div className="flex flex-wrap gap-8 mb-10 text-gray-500 font-bold">
                                <span className="flex items-center gap-2">📍 {investment.location}</span>
                                <span className="flex items-center gap-2">📅 Criado em {new Date(investment.createdAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-2">🛡️ Auditado</span>
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                                <h3 className="text-2xl font-black text-foreground mb-4">Sobre o Ativo</h3>
                                {investment.description}
                                <p className="mt-8">
                                    Este projeto representa uma oportunidade única de exposição a ativos reais com alta previsibilidade de retorno. Nossa equipe realizou toda a due diligence técnica e jurídica para garantir a segurança do seu aporte.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Financials & Action */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>

                                <h3 className="text-xl font-black mb-8 border-b border-gray-50 pb-4">Sumário Financeiro</h3>

                                <div className="space-y-8">
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-2">Valor Alvo da Captação</p>
                                        <div className="flex items-baseline gap-1 text-primary">
                                            <span className="text-xl font-black">R$</span>
                                            <span className="text-4xl font-black">{investment.price.toLocaleString('pt-BR')}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Previsão</p>
                                            <p className="text-2xl font-black text-green-600">{investment.expectedReturn}</p>
                                            <p className="text-[10px] font-bold text-gray-400">a.a</p>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Tipo</p>
                                            <p className="text-xl font-black text-foreground">Equity</p>
                                            <p className="text-[10px] font-bold text-gray-400">Ativo Real</p>
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                                        <p className="text-[10px] uppercase font-black tracking-widest text-primary mb-2">Responsável Técnica</p>
                                        <p className="text-sm font-black text-gray-800 underline uppercase tracking-tight">{investment.contactInfo}</p>
                                    </div>

                                    {!user ? (
                                        <button
                                            onClick={() => router.push("/login")}
                                            className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black text-xl hover:bg-black transition-all shadow-xl shadow-gray-200"
                                        >
                                            Login para Investir
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="w-full py-5 bg-primary text-white rounded-[2rem] font-black text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 animate-pulse"
                                        >
                                            Investir Agora
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="glass p-8 rounded-[2.5rem] border border-white/50 text-center">
                                <p className="text-sm font-bold text-gray-500 mb-2 italic">Dúvidas sobre o projeto?</p>
                                <button className="text-primary font-black hover:underline uppercase text-xs tracking-widest">Falar com um Especialista</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Investment Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center p-6 z-[100] animate-fade-in">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl border border-gray-100 relative overflow-hidden animate-scale-in">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>

                        <h3 className="text-3xl font-black mb-4">Confirmar Aporte</h3>
                        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                            Você está solicitando participação no projeto <span className="text-primary font-black">"{investment.title}"</span>. Informe o valor que deseja investir.
                        </p>

                        <div className="relative mb-10">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-2xl">R$</span>
                            <input
                                type="number"
                                placeholder="0,00"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 p-6 pl-16 rounded-[2rem] text-3xl font-black focus:border-primary outline-none transition-all placeholder:text-gray-200"
                                autoFocus
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleInvest}
                                className="w-full py-5 bg-primary text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/25 hover:bg-primary/90 transition-all"
                            >
                                Confirmar Investimento
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-4 text-gray-400 font-black hover:text-gray-600 transition-colors uppercase text-sm tracking-widest"
                            >
                                Cancelar e Voltar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
