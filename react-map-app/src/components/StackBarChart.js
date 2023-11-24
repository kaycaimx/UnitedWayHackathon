import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryLegend,
  VictoryGroup,
} from "victory";
import { useState } from "react";

const organizationProductData = [
  {
    year: "2019",
    distributed: {
      Pads: 85672,
      Tampons: 84767,
      Liners: 48993,
      ReusablePads: 131,
      MenstrualCups: 151,
      Diapers: 3043,
    },
    request: {
      Pads: 143,
      Tampons: 127,
      Liners: 129,
      ReusablePads: 138,
      MenstrualCups: 67,
      Diapers: 0,
    },
    donation: {
      Pads: 0,
      Tampons: 0,
      Liners: 0,
      ReusablePads: 0,
      MenstrualCups: 0,
      Diapers: 0,
    },
  },
  {
    year: "2020",
    distributed: {
      Pads: 423256,
      Tampons: 793776,
      Liners: 4445,
      ReusablePads: 825,
      MenstrualCups: 34,
      Diapers: 0,
    },
    request: {
      Pads: 15663,
      Tampons: 19729,
      Liners: 16316,
      ReusablePads: 4341,
      MenstrualCups: 1726,
      Diapers: 0,
    },
    donation: {
      Pads: 183131,
      Tampons: 258950,
      Liners: 9102,
      ReusablePads: 883,
      MenstrualCups: 283,
      Diapers: 0,
    },
  },
  {
    year: "2021",
    distributed: {
      Pads: 391631,
      Tampons: 141641,
      Liners: 45170,
      ReusablePads: 210,
      MenstrualCups: 1113,
      Diapers: 0,
    },
    request: {
      Pads: 64500,
      Tampons: 32000,
      Liners: 57000,
      ReusablePads: 61000,
      MenstrualCups: 31500,
      Diapers: 0,
    },
    donation: {
      Pads: 314137,
      Tampons: 134229,
      Liners: 40513,
      ReusablePads: 152,
      MenstrualCups: 864,
      Diapers: 0,
    },
  },
  {
    year: "2022",
    distributed: {
      Pads: 244856,
      Tampons: 85445,
      Liners: 13614,
      ReusablePads: 0,
      MenstrualCups: 0,
      Diapers: 0,
    },
    request: {
      Pads: 106250,
      Tampons: 116000,
      Liners: 94250,
      ReusablePads: 645,
      MenstrualCups: 1225,
      Diapers: 0,
    },
    donation: {
      Pads: 15362,
      Tampons: 8659,
      Liners: 4449,
      ReusablePads: 0,
      MenstrualCups: 4,
      Diapers: 0,
    },
  },
];

export default function StackBarChart() {
  const [selectedOption, setSelectedOption] = useState("distributed-request");

  const getTitle = () => {
    switch (selectedOption) {
      case "distributed-request":
        return "Menstrual Products Distributed & Request from 2019-2022";
      case "request-donation":
        return "Menstrual Products Request & Donation from 2019-2022";
      case "distributed-donation":
        return "Menstrual Products Distributed & Donation from 2019-2022";
      default:
        return "Menstrual Products";
    }
  };

  const renderStackedBars = (type) => {
    return (
      <VictoryStack
        colorScale={[
          "#FC6238",
          "#FFD872",
          "#F2D4CC",
          "#6C88C4",
          "#00B0BA",
          "#0065A2",
        ]}
      >
        {Object.keys(organizationProductData[0][type]).map((product) => (
          <VictoryBar
            key={product}
            data={organizationProductData}
            x="year"
            y={(d) => d[type][product]}
          />
        ))}
      </VictoryStack>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="distributed-request">Distributed & Request</option>
        <option value="request-donation">Request & Donation</option>
        <option value="distributed-donation">Distributed & Donation</option>
      </select>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{getTitle()}</h1>
      </div>
      <div style={{ width: "80%" }}>
        <VictoryChart
          domainPadding={30}
          padding={{ top: 50, bottom: 50, left: 50, right: 50 }}
        >
          <VictoryLegend
            x={70}
            y={0}
            title="Menstrual Products Type"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{
              border: { stroke: "black" },
              title: { fontSize: 8, fontWeight: "bold" },
              labels: { fontSize: 8 },
            }}
            data={[
              { name: "Pads", symbol: { fill: "#FC6238" } },
              { name: "Tampons", symbol: { fill: "#FFD872" } },
              { name: "Liners", symbol: { fill: "#F2D4CC" } },
              { name: "ReusablePads", symbol: { fill: "#6C88C4" } },
              { name: "MenstrualCups", symbol: { fill: "#00B0BA" } },
              { name: "Diapers", symbol: { fill: "#0065A2" } },
            ]}
          />
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["2019", "2020", "2021", "2022"]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}k`} />
          <VictoryGroup offset={25}>
            {selectedOption.includes("distributed") &&
              renderStackedBars("distributed")}
            {selectedOption.includes("request") && renderStackedBars("request")}
            {selectedOption.includes("donation") &&
              renderStackedBars("donation")}
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
}
