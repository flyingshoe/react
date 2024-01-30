import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Button } from "react-bootstrap";

export default function Covid() {
  const [covidData, setCovidData] = useState([
    {
      infected: 57784,
      lastUpdatedAtApify: "2020-10-01T14:45:00.000Z",
    },
    {
      infected: 57794,
      lastUpdatedAtApify: "2020-10-02T14:40:00.000Z",
    },
  ]);
  const [showLoader, setLoader] = useState(true);
  const [curData, setCurData] = useState("infected");

  useEffect(() => {
    refineGraph(covidData);
    fetch(
      "https://api.apify.com/v2/datasets/suHgi59tSfu02VsRO/items?format=json&clean=1&fields=infected,lastUpdatedAtApify"
    )
      .then((data) => data.json())
      .then((json) => {
        setCovidData(json);
        refineGraph(json);
        //Hide Loader
        setLoader(false);
      });
    // eslint-disable-next-line
  }, []);

  const refineGraph = (covidData) => {
    //Make a copy of covidData
    var newData = [...covidData];

    //Add formatted date string
    let lastCase = 0;
    newData = newData.map((data, index) => {
      //Create a new Date Object
      const d = new Date(data.lastUpdatedAtApify.replace(/Z$/, ""));
      let day = d.toLocaleString("en", { day: "2-digit" });
      let month = d.toLocaleString("en", { month: "2-digit" });
      let monthStr = d.toLocaleString("en", { month: "short" });
      let year = d.toLocaleString("en", { year: "numeric" });

      //Get new cases - cases today minus cases yesterday
      let newCases =
        index > 0 ? data.infected - newData[index - 1].infected : 0;

      //Check for abnormal Data and replace it with "lastCase"
      newCases < 1 ? (newCases = lastCase) : (lastCase = newCases);

      return {
        ...data,
        day: day,
        month: month,
        monthStr: monthStr,
        year: year,
        dayMonth: `${day}-${monthStr}`,
        dayNum: parseInt(d.toLocaleString("en", { day: "numeric" })),
        monthNum: parseInt(d.toLocaleString("en", { month: "numeric" })),
        newCases: newCases,
      };
    });

    //Clean up the Data
    //17th to 29th May is problematic, remove it. Also remove extreme values like >10k cases
    newData = newData.filter(
      (data) =>
        (data.dayNum < 17 || data.dayNum > 29 || data.monthNum !== 5) &&
        data.newCases <= 10000
    );

    //Remove duplicated items by DATE
    let uniqueVals = [];
    newData = newData.filter((data) => {
      if (!uniqueVals.includes(data.dayMonth) && data.infected != null) {
        uniqueVals.push(data.dayMonth);
        return data;
      }
      return null;
    });

    //Save Data
    setCovidData(newData);
  };

  const renderBarChart = (
    <BarChart data={covidData}>
      <Bar dataKey={curData} stroke="var(--bs-teal)" fill="var(--bs-teal)" />
      <XAxis stroke="var(--bs-gray-dark)" dataKey="dayMonth" />
      <YAxis stroke="var(--bs-gray-dark)" />
      <Tooltip cursor={true} />
    </BarChart>
  );
  return (
    <Container>
      <div
        style={{
          height: "200px",
          width: "200px",
          border: "6px solid var(--bs-teal)",
          borderRadius: "50%",
          margin: "50px auto",
          userSelect: "none",
        }}
      >
        <div
          style={{
            textAlign: "center",
            transform: "translateY(5%)",
            fontWeight: "bold",
            color: "var(--bs-teal)",
          }}
        >
          <div style={{ fontSize: "80px" }}>
            {covidData[covidData.length - 1].newCases}
          </div>
          <div style={{ fontSize: "20px" }}>NEW CASES</div>
        </div>
      </div>
      {showLoader && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <CircularProgress size={30} style={{ color: "var(--bs-teal)" }} />
          <h1 style={{ verticalAlign: "middle", color: "var(--bs-teal)" }}>
            Loading Latest Data
          </h1>
        </div>
      )}
      <h3
        style={{
          textAlign: "center",
          color: "var(--bs-info)",
          marginTop: "25px",
        }}
      >
        Last Updated: {covidData[covidData.length - 1].day}{" "}
        {covidData[covidData.length - 1].monthStr}{" "}
        {covidData[covidData.length - 1].year}
      </h3>

      {!showLoader && (
        <div style={{ margin: "60px 0" }}>
          <div
            style={{
              color: "var(--bs-teal)",
              textAlign: "center",
              fontSize: "40px",
            }}
          >
            {curData === "infected" ? "Total Cases" : "New Daily Cases"}
          </div>
          <ResponsiveContainer width="100%" aspect={2.5}>
            {renderBarChart}
          </ResponsiveContainer>
          <div style={{ marginTop: "25px" }}></div>
          <Button
            active={curData === "infected" ? true : false}
            variant="outline-info"
            onClick={(x) => {
              setCurData("infected");
              x.currentTarget.blur();
              //Work around to reanimate graph
              setCovidData([...covidData]);
            }}
          >
            Total Cases
          </Button>
          <Button
            active={curData !== "infected" ? true : false}
            variant="outline-info"
            onClick={(x) => {
              setCurData("newCases");
              x.currentTarget.blur();
              //Work around to reanimate graph
              setCovidData([...covidData]);
            }}
          >
            New Daily Cases
          </Button>
        </div>
      )}
    </Container>
  );
}
