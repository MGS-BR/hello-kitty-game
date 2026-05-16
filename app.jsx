import { useState } from "react";
import "./styles.css";

import base from "./assets/base.png";

import roupa1 from "./assets/roupas/roupa1.png";
import roupa2 from "./assets/roupas/roupa2.png";

function App() {
  const [roupaAtual, setRoupaAtual] = useState(roupa1);

  return (
    <div className="app">
      <h1>Hello Kitty Dress Up</h1>

      <div className="character">
        <img src={base} className="layer" />
        <img src={roupaAtual} className="layer" />
      </div>

      <div className="buttons">
        <button onClick={() => setRoupaAtual(roupa1)}>
          Roupa 1
        </button>

        <button onClick={() => setRoupaAtual(roupa2)}>
          Roupa 2
        </button>
      </div>
    </div>
  );
}

export default App;