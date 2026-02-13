"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:3001/investments")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden mesh-gradient">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Novas Oportunidades Em Aberto
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-4xl tracking-tight text-foreground">
            Invista no <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Futuro</span> da Economia Real
          </h1>
          <p className="text-xl text-muted text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Acesse ativos exclusivos e diversifique seu portfólio com segurança e transparência. Tokenização de ativos reais ao seu alcance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-transform"
            >
              Explorar Oportunidades
            </button>
            <Link href="/signup" className="px-10 py-4 glass text-foreground rounded-2xl font-bold text-lg hover:bg-white transition-colors">
              Saber Mais
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[140px]"></div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Volume Transacionado", value: "R$ 45M+", icon: "📊" },
            { label: "Investidores Ativos", value: "12.000+", icon: "👥" },
            { label: "Projetos Captados", value: "150+", icon: "🏗️" }
          ].map((stat, i) => (
            <div key={i} className="glass p-8 rounded-3xl shadow-xl border border-white/50 flex items-center gap-6">
              <div className="text-4xl bg-white w-16 h-16 rounded-2xl shadow-inner flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Listing Section */}
      <section id="opportunities" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black mb-4">Oportunidades Disponíveis</h2>
            <div className="h-1.5 w-24 bg-primary rounded-full"></div>
          </div>
          <div className="flex gap-2">
            {["Todos", "Imobiliário", "Agro", "Energia"].map((tag, i) => (
              <button key={i} className={`px-5 py-2 rounded-full font-bold text-sm shadow-sm transition-all ${i === 0 ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <div key={item.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                ) : (
                  <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-5xl">🏗️</div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                  <span className="text-primary font-black">R$ {item.price.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase font-black tracking-widest text-primary bg-primary/5 px-2 py-1 rounded-full">Oportunidade</span>
                  <span className="text-sm font-bold text-gray-400">📍 {item.location}</span>
                </div>
                <h3 className="text-2xl font-black mb-3 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-auto border-t border-gray-50 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Retorno Alvo</p>
                      <p className="text-xl font-black text-green-600">{item.expectedReturn}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Status</p>
                      <p className="text-sm font-bold text-foreground">Aberto para Captação</p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/investments/${item.id}`)}
                    className="w-full py-4 bg-secondary text-foreground rounded-2xl font-black group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30"
                  >
                    Analisar Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="bg-secondary/50 rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200">
            <p className="text-5xl mb-6">🔍</p>
            <h3 className="text-2xl font-black mb-2 text-gray-400">Sem oportunidades por aqui</h3>
            <p className="text-gray-400">Estamos minerando as melhores ofertas do mercado. Volte amanhã!</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-800 pb-12 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-white text-xl">
              M
            </div>
            <span className="font-display font-black text-2xl tracking-tight text-white">
              Market<span className="text-primary">X</span>
            </span>
          </div>
          <div className="flex gap-10 text-gray-400 font-bold">
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Ajuda</a>
          </div>
        </div>
        <p className="text-center text-gray-600 text-sm font-medium">© 2026 MarketX Capital. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
