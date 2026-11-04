const React = __vite__cjsImport0_react; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsx"];import * as __vite__cjsImport0_react from "react";
import { Compass, Eye, EyeOff } from "lucide-react";
var _jsxFileName = "/app/applet/src/components/Minimap.tsx";
import * as __vite__cjsImport2_react_jsxDevRuntime from "react/jsx-runtime";
export const Minimap = ({ imageSrc, mapWidth, mapHeight, viewX, viewY, viewZoom, containerWidth, containerHeight, octagons, onNavigate, accentColor }) => {
	const [isOpen, setIsOpen] = React.useState(true);
	const minimapRef = useRef(null);
	const miniWidth = 200;
	const scale = mapWidth > 0 ? miniWidth / mapWidth : .1;
	const miniHeight = mapHeight > 0 ? mapHeight * scale : 140;
	// Viewport rectangle calculation in minimap coords
	// Screen top-left (0,0) corresponds to map coords (-viewX / viewZoom, -viewY / viewZoom)
	const vpX = -viewX / viewZoom * scale;
	const vpY = -viewY / viewZoom * scale;
	const vpW = containerWidth / viewZoom * scale;
	const vpH = containerHeight / viewZoom * scale;
	const handleClick = (e) => {
		if (!minimapRef.current) return;
		const rect = minimapRef.current.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const clickY = e.clientY - rect.top;
		// Convert minimap click back to world map center
		const worldX = clickX / scale;
		const worldY = clickY / scale;
		// Center screen on this world point
		const newViewX = containerWidth / 2 - worldX * viewZoom;
		const newViewY = containerHeight / 2 - worldY * viewZoom;
		onNavigate(newViewX, newViewY);
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "absolute bottom-4 left-4 z-40 select-none",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "bg-zinc-950/90 border border-zinc-800 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center justify-between px-2.5 py-1.5 bg-zinc-900 border-b border-zinc-800 text-[10px] font-mono text-zinc-300",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ _jsxDEV(Compass, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("span", {
						className: "font-semibold uppercase tracking-wider",
						children: "Радар Карты"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 70,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => setIsOpen(!isOpen),
					className: "text-zinc-500 hover:text-zinc-200",
					children: isOpen ? /* @__PURE__ */ _jsxDEV(EyeOff, { className: "w-3 h-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 23
					}, this) : /* @__PURE__ */ _jsxDEV(Eye, { className: "w-3 h-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 56
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 9
			}, this), isOpen && /* @__PURE__ */ _jsxDEV("div", {
				ref: minimapRef,
				onClick: handleClick,
				style: {
					width: `${miniWidth}px`,
					height: `${miniHeight}px`
				},
				className: "relative cursor-crosshair overflow-hidden bg-zinc-950",
				children: [
					/* @__PURE__ */ _jsxDEV("img", {
						src: imageSrc,
						alt: "Minimap",
						className: "w-full h-full object-cover opacity-60 pointer-events-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(16,185,129,0.06)_100%)] pointer-events-none" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("svg", {
						className: "absolute inset-0 w-full h-full pointer-events-none",
						viewBox: `0 0 ${mapWidth} ${mapHeight}`,
						children: Object.values(octagons).map((oct) => /* @__PURE__ */ _jsxDEV("circle", {
							cx: oct.cx,
							cy: oct.cy,
							r: oct.isKeyLocation ? 14 : 9,
							fill: oct.fillColor || "#10b981",
							opacity: .8
						}, oct.id, false, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 100,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						style: {
							left: `${Math.max(0, vpX)}px`,
							top: `${Math.max(0, vpY)}px`,
							width: `${Math.min(miniWidth, vpW)}px`,
							height: `${Math.min(miniHeight, vpH)}px`,
							borderColor: accentColor || "#22c55e"
						},
						className: "absolute border-2 bg-emerald-500/10 pointer-events-none transition-all duration-75 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "absolute bottom-1 right-1 text-[8px] font-mono text-zinc-400 bg-black/70 px-1 rounded pointer-events-none",
						children: [
							Math.round(-viewX / viewZoom),
							" : ",
							Math.round(-viewY / viewZoom)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 83,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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T0FBRTtPQUFJLEtBQUssTUFBTyxDQUFDLFFBQVEsUUFBUztNQUNoRTs7Ozs7O0lBQ0Y7Ozs7O1dBRUo7Ozs7OztDQUNGOzs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIk1pbmltYXAudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBPY3RhZ29uQ2VsbCB9IGZyb20gJy4uL3R5cGVzL21hcCc7XG5pbXBvcnQgeyBDb21wYXNzLCBFeWUsIEV5ZU9mZiwgTWF4aW1pemUyIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgaW1hZ2VTcmM6IHN0cmluZztcbiAgbWFwV2lkdGg6IG51bWJlcjtcbiAgbWFwSGVpZ2h0OiBudW1iZXI7XG4gIHZpZXdYOiBudW1iZXI7XG4gIHZpZXdZOiBudW1iZXI7XG4gIHZpZXdab29tOiBudW1iZXI7XG4gIGNvbnRhaW5lcldpZHRoOiBudW1iZXI7XG4gIGNvbnRhaW5lckhlaWdodDogbnVtYmVyO1xuICBvY3RhZ29uczogUmVjb3JkPHN0cmluZywgT2N0YWdvbkNlbGw+O1xuICBvbk5hdmlnYXRlOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHZvaWQ7XG4gIGFjY2VudENvbG9yOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBNaW5pbWFwOiBSZWFjdC5GQzxQcm9wcz4gPSAoe1xuICBpbWFnZVNyYyxcbiAgbWFwV2lkdGgsXG4gIG1hcEhlaWdodCxcbiAgdmlld1gsXG4gIHZpZXdZLFxuICB2aWV3Wm9vbSxcbiAgY29udGFpbmVyV2lkdGgsXG4gIGNvbnRhaW5lckhlaWdodCxcbiAgb2N0YWdvbnMsXG4gIG9uTmF2aWdhdGUsXG4gIGFjY2VudENvbG9yLFxufSkgPT4ge1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gUmVhY3QudXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IG1pbmltYXBSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IG1pbmlXaWR0aCA9IDIwMDtcbiAgY29uc3Qgc2NhbGUgPSBtYXBXaWR0aCA+IDAgPyBtaW5pV2lkdGggLyBtYXBXaWR0aCA6IDAuMTtcbiAgY29uc3QgbWluaUhlaWdodCA9IG1hcEhlaWdodCA+IDAgPyBtYXBIZWlnaHQgKiBzY2FsZSA6IDE0MDtcblxuICAvLyBWaWV3cG9ydCByZWN0YW5nbGUgY2FsY3VsYXRpb24gaW4gbWluaW1hcCBjb29yZHNcbiAgLy8gU2NyZWVuIHRvcC1sZWZ0ICgwLDApIGNvcnJlc3BvbmRzIHRvIG1hcCBjb29yZHMgKC12aWV3WCAvIHZpZXdab29tLCAtdmlld1kgLyB2aWV3Wm9vbSlcbiAgY29uc3QgdnBYID0gKC12aWV3WCAvIHZpZXdab29tKSAqIHNjYWxlO1xuICBjb25zdCB2cFkgPSAoLXZpZXdZIC8gdmlld1pvb20pICogc2NhbGU7XG4gIGNvbnN0IHZwVyA9IChjb250YWluZXJXaWR0aCAvIHZpZXdab29tKSAqIHNjYWxlO1xuICBjb25zdCB2cEggPSAoY29udGFpbmVySGVpZ2h0IC8gdmlld1pvb20pICogc2NhbGU7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICBpZiAoIW1pbmltYXBSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlY3QgPSBtaW5pbWFwUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgY2xpY2tYID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgIGNvbnN0IGNsaWNrWSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gICAgLy8gQ29udmVydCBtaW5pbWFwIGNsaWNrIGJhY2sgdG8gd29ybGQgbWFwIGNlbnRlclxuICAgIGNvbnN0IHdvcmxkWCA9IGNsaWNrWCAvIHNjYWxlO1xuICAgIGNvbnN0IHdvcmxkWSA9IGNsaWNrWSAvIHNjYWxlO1xuXG4gICAgLy8gQ2VudGVyIHNjcmVlbiBvbiB0aGlzIHdvcmxkIHBvaW50XG4gICAgY29uc3QgbmV3Vmlld1ggPSBjb250YWluZXJXaWR0aCAvIDIgLSB3b3JsZFggKiB2aWV3Wm9vbTtcbiAgICBjb25zdCBuZXdWaWV3WSA9IGNvbnRhaW5lckhlaWdodCAvIDIgLSB3b3JsZFkgKiB2aWV3Wm9vbTtcblxuICAgIG9uTmF2aWdhdGUobmV3Vmlld1gsIG5ld1ZpZXdZKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgbGVmdC00IHotNDAgc2VsZWN0LW5vbmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctemluYy05NTAvOTAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCByb3VuZGVkLWxnIHNoYWRvdy0yeGwgYmFja2Ryb3AtYmx1ci1tZCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtMi41IHB5LTEuNSBiZy16aW5jLTkwMCBib3JkZXItYiBib3JkZXItemluYy04MDAgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy0zMDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxDb21wYXNzIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPtCg0LDQtNCw0YAg0JrQsNGA0YLRizwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzT3BlbighaXNPcGVuKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtemluYy01MDAgaG92ZXI6dGV4dC16aW5jLTIwMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzT3BlbiA/IDxFeWVPZmYgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+IDogPEV5ZSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb250ZW50ICovfVxuICAgICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e21pbmltYXBSZWZ9XG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHttaW5pV2lkdGh9cHhgLCBoZWlnaHQ6IGAke21pbmlIZWlnaHR9cHhgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBjdXJzb3ItY3Jvc3NoYWlyIG92ZXJmbG93LWhpZGRlbiBiZy16aW5jLTk1MFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIEJhY2tncm91bmQgTWFwIEltYWdlICovfVxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9e2ltYWdlU3JjfVxuICAgICAgICAgICAgICBhbHQ9XCJNaW5pbWFwXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXIgb3BhY2l0eS02MCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHsvKiBSYWRhciBzd2VlcCBlZmZlY3QgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctW3JhZGlhbC1ncmFkaWVudChjaXJjbGVfYXRfY2VudGVyLHRyYW5zcGFyZW50XzAlLHJnYmEoMTYsMTg1LDEyOSwwLjA2KV8xMDAlKV0gcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgICAgIHsvKiBSZW5kZXIgbWluaSBkb3RzIGZvciBvY2N1cGllZCB0ZXJyaXRvcmllcyAqL31cbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB3LWZ1bGwgaC1mdWxsIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgICB2aWV3Qm94PXtgMCAwICR7bWFwV2lkdGh9ICR7bWFwSGVpZ2h0fWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtPYmplY3QudmFsdWVzKG9jdGFnb25zKS5tYXAoKG9jdCkgPT4gKFxuICAgICAgICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgICAgICAgIGtleT17b2N0LmlkfVxuICAgICAgICAgICAgICAgICAgY3g9e29jdC5jeH1cbiAgICAgICAgICAgICAgICAgIGN5PXtvY3QuY3l9XG4gICAgICAgICAgICAgICAgICByPXtvY3QuaXNLZXlMb2NhdGlvbiA/IDE0IDogOX1cbiAgICAgICAgICAgICAgICAgIGZpbGw9e29jdC5maWxsQ29sb3IgfHwgJyMxMGI5ODEnfVxuICAgICAgICAgICAgICAgICAgb3BhY2l0eT17MC44fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgICAgIHsvKiBWaWV3cG9ydCBCb3ggKi99XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgbGVmdDogYCR7TWF0aC5tYXgoMCwgdnBYKX1weGAsXG4gICAgICAgICAgICAgICAgdG9wOiBgJHtNYXRoLm1heCgwLCB2cFkpfXB4YCxcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7TWF0aC5taW4obWluaVdpZHRoLCB2cFcpfXB4YCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke01hdGgubWluKG1pbmlIZWlnaHQsIHZwSCl9cHhgLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBhY2NlbnRDb2xvciB8fCAnIzIyYzU1ZScsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGJvcmRlci0yIGJnLWVtZXJhbGQtNTAwLzEwIHBvaW50ZXItZXZlbnRzLW5vbmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzUgc2hhZG93LVswXzBfOHB4X3JnYmEoMzQsMTk3LDk0LDAuNCldXCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHsvKiBDb29yZGluYXRlcyBvdmVybGF5ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMSByaWdodC0xIHRleHQtWzhweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgYmctYmxhY2svNzAgcHgtMSByb3VuZGVkIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgICAgICAge01hdGgucm91bmQoKC12aWV3WCAvIHZpZXdab29tKSl9IDoge01hdGgucm91bmQoKC12aWV3WSAvIHZpZXdab29tKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==