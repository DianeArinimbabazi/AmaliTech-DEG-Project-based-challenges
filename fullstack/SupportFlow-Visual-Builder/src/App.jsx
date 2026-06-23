import React, { useState } from "react";
import flowData from "./data/flow_data.json";
import Node from "./components/Node";
import Connectors from "./components/Connectors";
import EditPanel from "./components/EditPanel";
import PreviewMode from "./components/PreviewMode";
import "./App.css";

export default function App() {
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedNode, setSelectedNode] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  function handleNodeClick(node) {
    setSelectedNode(node);
  }

  function handleSave(updatedNode) {
    setNodes(nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
    setSelectedNode(updatedNode);
  }

  function handleDrag(id, newPosition) {
    setNodes(nodes.map((n) =>
      n.id === id ? { ...n, position: newPosition } : n
    ));
  }

  function handleAddNode() {
    const newNode = {
      id: String(Date.now()),
      type: "question",
      text: "New question",
      position: { x: 500, y: 400 },
      options: [],
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
  }

  function handleCanvasClick() {
    setSelectedNode(null);
  }

  return (
    <div className="app">
      <div className="toolbar">
        <span className="toolbar-title">SupportFlow Visual Builder</span>
        <button className="btn" onClick={handleAddNode}>
          + Add Node
        </button>
        <button className="btn primary" onClick={() => setPreviewOpen(true)}>
          Play Preview
        </button>
      </div>

      <div className="main">
        <div className="canvas-wrapper" onClick={handleCanvasClick}>
          <div className="canvas">
            <Connectors nodes={nodes} />
            {nodes.map((node) => (
              <Node
                key={node.id}
                node={node}
                isSelected={selectedNode?.id === node.id}
                onClick={handleNodeClick}
                onDrag={handleDrag}
              />
            ))}
          </div>
        </div>

        <EditPanel node={selectedNode} onSave={handleSave} />
      </div>

      {previewOpen && (
        <PreviewMode
          nodes={nodes}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}
