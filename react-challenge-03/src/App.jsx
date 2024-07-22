/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useState } from "react";

function App() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    maritalStatus: "",
    genre: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
  }

  function calculateProgress() {
    // let value = 0;
    // let amountToAdd = 25;
    // const explodeString = data.fullName.split(" ");
    // let pattern =
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if (data.fullName && explodeString[1]) {
    //   value += amountToAdd;
    // }
    // if (data.email && pattern.test(data.email)) {
    //   value += amountToAdd;
    // }
    // if (data.maritalStatus) {
    //   value += amountToAdd;
    // }
    // if (data.genre) {
    //   value += amountToAdd;
    // }

    const totalPercent = 100;
    const totalProperties = Object.keys(data).length;
    let validatedInputs = 0;

    const explodeString = data.fullName.split(" ");
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (data.fullName && explodeString[1]) {
      validatedInputs += 1;
    }
    if (data.email && pattern.test(data.email)) {
      validatedInputs += 1;
    }
    if (data.maritalStatus) {
      validatedInputs += 1;
    }
    if (data.genre) {
      validatedInputs += 1;
    }

    let partialPercent = (totalPercent * validatedInputs) / totalProperties;
    return partialPercent;
  }

  function handleClick() {
    alert("Formulário enviado com sucesso!");
    setData({
      fullName: "",
      email: "",
      maritalStatus: "",
      genre: "",
    });
  }

  return (
    <div className="App">
      <h1>Progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div
            className="bar"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="form-group">
          <label htmlFor="">Nome Completo</label>
          <input
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">E-mail</label>
          <input name={"email"} value={data.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="">Estado Civil</label>
          <select
            name="maritalStatus"
            value={data.maritalStatus}
            onChange={handleChange}
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                type="radio"
                name="genre"
                value="masculino"
                onChange={handleChange}
                checked={data.genre === "masculino"}
              />{" "}
              Masculino
            </span>
            <span>
              <input
                type="radio"
                name="genre"
                value="feminino"
                onChange={handleChange}
                checked={data.genre === "feminino"}
              />{" "}
              Feminino
            </span>
          </div>
        </div>
        <button onClick={handleClick} disabled={calculateProgress() !== 100}>
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
