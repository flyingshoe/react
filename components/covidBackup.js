import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./loadScreen.css";
import { Container, Button } from "react-bootstrap";

export default function Covid() {
  /* const [covidData, setCovidData] = useState(require("./covid.json")); */
  const [covidData, setCovidData] = useState([
    {
      infected: 57784,
      discharged: 57512,
      inCommunityFacilites: 201,
      stableHospitalized: 44,
      criticalHospitalized: 0,
      activeCases: 245,
      deceased: 27,
      recovered: 57512,
      lastUpdatedAtApify: "2020-10-01T14:45:00.000Z",
    },
    {
      infected: 57794,
      discharged: 57534,
      inCommunityFacilites: 185,
      stableHospitalized: 48,
      criticalHospitalized: 0,
      activeCases: 233,
      deceased: 27,
      recovered: 57534,
      lastUpdatedAtApify: "2020-10-02T14:40:00.000Z",
    },
  ]);
  const [showLoader, setLoader] = useState(true);
  const [curData, setCurData] = useState("infected");
  useEffect(() => {
    refineGraph(covidData);
    fetch(
      "https://api.apify.com/v2/datasets/suHgi59tSfu02VsRO/items?format=json&clean=1"
    )
      .then((data) => data.json())
      .then((json) => {
        setCovidData(json);
        refineGraph(json);
        //Hide Loader
        setLoader(false);
      });
  }, []);

  const refineGraph = (covidData) => {
    //Make a copy of covidData
    var newData = [...covidData];

    //Add formatted date string
    let lastCase = 0;
    newData = newData.map((data, index) => {
      let dateFixed = data.lastUpdatedAtApify.split("T")[0];
      let day = dateFixed.split("-")[2];
      let month = dateFixed.split("-")[1];
      let monthStr = "";
      switch (month) {
        case "01":
          monthStr = "Jan";
          break;
        case "02":
          monthStr = "Feb";
          break;
        case "03":
          monthStr = "Mar";
          break;
        case "04":
          monthStr = "Apr";
          break;
        case "05":
          monthStr = "May";
          break;
        case "06":
          monthStr = "Jun";
          break;
        case "07":
          monthStr = "Jul";
          break;
        case "08":
          monthStr = "Aug";
          break;
        case "09":
          monthStr = "Sep";
          break;
        case "10":
          monthStr = "Oct";
          break;
        case "11":
          monthStr = "Nov";
          break;
        case "12":
          monthStr = "Dec";
      }
      let year = dateFixed.split("-")[0];
      let dayMonth = `${dateFixed.split("-")[2]}/${dateFixed.split("-")[1]}`;

      //Get new cases - cases today minus cases yesterday
      let newCases =
        index > 0 ? data.infected - newData[index - 1].infected : 0;

      //Check for abnormal Data and replace it with "lastCase"
      newCases < 1 ? (newCases = lastCase) : (lastCase = newCases);

      return {
        ...data,
        date: dateFixed,
        day: day,
        month: month,
        monthStr: monthStr,
        year: year,
        dayMonth: dayMonth,
        newCases: newCases,
      };
    });

    //Clean up the Data
    //Show only months from June
    //newData = newData.filter((data) => data.month >= 6);

    //17th to 28th May is problematic, remove it
    newData = newData.filter((data) => {
      if (
        ((parseInt(data.day.replace(/^0/, "")) < 17 ||
          parseInt(data.day.replace(/^0/, "")) > 28) &&
          parseInt(data.month.replace(/^0/, "")) == 5) ||
        parseInt(data.month.replace(/^0/, "")) != 5
      ) {
        return data;
      }
    });

    //Remove extreme values like >=10k cases
    newData = newData.filter((data) => data.newCases <= 10000);

    //Remove duplicated items by DATE
    let uniqueVals = [];
    newData = newData.filter((data) => {
      if (!uniqueVals.includes(data.date) && data.infected != null) {
        uniqueVals.push(data.date);
        return data;
      }
    });

    //Save Data
    setCovidData(newData);
  };

  const renderBarChart = (
    <BarChart data={covidData} barGap={0}>
      <Bar dataKey={curData} stroke="var(--bs-teal)" fill="var(--bs-teal)" />
      <XAxis stroke="var(--bs-gray-dark)" dataKey="dayMonth" />
      <YAxis stroke="var(--bs-gray-dark)" />
      <Tooltip />
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
        <h1 style={{ textAlign: "center" }}>
          <div
            className="loader"
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              height: "50px",
              width: "50px",
              borderColor: "var(--bs-teal)",
            }}
          ></div>
          <span style={{ verticalAlign: "middle", color: "var(--bs-teal)" }}>
            {" "}
            Loading New Data{" "}
          </span>
        </h1>
      )}
      <h1
        style={{
          textAlign: "center",
          color: "var(--bs-info)",
          marginTop: "25px",
        }}
      >
        Last Updated: {covidData[covidData.length - 1].day}{" "}
        {covidData[covidData.length - 1].monthStr}{" "}
        {covidData[covidData.length - 1].year}
      </h1>

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
