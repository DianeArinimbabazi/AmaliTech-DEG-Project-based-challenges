import React from "react";

const typeColors = {
  start: "#4f6ef7",
  question: "#9ba0be",
  end: "#3ab87a",
};

const typeLabels = {
  start: "Start",
  question: "Question",
  end: "End",
};

export default function Node({ node, isSelected, onClick }) {
  const color = typeColors[node.type] || "#9ba0be";

  return (
    <div
      onClick={() => onClick(node)}
      style={{
        position: "absolute",
        left: node.position.x,
        top: node.position.y,
        width: 180,
        background: "#161820",
        border: `1.5px solid ${isSelected ? "#4f6ef7" : "#2a2d3a"}`,
        borderRadius: 10,
        padding: "12px 14px",
        cursor: "pointer",
        boxShadow: isSelected ? "0 0 0 3px #1a1f35" : "none",
        transition: "border-color 0.15s",
        zIndex: isSelected ? 2 : 1,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color,
          marginBottom: 6,
        }}
      >
        {typeLabels[node.type]}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#e2e4ef",
          lineHeight: 1.45,
          marginBottom: node.options.length > 0 ? 10 : 0,
        }}
      >
        {node.text}
      </div>
      {node.options.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {node.options.map((opt, i) => (
            <div
              key={i}
              style={{
                background: "#1e2130",
                borderRadius: 4,
                padding: "4px 8px",
                fontSize: 11,
                color: "#9ba0be",
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
