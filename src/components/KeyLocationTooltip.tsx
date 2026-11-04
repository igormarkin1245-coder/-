const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import * as __vite__cjsImport0_react from "react";
import { Shield, Compass } from "lucide-react";
var _jsxFileName = "/app/applet/src/components/KeyLocationTooltip.tsx";
import * as __vite__cjsImport2_react_jsxDevRuntime from "react/jsx-dev-runtime";
export const KeyLocationTooltip = ({ cell, x, y }) => {
	const data = cell.keyLocationData;
	if (!cell.isKeyLocation && !data) return null;
	const title = data?.title || `Сектор [${cell.col}, ${cell.row}]`;
	const desc = data?.description || "Нет разведывательных данных.";
	const faction = data?.faction || "Нейтральная территория";
	const img = data?.imageUrl;
	const dangerColors = {
		safe: "text-emerald-400 border-emerald-500/40 bg-emerald-950/60",
		low: "text-blue-400 border-blue-500/40 bg-blue-950/60",
		medium: "text-amber-400 border-amber-500/40 bg-amber-950/60",
		high: "text-orange-400 border-orange-500/40 bg-orange-950/60",
		critical: "text-red-400 border-red-500/40 bg-red-950/60 animate-pulse"
	};
	const dangerLabels = {
		safe: "Безопасно",
		low: "Низкая угроза",
		medium: "Средняя опасность",
		high: "Высокая опасность",
		critical: "КРИТИЧЕСКИЙ РИСК"
	};
	const dangerClass = dangerColors[data?.dangerLevel || "medium"];
	return /* @__PURE__ */ _jsxDEV("div", {
		style: {
			position: "fixed",
			left: `${Math.min(window.innerWidth - 320, Math.max(16, x + 16))}px`,
			top: `${Math.min(window.innerHeight - 280, Math.max(16, y - 20))}px`,
			zIndex: 9999
		},
		className: "w-72 pointer-events-none rounded-lg bg-zinc-950/95 border border-emerald-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.85)] p-3 text-xs backdrop-blur-md transition-opacity duration-200",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center justify-between mb-2 pb-1.5 border-b border-zinc-800",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold uppercase tracking-wider",
					children: [/* @__PURE__ */ _jsxDEV(Compass, { className: "w-3.5 h-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Ключевое место" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this), data?.dangerLevel && /* @__PURE__ */ _jsxDEV("span", {
					className: `text-[9px] font-mono px-1.5 py-0.5 rounded border ${dangerClass}`,
					children: dangerLabels[data.dangerLevel]
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 7
			}, this),
			img && /* @__PURE__ */ _jsxDEV("div", {
				className: "relative w-full h-28 mb-2 rounded overflow-hidden border border-zinc-800 bg-zinc-900",
				children: [/* @__PURE__ */ _jsxDEV("img", {
					src: img,
					alt: title,
					className: "w-full h-full object-cover",
					onError: (e) => {
						e.target.style.display = "none";
					}
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 65,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("h4", {
				className: "text-zinc-100 font-bold text-sm leading-snug mb-1 font-rajdhani",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "text-[10px] text-zinc-400 flex items-center gap-1 mb-2 font-mono",
				children: [/* @__PURE__ */ _jsxDEV(Shield, { className: "w-3 h-3 text-sky-400 shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: "truncate",
					children: faction
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("p", {
				className: "text-zinc-300 text-[11px] leading-relaxed line-clamp-3 mb-2 font-sans",
				children: desc
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 90,
				columnNumber: 7
			}, this),
			data?.tradeResource && /* @__PURE__ */ _jsxDEV("div", {
				className: "text-[10px] text-amber-300/90 font-mono bg-amber-950/30 border border-amber-800/40 rounded px-2 py-1 mb-1.5 flex items-center gap-1",
				children: [/* @__PURE__ */ _jsxDEV("span", { children: "📦 Ресурсы:" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 97,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: "truncate",
					children: data.tradeResource
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "text-[9px] text-zinc-500 font-mono text-right italic pt-1 border-t border-zinc-800/60",
				children: "Кликните для открытия досье"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXO0FBRWxCLFNBQVMsUUFBbUMsZUFBbUM7OztBQVEvRSxPQUFPLE1BQU0sc0JBQXVDLEVBQUUsTUFBTSxHQUFHLFFBQVE7Q0FDckUsTUFBTSxPQUFPLEtBQUs7Q0FDbEIsSUFBSSxDQUFDLEtBQUssaUJBQWlCLENBQUMsTUFBTSxPQUFPO0NBRXpDLE1BQU0sUUFBUSxNQUFNLFNBQVMsV0FBVyxLQUFLLElBQUksSUFBSSxLQUFLLElBQUk7Q0FDOUQsTUFBTSxPQUFPLE1BQU0sZUFBZTtDQUNsQyxNQUFNLFVBQVUsTUFBTSxXQUFXO0NBQ2pDLE1BQU0sTUFBTSxNQUFNO0NBRWxCLE1BQU0sZUFBdUM7RUFDM0MsTUFBTTtFQUNOLEtBQUs7RUFDTCxRQUFRO0VBQ1IsTUFBTTtFQUNOLFVBQVU7Q0FDWjtDQUVBLE1BQU0sZUFBdUM7RUFDM0MsTUFBTTtFQUNOLEtBQUs7RUFDTCxRQUFRO0VBQ1IsTUFBTTtFQUNOLFVBQVU7Q0FDWjtDQUVBLE1BQU0sY0FBYyxhQUFhLE1BQU0sZUFBZTtDQUV0RCxPQUNFLHdCQUFDLE9BQUQ7RUFDRSxPQUFPO0dBQ0wsVUFBVTtHQUNWLE1BQU0sR0FBRyxLQUFLLElBQUksT0FBTyxhQUFhLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRTtHQUNqRSxLQUFLLEdBQUcsS0FBSyxJQUFJLE9BQU8sY0FBYyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUU7R0FDakUsUUFBUTtFQUNWO0VBQ0EsV0FBVTtZQVBaO0dBVUUsd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxTQUFELEVBQVMsV0FBVSxjQUFlOzs7O2VBQ2xDLHdCQUFDLFFBQUQsWUFBTSxpQkFBb0I7Ozs7YUFDdkI7Ozs7O2NBQ0osTUFBTSxlQUNMLHdCQUFDLFFBQUQ7S0FDRSxXQUFXLHFEQUFxRDtlQUUvRCxhQUFhLEtBQUs7SUFDZjs7OztZQUVMOzs7Ozs7R0FHSixPQUNDLHdCQUFDLE9BQUQ7SUFBSyxXQUFVO2NBQWYsQ0FDRSx3QkFBQyxPQUFEO0tBQ0UsS0FBSztLQUNMLEtBQUs7S0FDTCxXQUFVO0tBQ1YsVUFBVSxNQUFNO01BQ2QsQUFBQyxFQUFFLE9BQXVCLE1BQU0sVUFBVTtLQUM1QztJQUNEOzs7O2NBQ0Qsd0JBQUMsT0FBRCxFQUFLLFdBQVUsNEZBQTZGOzs7O1lBQ3pHOzs7Ozs7R0FJUCx3QkFBQyxNQUFEO0lBQUksV0FBVTtjQUNYO0dBQ0M7Ozs7O0dBR0osd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLHdCQUFDLFFBQUQsRUFBUSxXQUFVLGdDQUFpQzs7OztjQUNuRCx3QkFBQyxRQUFEO0tBQU0sV0FBVTtlQUFZO0lBQWM7Ozs7WUFDdkM7Ozs7OztHQUdMLHdCQUFDLEtBQUQ7SUFBRyxXQUFVO2NBQ1Y7R0FDQTs7Ozs7R0FHRixNQUFNLGlCQUNMLHdCQUFDLE9BQUQ7SUFBSyxXQUFVO2NBQWYsQ0FDRSx3QkFBQyxRQUFELFlBQU0sY0FBaUI7Ozs7Y0FDdkIsd0JBQUMsUUFBRDtLQUFNLFdBQVU7ZUFBWSxLQUFLO0lBQW9COzs7O1lBQ2xEOzs7Ozs7R0FJUCx3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUF3RjtHQUVsRzs7Ozs7RUFDRjs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiS2V5TG9jYXRpb25Ub29sdGlwLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgT2N0YWdvbkNlbGwgfSBmcm9tICcuLi90eXBlcy9tYXAnO1xuaW1wb3J0IHsgU2hpZWxkLCBBbGVydFRyaWFuZ2xlLCBIZWxwQ2lyY2xlLCBDb21wYXNzLCBJbWFnZSBhcyBJbWFnZUljb24gfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBjZWxsOiBPY3RhZ29uQ2VsbDtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBLZXlMb2NhdGlvblRvb2x0aXA6IFJlYWN0LkZDPFByb3BzPiA9ICh7IGNlbGwsIHgsIHkgfSkgPT4ge1xuICBjb25zdCBkYXRhID0gY2VsbC5rZXlMb2NhdGlvbkRhdGE7XG4gIGlmICghY2VsbC5pc0tleUxvY2F0aW9uICYmICFkYXRhKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCB0aXRsZSA9IGRhdGE/LnRpdGxlIHx8IGDQodC10LrRgtC+0YAgWyR7Y2VsbC5jb2x9LCAke2NlbGwucm93fV1gO1xuICBjb25zdCBkZXNjID0gZGF0YT8uZGVzY3JpcHRpb24gfHwgJ9Cd0LXRgiDRgNCw0LfQstC10LTRi9Cy0LDRgtC10LvRjNC90YvRhSDQtNCw0L3QvdGL0YUuJztcbiAgY29uc3QgZmFjdGlvbiA9IGRhdGE/LmZhY3Rpb24gfHwgJ9Cd0LXQudGC0YDQsNC70YzQvdCw0Y8g0YLQtdGA0YDQuNGC0L7RgNC40Y8nO1xuICBjb25zdCBpbWcgPSBkYXRhPy5pbWFnZVVybDtcblxuICBjb25zdCBkYW5nZXJDb2xvcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgc2FmZTogJ3RleHQtZW1lcmFsZC00MDAgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIGJnLWVtZXJhbGQtOTUwLzYwJyxcbiAgICBsb3c6ICd0ZXh0LWJsdWUtNDAwIGJvcmRlci1ibHVlLTUwMC80MCBiZy1ibHVlLTk1MC82MCcsXG4gICAgbWVkaXVtOiAndGV4dC1hbWJlci00MDAgYm9yZGVyLWFtYmVyLTUwMC80MCBiZy1hbWJlci05NTAvNjAnLFxuICAgIGhpZ2g6ICd0ZXh0LW9yYW5nZS00MDAgYm9yZGVyLW9yYW5nZS01MDAvNDAgYmctb3JhbmdlLTk1MC82MCcsXG4gICAgY3JpdGljYWw6ICd0ZXh0LXJlZC00MDAgYm9yZGVyLXJlZC01MDAvNDAgYmctcmVkLTk1MC82MCBhbmltYXRlLXB1bHNlJyxcbiAgfTtcblxuICBjb25zdCBkYW5nZXJMYWJlbHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgc2FmZTogJ9CR0LXQt9C+0L/QsNGB0L3QvicsXG4gICAgbG93OiAn0J3QuNC30LrQsNGPINGD0LPRgNC+0LfQsCcsXG4gICAgbWVkaXVtOiAn0KHRgNC10LTQvdGP0Y8g0L7Qv9Cw0YHQvdC+0YHRgtGMJyxcbiAgICBoaWdoOiAn0JLRi9GB0L7QutCw0Y8g0L7Qv9Cw0YHQvdC+0YHRgtGMJyxcbiAgICBjcml0aWNhbDogJ9Ca0KDQmNCi0JjQp9CV0KHQmtCY0Jkg0KDQmNCh0JonLFxuICB9O1xuXG4gIGNvbnN0IGRhbmdlckNsYXNzID0gZGFuZ2VyQ29sb3JzW2RhdGE/LmRhbmdlckxldmVsIHx8ICdtZWRpdW0nXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICBsZWZ0OiBgJHtNYXRoLm1pbih3aW5kb3cuaW5uZXJXaWR0aCAtIDMyMCwgTWF0aC5tYXgoMTYsIHggKyAxNikpfXB4YCxcbiAgICAgICAgdG9wOiBgJHtNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQgLSAyODAsIE1hdGgubWF4KDE2LCB5IC0gMjApKX1weGAsXG4gICAgICAgIHpJbmRleDogOTk5OSxcbiAgICAgIH19XG4gICAgICBjbGFzc05hbWU9XCJ3LTcyIHBvaW50ZXItZXZlbnRzLW5vbmUgcm91bmRlZC1sZyBiZy16aW5jLTk1MC85NSBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHNoYWRvdy1bMF84cHhfMzBweF9yZ2IoMCwwLDAsMC44NSldIHAtMyB0ZXh0LXhzIGJhY2tkcm9wLWJsdXItbWQgdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTIwMFwiXG4gICAgPlxuICAgICAgey8qIFRvcCBCYWRnZSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTIgcGItMS41IGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICA8Q29tcGFzcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgPHNwYW4+0JrQu9GO0YfQtdCy0L7QtSDQvNC10YHRgtC+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2RhdGE/LmRhbmdlckxldmVsICYmIChcbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bOXB4XSBmb250LW1vbm8gcHgtMS41IHB5LTAuNSByb3VuZGVkIGJvcmRlciAke2RhbmdlckNsYXNzfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2RhbmdlckxhYmVsc1tkYXRhLmRhbmdlckxldmVsXX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE9wdGlvbmFsIEF0dGFjaGVkIEltYWdlICovfVxuICAgICAge2ltZyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGgtMjggbWItMiByb3VuZGVkIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXppbmMtODAwIGJnLXppbmMtOTAwXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPXtpbWd9XG4gICAgICAgICAgICBhbHQ9e3RpdGxlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXJcIlxuICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHtcbiAgICAgICAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20temluYy05NTAgdmlhLXRyYW5zcGFyZW50IHRvLXRyYW5zcGFyZW50IG9wYWNpdHktODBcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUaXRsZSAqL31cbiAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMTAwIGZvbnQtYm9sZCB0ZXh0LXNtIGxlYWRpbmctc251ZyBtYi0xIGZvbnQtcmFqZGhhbmlcIj5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9oND5cblxuICAgICAgey8qIEZhY3Rpb24gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgbWItMiBmb250LW1vbm9cIj5cbiAgICAgICAgPFNoaWVsZCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtc2t5LTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2ZhY3Rpb259PC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBEZXNjcmlwdGlvbiAqL31cbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDAgdGV4dC1bMTFweF0gbGVhZGluZy1yZWxheGVkIGxpbmUtY2xhbXAtMyBtYi0yIGZvbnQtc2Fuc1wiPlxuICAgICAgICB7ZGVzY31cbiAgICAgIDwvcD5cblxuICAgICAgey8qIFRyYWRlIHJlc291cmNlIGlmIHByZXNlbnQgKi99XG4gICAgICB7ZGF0YT8udHJhZGVSZXNvdXJjZSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1hbWJlci0zMDAvOTAgZm9udC1tb25vIGJnLWFtYmVyLTk1MC8zMCBib3JkZXIgYm9yZGVyLWFtYmVyLTgwMC80MCByb3VuZGVkIHB4LTIgcHktMSBtYi0xLjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICA8c3Bhbj7wn5OmINCg0LXRgdGD0YDRgdGLOjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntkYXRhLnRyYWRlUmVzb3VyY2V9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBIaW50ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy01MDAgZm9udC1tb25vIHRleHQtcmlnaHQgaXRhbGljIHB0LTEgYm9yZGVyLXQgYm9yZGVyLXppbmMtODAwLzYwXCI+XG4gICAgICAgINCa0LvQuNC60L3QuNGC0LUg0LTQu9GPINC+0YLQutGA0YvRgtC40Y8g0LTQvtGB0YzQtVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19