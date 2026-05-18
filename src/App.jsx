import { useEffect, useState } from "react";
import "./styles.css";

import base from "./assets/base.png";
import fundo from "./assets/fundo.png";
import wardrobeIcon from "./assets/wardrobe.png";

// Roupas
import roupa1 from "./assets/roupas/roupa1.png";
import roupa2 from "./assets/roupas/roupa2.png";
import roupa3 from "./assets/roupas/roupa3.png";

// Acessórios
import acessorio1 from "./assets/acessorios/acessorio1.png";
import acessorio2 from "./assets/acessorios/acessorio2.png";

// Sapatos
import sapato1 from "./assets/sapatos/sapato1.png";
import sapato2 from "./assets/sapatos/sapato2.png";

function App() {
  // Arrays
  const roupas = [null, roupa1, roupa2, roupa3];
  const acessorios = [null, acessorio1, acessorio2];
  const sapatos = [null, sapato1, sapato2];

  // Estados iniciais = base pura
  const [roupaIndex, setRoupaIndex] = useState(0);
  const [acessorioIndex, setAcessorioIndex] = useState(0);
  const [sapatoIndex, setSapatoIndex] = useState(0);

  const [guardaroupaAberto, setGuardaroupaAberto] = useState(false);
  const [looksSalvos, setLooksSalvos] = useState([]);

  const [lookSelecionado, setLookSelecionado] = useState(0);
  const lookAtual = looksSalvos.length > 0 ? looksSalvos[lookSelecionado] : null;

  useEffect(() => {
    const dados = localStorage.getItem("hello-kitty-looks");

    if (dados) {
      setLooksSalvos(JSON.parse(dados));
    }
  }, []);

  // Salvar look atual
  const salvarLook = () => {
    const nome = prompt("Digite o nome do look:");

    if (!nome) return;

    const novoLook = {
      id: Date.now(),
      nome,
      roupaIndex,
      acessorioIndex,
      sapatoIndex,
    };

    const atualizados = [...looksSalvos, novoLook];

    setLooksSalvos(atualizados);

    localStorage.setItem(
      "hello-kitty-looks",
      JSON.stringify(atualizados)
    );
  };

  // Vestir o look selecionado
  const vestirLook = (look) => {
    setRoupaIndex(look.roupaIndex);
    setAcessorioIndex(look.acessorioIndex);
    setSapatoIndex(look.sapatoIndex);

    setGuardaroupaAberto(false);
  };

  // Excluir look salvo
  const excluirLook = (id) => {
    const atualizados = looksSalvos.filter(
      (look) => look.id !== id
    );

    setLooksSalvos(atualizados);

    localStorage.setItem(
      "hello-kitty-looks",
      JSON.stringify(atualizados)
    );

    // Corrige índice após exclusão
    if (lookSelecionado >= atualizados.length) {
      setLookSelecionado(
        Math.max(atualizados.length - 1, 0)
      );
    }
  };

  // Navegação looks salvos
  const proximoLook = () => {
    setLookSelecionado((prev) =>
      prev === looksSalvos.length - 1
        ? 0
        : prev + 1
    );
  };

  const lookAnterior = () => {
    setLookSelecionado((prev) =>
      prev === 0
        ? looksSalvos.length - 1
        : prev - 1
    );
  };

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

      <button
        className="btn-guarda-roupa"
        onClick={() => setGuardaroupaAberto(true)}
      >
        <img
          src={wardrobeIcon}
          alt="Guarda roupa"
        />
      </button>

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

      {guardaroupaAberto && (
        <div className="modal-overlay">
          <div className="modal-guarda-roupa">
            <div className="topo-modal">
              <h2>Guarda‑Roupa</h2>

              <button
                onClick={() =>
                  setGuardaroupaAberto(false)
                }
              >
                X
              </button>
            </div>

            <button
              className="btn-salvar-look"
              onClick={salvarLook}
            >
              Salvar Look Atual
            </button>

            <div className="visualizador-looks">

              {looksSalvos.length === 0 ? (
                <p>Nenhum look salvo.</p>
              ) : (
                <>
                  <button
                    className="btn-seta"
                    onClick={lookAnterior}
                  >
                    {"<"}
                  </button>

                  <div className="card-look">
                    <div className="preview-look">

                      <img
                        src={base}
                        className="preview-layer"
                        alt=""
                      />

                      {lookAtual && roupas[lookAtual.roupaIndex] && (
                        <img
                          src={roupas[lookAtual.roupaIndex]}
                          className="preview-layer"
                          alt=""
                        />
                      )}

                      {lookAtual && acessorios[lookAtual.acessorioIndex] && (
                        <img
                          src={acessorios[lookAtual.acessorioIndex]}
                          className="preview-layer"
                          alt=""
                        />
                      )}

                      {lookAtual && sapatos[lookAtual.sapatoIndex] && (
                        <img
                          src={sapatos[lookAtual.sapatoIndex]}
                          className="preview-layer"
                          alt=""
                        />
                      )}
                    </div>

                    {lookAtual && <h3>{lookAtual.nome}</h3>}

                    <div className="acoes-look">
                      <button
                        onClick={() => {
                          if (lookAtual) {
                            vestirLook(lookAtual);
                          }
                        }}
                      >
                        Vestir
                      </button>

                      <button
                        className="btn-excluir"
                        onClick={() => {
                          if (lookAtual) {
                            excluirLook(lookAtual.id);
                          }
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn-seta"
                    onClick={proximoLook}
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;