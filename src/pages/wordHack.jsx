import { Container, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import wordArr from "../resources/enWords10k";

export default function WordHack() {
  const [wordMap, setWordMap] = useState({});
  const [renderWords, setRenderWords] = useState([]);
  const [ans, setAns] = useState([]);
  const [charMap, setCharMap] = useState({});
  const [helpWords, setHelpWords] = useState("");
  const [wordLength, setWordLength] = useState(0);

  useEffect(() => {
    grpWordsByLength(wordArr);
  }, []);

  const grpWordsByLength = (words) => {
    const map = {};

    for (let x = 0; x < words.length; x++) {
      const word = words[x];
      const length = word.length;
      if (map[length] === undefined) {
        map[length] = [word];
      } else {
        map[length].push(word);
      }
    }

    setWordMap(map);
  };

  const getWords = (e) => {
    const length = parseInt(e.target.value) || 0;
    setWordLength(length);
    setRenderWords(wordMap[length] || []);
    setAns(Array(parseInt(length || 0)).fill(""));
  };

  const inputChar = (val, idx) => {
    let tempCharMap = { ...charMap };
    tempCharMap[idx] = val;
    setCharMap(tempCharMap);
    let tempAns = [...ans];
    tempAns[idx] = val;
    setAns(tempAns);
  };

  // Pass in an array of words
  // Returns an array of words that are valid
  // Check validity - there should not be a word NOT found in helpWords
  function filterHelper(words, helpWords) {
    const result = words.filter((word) => {
      let match = true;
      word.split("").forEach((char) => {
        if (helpWords.includes(char) === false) {
          match = false;
        }
      });
      return match;
    });

    return result;
  }

  const RenderList = () => {
    return filterHelper(renderWords, helpWords)
      .filter((word) => {
        let toShow = true;

        Object.keys(charMap).forEach((key) => {
          if (charMap[key] !== word[key] && charMap[key] !== "") {
            toShow = false;
          }
        });
        return toShow;
      })
      .map((word) => <div key={word}>{word}</div>);
  };

  return (
    <Container style={{ paddingTop: 30 }}>
      <TextField
        label="Possible Characters"
        value={helpWords}
        onChange={(e) => {
          setCharMap({}); //Clear charMap
          setHelpWords(e.target.value.toLowerCase());
        }}
        onFocus={(e) => e.target.select()}
      />

      <h1 style={{ padding: "30px 0" }}>
        Word length: <b>{wordLength}</b>
      </h1>
      <Slider
        value={wordLength}
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={10}
        onChange={(e) => {
          setCharMap({}); //Clear charMap
          getWords(e);
        }}
      />

      <form
        style={{ display: "flex", flexWrap: "wrap", gap: 20, margin: "30px 0" }}
      >
        {ans.map((char, idx) => (
          <input
            maxLength={1}
            style={{
              width: 70,
              height: 70,
              textAlign: "center",
              border: "none",
              outline: "none",
              boxShadow: "0px 0px 3px #333",
              fontSize: 40,
            }}
            label=" "
            key={idx}
            value={char}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              inputChar(e.target.value.toLowerCase(), idx);

              //Focus next input
              const form = e.target.form;
              if (form.elements[idx + 1]) {
                form.elements[idx + 1].focus();
              }
              e.preventDefault();
            }}
          />
        ))}
      </form>
      <RenderList />
    </Container>
  );
}
