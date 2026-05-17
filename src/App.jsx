import { useState } from "react";
import "./styles.css";

import base from "./assets/base.png";
import fundo from "./assets/fundo.png";

// Roupas
import roupa1 from "./assets/roupas/roupa1.png";
import roupa2 from "./assets/roupas/roupa2.png";

// Acessórios
import acessorio1 from "./assets/acessorios/acessorio1.png";
import acessorio2 from "./assets/acessorios/acessorio2.png";

// Sapatos
import sapato1 from "./assets/sapatos/sapato1.png";
import sapato2 from "./assets/sapatos/sapato2.png";

function App() {
  // Arrays
  const roupas = [null, roupa1, roupa2];
  const acessorios = [null, acessorio1, acessorio2];
  const sapatos = [null, sapato1, sapato2];

  // Estados iniciais = base pura
  const [roupaIndex, setRoupaIndex] = useState(0);
  const [acessorioIndex, setAcessorioIndex] = useState(0);
  const [sapatoIndex, setSapatoIndex] = useState(0);

  // Navegação roupas
  const roupaAnterior = () => {
    setRoupaIndex((prev) =>
      prev === 0 ? roupas.length - 1 : prev - 1
    );
  };

  const proximaRoupa = () => {
    setRoupaIndex((prev) =>
      prev === roupas.length - 1 ? 0 : prev + 1
    );
  };

  // Navegação acessórios
  const acessorioAnterior = () => {
    setAcessorioIndex((prev) =>
      prev === 0 ? acessorios.length - 1 : prev - 1
    );
  };

  const proximoAcessorio = () => {
    setAcessorioIndex((prev) =>
      prev === acessorios.length - 1 ? 0 : prev + 1
    );
  };

  // Navegação sapatos
  const sapatoAnterior = () => {
    setSapatoIndex((prev) =>
      prev === 0 ? sapatos.length - 1 : prev - 1
    );
  };

  const proximoSapato = () => {
    setSapatoIndex((prev) =>
      prev === sapatos.length - 1 ? 0 : prev + 1
    );
  };

  // Resetar tudo
  const resetar = () => {
    setRoupaIndex(0);
    setAcessorioIndex(0);
    setSapatoIndex(0);
  };

  return (
    <div className="container">
      <h1 className="titulo">Hello Kitty Dress Up</h1>

    <div
      className="cenario"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="personagem">
        <img src={base} alt="Base" className="layer" />

        {roupas[roupaIndex] && (
          <img
            src={roupas[roupaIndex]}
            alt="Roupa"
            className="layer"
          />
        )}

        {acessorios[acessorioIndex] && (
          <img
            src={acessorios[acessorioIndex]}
            alt="Acessório"
            className="layer"
          />
        )}

        {sapatos[sapatoIndex] && (
          <img
            src={sapatos[sapatoIndex]}
            alt="Sapato"
            className="layer"
          />
        )}
      </div>
    </div>

      <div className="menu">
        {/* Roupas */}
        <div className="controle">
          <h2>Roupas</h2>

          <div className="botoes">
            <button onClick={roupaAnterior}>{"<"}</button>
            <button onClick={proximaRoupa}>{">"}</button>
          </div>
        </div>

        {/* Acessórios */}
        <div className="controle">
          <h2>Acessórios</h2>

          <div className="botoes">
            <button onClick={acessorioAnterior}>{"<"}</button>
            <button onClick={proximoAcessorio}>{">"}</button>
          </div>
        </div>

        {/* Sapatos */}
        <div className="controle">
          <h2>Sapatos</h2>

          <div className="botoes">
            <button onClick={sapatoAnterior}>{"<"}</button>
            <button onClick={proximoSapato}>{">"}</button>
          </div>
        </div>

        {/* Reset */}
        <button className="resetar" onClick={resetar}>
          Resetar
        </button>
      </div>
    </div>
  );
}

export default App;