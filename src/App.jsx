import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import "./styles.css";

import base from "./assets/base.png";
import fundo1 from "./assets/fundos/fundo1.png";
import fundo2 from "./assets/fundos/fundo2.png";
import musica from "./assets/audio/musica.mp3";

// Ícones cenário
import cameraIcon from "./assets/icons/camera.png";
import wardrobeIcon from "./assets/wardrobe.png";

// Ícones categorias
import iconRoupa from "./assets/icons/roupa.png";
import iconCalca from "./assets/icons/calca.png";
import iconSapato from "./assets/icons/sapato.png";
import iconCabelo from "./assets/icons/cabelo.png";
import iconAcessorio from "./assets/icons/acessorio.png";
import iconMake from "./assets/icons/make.png";

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

import logo from "./assets/logo.png";

function App() {
  const roupas = [null, roupa1, roupa2, roupa3];
  const acessorios = [null, acessorio1, acessorio2];
  const sapatos = [null, sapato1, sapato2];

  const fundos = [fundo1, fundo2];
  const [fundoIndex, setFundoIndex] = useState(0);

  const [musicaTocando, setMusicaTocando] = useState(false);

  const [roupaIndex, setRoupaIndex] = useState(0);
  const [acessorioIndex, setAcessorioIndex] = useState(0);
  const [sapatoIndex, setSapatoIndex] = useState(0);

  const [previewRoupaIndex, setPreviewRoupaIndex] = useState(0);
  const [previewAcessorioIndex, setPreviewAcessorioIndex] = useState(0);
  const [previewSapatoIndex, setPreviewSapatoIndex] = useState(0);

  const [categoriaAtual, setCategoriaAtual] = useState(1);

  const [guardaroupaAberto, setGuardaroupaAberto] = useState(false);
  const [looksSalvos, setLooksSalvos] = useState([]);
  const [lookSelecionado, setLookSelecionado] = useState(0);

  const lookAtual =
    looksSalvos.length > 0 ? looksSalvos[lookSelecionado] : null;

  useEffect(() => {
    const dados = localStorage.getItem("hello-kitty-looks");

    if (dados) {
      setLooksSalvos(JSON.parse(dados));
    }
  }, []);

  const tocarMusica = () => {
    const audio = document.getElementById("musica-fundo");

    if (musicaTocando) {
      audio.pause();
    } else {
      audio.play();
    }

    setMusicaTocando(!musicaTocando);
  };

  const trocarFundo = () => {
    setFundoIndex((prev) =>
      prev === fundos.length - 1
        ? 0
        : prev + 1
    );
  };

  const salvarFoto = async () => {
    const elemento = document.querySelector(".area-foto");

    const canvas = await html2canvas(elemento, {
      backgroundColor: null,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "hello-kitty-look.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

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

  const vestirPreview = () => {
    if (categoriaAtual === 1) {
      setRoupaIndex(previewRoupaIndex);
    }

    if (categoriaAtual === 3) {
      setSapatoIndex(previewSapatoIndex);
    }

    if (categoriaAtual === 5) {
      setAcessorioIndex(previewAcessorioIndex);
    }
  };

  const vestirLook = (look) => {
    if (!look) return;

    setRoupaIndex(look.roupaIndex);
    setAcessorioIndex(look.acessorioIndex);
    setSapatoIndex(look.sapatoIndex);

    setGuardaroupaAberto(false);
  };

  const excluirLook = (id) => {
    const atualizados = looksSalvos.filter((look) => look.id !== id);

    setLooksSalvos(atualizados);

    localStorage.setItem(
      "hello-kitty-looks",
      JSON.stringify(atualizados)
    );

    if (lookSelecionado >= atualizados.length) {
      setLookSelecionado(Math.max(atualizados.length - 1, 0));
    }
  };

  const proximoLook = () => {
    if (looksSalvos.length === 0) return;

    setLookSelecionado((prev) =>
      prev === looksSalvos.length - 1 ? 0 : prev + 1
    );
  };

  const lookAnterior = () => {
    if (looksSalvos.length === 0) return;

    setLookSelecionado((prev) =>
      prev === 0 ? looksSalvos.length - 1 : prev - 1
    );
  };

  const navegarCategoria = (direcao) => {
    if (categoriaAtual === 1) {
      setPreviewRoupaIndex((prev) =>
        direcao === "proximo"
          ? prev === roupas.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? roupas.length - 1
          : prev - 1
      );
    }

    if (categoriaAtual === 3) {
      setPreviewSapatoIndex((prev) =>
        direcao === "proximo"
          ? prev === sapatos.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? sapatos.length - 1
          : prev - 1
      );
    }

    if (categoriaAtual === 5) {
      setPreviewAcessorioIndex((prev) =>
        direcao === "proximo"
          ? prev === acessorios.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? acessorios.length - 1
          : prev - 1
      );
    }
  };

  const resetar = () => {
    setRoupaIndex(0);
    setAcessorioIndex(0);
    setSapatoIndex(0);
  };

  return (
    <div className="container">
      <div className="game-ui">

        <img
          src={logo}
          alt="Logo"
          className="logo"
        />

        <audio
          id="musica-fundo"
          src={musica}
          loop
        />

        <div
          className="cenario"
        >

          <div
            className="area-foto"
            style={{
              backgroundImage: `url(${fundos[fundoIndex]})`,
            }}
            >

            <div className="personagem">
              <img src={base} className="layer" alt="" />

              {roupas[roupaIndex] && (
                <img src={roupas[roupaIndex]} className="layer" alt="" />
              )}

              {acessorios[acessorioIndex] && (
                <img
                  src={acessorios[acessorioIndex]}
                  className="layer"
                  alt=""
                />
              )}

              {sapatos[sapatoIndex] && (
                <img src={sapatos[sapatoIndex]} className="layer" alt="" />
              )}
            </div>
          </div>

          <button
            className="btn-fundo"
            onClick={trocarFundo}
          >
            {fundoIndex === 0 ? "☀️" : "🌙"}
          </button>

          <button className="btn-foto" onClick={salvarFoto}>
            <img src={cameraIcon} alt="" />
          </button>

          <button
            className="btn-musica"
            onClick={tocarMusica}
          >
            {musicaTocando ? "🔊" : "🔇"}
          </button>

          <button
            className="btn-resetar-icone"
            onClick={resetar}
          >
            ↺
          </button>

          <button
            className="btn-guarda-roupa"
            onClick={() => setGuardaroupaAberto(true)}
          >
            <img src={wardrobeIcon} alt="Guarda-roupa" />
          </button>

        </div>

        <div className="painel-selecao">
          <h2 className="titulo-look">Monte o seu look</h2>
          <div className="categorias">
            <button
              className={categoriaAtual === 1 ? "categoria ativa" : "categoria"}
              onClick={() => setCategoriaAtual(1)}
            >
              <img src={iconRoupa} alt="Roupas" />
            </button>

            <button
              className={categoriaAtual === 2 ? "categoria ativa" : "categoria"}
              onClick={() => setCategoriaAtual(2)}
            >
              <img src={iconCalca} alt="Calças" />
            </button>

            <button
              className={categoriaAtual === 3 ? "categoria ativa" : "categoria"}
              onClick={() => setCategoriaAtual(3)}
            >
              <img src={iconSapato} alt="Sapatos" />
            </button>

            <button
              className={categoriaAtual === 4 ? "categoria ativa" : "categoria"}
              onClick={() => setCategoriaAtual(4)}
            >
              <img src={iconCabelo} alt="Cabelos" />
            </button>

            <button
              className={categoriaAtual === 5 ? "categoria ativa" : "categoria"}
              onClick={() => setCategoriaAtual(5)}
            >
              <img src={iconAcessorio} alt="Acessórios" />
            </button>

            <button
              className={categoriaAtual === 6 ? "categoria ativa" : "categoria"}
              onClick={() => setCategoriaAtual(6)}
            >
              <img src={iconMake} alt="Maquiagem" />
            </button>
          </div>

          <div className="controle-preview">
            <button
              className="btn-seta"
              onClick={() => navegarCategoria("anterior")}
            >
              {"<"}
            </button>

            <div className="preview-box">
              <div className="preview-personagem">
                <img src={base} className="preview-layer" alt="" />

                {categoriaAtual === 1 && roupas[previewRoupaIndex] && (
                  <img
                    src={roupas[previewRoupaIndex]}
                    className="preview-layer"
                    alt=""
                  />
                )}

                {categoriaAtual === 3 && sapatos[previewSapatoIndex] && (
                  <img
                    src={sapatos[previewSapatoIndex]}
                    className="preview-layer"
                    alt=""
                  />
                )}

                {categoriaAtual === 5 &&
                  acessorios[previewAcessorioIndex] && (
                    <img
                      src={acessorios[previewAcessorioIndex]}
                      className="preview-layer"
                      alt=""
                    />
                  )}
              </div>
            </div>

            <button
              className="btn-seta"
              onClick={() => navegarCategoria("proximo")}
            >
              {">"}
            </button>
          </div>

          <button className="btn-vestir-preview" onClick={vestirPreview}>
            Vestir
          </button>

        </div>
      </div>

      {guardaroupaAberto && (
        <div className="modal-overlay">
          <div className="modal-guarda-roupa">
            <button
              className="btn-fechar"
              onClick={() => setGuardaroupaAberto(false)}
            >
              ×
            </button>

            <h2>Guarda-Roupa</h2>

            <button className="btn-salvar-look" onClick={salvarLook}>
              Salvar Look Atual
            </button>

            {looksSalvos.length === 0 ? (
              <p className="sem-look">Nenhum look salvo.</p>
            ) : (
              <div className="visualizador-looks">
                <button className="btn-seta" onClick={lookAnterior}>
                  {"<"}
                </button>

                <div className="card-look">
                  <div className="preview-look">
                    <img src={base} className="preview-layer" alt="" />

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
                    <button onClick={() => vestirLook(lookAtual)}>
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

                <button className="btn-seta" onClick={proximoLook}>
                  {">"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;