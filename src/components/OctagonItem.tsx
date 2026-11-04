const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import * as __vite__cjsImport0_react from "react";
import { getOctagonPoints } from "../utils/octagon.ts";
var _jsxFileName = "/app/applet/src/components/OctagonItem.tsx";
import * as __vite__cjsImport2_react_jsxDevRuntime from "react/jsx-dev-runtime";
export const OctagonItem = ({ cell, radius, isSelected, isHovered, onMouseEnter, onMouseLeave, onClick, onContextMenu }) => {
	const points = getOctagonPoints(cell.cx, cell.cy, radius);
	// Fill resolution
	let fill = cell.fillColor || "#10b981";
	if (cell.isGradient) {
		fill = `url(#grad-oct-${cell.id})`;
	} else if (cell.type === "striped") {
		fill = `url(#pattern-striped-${cell.id})`;
	}
	// Base opacity based on type
	let fillOpacity = cell.opacity ?? .85;
	if (cell.type === "transparent") {
		fillOpacity = cell.opacity ?? .45;
	} else if (cell.type === "striped") {
		fillOpacity = .95;
	} else if (cell.type === "alert_red") {
		fill = "#dc2626";
		fillOpacity = .9;
	} else if (cell.type === "mystery_white") {
		fill = "#f8fafc";
		fillOpacity = .92;
	}
	// Stroke color
	const baseStroke = isSelected ? "#38bdf8" : cell.isKeyLocation ? cell.fillColor || "#10b981" : cell.type === "alert_red" ? "#f87171" : "#1e293b";
	const strokeWidth = isSelected ? 3.5 : cell.isKeyLocation ? 2.5 : 1;
	// Arrow rotation for trade_arrow
	const arrowAngle = cell.arrowDirection ?? 90;
	return /* @__PURE__ */ _jsxDEV("g", {
		className: `cursor-pointer transition-transform duration-150 ${cell.isKeyLocation ? "group" : ""}`,
		onMouseEnter,
		onMouseLeave,
		onClick,
		onContextMenu,
		style: { 
		// CSS variable passed to animate-pulse-glow keyframe
["--pulse-color"]: cell.fillColor || "#22c55e" },
		children: [
			cell.type === "striped" && /* @__PURE__ */ _jsxDEV("polygon", {
				points,
				fill: cell.fillColor || "#8b5cf6",
				fillOpacity: .25
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("polygon", {
				points,
				fill,
				fillOpacity,
				stroke: baseStroke,
				strokeWidth,
				className: cell.isKeyLocation ? "animate-pulse-glow" : undefined
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 7
			}, this),
			cell.isKeyLocation && /* @__PURE__ */ _jsxDEV("polygon", {
				points: getOctagonPoints(cell.cx, cell.cy, radius + 4),
				fill: "none",
				stroke: cell.fillColor || "#22c55e",
				strokeWidth: 1.5,
				strokeDasharray: "4 3",
				className: "animate-pulse-glow opacity-80"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 9
			}, this),
			isHovered && !isSelected && /* @__PURE__ */ _jsxDEV("polygon", {
				points: getOctagonPoints(cell.cx, cell.cy, radius + 2),
				fill: "none",
				stroke: "#f8fafc",
				strokeWidth: 2,
				strokeDasharray: "2 2",
				opacity: .9
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 9
			}, this),
			isSelected && /* @__PURE__ */ _jsxDEV("polygon", {
				points: getOctagonPoints(cell.cx, cell.cy, radius + 3),
				fill: "none",
				stroke: "#38bdf8",
				strokeWidth: 2.5
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 123,
				columnNumber: 9
			}, this),
			cell.type === "alert_red" && /* @__PURE__ */ _jsxDEV("g", {
				transform: `translate(${cell.cx}, ${cell.cy})`,
				pointerEvents: "none",
				children: [/* @__PURE__ */ _jsxDEV("circle", {
					r: radius * .45,
					fill: "#7f1d1d",
					opacity: .6
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("text", {
					x: "0",
					y: radius * .28,
					textAnchor: "middle",
					fill: "#ffffff",
					fontSize: radius * .85,
					fontWeight: "900",
					fontFamily: "Orbitron, sans-serif",
					filter: "drop-shadow(0 0 2px #000)",
					children: "!"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 135,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 9
			}, this),
			cell.type === "mystery_white" && /* @__PURE__ */ _jsxDEV("g", {
				transform: `translate(${cell.cx}, ${cell.cy})`,
				pointerEvents: "none",
				children: [/* @__PURE__ */ _jsxDEV("circle", {
					r: radius * .45,
					fill: "#0f172a",
					opacity: .7
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("text", {
					x: "0",
					y: radius * .28,
					textAnchor: "middle",
					fill: "#38bdf8",
					fontSize: radius * .85,
					fontWeight: "900",
					fontFamily: "Orbitron, sans-serif",
					filter: "drop-shadow(0 0 3px #000)",
					children: "?"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 9
			}, this),
			cell.type === "trade_arrow" && /* @__PURE__ */ _jsxDEV("g", {
				transform: `translate(${cell.cx}, ${cell.cy}) rotate(${arrowAngle})`,
				pointerEvents: "none",
				children: [/* @__PURE__ */ _jsxDEV("line", {
					x1: -radius * .48,
					y1: "0",
					x2: radius * .45,
					y2: "0",
					stroke: "#ffffff",
					strokeWidth: radius * .16,
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("polygon", {
					points: `${radius * .48},0 ${radius * .12},${-radius * .28} ${radius * .22},0 ${radius * .12},${radius * .28}`,
					fill: "#ffffff",
					filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 183,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 169,
				columnNumber: 9
			}, this),
			cell.isKeyLocation && cell.type !== "alert_red" && cell.type !== "mystery_white" && cell.type !== "trade_arrow" && /* @__PURE__ */ _jsxDEV("g", {
				transform: `translate(${cell.cx}, ${cell.cy})`,
				pointerEvents: "none",
				children: [/* @__PURE__ */ _jsxDEV("circle", {
					r: radius * .25,
					fill: "#ffffff",
					opacity: .9
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 197,
					columnNumber: 13
				}, this), /* @__PURE__ */ _jsxDEV("circle", {
					r: radius * .15,
					fill: cell.fillColor || "#10b981",
					className: "animate-pulse"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 198,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 196,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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R0FBRTtLQUNGLEdBQUcsU0FBUztLQUNaLFlBQVc7S0FDWCxNQUFLO0tBQ0wsVUFBVSxTQUFTO0tBQ25CLFlBQVc7S0FDWCxZQUFXO0tBQ1gsUUFBTztlQUNSO0lBRUs7Ozs7WUFDTDs7Ozs7O0dBR0osS0FBSyxTQUFTLGlCQUNiLHdCQUFDLEtBQUQ7SUFDRSxXQUFXLGFBQWEsS0FBSyxHQUFHLElBQUksS0FBSyxHQUFHLFdBQVcsV0FBVztJQUNsRSxlQUFjO2NBRmhCLENBS0Usd0JBQUMsUUFBRDtLQUNFLElBQUksQ0FBQyxTQUFTO0tBQ2QsSUFBRztLQUNILElBQUksU0FBUztLQUNiLElBQUc7S0FDSCxRQUFPO0tBQ1AsYUFBYSxTQUFTO0tBQ3RCLGVBQWM7SUFDZjs7OztjQUNELHdCQUFDLFdBQUQ7S0FDRSxRQUFRLEdBQUcsU0FBUyxJQUFLLEtBQUssU0FBUyxJQUFLLEdBQUcsQ0FBQyxTQUFTLElBQUssR0FBRyxTQUFTLElBQUssS0FBSyxTQUFTLElBQUssR0FBRyxTQUFTO0tBQzlHLE1BQUs7S0FDTCxRQUFPO0lBQ1I7Ozs7WUFDQTs7Ozs7O0dBSUosS0FBSyxpQkFDSixLQUFLLFNBQVMsZUFDZCxLQUFLLFNBQVMsbUJBQ2QsS0FBSyxTQUFTLGlCQUNaLHdCQUFDLEtBQUQ7SUFBRyxXQUFXLGFBQWEsS0FBSyxHQUFHLElBQUksS0FBSyxHQUFHO0lBQUksZUFBYztjQUFqRSxDQUNFLHdCQUFDLFVBQUQ7S0FBUSxHQUFHLFNBQVM7S0FBTSxNQUFLO0tBQVUsU0FBUztJQUFNOzs7O2NBQ3hELHdCQUFDLFVBQUQ7S0FDRSxHQUFHLFNBQVM7S0FDWixNQUFNLEtBQUssYUFBYTtLQUN4QixXQUFVO0lBQ1g7Ozs7WUFDQTs7Ozs7O0VBRU47Ozs7OztBQUVQIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIk9jdGFnb25JdGVtLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgT2N0YWdvbkNlbGwgfSBmcm9tICcuLi90eXBlcy9tYXAnO1xuaW1wb3J0IHsgZ2V0T2N0YWdvblBvaW50cyB9IGZyb20gJy4uL3V0aWxzL29jdGFnb24nO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBjZWxsOiBPY3RhZ29uQ2VsbDtcbiAgcmFkaXVzOiBudW1iZXI7XG4gIGlzU2VsZWN0ZWQ/OiBib29sZWFuO1xuICBpc0hvdmVyZWQ/OiBib29sZWFuO1xuICBvbk1vdXNlRW50ZXI/OiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgb25Nb3VzZUxlYXZlPzogKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIG9uQ2xpY2s/OiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgb25Db250ZXh0TWVudT86IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgT2N0YWdvbkl0ZW06IFJlYWN0LkZDPFByb3BzPiA9ICh7XG4gIGNlbGwsXG4gIHJhZGl1cyxcbiAgaXNTZWxlY3RlZCxcbiAgaXNIb3ZlcmVkLFxuICBvbk1vdXNlRW50ZXIsXG4gIG9uTW91c2VMZWF2ZSxcbiAgb25DbGljayxcbiAgb25Db250ZXh0TWVudSxcbn0pID0+IHtcbiAgY29uc3QgcG9pbnRzID0gZ2V0T2N0YWdvblBvaW50cyhjZWxsLmN4LCBjZWxsLmN5LCByYWRpdXMpO1xuXG4gIC8vIEZpbGwgcmVzb2x1dGlvblxuICBsZXQgZmlsbCA9IGNlbGwuZmlsbENvbG9yIHx8ICcjMTBiOTgxJztcbiAgaWYgKGNlbGwuaXNHcmFkaWVudCkge1xuICAgIGZpbGwgPSBgdXJsKCNncmFkLW9jdC0ke2NlbGwuaWR9KWA7XG4gIH0gZWxzZSBpZiAoY2VsbC50eXBlID09PSAnc3RyaXBlZCcpIHtcbiAgICBmaWxsID0gYHVybCgjcGF0dGVybi1zdHJpcGVkLSR7Y2VsbC5pZH0pYDtcbiAgfVxuXG4gIC8vIEJhc2Ugb3BhY2l0eSBiYXNlZCBvbiB0eXBlXG4gIGxldCBmaWxsT3BhY2l0eSA9IGNlbGwub3BhY2l0eSA/PyAwLjg1O1xuICBpZiAoY2VsbC50eXBlID09PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgZmlsbE9wYWNpdHkgPSBjZWxsLm9wYWNpdHkgPz8gMC40NTtcbiAgfSBlbHNlIGlmIChjZWxsLnR5cGUgPT09ICdzdHJpcGVkJykge1xuICAgIGZpbGxPcGFjaXR5ID0gMC45NTtcbiAgfSBlbHNlIGlmIChjZWxsLnR5cGUgPT09ICdhbGVydF9yZWQnKSB7XG4gICAgZmlsbCA9ICcjZGMyNjI2JztcbiAgICBmaWxsT3BhY2l0eSA9IDAuOTtcbiAgfSBlbHNlIGlmIChjZWxsLnR5cGUgPT09ICdteXN0ZXJ5X3doaXRlJykge1xuICAgIGZpbGwgPSAnI2Y4ZmFmYyc7XG4gICAgZmlsbE9wYWNpdHkgPSAwLjkyO1xuICB9XG5cbiAgLy8gU3Ryb2tlIGNvbG9yXG4gIGNvbnN0IGJhc2VTdHJva2UgPSBpc1NlbGVjdGVkXG4gICAgPyAnIzM4YmRmOCdcbiAgICA6IGNlbGwuaXNLZXlMb2NhdGlvblxuICAgID8gY2VsbC5maWxsQ29sb3IgfHwgJyMxMGI5ODEnXG4gICAgOiBjZWxsLnR5cGUgPT09ICdhbGVydF9yZWQnXG4gICAgPyAnI2Y4NzE3MSdcbiAgICA6ICcjMWUyOTNiJztcblxuICBjb25zdCBzdHJva2VXaWR0aCA9IGlzU2VsZWN0ZWQgPyAzLjUgOiBjZWxsLmlzS2V5TG9jYXRpb24gPyAyLjUgOiAxO1xuXG4gIC8vIEFycm93IHJvdGF0aW9uIGZvciB0cmFkZV9hcnJvd1xuICBjb25zdCBhcnJvd0FuZ2xlID0gY2VsbC5hcnJvd0RpcmVjdGlvbiA/PyA5MDtcblxuICByZXR1cm4gKFxuICAgIDxnXG4gICAgICBjbGFzc05hbWU9e2BjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0xNTAgJHtcbiAgICAgICAgY2VsbC5pc0tleUxvY2F0aW9uID8gJ2dyb3VwJyA6ICcnXG4gICAgICB9YH1cbiAgICAgIG9uTW91c2VFbnRlcj17b25Nb3VzZUVudGVyfVxuICAgICAgb25Nb3VzZUxlYXZlPXtvbk1vdXNlTGVhdmV9XG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgb25Db250ZXh0TWVudT17b25Db250ZXh0TWVudX1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIC8vIENTUyB2YXJpYWJsZSBwYXNzZWQgdG8gYW5pbWF0ZS1wdWxzZS1nbG93IGtleWZyYW1lXG4gICAgICAgIFsnLS1wdWxzZS1jb2xvcicgYXMgYW55XTogY2VsbC5maWxsQ29sb3IgfHwgJyMyMmM1NWUnLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7LyogQmFja2dyb3VuZCB1bmRlcmxheSBmb3Igc3RyaXBlZCB0byBoYXZlIGJhc2UgdGludCAqL31cbiAgICAgIHtjZWxsLnR5cGUgPT09ICdzdHJpcGVkJyAmJiAoXG4gICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgcG9pbnRzPXtwb2ludHN9XG4gICAgICAgICAgZmlsbD17Y2VsbC5maWxsQ29sb3IgfHwgJyM4YjVjZjYnfVxuICAgICAgICAgIGZpbGxPcGFjaXR5PXswLjI1fVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIE1haW4gT2N0YWdvbiBCb2R5ICovfVxuICAgICAgPHBvbHlnb25cbiAgICAgICAgcG9pbnRzPXtwb2ludHN9XG4gICAgICAgIGZpbGw9e2ZpbGx9XG4gICAgICAgIGZpbGxPcGFjaXR5PXtmaWxsT3BhY2l0eX1cbiAgICAgICAgc3Ryb2tlPXtiYXNlU3Ryb2tlfVxuICAgICAgICBzdHJva2VXaWR0aD17c3Ryb2tlV2lkdGh9XG4gICAgICAgIGNsYXNzTmFtZT17Y2VsbC5pc0tleUxvY2F0aW9uID8gJ2FuaW1hdGUtcHVsc2UtZ2xvdycgOiB1bmRlZmluZWR9XG4gICAgICAvPlxuXG4gICAgICB7LyogS2V5IExvY2F0aW9uIEFuaW1hdGVkIFB1bHNpbmcgSGFsbyBPdXRlciBSaW5nICovfVxuICAgICAge2NlbGwuaXNLZXlMb2NhdGlvbiAmJiAoXG4gICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgcG9pbnRzPXtnZXRPY3RhZ29uUG9pbnRzKGNlbGwuY3gsIGNlbGwuY3ksIHJhZGl1cyArIDQpfVxuICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICBzdHJva2U9e2NlbGwuZmlsbENvbG9yIHx8ICcjMjJjNTVlJ31cbiAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxuICAgICAgICAgIHN0cm9rZURhc2hhcnJheT1cIjQgM1wiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYW5pbWF0ZS1wdWxzZS1nbG93IG9wYWNpdHktODBcIlxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIEhvdmVyIEhpZ2hsaWdodCBSaW5nICovfVxuICAgICAge2lzSG92ZXJlZCAmJiAhaXNTZWxlY3RlZCAmJiAoXG4gICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgcG9pbnRzPXtnZXRPY3RhZ29uUG9pbnRzKGNlbGwuY3gsIGNlbGwuY3ksIHJhZGl1cyArIDIpfVxuICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICBzdHJva2U9XCIjZjhmYWZjXCJcbiAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9XCIyIDJcIlxuICAgICAgICAgIG9wYWNpdHk9ezAuOX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBTZWxlY3RlZCBJbmRpY2F0b3IgT3V0bGluZSAqL31cbiAgICAgIHtpc1NlbGVjdGVkICYmIChcbiAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICBwb2ludHM9e2dldE9jdGFnb25Qb2ludHMoY2VsbC5jeCwgY2VsbC5jeSwgcmFkaXVzICsgMyl9XG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHN0cm9rZT1cIiMzOGJkZjhcIlxuICAgICAgICAgIHN0cm9rZVdpZHRoPXsyLjV9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogVHlwZSBTcGVjaWZpYyBPdmVybGF5cyAqL31cbiAgICAgIHtjZWxsLnR5cGUgPT09ICdhbGVydF9yZWQnICYmIChcbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7Y2VsbC5jeH0sICR7Y2VsbC5jeX0pYH0gcG9pbnRlckV2ZW50cz1cIm5vbmVcIj5cbiAgICAgICAgICA8Y2lyY2xlIHI9e3JhZGl1cyAqIDAuNDV9IGZpbGw9XCIjN2YxZDFkXCIgb3BhY2l0eT17MC42fSAvPlxuICAgICAgICAgIDx0ZXh0XG4gICAgICAgICAgICB4PVwiMFwiXG4gICAgICAgICAgICB5PXtyYWRpdXMgKiAwLjI4fVxuICAgICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgICBmaWxsPVwiI2ZmZmZmZlwiXG4gICAgICAgICAgICBmb250U2l6ZT17cmFkaXVzICogMC44NX1cbiAgICAgICAgICAgIGZvbnRXZWlnaHQ9XCI5MDBcIlxuICAgICAgICAgICAgZm9udEZhbWlseT1cIk9yYml0cm9uLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgICAgIGZpbHRlcj1cImRyb3Atc2hhZG93KDAgMCAycHggIzAwMClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgICFcbiAgICAgICAgICA8L3RleHQ+XG4gICAgICAgIDwvZz5cbiAgICAgICl9XG5cbiAgICAgIHtjZWxsLnR5cGUgPT09ICdteXN0ZXJ5X3doaXRlJyAmJiAoXG4gICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke2NlbGwuY3h9LCAke2NlbGwuY3l9KWB9IHBvaW50ZXJFdmVudHM9XCJub25lXCI+XG4gICAgICAgICAgPGNpcmNsZSByPXtyYWRpdXMgKiAwLjQ1fSBmaWxsPVwiIzBmMTcyYVwiIG9wYWNpdHk9ezAuN30gLz5cbiAgICAgICAgICA8dGV4dFxuICAgICAgICAgICAgeD1cIjBcIlxuICAgICAgICAgICAgeT17cmFkaXVzICogMC4yOH1cbiAgICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgICAgZmlsbD1cIiMzOGJkZjhcIlxuICAgICAgICAgICAgZm9udFNpemU9e3JhZGl1cyAqIDAuODV9XG4gICAgICAgICAgICBmb250V2VpZ2h0PVwiOTAwXCJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk9XCJPcmJpdHJvbiwgc2Fucy1zZXJpZlwiXG4gICAgICAgICAgICBmaWx0ZXI9XCJkcm9wLXNoYWRvdygwIDAgM3B4ICMwMDApXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA/XG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICA8L2c+XG4gICAgICApfVxuXG4gICAgICB7Y2VsbC50eXBlID09PSAndHJhZGVfYXJyb3cnICYmIChcbiAgICAgICAgPGdcbiAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtjZWxsLmN4fSwgJHtjZWxsLmN5fSkgcm90YXRlKCR7YXJyb3dBbmdsZX0pYH1cbiAgICAgICAgICBwb2ludGVyRXZlbnRzPVwibm9uZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7LyogVGFjdGljYWwgTmF2aWdhdGlvbiBBcnJvdyAqL31cbiAgICAgICAgICA8bGluZVxuICAgICAgICAgICAgeDE9ey1yYWRpdXMgKiAwLjQ4fVxuICAgICAgICAgICAgeTE9XCIwXCJcbiAgICAgICAgICAgIHgyPXtyYWRpdXMgKiAwLjQ1fVxuICAgICAgICAgICAgeTI9XCIwXCJcbiAgICAgICAgICAgIHN0cm9rZT1cIiNmZmZmZmZcIlxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg9e3JhZGl1cyAqIDAuMTZ9XG4gICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICAgIHBvaW50cz17YCR7cmFkaXVzICogMC40OH0sMCAke3JhZGl1cyAqIDAuMTJ9LCR7LXJhZGl1cyAqIDAuMjh9ICR7cmFkaXVzICogMC4yMn0sMCAke3JhZGl1cyAqIDAuMTJ9LCR7cmFkaXVzICogMC4yOH1gfVxuICAgICAgICAgICAgZmlsbD1cIiNmZmZmZmZcIlxuICAgICAgICAgICAgZmlsdGVyPVwiZHJvcC1zaGFkb3coMCAwIDJweCByZ2JhKDAsMCwwLDAuOCkpXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2c+XG4gICAgICApfVxuXG4gICAgICB7LyogS2V5IExvY2F0aW9uIFNtYWxsIEJlYWNvbiBJY29uIGlmIG5vdCBhbHJlYWR5IGFsZXJ0L3F1ZXN0aW9uICovfVxuICAgICAge2NlbGwuaXNLZXlMb2NhdGlvbiAmJlxuICAgICAgICBjZWxsLnR5cGUgIT09ICdhbGVydF9yZWQnICYmXG4gICAgICAgIGNlbGwudHlwZSAhPT0gJ215c3Rlcnlfd2hpdGUnICYmXG4gICAgICAgIGNlbGwudHlwZSAhPT0gJ3RyYWRlX2Fycm93JyAmJiAoXG4gICAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7Y2VsbC5jeH0sICR7Y2VsbC5jeX0pYH0gcG9pbnRlckV2ZW50cz1cIm5vbmVcIj5cbiAgICAgICAgICAgIDxjaXJjbGUgcj17cmFkaXVzICogMC4yNX0gZmlsbD1cIiNmZmZmZmZcIiBvcGFjaXR5PXswLjl9IC8+XG4gICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgIHI9e3JhZGl1cyAqIDAuMTV9XG4gICAgICAgICAgICAgIGZpbGw9e2NlbGwuZmlsbENvbG9yIHx8ICcjMTBiOTgxJ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYW5pbWF0ZS1wdWxzZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgKX1cbiAgICA8L2c+XG4gICk7XG59O1xuIl19