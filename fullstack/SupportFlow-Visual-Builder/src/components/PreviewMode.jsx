import React, { useState } from "react";

export default function PreviewMode({ nodes, onClose }) {
  const nodeMap = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  const startNode = nodes.find((n) => n.type === "start");
  const [currentNode, setCurrentNode] = useState(startNode);
  const [history, setHistory] = useState([]);

  function handleOption(nextId) {
    setHistory([...history, currentNode]);
    setCurrentNode(nodeMap[nextId]);
  }

  function handleRestart() {
    setCurrentNode(startNode);
    setHistory([]);
  }

  function handleBack() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentNode(prev);
  }

  if (!currentNode) return null;

  return (
    <div className="preview-overlay">
      <div className="preview-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Preview Mode</h3>
          <button className="close-preview" onClick={onClose}>
            Close
          </button>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              color: "#5a5f7a",
              cursor: "pointer",
              fontSize: 12,
              textAlign: "left",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            Back
          </button>
        )}

        <div
          style={{
            fontSize: 11,
            color: "#5a5f7a",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {currentNode.type === "start"
            ? "Start"
            : currentNode.type === "end"
            ? "End"
            : "Question"}
        </div>

        <p className="preview-question">{currentNode.text}</p>

        {currentNode.type === "end" ? (
          <>
            <p className="preview-end">
              Conversation complete
            </p>
            <button className="restart-btn" onClick={handleRestart}>
              Restart
            </button>
          </>
        ) : (
          <div className="preview-options">
            {currentNode.options.map((opt, i) => (
              <button
                key={i}
                className="preview-option"
                onClick={() => handleOption(opt.nextId)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
