import { useState, useEffect } from "react";
import "../styles/color.css";

export default function Color() {
  const [color, setColor] = useState("white");

  function genColorCode() {
    let code;
    do {
      code = Math.floor(Math.random() * 16777216).toString(16);
    } while (code.length !== 6);

    return "#" + code.toUpperCase();
  }

  function copyCode() {
    navigator.clipboard.writeText(color);
  }

  const [contOffset, setContOffset] = useState(0);
  useEffect(() => {
    setContOffset(document.querySelector(".color-container")?.offsetTop);
  }, []);

  function pressToGen(e) {
    if (e.key === "Enter") {
      jumpNewColor();
    } else if (e.key === "ArrowRight") {
      nextColor();
    } else if (e.key === "ArrowLeft") {
      prevColor();
    }
  }

  //Color History
  useEffect(() => {
    //Add onkeydown event listener
    window.addEventListener("keydown", pressToGen);
    return () => {
      window.removeEventListener("keydown", pressToGen);
    };
    // eslint-disable-next-line 
  }, []);

  const [hist, setHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  function nextColor() {
    //Check if we are at the last element of "hist" array
    //Last element, generate new color and navigate to it
    if (hist.length === histIdx + 1) {
      let colCode = genColorCode();
      setColor(colCode);
      setHist((x) => [...x, colCode]);
      setHistIdx((x) => x + 1);
    }
    //Just navigate to the next element in hist
    else {
      setColor(hist[histIdx + 1]); //set color to next element
      setHistIdx((x) => x + 1); //and increent index by 1
    }
  }

  function prevColor() {
    //NOT first element, we have some previous value in hist
    if (histIdx > 0) {
      setColor(hist[histIdx - 1]); //set color to previous element
      setHistIdx((x) => x - 1); //and decrement index by 1
    }
  }

  function jumpNewColor() {
    let colCode = genColorCode();
    setColor(colCode);
    setHist((x) => [...x, colCode]);
    setHistIdx(hist.length);
  }

  return (
    <div
      className="color-container"
      style={{
        background: color,
        height: `calc(100vh - ${contOffset}px)`,
      }}
    >
      <input
        placeholder="Enter color code"
        value={color}
        onChange={(e) => setColor(e.target.value.toUpperCase())}
        onFocus={(e) => e.target.select()}
        style={{ color: color }}
        onClick={copyCode}
      />

      <button style={{ color }} onClick={jumpNewColor}>
        Generate Color!
      </button>

      <div className="colSquareCont">
        {hist.map((color, index) => (
          <div
            onClick={() => {
              setColor(hist[index]);
              setHistIdx(index);
            }}
            className={index === histIdx ? "colSquare active" : "colSquare"}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
