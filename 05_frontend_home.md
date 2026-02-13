# Etapa 5 - Página Principal (Listagem)

``` jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/investments")
      .then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h1>Oportunidades de Investimento</h1>

      {items.map(item => (
        <div key={item.id}>
          <img src={item.imageUrl} width="200" />
          <h2>{item.title}</h2>
          <p>{item.location}</p>
          <p>R$ {item.price}</p>
          <p>Retorno esperado: {item.expectedReturn}</p>
        </div>
      ))}
    </div>
  );
}
```
