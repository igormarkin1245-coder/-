const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsx"];import * as __vite__cjsImport0_react from "react";
import { Palette, Sparkles, Sliders } from "lucide-react";
var _jsxFileName = "/app/applet/src/components/ColorGradientPicker.tsx";
import * as __vite__cjsImport2_react_jsxDevRuntime from "react/jsx-runtime";
const FACTION_PRESETS = [
	{
		name: "NCR Изумруд",
		color: "#10b981"
	},
	{
		name: "Анклав Синий",
		color: "#0284c7"
	},
	{
		name: "Легион Алый",
		color: "#ef4444"
	},
	{
		name: "Торговый Янтарь",
		color: "#f59e0b"
	},
	{
		name: "Улей Чейнджлингов",
		color: "#8b5cf6"
	},
	{
		name: "Кибер Белый",
		color: "#f8fafc"
	},
	{
		name: "Ржавая Пустошь",
		color: "#ea580c"
	},
	{
		name: "Неоновый Циан",
		color: "#06b6d4"
	},
	{
		name: "Розовый Неон",
		color: "#ec4899"
	},
	{
		name: "Стальной Серый",
		color: "#64748b"
	},
	{
		name: "Токсичный Лайм",
		color: "#84cc16"
	},
	{
		name: "Обсидиан",
		color: "#27272a"
	}
];
const GRADIENT_PRESETS = [
	{
		name: "Изумрудный луч",
		start: "#059669",
		end: "#34d399",
		angle: 135
	},
	{
		name: "Солнечная буря",
		start: "#d97706",
		end: "#fbbf24",
		angle: 90
	},
	{
		name: "Кровь и железо",
		start: "#991b1b",
		end: "#ef4444",
		angle: 45
	},
	{
		name: "Кибернетика",
		start: "#6d28d9",
		end: "#c084fc",
		angle: 135
	},
	{
		name: "Морской Анклав",
		start: "#0369a1",
		end: "#38bdf8",
		angle: 90
	},
	{
		name: "Радиоактивность",
		start: "#15803d",
		end: "#a3e635",
		angle: 135
	},
	{
		name: "Закат Пустоши",
		start: "#9a3412",
		end: "#fb923c",
		angle: 45
	},
	{
		name: "Холодная сталь",
		start: "#334155",
		end: "#94a3b8",
		angle: 180
	}
];
export const ColorGradientPicker = ({ value, onChange, label = "Цвет и стиль", showOpacity = true }) => {
	const isGrad = !!value.isGradient;
	const startColor = value.gradientStart || value.color || "#10b981";
	const endColor = value.gradientEnd || "#38bdf8";
	const angle = value.gradientAngle ?? 135;
	const opacity = value.opacity ?? 1;
	const previewStyle = isGrad ? {
		background: `linear-gradient(${angle}deg, ${startColor}, ${endColor})`,
		opacity
	} : {
		backgroundColor: value.color || "#10b981",
		opacity
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 space-y-3 text-xs",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-1.5 font-medium text-zinc-300",
					children: [/* @__PURE__ */ _jsxDEV(Palette, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("span", { children: label }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex bg-zinc-950 p-0.5 rounded border border-zinc-800",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => onChange({
							...value,
							isGradient: false
						}),
						className: `px-2 py-1 rounded text-[11px] font-medium transition ${!isGrad ? "bg-zinc-800 text-emerald-400 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`,
						children: "Сплошной"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => onChange({
							...value,
							isGradient: true,
							gradientStart: startColor,
							gradientEnd: endColor,
							gradientAngle: angle
						}),
						className: `px-2 py-1 rounded text-[11px] font-medium transition flex items-center gap-1 ${isGrad ? "bg-zinc-800 text-emerald-400 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`,
						children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-2.5 h-2.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 13
						}, this), "Градиент"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "h-7 flex-1 rounded border border-zinc-700 shadow-inner flex items-center justify-center text-[10px] text-white/90 font-mono font-semibold",
					style: previewStyle,
					children: isGrad ? `${startColor} ➔ ${endColor} (${angle}°)` : value.color
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 7
			}, this),
			!isGrad ? /* @__PURE__ */ _jsxDEV("div", { children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5",
					children: "Палитра фракций"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-6 gap-1.5",
					children: FACTION_PRESETS.map((p) => /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						title: p.name,
						onClick: () => onChange({
							...value,
							color: p.color
						}),
						className: `h-6 rounded border transition transform hover:scale-105 ${value.color === p.color ? "border-white ring-2 ring-emerald-500/50" : "border-zinc-700/60"}`,
						style: { backgroundColor: p.color }
					}, p.color, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "mt-2.5 flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV("input", {
						type: "color",
						value: value.color || "#10b981",
						onChange: (e) => onChange({
							...value,
							color: e.target.value
						}),
						className: "w-8 h-8 rounded border border-zinc-700 bg-transparent cursor-pointer p-0.5"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("input", {
						type: "text",
						value: value.color || "#10b981",
						onChange: (e) => onChange({
							...value,
							color: e.target.value
						}),
						className: "flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-zinc-200 font-mono text-xs uppercase",
						placeholder: "#10b981"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 144,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 123,
				columnNumber: 9
			}, this) : /* @__PURE__ */ _jsxDEV("div", {
				className: "space-y-2.5",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "text-[10px] text-zinc-400 uppercase tracking-wider",
						children: "Готовые градиенты"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-4 gap-1.5",
						children: GRADIENT_PRESETS.map((gp, i) => /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							title: gp.name,
							onClick: () => onChange({
								...value,
								isGradient: true,
								gradientStart: gp.start,
								gradientEnd: gp.end,
								gradientAngle: gp.angle
							}),
							className: "h-6 rounded border border-zinc-700/70 hover:scale-105 transition",
							style: { background: `linear-gradient(${gp.angle}deg, ${gp.start}, ${gp.end})` }
						}, i, false, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 165,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-2 gap-2 pt-1",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-zinc-400 mb-1",
							children: "Начальный цвет"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ _jsxDEV("input", {
								type: "color",
								value: startColor,
								onChange: (e) => onChange({
									...value,
									isGradient: true,
									gradientStart: e.target.value
								}),
								className: "w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer p-0.5"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: startColor,
								onChange: (e) => onChange({
									...value,
									isGradient: true,
									gradientStart: e.target.value
								}),
								className: "w-full bg-zinc-950 border border-zinc-800 rounded px-1.5 py-1 text-zinc-200 font-mono text-[11px] uppercase"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-zinc-400 mb-1",
							children: "Конечный цвет"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ _jsxDEV("input", {
								type: "color",
								value: endColor,
								onChange: (e) => onChange({
									...value,
									isGradient: true,
									gradientEnd: e.target.value
								}),
								className: "w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer p-0.5"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: endColor,
								onChange: (e) => onChange({
									...value,
									isGradient: true,
									gradientEnd: e.target.value
								}),
								className: "w-full bg-zinc-950 border border-zinc-800 rounded px-1.5 py-1 text-zinc-200 font-mono text-[11px] uppercase"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", { children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex justify-between text-[10px] text-zinc-400 mb-1",
							children: [/* @__PURE__ */ _jsxDEV("span", { children: "Угол поворота" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 236,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "font-mono text-zinc-200",
								children: [angle, "°"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("input", {
							type: "range",
							min: "0",
							max: "360",
							step: "15",
							value: angle,
							onChange: (e) => onChange({
								...value,
								isGradient: true,
								gradientAngle: Number(e.target.value)
							}),
							className: "w-full accent-emerald-500 cursor-pointer"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 239,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex justify-between text-[9px] text-zinc-500 font-mono mt-0.5",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onChange({
										...value,
										gradientAngle: 0
									}),
									className: "hover:text-zinc-300",
									children: "0° ↑"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onChange({
										...value,
										gradientAngle: 45
									}),
									className: "hover:text-zinc-300",
									children: "45° ↗"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onChange({
										...value,
										gradientAngle: 90
									}),
									className: "hover:text-zinc-300",
									children: "90° →"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 265,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onChange({
										...value,
										gradientAngle: 135
									}),
									className: "hover:text-zinc-300",
									children: "135° ↘"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 272,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onChange({
										...value,
										gradientAngle: 180
									}),
									className: "hover:text-zinc-300",
									children: "180° ↓"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 250,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 234,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 161,
				columnNumber: 9
			}, this),
			showOpacity && /* @__PURE__ */ _jsxDEV("div", {
				className: "pt-2 border-t border-zinc-800/80",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex justify-between text-[10px] text-zinc-400 mb-1",
					children: [/* @__PURE__ */ _jsxDEV("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ _jsxDEV(Sliders, { className: "w-3 h-3" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 296,
							columnNumber: 15
						}, this), " Прозрачность заливки"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 295,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("span", {
						className: "font-mono text-zinc-200",
						children: [Math.round(opacity * 100), "%"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 298,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 294,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("input", {
					type: "range",
					min: "0.05",
					max: "1",
					step: "0.05",
					value: opacity,
					onChange: (e) => onChange({
						...value,
						opacity: parseFloat(e.target.value)
					}),
					className: "w-full accent-emerald-500 cursor-pointer"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 300,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 293,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 69,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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O0dBSU4sZUFDQyx3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmLENBQ0Usd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZixDQUNFLHdCQUFDLFFBQUQ7TUFBTSxXQUFVO2dCQUFoQixDQUNFLHdCQUFDLFNBQUQsRUFBUyxXQUFVLFVBQVc7Ozs7Z0JBQUMsdUJBQzNCOzs7OztlQUNOLHdCQUFDLFFBQUQ7TUFBTSxXQUFVO2dCQUFoQixDQUEyQyxLQUFLLE1BQU0sVUFBVSxHQUFHLEdBQUUsR0FBTzs7Ozs7YUFDekU7Ozs7O2NBQ0wsd0JBQUMsU0FBRDtLQUNFLE1BQUs7S0FDTCxLQUFJO0tBQ0osS0FBSTtLQUNKLE1BQUs7S0FDTCxPQUFPO0tBQ1AsV0FBVyxNQUFNLFNBQVM7TUFBRSxHQUFHO01BQU8sU0FBUyxXQUFXLEVBQUUsT0FBTyxLQUFLO0tBQUUsQ0FBQztLQUMzRSxXQUFVO0lBQ1g7Ozs7WUFDRTs7Ozs7O0VBRUo7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkNvbG9yR3JhZGllbnRQaWNrZXIudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQYWxldHRlLCBTcGFya2xlcywgU2xpZGVycyB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JHcmFkaWVudFZhbHVlIHtcbiAgaXNHcmFkaWVudDogYm9vbGVhbjtcbiAgY29sb3I6IHN0cmluZztcbiAgZ3JhZGllbnRTdGFydD86IHN0cmluZztcbiAgZ3JhZGllbnRFbmQ/OiBzdHJpbmc7XG4gIGdyYWRpZW50QW5nbGU/OiBudW1iZXI7XG4gIG9wYWNpdHk/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIHZhbHVlOiBDb2xvckdyYWRpZW50VmFsdWU7XG4gIG9uQ2hhbmdlOiAodmFsOiBDb2xvckdyYWRpZW50VmFsdWUpID0+IHZvaWQ7XG4gIGxhYmVsPzogc3RyaW5nO1xuICBzaG93T3BhY2l0eT86IGJvb2xlYW47XG59XG5cbmNvbnN0IEZBQ1RJT05fUFJFU0VUUyA9IFtcbiAgeyBuYW1lOiAnTkNSINCY0LfRg9C80YDRg9C0JywgY29sb3I6ICcjMTBiOTgxJyB9LFxuICB7IG5hbWU6ICfQkNC90LrQu9Cw0LIg0KHQuNC90LjQuScsIGNvbG9yOiAnIzAyODRjNycgfSxcbiAgeyBuYW1lOiAn0JvQtdCz0LjQvtC9INCQ0LvRi9C5JywgY29sb3I6ICcjZWY0NDQ0JyB9LFxuICB7IG5hbWU6ICfQotC+0YDQs9C+0LLRi9C5INCv0L3RgtCw0YDRjCcsIGNvbG9yOiAnI2Y1OWUwYicgfSxcbiAgeyBuYW1lOiAn0KPQu9C10Lkg0KfQtdC50L3QtNC20LvQuNC90LPQvtCyJywgY29sb3I6ICcjOGI1Y2Y2JyB9LFxuICB7IG5hbWU6ICfQmtC40LHQtdGAINCR0LXQu9GL0LknLCBjb2xvcjogJyNmOGZhZmMnIH0sXG4gIHsgbmFtZTogJ9Cg0LbQsNCy0LDRjyDQn9GD0YHRgtC+0YjRjCcsIGNvbG9yOiAnI2VhNTgwYycgfSxcbiAgeyBuYW1lOiAn0J3QtdC+0L3QvtCy0YvQuSDQptC40LDQvScsIGNvbG9yOiAnIzA2YjZkNCcgfSxcbiAgeyBuYW1lOiAn0KDQvtC30L7QstGL0Lkg0J3QtdC+0L0nLCBjb2xvcjogJyNlYzQ4OTknIH0sXG4gIHsgbmFtZTogJ9Ch0YLQsNC70YzQvdC+0Lkg0KHQtdGA0YvQuScsIGNvbG9yOiAnIzY0NzQ4YicgfSxcbiAgeyBuYW1lOiAn0KLQvtC60YHQuNGH0L3Ri9C5INCb0LDQudC8JywgY29sb3I6ICcjODRjYzE2JyB9LFxuICB7IG5hbWU6ICfQntCx0YHQuNC00LjQsNC9JywgY29sb3I6ICcjMjcyNzJhJyB9LFxuXTtcblxuY29uc3QgR1JBRElFTlRfUFJFU0VUUyA9IFtcbiAgeyBuYW1lOiAn0JjQt9GD0LzRgNGD0LTQvdGL0Lkg0LvRg9GHJywgc3RhcnQ6ICcjMDU5NjY5JywgZW5kOiAnIzM0ZDM5OScsIGFuZ2xlOiAxMzUgfSxcbiAgeyBuYW1lOiAn0KHQvtC70L3QtdGH0L3QsNGPINCx0YPRgNGPJywgc3RhcnQ6ICcjZDk3NzA2JywgZW5kOiAnI2ZiYmYyNCcsIGFuZ2xlOiA5MCB9LFxuICB7IG5hbWU6ICfQmtGA0L7QstGMINC4INC20LXQu9C10LfQvicsIHN0YXJ0OiAnIzk5MWIxYicsIGVuZDogJyNlZjQ0NDQnLCBhbmdsZTogNDUgfSxcbiAgeyBuYW1lOiAn0JrQuNCx0LXRgNC90LXRgtC40LrQsCcsIHN0YXJ0OiAnIzZkMjhkOScsIGVuZDogJyNjMDg0ZmMnLCBhbmdsZTogMTM1IH0sXG4gIHsgbmFtZTogJ9Cc0L7RgNGB0LrQvtC5INCQ0L3QutC70LDQsicsIHN0YXJ0OiAnIzAzNjlhMScsIGVuZDogJyMzOGJkZjgnLCBhbmdsZTogOTAgfSxcbiAgeyBuYW1lOiAn0KDQsNC00LjQvtCw0LrRgtC40LLQvdC+0YHRgtGMJywgc3RhcnQ6ICcjMTU4MDNkJywgZW5kOiAnI2EzZTYzNScsIGFuZ2xlOiAxMzUgfSxcbiAgeyBuYW1lOiAn0JfQsNC60LDRgiDQn9GD0YHRgtC+0YjQuCcsIHN0YXJ0OiAnIzlhMzQxMicsIGVuZDogJyNmYjkyM2MnLCBhbmdsZTogNDUgfSxcbiAgeyBuYW1lOiAn0KXQvtC70L7QtNC90LDRjyDRgdGC0LDQu9GMJywgc3RhcnQ6ICcjMzM0MTU1JywgZW5kOiAnIzk0YTNiOCcsIGFuZ2xlOiAxODAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBDb2xvckdyYWRpZW50UGlja2VyOiBSZWFjdC5GQzxQcm9wcz4gPSAoe1xuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIGxhYmVsID0gJ9Cm0LLQtdGCINC4INGB0YLQuNC70YwnLFxuICBzaG93T3BhY2l0eSA9IHRydWUsXG59KSA9PiB7XG4gIGNvbnN0IGlzR3JhZCA9ICEhdmFsdWUuaXNHcmFkaWVudDtcbiAgY29uc3Qgc3RhcnRDb2xvciA9IHZhbHVlLmdyYWRpZW50U3RhcnQgfHwgdmFsdWUuY29sb3IgfHwgJyMxMGI5ODEnO1xuICBjb25zdCBlbmRDb2xvciA9IHZhbHVlLmdyYWRpZW50RW5kIHx8ICcjMzhiZGY4JztcbiAgY29uc3QgYW5nbGUgPSB2YWx1ZS5ncmFkaWVudEFuZ2xlID8/IDEzNTtcbiAgY29uc3Qgb3BhY2l0eSA9IHZhbHVlLm9wYWNpdHkgPz8gMTtcblxuICBjb25zdCBwcmV2aWV3U3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSBpc0dyYWRcbiAgICA/IHtcbiAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgke2FuZ2xlfWRlZywgJHtzdGFydENvbG9yfSwgJHtlbmRDb2xvcn0pYCxcbiAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgIH1cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB2YWx1ZS5jb2xvciB8fCAnIzEwYjk4MScsXG4gICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHJvdW5kZWQtbGcgcC0zIHNwYWNlLXktMyB0ZXh0LXhzXCI+XG4gICAgICB7LyogSGVhZGVyIGFuZCBUb2dnbGUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZm9udC1tZWRpdW0gdGV4dC16aW5jLTMwMFwiPlxuICAgICAgICAgIDxQYWxldHRlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYmctemluYy05NTAgcC0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZSh7IC4uLnZhbHVlLCBpc0dyYWRpZW50OiBmYWxzZSB9KX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMSByb3VuZGVkIHRleHQtWzExcHhdIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gJHtcbiAgICAgICAgICAgICAgIWlzR3JhZFxuICAgICAgICAgICAgICAgID8gJ2JnLXppbmMtODAwIHRleHQtZW1lcmFsZC00MDAgc2hhZG93LXNtJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgINCh0L/Qu9C+0YjQvdC+0LlcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgICAgICAgICBpc0dyYWRpZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50U3RhcnQ6IHN0YXJ0Q29sb3IsXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRFbmQ6IGVuZENvbG9yLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50QW5nbGU6IGFuZ2xlLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC1bMTFweF0gZm9udC1tZWRpdW0gdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSAke1xuICAgICAgICAgICAgICBpc0dyYWRcbiAgICAgICAgICAgICAgICA/ICdiZy16aW5jLTgwMCB0ZXh0LWVtZXJhbGQtNDAwIHNoYWRvdy1zbSdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjVcIiAvPlxuICAgICAgICAgICAg0JPRgNCw0LTQuNC10L3RglxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTGl2ZSBQcmV2aWV3ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiaC03IGZsZXgtMSByb3VuZGVkIGJvcmRlciBib3JkZXItemluYy03MDAgc2hhZG93LWlubmVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtWzEwcHhdIHRleHQtd2hpdGUvOTAgZm9udC1tb25vIGZvbnQtc2VtaWJvbGRcIlxuICAgICAgICAgIHN0eWxlPXtwcmV2aWV3U3R5bGV9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNHcmFkID8gYCR7c3RhcnRDb2xvcn0g4p6UICR7ZW5kQ29sb3J9ICgke2FuZ2xlfcKwKWAgOiB2YWx1ZS5jb2xvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFByZXNldHMgKi99XG4gICAgICB7IWlzR3JhZCA/IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTEuNVwiPlxuICAgICAgICAgICAg0J/QsNC70LjRgtGA0LAg0YTRgNCw0LrRhtC40LlcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTYgZ2FwLTEuNVwiPlxuICAgICAgICAgICAge0ZBQ1RJT05fUFJFU0VUUy5tYXAoKHApID0+IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17cC5jb2xvcn1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0aXRsZT17cC5uYW1lfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHsgLi4udmFsdWUsIGNvbG9yOiBwLmNvbG9yIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtNiByb3VuZGVkIGJvcmRlciB0cmFuc2l0aW9uIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgJHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlLmNvbG9yID09PSBwLmNvbG9yXG4gICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci13aGl0ZSByaW5nLTIgcmluZy1lbWVyYWxkLTUwMC81MCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXppbmMtNzAwLzYwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogcC5jb2xvciB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJjb2xvclwiXG4gICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZS5jb2xvciB8fCAnIzEwYjk4MSd9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoeyAuLi52YWx1ZSwgY29sb3I6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQgYm9yZGVyIGJvcmRlci16aW5jLTcwMCBiZy10cmFuc3BhcmVudCBjdXJzb3ItcG9pbnRlciBwLTAuNVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlLmNvbG9yIHx8ICcjMTBiOTgxJ31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZSh7IC4uLnZhbHVlLCBjb2xvcjogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHJvdW5kZWQgcHgtMiBweS0xIHRleHQtemluYy0yMDAgZm9udC1tb25vIHRleHQteHMgdXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIjMTBiOTgxXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgINCT0L7RgtC+0LLRi9C1INCz0YDQsNC00LjQtdC90YLRi1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtNCBnYXAtMS41XCI+XG4gICAgICAgICAgICB7R1JBRElFTlRfUFJFU0VUUy5tYXAoKGdwLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdGl0bGU9e2dwLm5hbWV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGlzR3JhZGllbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50U3RhcnQ6IGdwLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudEVuZDogZ3AuZW5kLFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudEFuZ2xlOiBncC5hbmdsZSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNiByb3VuZGVkIGJvcmRlciBib3JkZXItemluYy03MDAvNzAgaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KCR7Z3AuYW5nbGV9ZGVnLCAke2dwLnN0YXJ0fSwgJHtncC5lbmR9KWAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIHB0LTFcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBtYi0xXCI+0J3QsNGH0LDQu9GM0L3Ri9C5INGG0LLQtdGCPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNvbG9yXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtzdGFydENvbG9yfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZSh7IC4uLnZhbHVlLCBpc0dyYWRpZW50OiB0cnVlLCBncmFkaWVudFN0YXJ0OiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy02IGgtNiByb3VuZGVkIGJvcmRlciBib3JkZXItemluYy03MDAgYmctdHJhbnNwYXJlbnQgY3Vyc29yLXBvaW50ZXIgcC0wLjVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c3RhcnRDb2xvcn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UoeyAuLi52YWx1ZSwgaXNHcmFkaWVudDogdHJ1ZSwgZ3JhZGllbnRTdGFydDogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHJvdW5kZWQgcHgtMS41IHB5LTEgdGV4dC16aW5jLTIwMCBmb250LW1vbm8gdGV4dC1bMTFweF0gdXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgbWItMVwiPtCa0L7QvdC10YfQvdGL0Lkg0YbQstC10YI8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY29sb3JcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2VuZENvbG9yfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZSh7IC4uLnZhbHVlLCBpc0dyYWRpZW50OiB0cnVlLCBncmFkaWVudEVuZDogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNiBoLTYgcm91bmRlZCBib3JkZXIgYm9yZGVyLXppbmMtNzAwIGJnLXRyYW5zcGFyZW50IGN1cnNvci1wb2ludGVyIHAtMC41XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2VuZENvbG9yfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZSh7IC4uLnZhbHVlLCBpc0dyYWRpZW50OiB0cnVlLCBncmFkaWVudEVuZDogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHJvdW5kZWQgcHgtMS41IHB5LTEgdGV4dC16aW5jLTIwMCBmb250LW1vbm8gdGV4dC1bMTFweF0gdXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuPtCj0LPQvtC7INC/0L7QstC+0YDQvtGC0LA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXppbmMtMjAwXCI+e2FuZ2xlfcKwPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgIG1heD1cIjM2MFwiXG4gICAgICAgICAgICAgIHN0ZXA9XCIxNVwiXG4gICAgICAgICAgICAgIHZhbHVlPXthbmdsZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHsgLi4udmFsdWUsIGlzR3JhZGllbnQ6IHRydWUsIGdyYWRpZW50QW5nbGU6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWVtZXJhbGQtNTAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQtWzlweF0gdGV4dC16aW5jLTUwMCBmb250LW1vbm8gbXQtMC41XCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZSh7IC4uLnZhbHVlLCBncmFkaWVudEFuZ2xlOiAwIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtemluYy0zMDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgMMKwIOKGkVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHsgLi4udmFsdWUsIGdyYWRpZW50QW5nbGU6IDQ1IH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtemluYy0zMDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgNDXCsCDihpdcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZSh7IC4uLnZhbHVlLCBncmFkaWVudEFuZ2xlOiA5MCB9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LXppbmMtMzAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDkwwrAg4oaSXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2UoeyAuLi52YWx1ZSwgZ3JhZGllbnRBbmdsZTogMTM1IH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtemluYy0zMDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgMTM1wrAg4oaYXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2UoeyAuLi52YWx1ZSwgZ3JhZGllbnRBbmdsZTogMTgwIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtemluYy0zMDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgMTgwwrAg4oaTXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIE9wYWNpdHkgc2xpZGVyICovfVxuICAgICAge3Nob3dPcGFjaXR5ICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci16aW5jLTgwMC84MFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8U2xpZGVycyBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz4g0J/RgNC+0LfRgNCw0YfQvdC+0YHRgtGMINC30LDQu9C40LLQutC4XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC16aW5jLTIwMFwiPntNYXRoLnJvdW5kKG9wYWNpdHkgKiAxMDApfSU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgbWluPVwiMC4wNVwiXG4gICAgICAgICAgICBtYXg9XCIxXCJcbiAgICAgICAgICAgIHN0ZXA9XCIwLjA1XCJcbiAgICAgICAgICAgIHZhbHVlPXtvcGFjaXR5fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZSh7IC4uLnZhbHVlLCBvcGFjaXR5OiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSB9KX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtZW1lcmFsZC01MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=