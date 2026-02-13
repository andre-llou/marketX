"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const [items, setItems] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [form, setForm] = useState<any>({
        title: "",
        description: "",
        location: "",
        price: "",
        expectedReturn: "",
        contactInfo: "",
    });
    const router = useRouter();

    const fetchItems = () => {
        axios.get("http://localhost:3001/investments")
            .then(res => setItems(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (!loading && (!user || user.role !== "ADMIN")) {
            router.push("/login");
            return;
        }
        fetchItems();
    }, [user, loading, router]);

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja deletar?")) return;
        try {
            await axios.delete(`http://localhost:3001/investments/${id}`);
            fetchItems();
        } catch (error) {
            console.error(error);
            alert("Erro ao deletar");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("location", form.location);
            formData.append("price", form.price);
            formData.append("expectedReturn", form.expectedReturn);
            formData.append("contactInfo", form.contactInfo);
            formData.append("userId", user.id);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            await axios.post("http://localhost:3001/investments", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Investimento cadastrado!");
            setForm({
                title: "",
                description: "",
                location: "",
                price: "",
                expectedReturn: "",
                contactInfo: "",
            });
            setImageFile(null);
            // Reset file input manually if needed
            const fileInput = document.getElementById("image-upload") as HTMLInputElement;
            if (fileInput) fileInput.value = "";

            fetchItems();
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar");
        }
    };

    if (loading || !user || user.role !== "ADMIN") return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl font-black tracking-tight mb-2">Painel de Controle</h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Gestão de Oportunidades</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm px-8">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Ativos</p>
                            <p className="text-2xl font-black text-primary">{items.length}</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-32">
                            <h2 className="text-2xl font-black mb-8 border-b border-gray-50 pb-4">Novo Investimento</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Título do Projeto</label>
                                    <input placeholder="Ex: Residencial Aurora" value={form.title} className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                                        onChange={e => setForm({ ...form, title: e.target.value })} required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Descrição Detalhada</label>
                                    <textarea placeholder="Fale sobre o ativo..." value={form.description} className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold h-32"
                                        onChange={e => setForm({ ...form, description: e.target.value })} required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Localização</label>
                                        <input placeholder="Cidade, UF" value={form.location} className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                                            onChange={e => setForm({ ...form, location: e.target.value })} required />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Valor (R$)</label>
                                        <input placeholder="0,00" type="number" value={form.price} className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                                            onChange={e => setForm({ ...form, price: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Retorno Esperado</label>
                                        <input placeholder="15% a.a" value={form.expectedReturn} className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                                            onChange={e => setForm({ ...form, expectedReturn: e.target.value })} required />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Contato</label>
                                        <input placeholder="E-mail/Telefone" value={form.contactInfo} className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                                            onChange={e => setForm({ ...form, contactInfo: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Imagem de Capa (Upload)</label>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={e => e.target.files && setImageFile(e.target.files[0])}
                                        className="w-full bg-gray-50 border-2 border-dashed border-gray-200 p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-primary file:text-white hover:file:bg-primary/90"
                                        required
                                    />
                                </div>

                                <button type="submit" className="bg-primary text-white p-5 rounded-2xl hover:bg-primary/90 mt-4 font-black transition-all shadow-xl shadow-primary/20">
                                    Publicar Oportunidade
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-7">
                        <div className="bg-gray-50/50 p-4 rounded-[2.5rem] border border-gray-100 min-h-[600px]">
                            <h2 className="text-xl font-black m-6">Ativos Atuais</h2>
                            <div className="flex flex-col gap-4">
                                {items.map(item => (
                                    <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner border border-gray-100 flex-shrink-0">
                                                {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-50 flex items-center justify-center text-2xl">🏙️</div>}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-xl text-foreground mb-1">{item.title}</h3>
                                                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                    <span>📍 {item.location}</span>
                                                    <span>💰 R$ {item.price.toLocaleString()}</span>
                                                    <span className="text-green-500">📈 {item.expectedReturn}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => router.push(`/investments/${item.id}`)}
                                                className="p-3 text-gray-400 hover:text-primary transition-colors" title="Ver"
                                            >
                                                👁️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {items.length === 0 && (
                                    <div className="text-center py-20">
                                        <p className="text-5xl mb-4">📭</p>
                                        <p className="text-gray-400 font-bold">Nenhum ativo publicado ainda.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
