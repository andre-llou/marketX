# Etapa 6 - Página de Adicionar Novo Item

``` jsx
import { useState } from "react";
import axios from "axios";

export default function Add() {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/investments", form);
    alert("Investimento cadastrado!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Título"
        onChange={e => setForm({...form, title: e.target.value})} />

      <textarea placeholder="Descrição"
        onChange={e => setForm({...form, description: e.target.value})} />

      <input placeholder="Localização"
        onChange={e => setForm({...form, location: e.target.value})} />

      <input placeholder="Valor"
        type="number"
        onChange={e => setForm({...form, price: e.target.value})} />

      <input placeholder="Retorno esperado"
        onChange={e => setForm({...form, expectedReturn: e.target.value})} />

      <input placeholder="Contato"
        onChange={e => setForm({...form, contactInfo: e.target.value})} />

      <input placeholder="URL da imagem"
        onChange={e => setForm({...form, imageUrl: e.target.value})} />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
```
