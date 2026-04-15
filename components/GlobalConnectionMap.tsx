"use client";

import { useState } from "react";

import type { Messages } from "@/messages/en";

type TooltipSide = "top" | "left" | "right" | "bottom";

type ConnectionNode = {
  name: string;
  label: string;
  x: number;
  y: number;
  tooltipSide: TooltipSide;
};

const MAP_WIDTH = 1536;
const MAP_HEIGHT = 1024;

// Keep the Morocco anchor and destinations together so future additions
// can be made by extending this single list.
const moroccoPoint = { x: 755, y: 465 };

const connectionNodeConfigs = [
  { x: 765, y: 430, tooltipSide: "top" },
  { x: 790, y: 410, tooltipSide: "top" },
  { x: 795, y: 390, tooltipSide: "top" },
  { x: 810, y: 380, tooltipSide: "top" },
  { x: 830, y: 380, tooltipSide: "top" },
  { x: 817, y: 400, tooltipSide: "right" },
  { x: 850, y: 370, tooltipSide: "right" },
  { x: 785, y: 456, tooltipSide: "bottom" },
  { x: 820, y: 460, tooltipSide: "bottom" },
  { x: 900, y: 490, tooltipSide: "right" },
  { x: 920, y: 465, tooltipSide: "right" },
  { x: 500, y: 428, tooltipSide: "right" },
  { x: 975, y: 700, tooltipSide: "left" },
] as const satisfies Array<Pick<ConnectionNode, "x" | "y" | "tooltipSide">>;

const tooltipPositionOffsets: Record<TooltipSide, { x: number; y: number }> = {
  top: { x: -102, y: -80 },
  left: { x: -214, y: -25 },
  right: { x: 18, y: -25 },
  bottom: { x: -102, y: 28 },
};

function connectionPath(target: ConnectionNode) {
  const deltaX = target.x - moroccoPoint.x;
  const deltaY = target.y - moroccoPoint.y;
  const controlX = moroccoPoint.x + deltaX * 0.48;
  const controlY =
    Math.min(moroccoPoint.y, target.y) -
    Math.max(82, Math.abs(deltaX) * 0.11 + Math.abs(deltaY) * 0.2);

  return `M ${moroccoPoint.x} ${moroccoPoint.y} Q ${controlX} ${controlY} ${target.x} ${target.y}`;
}

function tooltipTransform(node: ConnectionNode) {
  const offset = tooltipPositionOffsets[node.tooltipSide];
  return `translate(${node.x + offset.x} ${node.y + offset.y})`;
}

export default function GlobalConnectionMap({
  copy,
  isRtl = false,
}: {
  copy: Messages["globalMovement"];
  isRtl?: boolean;
}) {
  const connectionNodes: ConnectionNode[] = connectionNodeConfigs.map(
    (node, index) => ({
      ...node,
      ...copy.nodes[index],
    }),
  );
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const nodeLabelLetterSpacing = isRtl ? "0.02em" : "0.14em";
  const moroccoLabelWidth = isRtl ? 258 : 230;
  const moroccoLabelX = moroccoLabelWidth / 2 - 35;
  const tooltipWidth = isRtl ? 236 : 196;
  const tooltipTextX = isRtl ? tooltipWidth - 14 : 14;
  const tooltipTextAnchor = isRtl ? "end" : "start";

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-label={copy.mapAriaLabel}
    >
      <g aria-hidden="true">
        {connectionNodes.map((node, index) => {
          const isActive = activeNode === node.name;

          return (
            <g key={`path-${node.name}`}>
              <path
                d={connectionPath(node)}
                fill="none"
                stroke={isActive ? "rgba(108,139,160,0.36)" : "rgba(108,139,160,0.18)"}
                strokeWidth={isActive ? "4.4" : "3.2"}
                strokeLinecap="round"
              />
              <path
                d={connectionPath(node)}
                fill="none"
                stroke={isActive ? "rgba(139,174,197,0.82)" : "rgba(139,174,197,0.46)"}
                strokeWidth={isActive ? "4.4" : "3.2"}
                strokeLinecap="round"
                strokeDasharray="8 18"
                className="connection-flow"
                style={{ animationDuration: `${8.5 + index * 0.9}s` }}
              />
            </g>
          );
        })}
      </g>

      <g aria-hidden="true">
        <circle
          cx={moroccoPoint.x}
          cy={moroccoPoint.y}
          r="44"
          fill="rgba(242,198,140,0.2)"
        />
        <circle
          cx={moroccoPoint.x}
          cy={moroccoPoint.y}
          r="9"
          fill="#6C8BA0"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="3"
        />
        <g transform={`translate(${moroccoPoint.x - 82} ${moroccoPoint.y + 34})`}>
          <rect
            x="-35"
            y="15"
            width={moroccoLabelWidth}
            height="42"
            rx="15"
            fill="rgba(255,255,255,0.9)"
            stroke="rgba(255,255,255,0.85)"
          />
          <text
            x={moroccoLabelX}
            y="41"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            letterSpacing={isRtl ? "0.04em" : "0.18em"}
            fill="#6C8BA0"
            style={{ textTransform: isRtl ? "none" : "uppercase" }}
          >
            {isRtl ? copy.moroccoLabel : copy.moroccoLabel.toUpperCase()}
          </text>
        </g>
      </g>

      {connectionNodes.map((node) => {
        const isActive = activeNode === node.name;

        return (
          <g
            key={node.name}
            role="button"
            tabIndex={0}
            onClick={() =>
              setActiveNode((currentNode) =>
                currentNode === node.name ? null : node.name,
              )
            }
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveNode((currentNode) =>
                  currentNode === node.name ? null : node.name,
                );
              }
            }}
            onMouseEnter={() => setActiveNode(node.name)}
            onMouseLeave={() => setActiveNode(null)}
            onFocus={() => setActiveNode(node.name)}
            onBlur={() => setActiveNode(null)}
            aria-label={`${node.name} - ${node.label}`}
            className="cursor-pointer"
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={isActive ? 10 : 8}
              fill={isActive ? "#6C8BA0" : "#7E9CB2"}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="3"
            />

            {isActive ? (
              <g transform={tooltipTransform(node)} pointerEvents="none">
                <rect
                  x="0"
                  y="0"
                  width={tooltipWidth}
                  height="52"
                  rx="16"
                  fill="rgba(255,255,255,0.92)"
                  stroke="rgba(255,255,255,0.76)"
                />
                <text
                  x={tooltipTextX}
                  y="21"
                  fontSize="13"
                  fontWeight="700"
                  textAnchor={tooltipTextAnchor}
                  fill="#2A2A2A"
                >
                  {node.name}
                </text>
                <text
                  x={tooltipTextX}
                  y="38"
                  fontSize="10"
                  fontWeight="600"
                  letterSpacing={nodeLabelLetterSpacing}
                  textAnchor={tooltipTextAnchor}
                  fill="rgba(108,139,160,0.88)"
                >
                  {isRtl ? node.label : node.label.toUpperCase()}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
