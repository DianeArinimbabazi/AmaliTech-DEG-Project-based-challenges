import React from "react";

const NODE_WIDTH = 180;
const NODE_HEIGHT_BASE = 80;

function getNodeCenter(node) {
  const optionsHeight = node.options.length * 28;
  const height = NODE_HEIGHT_BASE + optionsHeight;
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + height / 2,
    bottom: node.position.y + height,
    top: node.position.y,
  };
}

export default function Connectors({ nodes }) {
  const nodeMap = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  const connections = [];
  nodes.forEach((node) => {
    node.options.forEach((opt) => {
      if (nodeMap[opt.nextId]) {
        connections.push({
          from: node,
          to: nodeMap[opt.nextId],
          label: opt.label,
        });
      }
    });
  });

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="#4f6ef7" />
        </marker>
      </defs>
      {connections.map((conn, i) => {
        const from = getNodeCenter(conn.from);
        const to = getNodeCenter(conn.to);

        const x1 = from.x;
        const y1 = from.bottom;
        const x2 = to.x;
        const y2 = to.top;

        const cy1 = y1 + (y2 - y1) * 0.5;
        const cy2 = y2 - (y2 - y1) * 0.5;

        const path = `M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`;

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        return (
          <g key={i}>
            <path
              d={path}
              stroke="#4f6ef7"
              strokeWidth="1.5"
              fill="none"
              strokeOpacity="0.5"
              markerEnd="url(#arrowhead)"
            />
            <rect
              x={midX - 40}
              y={midY - 10}
              width={80}
              height={20}
              rx={4}
              fill="#1e2130"
              stroke="#2a2d3a"
              strokeWidth="0.5"
            />
            <text
              x={midX}
              y={midY + 4}
              textAnchor="middle"
              fontSize="10"
              fill="#9ba0be"
            >
              {conn.label.length > 12
                ? conn.label.slice(0, 12) + "..."
                : conn.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
