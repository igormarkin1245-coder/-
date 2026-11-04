const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import * as __vite__cjsImport0_react from "react";
import { ZoomIn, ZoomOut, Maximize, Minimize, Crosshair, Scan, MapPin, Lock, Unlock } from "lucide-react";
var _jsxFileName = "/app/applet/src/components/TacticalHud.tsx";
import * as __vite__cjsImport2_react_jsxDevRuntime from "react/jsx-dev-runtime";
export const TacticalHud = ({ zoom, onZoomIn, onZoomOut, onResetZoom, onFitMap, cursorWorldPos, isAdmin, onToggleAdminPanel, showAdminPanel, accentColor, keyLocations, onSelectKeyLocation }) => {
	const [isFullscreen, setIsFullscreen] = React.useState(false);
	const [showLocationList, setShowLocationList] = React.useState(false);
	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
		} else {
			document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
		}
	};
	return /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
		/* @__PURE__ */ _jsxDEV("header", {
			className: "absolute top-3 left-3 right-3 z-40 flex items-center justify-between pointer-events-none",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2 pointer-events-auto bg-zinc-950/90 border border-zinc-800 px-3 py-2 rounded-lg shadow-xl backdrop-blur-md",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ _jsxDEV("span", {
									className: "w-2.5 h-2.5 rounded-full animate-ping",
									style: { backgroundColor: accentColor }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 66,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-orbitron font-bold text-xs tracking-wider text-white",
									children: "FALLOUT: EQUESTRIA"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 70,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800",
									children: "TACTICAL RP MAP"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 73,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { className: "h-4 w-px bg-zinc-800 mx-1" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "relative",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => setShowLocationList(!showLocationList),
								className: "flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 font-mono transition",
								children: [/* @__PURE__ */ _jsxDEV(MapPin, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 87,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: [
									"Объекты (",
									keyLocations.length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 88,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 13
							}, this), showLocationList && /* @__PURE__ */ _jsxDEV("div", {
								className: "absolute top-full left-0 mt-2 w-64 bg-zinc-950/95 border border-zinc-700 rounded-lg shadow-2xl p-2 z-50 max-h-72 overflow-y-auto space-y-1 font-mono text-xs",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-[10px] text-zinc-400 uppercase pb-1 border-b border-zinc-800",
									children: "Список ключевых мест:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 17
								}, this), keyLocations.length === 0 ? /* @__PURE__ */ _jsxDEV("div", {
									className: "text-zinc-500 py-2 text-center text-[11px]",
									children: "Нет добавленных объектов"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 97,
									columnNumber: 19
								}, this) : keyLocations.map((kl) => /* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => {
										onSelectKeyLocation(kl);
										setShowLocationList(false);
									},
									className: "w-full text-left p-1.5 rounded hover:bg-zinc-800/90 flex items-center justify-between text-zinc-200 hover:text-emerald-400 transition",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "truncate pr-1",
										children: kl.keyLocationData?.title || `Сектор [${kl.col}, ${kl.row}]`
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 111,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "text-[9px] text-zinc-500 shrink-0",
										children: [
											"[",
											kl.col,
											":",
											kl.row,
											"]"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 114,
										columnNumber: 23
									}, this)]
								}, kl.id, true, {
									fileName: _jsxFileName,
									lineNumber: 102,
									columnNumber: 21
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "hidden md:flex items-center gap-4 bg-zinc-950/85 border border-zinc-800 px-4 py-1.5 rounded-lg font-mono text-xs text-zinc-300 shadow-xl backdrop-blur-md",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ _jsxDEV(Crosshair, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-zinc-500",
									children: "СЕКТОР:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 129,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-emerald-400 font-bold",
									children: cursorWorldPos ? `[${cursorWorldPos.col}, ${cursorWorldPos.row}]` : "[--, --]"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { className: "h-3 w-px bg-zinc-800" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "text-zinc-500",
								children: "КООРДИНАТЫ:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "text-zinc-200",
								children: cursorWorldPos ? `${cursorWorldPos.x} : ${cursorWorldPos.y}` : "0 : 0"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { className: "h-3 w-px bg-zinc-800" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "text-zinc-500",
								children: "МАСШТАБ:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "text-sky-400 font-bold",
								children: [Math.round(zoom * 100), "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2 pointer-events-auto bg-zinc-950/90 border border-zinc-800 px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center bg-zinc-900 border border-zinc-800 rounded p-0.5",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: onZoomOut,
									className: "p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition",
									title: "Уменьшить (Zoom Out)",
									children: /* @__PURE__ */ _jsxDEV(ZoomOut, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 162,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: onResetZoom,
									className: "px-2 py-0.5 text-[11px] font-mono text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded transition",
									title: "100% масштаб",
									children: [Math.round(zoom * 100), "%"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: onZoomIn,
									className: "p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition",
									title: "Увеличить (Zoom In)",
									children: /* @__PURE__ */ _jsxDEV(ZoomIn, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 178,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: onFitMap,
							className: "p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded border border-zinc-800 bg-zinc-900 transition text-[11px] font-mono flex items-center gap-1",
							title: "Вписать всю карту в экран",
							children: [/* @__PURE__ */ _jsxDEV(Scan, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 189,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "hidden sm:inline",
								children: "Вся карта"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: toggleFullscreen,
							className: "p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded border border-zinc-800 bg-zinc-900 transition",
							title: "Полноэкранный режим",
							children: isFullscreen ? /* @__PURE__ */ _jsxDEV(Minimize, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 29
							}, this) : /* @__PURE__ */ _jsxDEV(Maximize, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 64
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: onToggleAdminPanel,
							className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition ${isAdmin ? "bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700"}`,
							children: [isAdmin ? /* @__PURE__ */ _jsxDEV(Unlock, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 213,
								columnNumber: 24
							}, this) : /* @__PURE__ */ _jsxDEV(Lock, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 213,
								columnNumber: 61
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: isAdmin ? "Админ-панель" : "Войти в Штаб" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 62,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500/50 pointer-events-none z-30" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 220,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 pointer-events-none z-30" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 221,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("div", { className: "absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500/50 pointer-events-none z-30" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 222,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("div", { className: "absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500/50 pointer-events-none z-30" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 223,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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RUwsZUFBZSx3QkFBQyxVQUFELEVBQVUsV0FBVSxVQUFXOzs7O2tCQUFJLHdCQUFDLFVBQUQsRUFBVSxXQUFVLFVBQVc7Ozs7O01BQzVFOzs7OztNQUdSLHdCQUFDLFVBQUQ7T0FDRSxNQUFLO09BQ0wsU0FBUztPQUNULFdBQVcsMkZBQ1QsVUFDSSx3RUFDQTtpQkFOUixDQVNHLFVBQVUsd0JBQUMsUUFBRCxFQUFRLFdBQVUsY0FBZTs7OztrQkFBSSx3QkFBQyxNQUFELEVBQU0sV0FBVSxjQUFlOzs7O2lCQUMvRSx3QkFBQyxRQUFELFlBQU8sVUFBVSxpQkFBaUIsZUFBcUI7Ozs7ZUFDakQ7Ozs7OztLQUNMOzs7Ozs7R0FDQzs7Ozs7O0VBR1Isd0JBQUMsT0FBRCxFQUFLLFdBQVUscUdBQXNHOzs7OztFQUNySCx3QkFBQyxPQUFELEVBQUssV0FBVSxzR0FBdUc7Ozs7O0VBQ3RILHdCQUFDLE9BQUQsRUFBSyxXQUFVLHdHQUF5Rzs7Ozs7RUFDeEgsd0JBQUMsT0FBRCxFQUFLLFdBQVUseUdBQTBHOzs7OztDQUN6SDs7Ozs7QUFFTiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUYWN0aWNhbEh1ZC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIFpvb21JbixcbiAgWm9vbU91dCxcbiAgTWF4aW1pemUsXG4gIE1pbmltaXplLFxuICBSb3RhdGVDY3csXG4gIENyb3NzaGFpcixcbiAgU2hpZWxkQWxlcnQsXG4gIFNlYXJjaCxcbiAgU2NhbixcbiAgU3BhcmtsZXMsXG4gIE1hcFBpbixcbiAgTG9jayxcbiAgVW5sb2NrLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgT2N0YWdvbkNlbGwgfSBmcm9tICcuLi90eXBlcy9tYXAnO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICB6b29tOiBudW1iZXI7XG4gIG9uWm9vbUluOiAoKSA9PiB2b2lkO1xuICBvblpvb21PdXQ6ICgpID0+IHZvaWQ7XG4gIG9uUmVzZXRab29tOiAoKSA9PiB2b2lkO1xuICBvbkZpdE1hcDogKCkgPT4gdm9pZDtcbiAgY3Vyc29yV29ybGRQb3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IGNvbDogbnVtYmVyOyByb3c6IG51bWJlciB9IHwgbnVsbDtcbiAgaXNBZG1pbjogYm9vbGVhbjtcbiAgb25Ub2dnbGVBZG1pblBhbmVsOiAoKSA9PiB2b2lkO1xuICBzaG93QWRtaW5QYW5lbDogYm9vbGVhbjtcbiAgYWNjZW50Q29sb3I6IHN0cmluZztcbiAga2V5TG9jYXRpb25zOiBPY3RhZ29uQ2VsbFtdO1xuICBvblNlbGVjdEtleUxvY2F0aW9uOiAoY2VsbDogT2N0YWdvbkNlbGwpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBUYWN0aWNhbEh1ZDogUmVhY3QuRkM8UHJvcHM+ID0gKHtcbiAgem9vbSxcbiAgb25ab29tSW4sXG4gIG9uWm9vbU91dCxcbiAgb25SZXNldFpvb20sXG4gIG9uRml0TWFwLFxuICBjdXJzb3JXb3JsZFBvcyxcbiAgaXNBZG1pbixcbiAgb25Ub2dnbGVBZG1pblBhbmVsLFxuICBzaG93QWRtaW5QYW5lbCxcbiAgYWNjZW50Q29sb3IsXG4gIGtleUxvY2F0aW9ucyxcbiAgb25TZWxlY3RLZXlMb2NhdGlvbixcbn0pID0+IHtcbiAgY29uc3QgW2lzRnVsbHNjcmVlbiwgc2V0SXNGdWxsc2NyZWVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dMb2NhdGlvbkxpc3QsIHNldFNob3dMb2NhdGlvbkxpc3RdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHRvZ2dsZUZ1bGxzY3JlZW4gPSAoKSA9PiB7XG4gICAgaWYgKCFkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCkge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCkudGhlbigoKSA9PiBzZXRJc0Z1bGxzY3JlZW4odHJ1ZSkpLmNhdGNoKCgpID0+IHt9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKS50aGVuKCgpID0+IHNldElzRnVsbHNjcmVlbihmYWxzZSkpLmNhdGNoKCgpID0+IHt9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgey8qIFRhY3RpY2FsIFRvcCBCYXIgKi99XG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0zIGxlZnQtMyByaWdodC0zIHotNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgey8qIExlZnQ6IEJyYW5kaW5nICYgU3RhdHVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHBvaW50ZXItZXZlbnRzLWF1dG8gYmctemluYy05NTAvOTAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBweC0zIHB5LTIgcm91bmRlZC1sZyBzaGFkb3cteGwgYmFja2Ryb3AtYmx1ci1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBhbmltYXRlLXBpbmdcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGFjY2VudENvbG9yIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1vcmJpdHJvbiBmb250LWJvbGQgdGV4dC14cyB0cmFja2luZy13aWRlciB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIEZBTExPVVQ6IEVRVUVTVFJJQVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy16aW5jLTkwMCB0ZXh0LXppbmMtNDAwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgVEFDVElDQUwgUlAgTUFQXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtNCB3LXB4IGJnLXppbmMtODAwIG14LTFcIiAvPlxuXG4gICAgICAgICAgey8qIEtleSBMb2NhdGlvbnMgUXVpY2sgRHJhd2VyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dMb2NhdGlvbkxpc3QoIXNob3dMb2NhdGlvbkxpc3QpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQteHMgdGV4dC16aW5jLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHB4LTIgcHktMSByb3VuZGVkIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItemluYy03MDAvNjAgZm9udC1tb25vIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TWFwUGluIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj7QntCx0YrQtdC60YLRiyAoe2tleUxvY2F0aW9ucy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7c2hvd0xvY2F0aW9uTGlzdCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLWZ1bGwgbGVmdC0wIG10LTIgdy02NCBiZy16aW5jLTk1MC85NSBib3JkZXIgYm9yZGVyLXppbmMtNzAwIHJvdW5kZWQtbGcgc2hhZG93LTJ4bCBwLTIgei01MCBtYXgtaC03MiBvdmVyZmxvdy15LWF1dG8gc3BhY2UteS0xIGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIHVwcGVyY2FzZSBwYi0xIGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAg0KHQv9C40YHQvtC6INC60LvRjtGH0LXQstGL0YUg0LzQtdGB0YI6XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge2tleUxvY2F0aW9ucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtemluYy01MDAgcHktMiB0ZXh0LWNlbnRlciB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICDQndC10YIg0LTQvtCx0LDQstC70LXQvdC90YvRhSDQvtCx0YrQtdC60YLQvtCyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAga2V5TG9jYXRpb25zLm1hcCgoa2wpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17a2wuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RLZXlMb2NhdGlvbihrbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TG9jYXRpb25MaXN0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcC0xLjUgcm91bmRlZCBob3ZlcjpiZy16aW5jLTgwMC85MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC16aW5jLTIwMCBob3Zlcjp0ZXh0LWVtZXJhbGQtNDAwIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGUgcHItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2tsLmtleUxvY2F0aW9uRGF0YT8udGl0bGUgfHwgYNCh0LXQutGC0L7RgCBbJHtrbC5jb2x9LCAke2tsLnJvd31dYH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXppbmMtNTAwIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBbe2tsLmNvbH06e2tsLnJvd31dXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ2VudGVyOiBDb29yZGluYXRlcyBIVUQgUmVhZG91dCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgYmctemluYy05NTAvODUgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBweC00IHB5LTEuNSByb3VuZGVkLWxnIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtemluYy0zMDAgc2hhZG93LXhsIGJhY2tkcm9wLWJsdXItbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxDcm9zc2hhaXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNTAwXCI+0KHQldCa0KLQntCgOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgIHtjdXJzb3JXb3JsZFBvcyA/IGBbJHtjdXJzb3JXb3JsZFBvcy5jb2x9LCAke2N1cnNvcldvcmxkUG9zLnJvd31dYCA6ICdbLS0sIC0tXSd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMyB3LXB4IGJnLXppbmMtODAwXCIgLz5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTUwMFwiPtCa0J7QntCg0JTQmNCd0JDQotCrOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy0yMDBcIj5cbiAgICAgICAgICAgICAge2N1cnNvcldvcmxkUG9zID8gYCR7Y3Vyc29yV29ybGRQb3MueH0gOiAke2N1cnNvcldvcmxkUG9zLnl9YCA6ICcwIDogMCd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMyB3LXB4IGJnLXppbmMtODAwXCIgLz5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy01MDBcIj7QnNCQ0KHQqNCi0JDQkTo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDAgZm9udC1ib2xkXCI+e01hdGgucm91bmQoem9vbSAqIDEwMCl9JTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0OiBDb250cm9scyAmIEFkbWluIFRvZ2dsZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwb2ludGVyLWV2ZW50cy1hdXRvIGJnLXppbmMtOTUwLzkwIGJvcmRlciBib3JkZXItemluYy04MDAgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBzaGFkb3cteGwgYmFja2Ryb3AtYmx1ci1tZFwiPlxuICAgICAgICAgIHsvKiBab29tIGNvbnRyb2xzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCByb3VuZGVkIHAtMC41XCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblpvb21PdXR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSB0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtemluYy0xMDAgaG92ZXI6YmctemluYy04MDAgcm91bmRlZCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCLQo9C80LXQvdGM0YjQuNGC0YwgKFpvb20gT3V0KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxab29tT3V0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblJlc2V0Wm9vbX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgdGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtemluYy0zMDAgaG92ZXI6dGV4dC1lbWVyYWxkLTQwMCBob3ZlcjpiZy16aW5jLTgwMCByb3VuZGVkIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICB0aXRsZT1cIjEwMCUg0LzQsNGB0YjRgtCw0LFcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7TWF0aC5yb3VuZCh6b29tICogMTAwKX0lXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uWm9vbUlufVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMTAwIGhvdmVyOmJnLXppbmMtODAwIHJvdW5kZWQgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIHRpdGxlPVwi0KPQstC10LvQuNGH0LjRgtGMIChab29tIEluKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxab29tSW4gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBGaXQgTWFwIGJ1dHRvbiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uRml0TWFwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMTAwIGhvdmVyOmJnLXppbmMtODAwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBiZy16aW5jLTkwMCB0cmFuc2l0aW9uIHRleHQtWzExcHhdIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICB0aXRsZT1cItCS0L/QuNGB0LDRgtGMINCy0YHRjiDQutCw0YDRgtGDINCyINGN0LrRgNCw0L1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTY2FuIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj7QktGB0Y8g0LrQsNGA0YLQsDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBGdWxsc2NyZWVuICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlRnVsbHNjcmVlbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTEwMCBob3ZlcjpiZy16aW5jLTgwMCByb3VuZGVkIGJvcmRlciBib3JkZXItemluYy04MDAgYmctemluYy05MDAgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICB0aXRsZT1cItCf0L7Qu9C90L7RjdC60YDQsNC90L3Ri9C5INGA0LXQttC40LxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0Z1bGxzY3JlZW4gPyA8TWluaW1pemUgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IDogPE1heGltaXplIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBBZG1pbiBwYW5lbCB0b2dnbGUgYnV0dG9uICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17b25Ub2dnbGVBZG1pblBhbmVsfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkLWxnIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgIGlzQWRtaW5cbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTUwMCB0ZXh0LXppbmMtOTUwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSgxNiwxODUsMTI5LDAuNCldJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIHRleHQtemluYy0zMDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0FkbWluID8gPFVubG9jayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IDogPExvY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgIDxzcGFuPntpc0FkbWluID8gJ9CQ0LTQvNC40L0t0L/QsNC90LXQu9GMJyA6ICfQktC+0LnRgtC4INCyINCo0YLQsNCxJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG5cbiAgICAgIHsvKiBUYWN0aWNhbCBDb3JuZXIgQnJhY2tldHMgKFN0eWxpemVkIE1pbGl0YXJ5IFJldGljbGUgRnJhbWUpICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgdy04IGgtOCBib3JkZXItdC0yIGJvcmRlci1sLTIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHBvaW50ZXItZXZlbnRzLW5vbmUgei0zMFwiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgdy04IGgtOCBib3JkZXItdC0yIGJvcmRlci1yLTIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHBvaW50ZXItZXZlbnRzLW5vbmUgei0zMFwiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0wIGxlZnQtMCB3LTggaC04IGJvcmRlci1iLTIgYm9yZGVyLWwtMiBib3JkZXItZW1lcmFsZC01MDAvNTAgcG9pbnRlci1ldmVudHMtbm9uZSB6LTMwXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgcmlnaHQtMCB3LTggaC04IGJvcmRlci1iLTIgYm9yZGVyLXItMiBib3JkZXItZW1lcmFsZC01MDAvNTAgcG9pbnRlci1ldmVudHMtbm9uZSB6LTMwXCIgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0=