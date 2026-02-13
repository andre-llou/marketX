"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Add() {
    const [form, setForm] = useState<any>({});
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/investments", form);
            alert("Investimento cadastrado!");
            router.push("/"); // Redirect to home after success
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar investimento");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Adicionar Investimento</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input placeholder="Título"
                    className="border p-2 rounded"
                    onChange={e => setForm({ ...form, title: e.target.value })} />

                <textarea placeholder="Descrição"
                    className="border p-2 rounded"
                    onChange={e => setForm({ ...form, description: e.target.value })} />

                <input placeholder="Localização"
                    className="border p-2 rounded"
                    onChange={e => setForm({ ...form, location: e.target.value })} />

                <input placeholder="Valor"
                    type="number"
                    className="border p-2 rounded"
                    onChange={e => setForm({ ...form, price: e.target.value })} />

                <input placeholder="Retorno esperado"
                    className="border p-2 rounded"
                    onChange={e => setForm({ ...form, expectedReturn: e.target.value })} />

                <input placeholder="Contato"
                    className="border p-2 rounded"
                    onChange={e => setForm({ ...form, contactInfo: e.target.value })} />

                <input placeholder="URL da imagem"
                    className="border p-2 rounded"
                    onChange={e => setForm({ ...form, imageUrl: e.target.value })} />

                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Cadastrar</button>
            </form>
        </div>
    );
}
