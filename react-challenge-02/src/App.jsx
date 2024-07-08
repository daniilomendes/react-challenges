import { login } from "./utils";
import "./index.css";
import { useState } from "react";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    isRequesting: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
  }

  async function handleSubmit() {
    console.log("submitted");
    // setError(null);
    // setIsRequesting(true);
    // setForm({
    //   error: null,
    //   isRequesting: true,
    // });

    // try {
    //   // let values = { email: email, password: password };

    //   let values = { email: form.email, password: form.password };
    //   await login(values);

    //   alert("Login efetuado com sucesso!!!");
    // } catch (error) {
    //   // setError(error);
    //   setForm({
    //     error: error,
    //   });
    // } finally {
    //   // setIsRequesting(false);
    //   setForm({
    //     isRequesting: false,
    //   });
    // }

    setData({
      error: null,
      isRequesting: true,
    });

    try {
      let values = { email: data.email, password: data.password };
      await login(values);

      alert("Login efetuado com sucesso!!!");
    } catch (error) {
      // setError(error);
      setData({
        error: error,
      });
    } finally {
      setData({
        isRequesting: false,
      });
    }
  }

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {data.error && <div className="errorMessage">{data.error.message}</div>}
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            name={"email"}
            type={"email"}
            autoComplete="off"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            name={"password"}
            type={"password"}
            value={data.password}
            onChange={handleChange}
          />
        </div>

        <div className="button">
          <button
            onClick={handleSubmit}
            disabled={data.email === "" || data.isRequesting}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
