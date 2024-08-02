import { useEffect, useState } from "react";
import axios from "axios";

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      // reordenando alfabeticamente nossos pokemons
      const sortedArray = [...response.data.results];
      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setList(sortedArray);
    });
  }, []);

  return (
    <main>
      <header>
        <h1>Consumir API do pokémon</h1>
      </header>

      <hr />

      <section>
        <ul style={{ padding: 0 }}>
          {list.map((item) => (
            <Pokemon key={item.name} data={item} />
          ))}
        </ul>
      </section>
    </main>
  );
}

function Pokemon({ data }) {
  const [details, setDetails] = useState(null);

  function fetchData() {
    axios.get(data.url).then((response) => setDetails(response.data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (details === null) {
    return <li>Carregando...</li>;
  }

  return (
    <li style={{ display: "flex", alignItems: "center" }}>
      <img
        src={details.sprites.front_default}
        style={{ width: 50, marginRight: 20 }}
      />
      <span>
        Nome: <b>{details.name}</b> - Exp: {details.base_experience}
      </span>
    </li>
  );
}
