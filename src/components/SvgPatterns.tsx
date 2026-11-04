const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport1_react_jsxDevRuntime["jsxDEV"];import * as __vite__cjsImport0_react from "react";
var _jsxFileName = "/app/applet/src/components/SvgPatterns.tsx";
import * as __vite__cjsImport1_react_jsxDevRuntime from "react/jsx-dev-runtime";
export const SvgDefs = ({ octagons, labels, accentColor }) => {
	// Extract all unique gradients from octagons
	const octagonGradients = Object.values(octagons).filter((o) => o.isGradient);
	const labelGradients = labels.filter((l) => l.isGradient);
	return /* @__PURE__ */ _jsxDEV("defs", { children: [
		/* @__PURE__ */ _jsxDEV("filter", {
			id: "tactical-pulse-filter",
			x: "-50%",
			y: "-50%",
			width: "200%",
			height: "200%",
			children: [
				/* @__PURE__ */ _jsxDEV("feGaussianBlur", {
					in: "SourceGraphic",
					stdDeviation: "4",
					result: "blur1"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("feGaussianBlur", {
					in: "SourceGraphic",
					stdDeviation: "9",
					result: "blur2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("feMerge", { children: [
					/* @__PURE__ */ _jsxDEV("feMergeNode", { in: "blur2" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("feMergeNode", { in: "blur1" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 23,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("feMergeNode", { in: "SourceGraphic" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("pattern", {
			id: "pattern-hatch-emerald",
			width: "10",
			height: "10",
			patternTransform: "rotate(45 0 0)",
			patternUnits: "userSpaceOnUse",
			children: /* @__PURE__ */ _jsxDEV("line", {
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "10",
				stroke: "#10b981",
				strokeWidth: "3",
				opacity: "0.8"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 36,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 29,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("pattern", {
			id: "pattern-hatch-purple",
			width: "10",
			height: "10",
			patternTransform: "rotate(45 0 0)",
			patternUnits: "userSpaceOnUse",
			children: /* @__PURE__ */ _jsxDEV("line", {
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "10",
				stroke: "#8b5cf6",
				strokeWidth: "3.5",
				opacity: "0.85"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 46,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 7
		}, this),
		Object.values(octagons).filter((o) => o.type === "striped").map((o) => /* @__PURE__ */ _jsxDEV("pattern", {
			id: `pattern-striped-${o.id}`,
			width: "12",
			height: "12",
			patternTransform: "rotate(45 0 0)",
			patternUnits: "userSpaceOnUse",
			children: /* @__PURE__ */ _jsxDEV("line", {
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "12",
				stroke: o.fillColor || "#8b5cf6",
				strokeWidth: "4",
				opacity: "0.85"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 61,
				columnNumber: 13
			}, this)
		}, `pattern-striped-${o.id}`, false, {
			fileName: _jsxFileName,
			lineNumber: 53,
			columnNumber: 11
		}, this)),
		octagonGradients.map((o) => {
			const angle = o.gradientAngle ?? 135;
			// Convert angle into SVG gradient x1, y1, x2, y2
			const rad = angle * Math.PI / 180;
			const x1 = Math.round(50 - Math.cos(rad) * 50) + "%";
			const y1 = Math.round(50 - Math.sin(rad) * 50) + "%";
			const x2 = Math.round(50 + Math.cos(rad) * 50) + "%";
			const y2 = Math.round(50 + Math.sin(rad) * 50) + "%";
			return /* @__PURE__ */ _jsxDEV("linearGradient", {
				id: `grad-oct-${o.id}`,
				x1,
				y1,
				x2,
				y2,
				children: [/* @__PURE__ */ _jsxDEV("stop", {
					offset: "0%",
					stopColor: o.gradientStart || o.fillColor
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 13
				}, this), /* @__PURE__ */ _jsxDEV("stop", {
					offset: "100%",
					stopColor: o.gradientEnd || "#38bdf8"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 13
				}, this)]
			}, `grad-oct-${o.id}`, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 11
			}, this);
		}),
		labelGradients.map((l) => {
			const angle = l.gradientAngle ?? 135;
			const rad = angle * Math.PI / 180;
			const x1 = Math.round(50 - Math.cos(rad) * 50) + "%";
			const y1 = Math.round(50 - Math.sin(rad) * 50) + "%";
			const x2 = Math.round(50 + Math.cos(rad) * 50) + "%";
			const y2 = Math.round(50 + Math.sin(rad) * 50) + "%";
			return /* @__PURE__ */ _jsxDEV("linearGradient", {
				id: `grad-lbl-${l.id}`,
				x1,
				y1,
				x2,
				y2,
				children: [/* @__PURE__ */ _jsxDEV("stop", {
					offset: "0%",
					stopColor: l.gradientStart || l.color
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 116,
					columnNumber: 13
				}, this), /* @__PURE__ */ _jsxDEV("stop", {
					offset: "100%",
					stopColor: l.gradientEnd || "#38bdf8"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 13
				}, this)]
			}, `grad-lbl-${l.id}`, true, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 11
			}, this);
		}),
		/* @__PURE__ */ _jsxDEV("filter", {
			id: "accent-glow",
			x: "-20%",
			y: "-20%",
			width: "140%",
			height: "140%",
			children: /* @__PURE__ */ _jsxDEV("feDropShadow", {
				dx: "0",
				dy: "0",
				stdDeviation: "5",
				floodColor: accentColor,
				floodOpacity: "0.7"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 123,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 16,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUFRLEtBQUssS0FBTTtHQUNoQyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssS0FBSyxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUk7R0FDakQsTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJO0dBQ2pELE1BQU0sS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSTtHQUNqRCxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssS0FBSyxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUk7R0FFakQsT0FDRSx3QkFBQyxrQkFBRDtJQUVFLElBQUksWUFBWSxFQUFFO0lBQ2Q7SUFDQTtJQUNBO0lBQ0E7Y0FOTixDQVFFLHdCQUFDLFFBQUQ7S0FBTSxRQUFPO0tBQUssV0FBVyxFQUFFLGlCQUFpQixFQUFFO0lBQVE7Ozs7Y0FDMUQsd0JBQUMsUUFBRDtLQUFNLFFBQU87S0FBTyxXQUFXLEVBQUUsZUFBZTtJQUFZOzs7O1lBQzlDO01BVFQsWUFBWSxFQUFFOzs7O1VBU0w7RUFFcEIsQ0FBQztFQUdELHdCQUFDLFVBQUQ7R0FBUSxJQUFHO0dBQWMsR0FBRTtHQUFPLEdBQUU7R0FBTyxPQUFNO0dBQU8sUUFBTzthQUM3RCx3QkFBQyxnQkFBRDtJQUFjLElBQUc7SUFBSSxJQUFHO0lBQUksY0FBYTtJQUFJLFlBQVk7SUFBYSxjQUFhO0dBQU87Ozs7O0VBQ3BGOzs7OztDQUNKOzs7OztBQUVWIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlN2Z1BhdHRlcm5zLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgT2N0YWdvbkNlbGwsIE1hcExhYmVsIH0gZnJvbSAnLi4vdHlwZXMvbWFwJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgb2N0YWdvbnM6IFJlY29yZDxzdHJpbmcsIE9jdGFnb25DZWxsPjtcbiAgbGFiZWxzOiBNYXBMYWJlbFtdO1xuICBhY2NlbnRDb2xvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgU3ZnRGVmczogUmVhY3QuRkM8UHJvcHM+ID0gKHsgb2N0YWdvbnMsIGxhYmVscywgYWNjZW50Q29sb3IgfSkgPT4ge1xuICAvLyBFeHRyYWN0IGFsbCB1bmlxdWUgZ3JhZGllbnRzIGZyb20gb2N0YWdvbnNcbiAgY29uc3Qgb2N0YWdvbkdyYWRpZW50cyA9IE9iamVjdC52YWx1ZXMob2N0YWdvbnMpLmZpbHRlcigobykgPT4gby5pc0dyYWRpZW50KTtcbiAgY29uc3QgbGFiZWxHcmFkaWVudHMgPSBsYWJlbHMuZmlsdGVyKChsKSA9PiBsLmlzR3JhZGllbnQpO1xuXG4gIHJldHVybiAoXG4gICAgPGRlZnM+XG4gICAgICB7LyogU29mdCBHbG93IGZpbHRlciBmb3IgcHVsc2F0aW5nIEtleSBMb2NhdGlvbnMgKi99XG4gICAgICA8ZmlsdGVyIGlkPVwidGFjdGljYWwtcHVsc2UtZmlsdGVyXCIgeD1cIi01MCVcIiB5PVwiLTUwJVwiIHdpZHRoPVwiMjAwJVwiIGhlaWdodD1cIjIwMCVcIj5cbiAgICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPVwiU291cmNlR3JhcGhpY1wiIHN0ZERldmlhdGlvbj1cIjRcIiByZXN1bHQ9XCJibHVyMVwiIC8+XG4gICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj1cIlNvdXJjZUdyYXBoaWNcIiBzdGREZXZpYXRpb249XCI5XCIgcmVzdWx0PVwiYmx1cjJcIiAvPlxuICAgICAgICA8ZmVNZXJnZT5cbiAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49XCJibHVyMlwiIC8+XG4gICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPVwiYmx1cjFcIiAvPlxuICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj1cIlNvdXJjZUdyYXBoaWNcIiAvPlxuICAgICAgICA8L2ZlTWVyZ2U+XG4gICAgICA8L2ZpbHRlcj5cblxuICAgICAgey8qIEJhc2ljIFRhY3RpY2FsIFN0cmlwZSBQYXR0ZXJuICovfVxuICAgICAgPHBhdHRlcm5cbiAgICAgICAgaWQ9XCJwYXR0ZXJuLWhhdGNoLWVtZXJhbGRcIlxuICAgICAgICB3aWR0aD1cIjEwXCJcbiAgICAgICAgaGVpZ2h0PVwiMTBcIlxuICAgICAgICBwYXR0ZXJuVHJhbnNmb3JtPVwicm90YXRlKDQ1IDAgMClcIlxuICAgICAgICBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICA+XG4gICAgICAgIDxsaW5lIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMTBcIiBzdHJva2U9XCIjMTBiOTgxXCIgc3Ryb2tlV2lkdGg9XCIzXCIgb3BhY2l0eT1cIjAuOFwiIC8+XG4gICAgICA8L3BhdHRlcm4+XG5cbiAgICAgIDxwYXR0ZXJuXG4gICAgICAgIGlkPVwicGF0dGVybi1oYXRjaC1wdXJwbGVcIlxuICAgICAgICB3aWR0aD1cIjEwXCJcbiAgICAgICAgaGVpZ2h0PVwiMTBcIlxuICAgICAgICBwYXR0ZXJuVHJhbnNmb3JtPVwicm90YXRlKDQ1IDAgMClcIlxuICAgICAgICBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICA+XG4gICAgICAgIDxsaW5lIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMTBcIiBzdHJva2U9XCIjOGI1Y2Y2XCIgc3Ryb2tlV2lkdGg9XCIzLjVcIiBvcGFjaXR5PVwiMC44NVwiIC8+XG4gICAgICA8L3BhdHRlcm4+XG5cbiAgICAgIHsvKiBEeW5hbWljIHN0cmlwZWQgcGF0dGVybnMgYmFzZWQgb24gY29sb3IgKi99XG4gICAgICB7T2JqZWN0LnZhbHVlcyhvY3RhZ29ucylcbiAgICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnc3RyaXBlZCcpXG4gICAgICAgIC5tYXAoKG8pID0+IChcbiAgICAgICAgICA8cGF0dGVyblxuICAgICAgICAgICAga2V5PXtgcGF0dGVybi1zdHJpcGVkLSR7by5pZH1gfVxuICAgICAgICAgICAgaWQ9e2BwYXR0ZXJuLXN0cmlwZWQtJHtvLmlkfWB9XG4gICAgICAgICAgICB3aWR0aD1cIjEyXCJcbiAgICAgICAgICAgIGhlaWdodD1cIjEyXCJcbiAgICAgICAgICAgIHBhdHRlcm5UcmFuc2Zvcm09XCJyb3RhdGUoNDUgMCAwKVwiXG4gICAgICAgICAgICBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGxpbmVcbiAgICAgICAgICAgICAgeDE9XCIwXCJcbiAgICAgICAgICAgICAgeTE9XCIwXCJcbiAgICAgICAgICAgICAgeDI9XCIwXCJcbiAgICAgICAgICAgICAgeTI9XCIxMlwiXG4gICAgICAgICAgICAgIHN0cm9rZT17by5maWxsQ29sb3IgfHwgJyM4YjVjZjYnfVxuICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjRcIlxuICAgICAgICAgICAgICBvcGFjaXR5PVwiMC44NVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgKSl9XG5cbiAgICAgIHsvKiBMaW5lYXIgZ3JhZGllbnRzIGZvciBPY3RhZ29ucyAqL31cbiAgICAgIHtvY3RhZ29uR3JhZGllbnRzLm1hcCgobykgPT4ge1xuICAgICAgICBjb25zdCBhbmdsZSA9IG8uZ3JhZGllbnRBbmdsZSA/PyAxMzU7XG4gICAgICAgIC8vIENvbnZlcnQgYW5nbGUgaW50byBTVkcgZ3JhZGllbnQgeDEsIHkxLCB4MiwgeTJcbiAgICAgICAgY29uc3QgcmFkID0gKGFuZ2xlICogTWF0aC5QSSkgLyAxODA7XG4gICAgICAgIGNvbnN0IHgxID0gTWF0aC5yb3VuZCg1MCAtIE1hdGguY29zKHJhZCkgKiA1MCkgKyAnJSc7XG4gICAgICAgIGNvbnN0IHkxID0gTWF0aC5yb3VuZCg1MCAtIE1hdGguc2luKHJhZCkgKiA1MCkgKyAnJSc7XG4gICAgICAgIGNvbnN0IHgyID0gTWF0aC5yb3VuZCg1MCArIE1hdGguY29zKHJhZCkgKiA1MCkgKyAnJSc7XG4gICAgICAgIGNvbnN0IHkyID0gTWF0aC5yb3VuZCg1MCArIE1hdGguc2luKHJhZCkgKiA1MCkgKyAnJSc7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGluZWFyR3JhZGllbnRcbiAgICAgICAgICAgIGtleT17YGdyYWQtb2N0LSR7by5pZH1gfVxuICAgICAgICAgICAgaWQ9e2BncmFkLW9jdC0ke28uaWR9YH1cbiAgICAgICAgICAgIHgxPXt4MX1cbiAgICAgICAgICAgIHkxPXt5MX1cbiAgICAgICAgICAgIHgyPXt4Mn1cbiAgICAgICAgICAgIHkyPXt5Mn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3BDb2xvcj17by5ncmFkaWVudFN0YXJ0IHx8IG8uZmlsbENvbG9yfSAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj17by5ncmFkaWVudEVuZCB8fCAnIzM4YmRmOCd9IC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuXG4gICAgICB7LyogTGluZWFyIGdyYWRpZW50cyBmb3IgTGFiZWxzICovfVxuICAgICAge2xhYmVsR3JhZGllbnRzLm1hcCgobCkgPT4ge1xuICAgICAgICBjb25zdCBhbmdsZSA9IGwuZ3JhZGllbnRBbmdsZSA/PyAxMzU7XG4gICAgICAgIGNvbnN0IHJhZCA9IChhbmdsZSAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgICBjb25zdCB4MSA9IE1hdGgucm91bmQoNTAgLSBNYXRoLmNvcyhyYWQpICogNTApICsgJyUnO1xuICAgICAgICBjb25zdCB5MSA9IE1hdGgucm91bmQoNTAgLSBNYXRoLnNpbihyYWQpICogNTApICsgJyUnO1xuICAgICAgICBjb25zdCB4MiA9IE1hdGgucm91bmQoNTAgKyBNYXRoLmNvcyhyYWQpICogNTApICsgJyUnO1xuICAgICAgICBjb25zdCB5MiA9IE1hdGgucm91bmQoNTAgKyBNYXRoLnNpbihyYWQpICogNTApICsgJyUnO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGxpbmVhckdyYWRpZW50XG4gICAgICAgICAgICBrZXk9e2BncmFkLWxibC0ke2wuaWR9YH1cbiAgICAgICAgICAgIGlkPXtgZ3JhZC1sYmwtJHtsLmlkfWB9XG4gICAgICAgICAgICB4MT17eDF9XG4gICAgICAgICAgICB5MT17eTF9XG4gICAgICAgICAgICB4Mj17eDJ9XG4gICAgICAgICAgICB5Mj17eTJ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9e2wuZ3JhZGllbnRTdGFydCB8fCBsLmNvbG9yfSAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj17bC5ncmFkaWVudEVuZCB8fCAnIzM4YmRmOCd9IC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuXG4gICAgICB7LyogVGhlbWUgYWNjZW50IGdsb3cgbWFya2VyICovfVxuICAgICAgPGZpbHRlciBpZD1cImFjY2VudC1nbG93XCIgeD1cIi0yMCVcIiB5PVwiLTIwJVwiIHdpZHRoPVwiMTQwJVwiIGhlaWdodD1cIjE0MCVcIj5cbiAgICAgICAgPGZlRHJvcFNoYWRvdyBkeD1cIjBcIiBkeT1cIjBcIiBzdGREZXZpYXRpb249XCI1XCIgZmxvb2RDb2xvcj17YWNjZW50Q29sb3J9IGZsb29kT3BhY2l0eT1cIjAuN1wiIC8+XG4gICAgICA8L2ZpbHRlcj5cbiAgICA8L2RlZnM+XG4gICk7XG59O1xuIl19