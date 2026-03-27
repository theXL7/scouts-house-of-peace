"use client";

import { useState } from "react";

type ConnectionNode = {
  name: string;
  label: string;
  x: number;
  y: number;
  tooltipSide: "top" | "left" | "right";
};

const VIEWBOX_WIDTH = 760;
const VIEWBOX_HEIGHT = 560;

const moroccoPoint = { x: 382, y: 306 };

const connectionNodes: ConnectionNode[] = [
  { name: "Spain", label: "Cultural Exchange", x: 306, y: 228, tooltipSide: "top" },
  { name: "France", label: "Youth Exchange", x: 378, y: 186, tooltipSide: "top" },
  { name: "Belgium", label: "Community Link", x: 448, y: 176, tooltipSide: "left" },
  { name: "Netherlands", label: "Shared Programs", x: 512, y: 188, tooltipSide: "left" },
  { name: "Germany", label: "Learning Network", x: 572, y: 236, tooltipSide: "left" },
  { name: "Switzerland", label: "Peace Dialogue", x: 470, y: 270, tooltipSide: "left" },
  { name: "USA", label: "Global Friendship", x: 150, y: 280, tooltipSide: "right" },
];

const tooltipPositionClasses: Record<ConnectionNode["tooltipSide"], string> = {
  top: "left-1/2 top-[-0.9rem] -translate-x-1/2 -translate-y-full",
  left: "right-[calc(100%+0.9rem)] top-1/2 -translate-y-1/2",
  right: "left-[calc(100%+0.9rem)] top-1/2 -translate-y-1/2",
};

function connectionPath(target: ConnectionNode) {
  const deltaX = target.x - moroccoPoint.x;
  const deltaY = target.y - moroccoPoint.y;
  const controlX = moroccoPoint.x + deltaX * 0.52;
  const controlY =
    Math.min(moroccoPoint.y, target.y) -
    Math.max(54, Math.abs(deltaX) * 0.22 + Math.abs(deltaY) * 0.14);

  return `M ${moroccoPoint.x} ${moroccoPoint.y} Q ${controlX} ${controlY} ${target.x} ${target.y}`;
}

export default function GlobalConnectionMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[40rem] sm:h-[470px] lg:h-[540px] lg:max-w-none">
      {/* A single soft field keeps the panel immersive without looking like a boxed card. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.94)_0%,rgba(247,243,236,0.78)_36%,rgba(247,243,236,0.28)_62%,transparent_84%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_30%,rgba(18,59,109,0.1),transparent_24%),radial-gradient(circle_at_78%_30%,rgba(18,59,109,0.08),transparent_22%),radial-gradient(circle_at_50%_82%,rgba(184,138,74,0.14),transparent_28%)] blur-3xl" />
      <div className="absolute inset-x-[9%] inset-y-[11%] rounded-[999px] bg-[radial-gradient(circle,rgba(255,255,255,0.52),rgba(255,255,255,0)_72%)]" />

      <div className="relative h-full">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* These organic shapes gently suggest geography without turning the panel into a literal map. */}
          <ellipse
            cx="214"
            cy="276"
            rx="170"
            ry="104"
            fill="rgba(18,59,109,0.035)"
          />
          <ellipse
            cx="542"
            cy="242"
            rx="188"
            ry="116"
            fill="rgba(18,59,109,0.03)"
          />
          <ellipse
            cx="390"
            cy="404"
            rx="224"
            ry="110"
            fill="rgba(184,138,74,0.06)"
          />

          {connectionNodes.map((node, index) => {
            const isActive = activeNode === node.name;

            return (
              <g key={node.name}>
                <path
                  d={connectionPath(node)}
                  fill="none"
                  stroke={isActive ? "rgba(18,59,109,0.34)" : "rgba(18,59,109,0.12)"}
                  strokeWidth={isActive ? "1.8" : "1.15"}
                  strokeLinecap="round"
                />
                <path
                  d={connectionPath(node)}
                  fill="none"
                  stroke={isActive ? "rgba(18,59,109,0.52)" : "rgba(18,59,109,0.18)"}
                  strokeWidth={isActive ? "1.9" : "1.15"}
                  strokeLinecap="round"
                  strokeDasharray="4 14"
                  className="connection-flow"
                  style={{ animationDuration: `${12 + index * 1.4}s` }}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute inset-0">
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(moroccoPoint.x / VIEWBOX_WIDTH) * 100}%`,
              top: `${(moroccoPoint.y / VIEWBOX_HEIGHT) * 100}%`,
            }}
          >
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#123B6D]/12 blur-xl" />
            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#123B6D]/12" />
            <div className="relative h-4.5 w-4.5 rounded-full border border-white/80 bg-[#123B6D] shadow-[0_0_0_8px_rgba(18,59,109,0.08)]" />
            <div className="mt-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/72 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#123B6D]/62 backdrop-blur-sm">
              Morocco
            </div>
          </div>

          {connectionNodes.map((node) => {
            const isActive = activeNode === node.name;

            return (
              <button
                key={node.name}
                type="button"
                onMouseEnter={() => setActiveNode(node.name)}
                onMouseLeave={() => setActiveNode(null)}
                onFocus={() => setActiveNode(node.name)}
                onBlur={() => setActiveNode(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-3"
                style={{
                  left: `${(node.x / VIEWBOX_WIDTH) * 100}%`,
                  top: `${(node.y / VIEWBOX_HEIGHT) * 100}%`,
                }}
                aria-label={`${node.name} - ${node.label}`}
              >
                <span
                  className={`block h-3.5 w-3.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "border-white/90 bg-[#123B6D] shadow-[0_0_0_7px_rgba(18,59,109,0.12)]"
                      : "border-white/70 bg-[#123B6D]/74 shadow-[0_0_0_5px_rgba(18,59,109,0.06)]"
                  }`}
                />

                {isActive ? (
                  <span
                    className={`pointer-events-none absolute whitespace-nowrap rounded-[14px] border border-[#123B6D]/8 bg-white/88 px-3 py-2 text-left shadow-[0_14px_32px_rgba(18,59,109,0.08)] backdrop-blur-sm ${tooltipPositionClasses[node.tooltipSide]}`}
                  >
                    <span className="block text-[0.72rem] font-semibold text-[#2A2A2A]">
                      {node.name}
                    </span>
                    <span className="mt-1 block text-[0.66rem] uppercase tracking-[0.14em] text-[#123B6D]/56">
                      {node.label}
                    </span>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
