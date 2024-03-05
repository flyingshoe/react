import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import EditableNode from "src/pages/reactFlow/customNodes/editableNode";

const initialNodes = [
  {
    id: "1",
    position: { x: 150, y: 50 },
    data: { label: "React" },
    type: "editableNode",
  },
  {
    id: "2",
    position: { x: 50, y: 150 },
    data: { label: "Svelte" },
    type: "editableNode",
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    // type: "step"
  },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { editableNode: EditableNode };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const handleTypeRef = useRef(null);

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);

  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId, handleType }) => {
    handleTypeRef.current = handleType;
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current || edgeUpdateInProgress.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = Date.now().toString();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `` },
          origin: [0.5, 0.0],
          type: "editableNode",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source:
              handleTypeRef.current === "source"
                ? connectingNodeId.current
                : id,
            target:
              handleTypeRef.current === "source"
                ? id
                : connectingNodeId.current,
            // type: "step",
          })
        );
      }
    },
    [screenToFlowPosition]
  );

  const edgeUpdateSuccessful = useRef(true);
  const edgeUpdateInProgress = useRef(false);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
    edgeUpdateInProgress.current = true;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
    edgeUpdateInProgress.current = false;
  }, []);

  return (
    <div className="w-full h-full bg-blue-50" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        nodeTypes={nodeTypes}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
      >
        {/* <Background /> */}
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function FlowProvider() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}