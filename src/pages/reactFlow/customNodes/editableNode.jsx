import { useCallback, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";

function TextUpdaterNode({ data: { label }, isConnectable }) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  const textFieldRef = useRef(null);
  useEffect(() => {
    textFieldRef.current.value = label;
  }, []);

  return (
    <div className="text-updater-node">
      <div>
        <input
          ref={textFieldRef}
          name="text"
          //   onChange={onChange}
          className="p-2 w-44 text-center border-2 rounded border-purple-700"
        />
      </div>

      {/* Connectors */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
