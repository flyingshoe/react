import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "React" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Svelte" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Diagram() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}
