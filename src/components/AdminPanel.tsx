const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport4_react_jsxDevRuntime["Fragment"];import * as __vite__cjsImport0_react from "react";
import { ColorGradientPicker } from "./ColorGradientPicker.tsx";
import { generateProjectZip } from "../utils/projectZip.ts";
import { Lock, Unlock, Paintbrush, Type, Eraser, Compass, Download, Upload, RotateCcw, ChevronRight, ChevronDown, Sparkles, ArrowRight, AlertTriangle, HelpCircle, Copy, Check, FileArchive, Share2 } from "lucide-react";
var _jsxFileName = "/app/applet/src/components/AdminPanel.tsx";
import * as __vite__cjsImport4_react_jsxDevRuntime from "react/jsx-dev-runtime";
const FONT_OPTIONS = [
	{
		id: "Orbitron",
		name: "Orbitron (Тактический Sci-Fi)"
	},
	{
		id: "Share Tech Mono",
		name: "Share Tech Mono (Pip-Boy)"
	},
	{
		id: "Rajdhani",
		name: "Rajdhani (Военный Штаб)"
	},
	{
		id: "Russo One",
		name: "Russo One (Тяжелый брутальный)"
	},
	{
		id: "Cinzel",
		name: "Cinzel (Имперский / Величественный)"
	},
	{
		id: "MedievalSharp",
		name: "MedievalSharp (Фэнтезийный лор)"
	},
	{
		id: "JetBrains Mono",
		name: "JetBrains Mono (Кодовый)"
	},
	{
		id: "Montserrat",
		name: "Montserrat (Строгий гротеск)"
	},
	{
		id: "Playfair Display",
		name: "Playfair Display (Винтаж)"
	}
];
const COMPASS_DIRECTIONS = [
	{
		label: "С (N)",
		angle: 270,
		arrow: "↑"
	},
	{
		label: "СВ (NE)",
		angle: 315,
		arrow: "↗"
	},
	{
		label: "В (E)",
		angle: 0,
		arrow: "→"
	},
	{
		label: "ЮВ (SE)",
		angle: 45,
		arrow: "↘"
	},
	{
		label: "Ю (S)",
		angle: 90,
		arrow: "↓"
	},
	{
		label: "ЮЗ (SW)",
		angle: 135,
		arrow: "↙"
	},
	{
		label: "З (W)",
		angle: 180,
		arrow: "←"
	},
	{
		label: "СЗ (NW)",
		angle: 225,
		arrow: "↖"
	}
];
const THEME_ACCENTS = [
	{
		name: "Изумрудный NCR",
		color: "#22c55e"
	},
	{
		name: "Янтарный Pip-Boy",
		color: "#f59e0b"
	},
	{
		name: "Синий Анклав",
		color: "#0ea5e9"
	},
	{
		name: "Красный Легион",
		color: "#ef4444"
	},
	{
		name: "Магический Аметист",
		color: "#a855f7"
	}
];
export const AdminPanel = ({ isAdmin, activeTool, setActiveTool, onLogin, onLogout, brushType, setBrushType, brushColor, setBrushColor, brushArrowDirection, setBrushArrowDirection, brushIsKeyLocation, setBrushIsKeyLocation, selectedLabel, onUpdateSelectedLabel, onDeleteSelectedLabel, onAddNewLabel, gridSettings, onUpdateGridSettings, themeAccent, onChangeThemeAccent, campaign, onImportCampaign, onResetToDefault }) => {
	const [passwordInput, setPasswordInput] = useState("");
	const [loginError, setLoginError] = useState(false);
	const [activeTab, setActiveTab] = useState("tools");
	const [isCollapsed, setIsCollapsed] = useState(false);
	// Custom Render URL & Copy link state
	const [customRenderUrl, setCustomRenderUrl] = useState(() => {
		return localStorage.getItem("rp_custom_render_url") || "";
	});
	const [isCopied, setIsCopied] = useState(false);
	const [isZipping, setIsZipping] = useState(false);
	// Handle password submission
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		const success = onLogin(passwordInput);
		if (!success) {
			setLoginError(true);
		} else {
			setLoginError(false);
			setPasswordInput("");
		}
	};
	// Copy player link handler
	const handleCopyPlayerLink = async () => {
		let linkToCopy = customRenderUrl.trim();
		if (!linkToCopy) {
			// Default to current URL without admin tokens
			linkToCopy = window.location.origin + window.location.pathname;
		}
		// Ensure proper protocol
		if (!/^https?:\/\//i.test(linkToCopy)) {
			linkToCopy = "https://" + linkToCopy;
		}
		try {
			await navigator.clipboard.writeText(linkToCopy);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 3e3);
		} catch (err) {
			// Fallback
			prompt("Скопируйте ссылку вручную:", linkToCopy);
		}
	};
	const handleUpdateCustomUrl = (url) => {
		setCustomRenderUrl(url);
		localStorage.setItem("rp_custom_render_url", url);
	};
	// Download full project ZIP for Render
	const handleDownloadZip = async () => {
		setIsZipping(true);
		try {
			const blob = await generateProjectZip(campaign);
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `fallout-equestria-render-project-${new Date().toISOString().slice(0, 10)}.zip`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (e) {
			console.error("Failed to create zip", e);
			alert("Ошибка при создании архива проекта.");
		} finally {
			setIsZipping(false);
		}
	};
	// Export campaign JSON
	const handleExport = () => {
		const dataStr = JSON.stringify(campaign, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `tactical-rp-map-${new Date().toISOString().slice(0, 10)}.json`;
		link.click();
		URL.revokeObjectURL(url);
	};
	// Import campaign JSON
	const handleImportFile = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const parsed = JSON.parse(event.target?.result);
					if (parsed && parsed.octagons) {
						onImportCampaign(parsed);
					} else {
						alert("Неверный формат файла кампании.");
					}
				} catch (err) {
					alert("Ошибка при чтении JSON файла.");
				}
			};
			reader.readAsText(file);
		}
	};
	// If NOT admin, show clean lock / auth entry
	if (!isAdmin) {
		return /* @__PURE__ */ _jsxDEV("div", {
			className: "bg-zinc-950/90 border border-zinc-800 rounded-xl p-3 shadow-2xl backdrop-blur-md w-72 text-xs",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between mb-2 pb-2 border-b border-zinc-800",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-1.5 font-mono text-zinc-300 font-semibold",
						children: [/* @__PURE__ */ _jsxDEV(Lock, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Панель Администратора" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 241,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("span", {
						className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-zinc-800",
						children: "Режим Игрока"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 238,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("p", {
					className: "text-zinc-400 text-[11px] mb-3 leading-relaxed",
					children: "Для доступа к редактированию территорий, надписей и ключевых мест введите пароль штаба:"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 248,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("form", {
					onSubmit: handleLoginSubmit,
					className: "space-y-2",
					children: [
						/* @__PURE__ */ _jsxDEV("input", {
							type: "password",
							value: passwordInput,
							onChange: (e) => {
								setPasswordInput(e.target.value);
								setLoginError(false);
							},
							placeholder: "Введите пароль админа...",
							className: `w-full bg-zinc-900 border ${loginError ? "border-red-500 ring-1 ring-red-500" : "border-zinc-700"} rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono`
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 253,
							columnNumber: 11
						}, this),
						loginError && /* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-red-400 font-mono",
							children: "Неверный пароль. Повторите попытку."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 266,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "submit",
							className: "w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow",
							children: [/* @__PURE__ */ _jsxDEV(Unlock, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 274,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Войти как Администратор" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 275,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 270,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 252,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 237,
			columnNumber: 7
		}, this);
	}
	// Admin Authorized View
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "bg-zinc-950/95 border border-emerald-500/50 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.85)] backdrop-blur-md w-80 text-xs overflow-hidden flex flex-col max-h-[85vh]",
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/90 border-b border-zinc-800",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ _jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 288,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: "font-mono text-xs font-bold text-emerald-400 tracking-wide uppercase",
					children: "ШТАБ // АДМИН-ПАНЕЛЬ"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 289,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 287,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => setIsCollapsed(!isCollapsed),
					className: "p-1 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 transition",
					title: isCollapsed ? "Развернуть" : "Свернуть",
					children: isCollapsed ? /* @__PURE__ */ _jsxDEV(ChevronDown, { className: "w-4 h-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 28
					}, this) : /* @__PURE__ */ _jsxDEV(ChevronRight, { className: "w-4 h-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 66
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 295,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: onLogout,
					className: "p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40 transition",
					title: "Заблокировать и выйти в режим игрока",
					children: /* @__PURE__ */ _jsxDEV(Lock, { className: "w-4 h-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 303,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 294,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 286,
			columnNumber: 7
		}, this), !isCollapsed && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "flex border-b border-zinc-800 bg-zinc-900/50 text-[11px] font-mono",
			children: [
				/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => setActiveTab("tools"),
					className: `flex-1 py-2 text-center transition border-b-2 ${activeTab === "tools" ? "border-emerald-400 text-emerald-400 bg-zinc-900/80 font-semibold" : "border-transparent text-zinc-400 hover:text-zinc-200"}`,
					children: "Ячейки"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 318,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => setActiveTab("labels"),
					className: `flex-1 py-2 text-center transition border-b-2 ${activeTab === "labels" ? "border-emerald-400 text-emerald-400 bg-zinc-900/80 font-semibold" : "border-transparent text-zinc-400 hover:text-zinc-200"}`,
					children: "Надписи"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 329,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => setActiveTab("grid"),
					className: `flex-1 py-2 text-center transition border-b-2 ${activeTab === "grid" ? "border-emerald-400 text-emerald-400 bg-zinc-900/80 font-semibold" : "border-transparent text-zinc-400 hover:text-zinc-200"}`,
					children: "Сетка"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 340,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => setActiveTab("campaign"),
					className: `flex-1 py-2 text-center transition border-b-2 ${activeTab === "campaign" ? "border-emerald-400 text-emerald-400 bg-zinc-900/80 font-semibold" : "border-transparent text-zinc-400 hover:text-zinc-200"}`,
					children: "Данные"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 351,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 317,
			columnNumber: 11
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "flex-1 overflow-y-auto p-3 space-y-3.5",
			children: [
				activeTab === "tools" && /* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-zinc-400 uppercase font-mono tracking-wider mb-1.5",
							children: "Режим курсора:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 371,
							columnNumber: 19
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-3 gap-1.5 font-mono text-[11px]",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setActiveTool("navigate"),
									className: `p-2 rounded border flex flex-col items-center gap-1 transition ${activeTool === "navigate" ? "border-emerald-500 bg-emerald-950/40 text-emerald-300" : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"}`,
									children: [/* @__PURE__ */ _jsxDEV(Compass, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Осмотр" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 385,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 375,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setActiveTool("paint_cell"),
									className: `p-2 rounded border flex flex-col items-center gap-1 transition ${activeTool === "paint_cell" ? "border-emerald-500 bg-emerald-950/40 text-emerald-300" : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"}`,
									children: [/* @__PURE__ */ _jsxDEV(Paintbrush, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 397,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Красить" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 398,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 388,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setActiveTool("eraser"),
									className: `p-2 rounded border flex flex-col items-center gap-1 transition ${activeTool === "eraser" ? "border-red-500 bg-red-950/40 text-red-300" : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"}`,
									children: [/* @__PURE__ */ _jsxDEV(Eraser, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 410,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Ластик" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 411,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 401,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 374,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 370,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-zinc-400 uppercase font-mono tracking-wider mb-1.5",
							children: "Тип 8-угольника:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 418,
							columnNumber: 19
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-2 gap-1.5 text-[11px]",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => {
										setBrushType("solid");
										setActiveTool("paint_cell");
									},
									className: `p-2 rounded border text-left flex items-center gap-2 transition ${brushType === "solid" ? "border-emerald-400 bg-emerald-950/30 text-emerald-200" : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850"}`,
									children: [/* @__PURE__ */ _jsxDEV("span", { className: "w-3.5 h-3.5 rounded-sm bg-emerald-400 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 434,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: "Сплошной"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 435,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 422,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => {
										setBrushType("striped");
										setActiveTool("paint_cell");
									},
									className: `p-2 rounded border text-left flex items-center gap-2 transition ${brushType === "striped" ? "border-emerald-400 bg-emerald-950/30 text-emerald-200" : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850"}`,
									children: [/* @__PURE__ */ _jsxDEV("span", { className: "w-3.5 h-3.5 rounded-sm border border-emerald-400 bg-[linear-gradient(45deg,#10b981_25%,transparent_25%,transparent_50%,#10b981_50%,#10b981_75%,transparent_75%,transparent)] bg-[length:6px_6px] shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 450,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: "Штрих"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 451,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 438,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => {
										setBrushType("transparent");
										setActiveTool("paint_cell");
									},
									className: `p-2 rounded border text-left flex items-center gap-2 transition ${brushType === "transparent" ? "border-emerald-400 bg-emerald-950/30 text-emerald-200" : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850"}`,
									children: [/* @__PURE__ */ _jsxDEV("span", { className: "w-3.5 h-3.5 rounded-sm bg-sky-400/40 border border-sky-400 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 466,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: "Прозрачный"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 467,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 454,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => {
										setBrushType("trade_arrow");
										setActiveTool("paint_cell");
									},
									className: `p-2 rounded border text-left flex items-center gap-2 transition ${brushType === "trade_arrow" ? "border-amber-400 bg-amber-950/30 text-amber-200" : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850"}`,
									children: [/* @__PURE__ */ _jsxDEV(ArrowRight, { className: "w-3.5 h-3.5 text-amber-400 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 482,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: "Стрелка пути"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 483,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 470,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => {
										setBrushType("alert_red");
										setActiveTool("paint_cell");
									},
									className: `p-2 rounded border text-left flex items-center gap-2 transition ${brushType === "alert_red" ? "border-red-400 bg-red-950/40 text-red-200" : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850"}`,
									children: [/* @__PURE__ */ _jsxDEV(AlertTriangle, { className: "w-3.5 h-3.5 text-red-400 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 498,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: "Красный тревога (!)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 499,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 486,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => {
										setBrushType("mystery_white");
										setActiveTool("paint_cell");
									},
									className: `p-2 rounded border text-left flex items-center gap-2 transition ${brushType === "mystery_white" ? "border-sky-300 bg-sky-950/30 text-sky-100" : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850"}`,
									children: [/* @__PURE__ */ _jsxDEV(HelpCircle, { className: "w-3.5 h-3.5 text-zinc-100 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 514,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: "Белый тайна (?)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 515,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 502,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 421,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 417,
							columnNumber: 17
						}, this),
						brushType === "trade_arrow" && /* @__PURE__ */ _jsxDEV("div", {
							className: "bg-zinc-900/80 border border-amber-500/40 rounded-lg p-2.5 space-y-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between items-center text-[10px] font-mono text-amber-300",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Направление стрелки (торговый путь):" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 524,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-bold",
										children: [brushArrowDirection, "°"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 525,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 523,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-4 gap-1",
									children: COMPASS_DIRECTIONS.map((dir) => /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => setBrushArrowDirection(dir.angle),
										className: `p-1 rounded text-[10px] font-mono border transition flex items-center justify-center gap-1 ${brushArrowDirection === dir.angle ? "bg-amber-500 text-zinc-950 font-bold border-amber-400" : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"}`,
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs",
											children: dir.arrow
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 540,
											columnNumber: 27
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: dir.label.split(" ")[0] }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 541,
											columnNumber: 27
										}, this)]
									}, dir.angle, true, {
										fileName: _jsxFileName,
										lineNumber: 530,
										columnNumber: 25
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 528,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: "0",
									max: "360",
									step: "15",
									value: brushArrowDirection,
									onChange: (e) => setBrushArrowDirection(Number(e.target.value)),
									className: "w-full accent-amber-500 cursor-pointer"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 547,
									columnNumber: 23
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 546,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 522,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 563,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "font-medium text-zinc-200 text-xs",
									children: "Пульсирующее ключевое место"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 565,
									columnNumber: 23
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "text-[10px] text-zinc-400",
									children: "Мягкая анимация и возможность прикрепить инфо"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 568,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 564,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 562,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "checkbox",
								checked: brushIsKeyLocation,
								onChange: (e) => setBrushIsKeyLocation(e.target.checked),
								className: "w-4 h-4 accent-emerald-500 cursor-pointer rounded"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 573,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 561,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV(ColorGradientPicker, {
							label: "Цвет ячейки и градиент",
							value: brushColor,
							onChange: setBrushColor,
							showOpacity: brushType === "transparent" || brushType === "solid"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 582,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 368,
					columnNumber: 15
				}, this),
				activeTab === "labels" && /* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: onAddNewLabel,
						className: "w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow",
						children: [/* @__PURE__ */ _jsxDEV(Type, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 599,
							columnNumber: 19
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "+ Добавить новую надпись" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 600,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 594,
						columnNumber: 17
					}, this), selectedLabel ? /* @__PURE__ */ _jsxDEV("div", {
						className: "bg-zinc-900/80 border border-sky-500/40 rounded-lg p-3 space-y-3",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between pb-1.5 border-b border-zinc-800",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-xs font-semibold text-sky-400",
									children: "Параметры выделенной надписи"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 606,
									columnNumber: 23
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: onDeleteSelectedLabel,
									className: "p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40",
									title: "Удалить",
									children: /* @__PURE__ */ _jsxDEV(Eraser, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 615,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 609,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 605,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-[10px] text-zinc-400 mb-1",
								children: "Текст надписи:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 620,
								columnNumber: 23
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: selectedLabel.text,
								onChange: (e) => onUpdateSelectedLabel({ text: e.target.value }),
								className: "w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-100 text-xs font-mono focus:border-sky-400 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 623,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 619,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-[10px] text-zinc-400 mb-1",
								children: "Шрифт надписи:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 633,
								columnNumber: 23
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: selectedLabel.fontFamily,
								onChange: (e) => onUpdateSelectedLabel({ fontFamily: e.target.value }),
								className: "w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-zinc-200 text-xs focus:border-sky-400 focus:outline-none",
								children: FONT_OPTIONS.map((f) => /* @__PURE__ */ _jsxDEV("option", {
									value: f.id,
									children: f.name
								}, f.id, false, {
									fileName: _jsxFileName,
									lineNumber: 642,
									columnNumber: 27
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 636,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 632,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-[10px] text-zinc-400 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Размер шрифта" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 653,
										columnNumber: 27
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono",
										children: [selectedLabel.fontSize, "px"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 654,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 652,
									columnNumber: 25
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: "10",
									max: "72",
									value: selectedLabel.fontSize,
									onChange: (e) => onUpdateSelectedLabel({ fontSize: Number(e.target.value) }),
									className: "w-full accent-sky-400 cursor-pointer"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 656,
									columnNumber: 25
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 651,
									columnNumber: 23
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-[10px] text-zinc-400 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Ширина блока" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 670,
										columnNumber: 27
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono",
										children: [selectedLabel.width, "px"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 671,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 669,
									columnNumber: 25
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: "80",
									max: "600",
									step: "10",
									value: selectedLabel.width,
									onChange: (e) => onUpdateSelectedLabel({ width: Number(e.target.value) }),
									className: "w-full accent-sky-400 cursor-pointer"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 673,
									columnNumber: 25
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 668,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 650,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-[10px] text-zinc-400 mb-1",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Угол поворота" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 690,
									columnNumber: 25
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono",
									children: [selectedLabel.rotation || 0, "°"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 691,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 689,
								columnNumber: 23
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: "-180",
								max: "180",
								step: "5",
								value: selectedLabel.rotation || 0,
								onChange: (e) => onUpdateSelectedLabel({ rotation: Number(e.target.value) }),
								className: "w-full accent-sky-400 cursor-pointer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 693,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 688,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-2 text-[11px]",
								children: [
									/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateSelectedLabel({ isBold: !selectedLabel.isBold }),
										className: `px-2.5 py-1 rounded border font-bold ${selectedLabel.isBold ? "bg-zinc-800 text-sky-400 border-sky-400" : "border-zinc-800 text-zinc-400"}`,
										children: "Ж"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 708,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateSelectedLabel({ isItalic: !selectedLabel.isItalic }),
										className: `px-2.5 py-1 rounded border italic ${selectedLabel.isItalic ? "bg-zinc-800 text-sky-400 border-sky-400" : "border-zinc-800 text-zinc-400"}`,
										children: "К"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 721,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateSelectedLabel({ isUppercase: !selectedLabel.isUppercase }),
										className: `px-2.5 py-1 rounded border uppercase text-[10px] ${selectedLabel.isUppercase ? "bg-zinc-800 text-sky-400 border-sky-400" : "border-zinc-800 text-zinc-400"}`,
										children: "АА"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 734,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 707,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ _jsxDEV(ColorGradientPicker, {
								label: "Цвет текста и градиент",
								value: {
									isGradient: !!selectedLabel.isGradient,
									color: selectedLabel.color,
									gradientStart: selectedLabel.gradientStart,
									gradientEnd: selectedLabel.gradientEnd,
									gradientAngle: selectedLabel.gradientAngle
								},
								onChange: (val) => onUpdateSelectedLabel({
									color: val.color,
									isGradient: val.isGradient,
									gradientStart: val.gradientStart,
									gradientEnd: val.gradientEnd,
									gradientAngle: val.gradientAngle
								}),
								showOpacity: false
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 752,
								columnNumber: 21
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 604,
						columnNumber: 19
					}, this) : /* @__PURE__ */ _jsxDEV("div", {
						className: "text-zinc-500 text-[11px] text-center py-4 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-lg",
						children: "Кликните на любую надпись на карте для её масштабирования, вращения или настройки шрифта."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 774,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 593,
					columnNumber: 15
				}, this),
				activeTab === "grid" && /* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-2 bg-zinc-900/60 border border-zinc-800 rounded-lg p-3",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-zinc-300 font-medium",
										children: "Отображение сетки"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 786,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "checkbox",
										checked: gridSettings.showGrid,
										onChange: (e) => onUpdateGridSettings({ showGrid: e.target.checked }),
										className: "w-4 h-4 accent-emerald-500 cursor-pointer rounded"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 787,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 785,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-zinc-300 font-medium",
										children: "Только территории"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 798,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "checkbox",
										checked: gridSettings.showTerritoryOnly,
										onChange: (e) => onUpdateGridSettings({ showTerritoryOnly: e.target.checked }),
										className: "w-4 h-4 accent-emerald-500 cursor-pointer rounded"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 799,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 797,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-zinc-300 font-medium",
										children: "Координаты ячеек"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 810,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "checkbox",
										checked: gridSettings.showCoordinates,
										onChange: (e) => onUpdateGridSettings({ showCoordinates: e.target.checked }),
										className: "w-4 h-4 accent-emerald-500 cursor-pointer rounded"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 811,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 809,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 784,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-[10px] text-zinc-400 mb-1",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Размер 8-угольников" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 825,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-zinc-200",
									children: [gridSettings.cellSize, "px"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 826,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 824,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: "10",
								max: "48",
								step: "1",
								value: gridSettings.cellSize,
								onChange: (e) => onUpdateGridSettings({ cellSize: Number(e.target.value) }),
								className: "w-full accent-emerald-500 cursor-pointer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 828,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-4 gap-1 mt-1 text-[9px] font-mono",
								children: [
									/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateGridSettings({ cellSize: 12 }),
										className: `py-1 rounded border ${gridSettings.cellSize === 12 ? "border-emerald-400 text-emerald-300 bg-emerald-950/40" : "border-zinc-800 text-zinc-400 hover:text-zinc-200"}`,
										children: "12px"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 841,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateGridSettings({ cellSize: 19 }),
										className: `py-1 rounded border ${gridSettings.cellSize === 19 ? "border-emerald-400 text-emerald-300 bg-emerald-950/40" : "border-zinc-800 text-zinc-400 hover:text-zinc-200"}`,
										children: "19px (Х2)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 852,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateGridSettings({ cellSize: 28 }),
										className: `py-1 rounded border ${gridSettings.cellSize === 28 ? "border-emerald-400 text-emerald-300 bg-emerald-950/40" : "border-zinc-800 text-zinc-400 hover:text-zinc-200"}`,
										children: "28px"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 863,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateGridSettings({ cellSize: 38 }),
										className: `py-1 rounded border ${gridSettings.cellSize === 38 ? "border-emerald-400 text-emerald-300 bg-emerald-950/40" : "border-zinc-800 text-zinc-400 hover:text-zinc-200"}`,
										children: "38px"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 874,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 840,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[9px] text-zinc-500 mt-1",
								children: "Сетка уменьшена в 2 раза для максимальной тактической точности"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 886,
								columnNumber: 19
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 823,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex justify-between text-[10px] text-zinc-400 mb-1",
							children: [/* @__PURE__ */ _jsxDEV("span", { children: "Прозрачность линий сетки" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 893,
								columnNumber: 21
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "font-mono text-zinc-200",
								children: [Math.round(gridSettings.opacity * 100), "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 894,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 892,
							columnNumber: 19
						}, this), /* @__PURE__ */ _jsxDEV("input", {
							type: "range",
							min: "0.05",
							max: "0.8",
							step: "0.05",
							value: gridSettings.opacity,
							onChange: (e) => onUpdateGridSettings({ opacity: parseFloat(e.target.value) }),
							className: "w-full accent-emerald-500 cursor-pointer"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 898,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 891,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "pt-2 border-t border-zinc-800",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[10px] text-zinc-400 uppercase font-mono tracking-wider mb-1.5",
								children: "Цветовая гамма интерфейса (HUD):"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 913,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap gap-2",
								children: THEME_ACCENTS.map((t) => /* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onChangeThemeAccent(t.color),
									title: t.name,
									className: `px-2.5 py-1 rounded text-[10px] font-mono border transition flex items-center gap-1.5 ${themeAccent === t.color ? "border-white bg-zinc-800 text-white" : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"}`,
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "w-2.5 h-2.5 rounded-full",
										style: { backgroundColor: t.color }
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 929,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: t.name.split(" ")[0] }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 933,
										columnNumber: 25
									}, this)]
								}, t.color, true, {
									fileName: _jsxFileName,
									lineNumber: 918,
									columnNumber: 23
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 916,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 912,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 783,
					columnNumber: 15
				}, this),
				activeTab === "campaign" && /* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-3.5",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-zinc-900/90 border border-sky-500/40 rounded-lg p-3 space-y-2.5",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 uppercase",
									children: [/* @__PURE__ */ _jsxDEV(Share2, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 947,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Ссылка на сайт для игроков" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 948,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 946,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-zinc-400 text-[11px] leading-relaxed",
									children: "Укажите адрес вашего хостинга (например, на Render), чтобы скопированная ссылка вела на ваш сайт:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 950,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: customRenderUrl,
									onChange: (e) => handleUpdateCustomUrl(e.target.value),
									placeholder: "https://fallout-rp-map.onrender.com",
									className: "w-full bg-zinc-950 border border-zinc-800 focus:border-sky-400 rounded px-2.5 py-1.5 text-xs text-sky-200 font-mono focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 955,
									columnNumber: 21
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 954,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: handleCopyPlayerLink,
									className: "w-full py-2 bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold rounded text-xs transition flex items-center justify-center gap-1.5 shadow",
									children: isCopied ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-4 h-4 text-zinc-950" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 971,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Ссылка скопирована в буфер!" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 972,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 970,
										columnNumber: 23
									}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 976,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Скопировать ссылку для игроков" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 977,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 975,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 964,
									columnNumber: 19
								}, this),
								customRenderUrl.trim() ? /* @__PURE__ */ _jsxDEV("div", {
									className: "text-[10px] text-emerald-400 font-mono flex items-center gap-1",
									children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3 h-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 984,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: ["Ведет на: ", customRenderUrl.trim()]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 985,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 983,
									columnNumber: 21
								}, this) : /* @__PURE__ */ _jsxDEV("div", {
									className: "text-[10px] text-amber-400/90 font-mono leading-tight",
									children: "ℹ️ Если хостите на Render, вставьте адрес выше, чтобы ссылка не вела на тестовую среду."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 988,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 945,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-zinc-900/80 border border-emerald-500/40 rounded-lg p-3 space-y-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase",
									children: [/* @__PURE__ */ _jsxDEV(FileArchive, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 997,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Перенос сайта на Render (ZIP)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 998,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 996,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-zinc-400 text-[11px] leading-relaxed",
									children: "Скачивает весь массив файлов проекта (исходники, карта, текущая расстановка ячеек, конфиг Render и инструкция):"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1e3,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									disabled: isZipping,
									onClick: handleDownloadZip,
									className: "w-full py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-zinc-950 font-bold rounded text-xs transition flex items-center justify-center gap-1.5 shadow",
									children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1010,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: isZipping ? "Сборка архива..." : "Скачать весь проект для Render (.ZIP)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1011,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1004,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 995,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-zinc-900/60 border border-zinc-800 rounded-lg p-2.5 space-y-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[10px] text-zinc-400 uppercase font-mono tracking-wider",
								children: "Резервная копия сценария (JSON):"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1019,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: handleExport,
									className: "py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-mono rounded text-[11px] transition flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1028,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Экспорт JSON" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1029,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1023,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("label", {
									className: "py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-mono rounded text-[11px] transition flex items-center justify-center gap-1.5 cursor-pointer",
									children: [
										/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1033,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("span", { children: "Импорт JSON" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1034,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("input", {
											type: "file",
											accept: ".json",
											onChange: handleImportFile,
											className: "hidden"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1035,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1032,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1022,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1018,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "pt-1",
							children: /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => {
									if (confirm("Сбросить карту до начального состояния? Все несохраненные изменения будут утеряны.")) {
										onResetToDefault();
									}
								},
								className: "w-full py-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded border border-red-950 text-[11px] font-mono transition flex items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ _jsxDEV(RotateCcw, { className: "w-3 h-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1056,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Сбросить к шаблону по умолчанию" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1057,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1047,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1046,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 943,
					columnNumber: 15
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 365,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 315,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 284,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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Ozs7O01BQ0w7Ozs7O0tBQ0Y7Ozs7OztHQUVKOzs7OztVQUNMOzs7O1VBRUQ7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkFkbWluUGFuZWwudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFjdGl2ZVRvb2wsXG4gIE9jdGFnb25UeXBlLFxuICBNYXBMYWJlbCxcbiAgR3JpZFNldHRpbmdzLFxuICBDYW1wYWlnblN0YXRlLFxufSBmcm9tICcuLi90eXBlcy9tYXAnO1xuaW1wb3J0IHsgQ29sb3JHcmFkaWVudFBpY2tlciwgQ29sb3JHcmFkaWVudFZhbHVlIH0gZnJvbSAnLi9Db2xvckdyYWRpZW50UGlja2VyJztcbmltcG9ydCB7IGdlbmVyYXRlUHJvamVjdFppcCB9IGZyb20gJy4uL3V0aWxzL3Byb2plY3RaaXAnO1xuaW1wb3J0IHtcbiAgTG9jayxcbiAgVW5sb2NrLFxuICBQYWludGJydXNoLFxuICBNYXBQaW4sXG4gIFR5cGUsXG4gIEVyYXNlcixcbiAgQ29tcGFzcyxcbiAgTGF5ZXJzLFxuICBTZXR0aW5nczIsXG4gIERvd25sb2FkLFxuICBVcGxvYWQsXG4gIFJvdGF0ZUNjdyxcbiAgU2xpZGVycyxcbiAgQ2hldnJvblJpZ2h0LFxuICBDaGV2cm9uRG93bixcbiAgU3BhcmtsZXMsXG4gIEFycm93UmlnaHQsXG4gIFNoaWVsZCxcbiAgRXllLFxuICBBbGVydFRyaWFuZ2xlLFxuICBIZWxwQ2lyY2xlLFxuICBIYXNoLFxuICBDb3B5LFxuICBDaGVjayxcbiAgRXh0ZXJuYWxMaW5rLFxuICBGaWxlQXJjaGl2ZSxcbiAgU2hhcmUyLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBpc0FkbWluOiBib29sZWFuO1xuICBhY3RpdmVUb29sOiBBY3RpdmVUb29sO1xuICBzZXRBY3RpdmVUb29sOiAodG9vbDogQWN0aXZlVG9vbCkgPT4gdm9pZDtcbiAgb25Mb2dpbjogKHBhc3M6IHN0cmluZykgPT4gYm9vbGVhbjtcbiAgb25Mb2dvdXQ6ICgpID0+IHZvaWQ7XG4gIC8vIEJydXNoIGNvbmZpZ1xuICBicnVzaFR5cGU6IE9jdGFnb25UeXBlO1xuICBzZXRCcnVzaFR5cGU6ICh0OiBPY3RhZ29uVHlwZSkgPT4gdm9pZDtcbiAgYnJ1c2hDb2xvcjogQ29sb3JHcmFkaWVudFZhbHVlO1xuICBzZXRCcnVzaENvbG9yOiAodmFsOiBDb2xvckdyYWRpZW50VmFsdWUpID0+IHZvaWQ7XG4gIGJydXNoQXJyb3dEaXJlY3Rpb246IG51bWJlcjtcbiAgc2V0QnJ1c2hBcnJvd0RpcmVjdGlvbjogKGFuZ2xlOiBudW1iZXIpID0+IHZvaWQ7XG4gIGJydXNoSXNLZXlMb2NhdGlvbjogYm9vbGVhbjtcbiAgc2V0QnJ1c2hJc0tleUxvY2F0aW9uOiAodmFsOiBib29sZWFuKSA9PiB2b2lkO1xuICAvLyBMYWJlbCBpbnNwZWN0b3JcbiAgc2VsZWN0ZWRMYWJlbDogTWFwTGFiZWwgfCBudWxsO1xuICBvblVwZGF0ZVNlbGVjdGVkTGFiZWw6ICh1cGRhdGVkOiBQYXJ0aWFsPE1hcExhYmVsPikgPT4gdm9pZDtcbiAgb25EZWxldGVTZWxlY3RlZExhYmVsOiAoKSA9PiB2b2lkO1xuICBvbkFkZE5ld0xhYmVsOiAoKSA9PiB2b2lkO1xuICAvLyBHcmlkIHNldHRpbmdzXG4gIGdyaWRTZXR0aW5nczogR3JpZFNldHRpbmdzO1xuICBvblVwZGF0ZUdyaWRTZXR0aW5nczogKHNldHRpbmdzOiBQYXJ0aWFsPEdyaWRTZXR0aW5ncz4pID0+IHZvaWQ7XG4gIC8vIFRoZW1lICYgRGF0YVxuICB0aGVtZUFjY2VudDogc3RyaW5nO1xuICBvbkNoYW5nZVRoZW1lQWNjZW50OiAoY29sb3I6IHN0cmluZykgPT4gdm9pZDtcbiAgY2FtcGFpZ246IENhbXBhaWduU3RhdGU7XG4gIG9uSW1wb3J0Q2FtcGFpZ246IChpbXBvcnRlZDogQ2FtcGFpZ25TdGF0ZSkgPT4gdm9pZDtcbiAgb25SZXNldFRvRGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgRk9OVF9PUFRJT05TID0gW1xuICB7IGlkOiAnT3JiaXRyb24nLCBuYW1lOiAnT3JiaXRyb24gKNCi0LDQutGC0LjRh9C10YHQutC40LkgU2NpLUZpKScgfSxcbiAgeyBpZDogJ1NoYXJlIFRlY2ggTW9ubycsIG5hbWU6ICdTaGFyZSBUZWNoIE1vbm8gKFBpcC1Cb3kpJyB9LFxuICB7IGlkOiAnUmFqZGhhbmknLCBuYW1lOiAnUmFqZGhhbmkgKNCS0L7QtdC90L3Ri9C5INCo0YLQsNCxKScgfSxcbiAgeyBpZDogJ1J1c3NvIE9uZScsIG5hbWU6ICdSdXNzbyBPbmUgKNCi0Y/QttC10LvRi9C5INCx0YDRg9GC0LDQu9GM0L3Ri9C5KScgfSxcbiAgeyBpZDogJ0NpbnplbCcsIG5hbWU6ICdDaW56ZWwgKNCY0LzQv9C10YDRgdC60LjQuSAvINCS0LXQu9C40YfQtdGB0YLQstC10L3QvdGL0LkpJyB9LFxuICB7IGlkOiAnTWVkaWV2YWxTaGFycCcsIG5hbWU6ICdNZWRpZXZhbFNoYXJwICjQpNGN0L3RgtC10LfQuNC50L3Ri9C5INC70L7RgCknIH0sXG4gIHsgaWQ6ICdKZXRCcmFpbnMgTW9ubycsIG5hbWU6ICdKZXRCcmFpbnMgTW9ubyAo0JrQvtC00L7QstGL0LkpJyB9LFxuICB7IGlkOiAnTW9udHNlcnJhdCcsIG5hbWU6ICdNb250c2VycmF0ICjQodGC0YDQvtCz0LjQuSDQs9GA0L7RgtC10YHQuiknIH0sXG4gIHsgaWQ6ICdQbGF5ZmFpciBEaXNwbGF5JywgbmFtZTogJ1BsYXlmYWlyIERpc3BsYXkgKNCS0LjQvdGC0LDQtiknIH0sXG5dO1xuXG5jb25zdCBDT01QQVNTX0RJUkVDVElPTlMgPSBbXG4gIHsgbGFiZWw6ICfQoSAoTiknLCBhbmdsZTogMjcwLCBhcnJvdzogJ+KGkScgfSxcbiAgeyBsYWJlbDogJ9Ch0JIgKE5FKScsIGFuZ2xlOiAzMTUsIGFycm93OiAn4oaXJyB9LFxuICB7IGxhYmVsOiAn0JIgKEUpJywgYW5nbGU6IDAsIGFycm93OiAn4oaSJyB9LFxuICB7IGxhYmVsOiAn0K7QkiAoU0UpJywgYW5nbGU6IDQ1LCBhcnJvdzogJ+KGmCcgfSxcbiAgeyBsYWJlbDogJ9CuIChTKScsIGFuZ2xlOiA5MCwgYXJyb3c6ICfihpMnIH0sXG4gIHsgbGFiZWw6ICfQrtCXIChTVyknLCBhbmdsZTogMTM1LCBhcnJvdzogJ+KGmScgfSxcbiAgeyBsYWJlbDogJ9CXIChXKScsIGFuZ2xlOiAxODAsIGFycm93OiAn4oaQJyB9LFxuICB7IGxhYmVsOiAn0KHQlyAoTlcpJywgYW5nbGU6IDIyNSwgYXJyb3c6ICfihpYnIH0sXG5dO1xuXG5jb25zdCBUSEVNRV9BQ0NFTlRTID0gW1xuICB7IG5hbWU6ICfQmNC30YPQvNGA0YPQtNC90YvQuSBOQ1InLCBjb2xvcjogJyMyMmM1NWUnIH0sXG4gIHsgbmFtZTogJ9Cv0L3RgtCw0YDQvdGL0LkgUGlwLUJveScsIGNvbG9yOiAnI2Y1OWUwYicgfSxcbiAgeyBuYW1lOiAn0KHQuNC90LjQuSDQkNC90LrQu9Cw0LInLCBjb2xvcjogJyMwZWE1ZTknIH0sXG4gIHsgbmFtZTogJ9Ca0YDQsNGB0L3Ri9C5INCb0LXQs9C40L7QvScsIGNvbG9yOiAnI2VmNDQ0NCcgfSxcbiAgeyBuYW1lOiAn0JzQsNCz0LjRh9C10YHQutC40Lkg0JDQvNC10YLQuNGB0YInLCBjb2xvcjogJyNhODU1ZjcnIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgQWRtaW5QYW5lbDogUmVhY3QuRkM8UHJvcHM+ID0gKHtcbiAgaXNBZG1pbixcbiAgYWN0aXZlVG9vbCxcbiAgc2V0QWN0aXZlVG9vbCxcbiAgb25Mb2dpbixcbiAgb25Mb2dvdXQsXG4gIGJydXNoVHlwZSxcbiAgc2V0QnJ1c2hUeXBlLFxuICBicnVzaENvbG9yLFxuICBzZXRCcnVzaENvbG9yLFxuICBicnVzaEFycm93RGlyZWN0aW9uLFxuICBzZXRCcnVzaEFycm93RGlyZWN0aW9uLFxuICBicnVzaElzS2V5TG9jYXRpb24sXG4gIHNldEJydXNoSXNLZXlMb2NhdGlvbixcbiAgc2VsZWN0ZWRMYWJlbCxcbiAgb25VcGRhdGVTZWxlY3RlZExhYmVsLFxuICBvbkRlbGV0ZVNlbGVjdGVkTGFiZWwsXG4gIG9uQWRkTmV3TGFiZWwsXG4gIGdyaWRTZXR0aW5ncyxcbiAgb25VcGRhdGVHcmlkU2V0dGluZ3MsXG4gIHRoZW1lQWNjZW50LFxuICBvbkNoYW5nZVRoZW1lQWNjZW50LFxuICBjYW1wYWlnbixcbiAgb25JbXBvcnRDYW1wYWlnbixcbiAgb25SZXNldFRvRGVmYXVsdCxcbn0pID0+IHtcbiAgY29uc3QgW3Bhc3N3b3JkSW5wdXQsIHNldFBhc3N3b3JkSW5wdXRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbG9naW5FcnJvciwgc2V0TG9naW5FcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTwndG9vbHMnIHwgJ2xhYmVscycgfCAnZ3JpZCcgfCAnY2FtcGFpZ24nPigndG9vbHMnKTtcbiAgY29uc3QgW2lzQ29sbGFwc2VkLCBzZXRJc0NvbGxhcHNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gQ3VzdG9tIFJlbmRlciBVUkwgJiBDb3B5IGxpbmsgc3RhdGVcbiAgY29uc3QgW2N1c3RvbVJlbmRlclVybCwgc2V0Q3VzdG9tUmVuZGVyVXJsXSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JwX2N1c3RvbV9yZW5kZXJfdXJsJykgfHwgJyc7XG4gIH0pO1xuICBjb25zdCBbaXNDb3BpZWQsIHNldElzQ29waWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzWmlwcGluZywgc2V0SXNaaXBwaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBIYW5kbGUgcGFzc3dvcmQgc3VibWlzc2lvblxuICBjb25zdCBoYW5kbGVMb2dpblN1Ym1pdCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc3VjY2VzcyA9IG9uTG9naW4ocGFzc3dvcmRJbnB1dCk7XG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBzZXRMb2dpbkVycm9yKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRMb2dpbkVycm9yKGZhbHNlKTtcbiAgICAgIHNldFBhc3N3b3JkSW5wdXQoJycpO1xuICAgIH1cbiAgfTtcblxuICAvLyBDb3B5IHBsYXllciBsaW5rIGhhbmRsZXJcbiAgY29uc3QgaGFuZGxlQ29weVBsYXllckxpbmsgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGxpbmtUb0NvcHkgPSBjdXN0b21SZW5kZXJVcmwudHJpbSgpO1xuICAgIGlmICghbGlua1RvQ29weSkge1xuICAgICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IFVSTCB3aXRob3V0IGFkbWluIHRva2Vuc1xuICAgICAgbGlua1RvQ29weSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfVxuICAgIC8vIEVuc3VyZSBwcm9wZXIgcHJvdG9jb2xcbiAgICBpZiAoIS9eaHR0cHM/OlxcL1xcLy9pLnRlc3QobGlua1RvQ29weSkpIHtcbiAgICAgIGxpbmtUb0NvcHkgPSAnaHR0cHM6Ly8nICsgbGlua1RvQ29weTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQobGlua1RvQ29weSk7XG4gICAgICBzZXRJc0NvcGllZCh0cnVlKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SXNDb3BpZWQoZmFsc2UpLCAzMDAwKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIEZhbGxiYWNrXG4gICAgICBwcm9tcHQoJ9Ch0LrQvtC/0LjRgNGD0LnRgtC1INGB0YHRi9C70LrRgyDQstGA0YPRh9C90YPRjjonLCBsaW5rVG9Db3B5KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVXBkYXRlQ3VzdG9tVXJsID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q3VzdG9tUmVuZGVyVXJsKHVybCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JwX2N1c3RvbV9yZW5kZXJfdXJsJywgdXJsKTtcbiAgfTtcblxuICAvLyBEb3dubG9hZCBmdWxsIHByb2plY3QgWklQIGZvciBSZW5kZXJcbiAgY29uc3QgaGFuZGxlRG93bmxvYWRaaXAgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0SXNaaXBwaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBibG9iID0gYXdhaXQgZ2VuZXJhdGVQcm9qZWN0WmlwKGNhbXBhaWduKTtcbiAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgYS5ocmVmID0gdXJsO1xuICAgICAgYS5kb3dubG9hZCA9IGBmYWxsb3V0LWVxdWVzdHJpYS1yZW5kZXItcHJvamVjdC0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCl9LnppcGA7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgICAgYS5jbGljaygpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIHppcCcsIGUpO1xuICAgICAgYWxlcnQoJ9Ce0YjQuNCx0LrQsCDQv9GA0Lgg0YHQvtC30LTQsNC90LjQuCDQsNGA0YXQuNCy0LAg0L/RgNC+0LXQutGC0LAuJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzWmlwcGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEV4cG9ydCBjYW1wYWlnbiBKU09OXG4gIGNvbnN0IGhhbmRsZUV4cG9ydCA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhU3RyID0gSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ24sIG51bGwsIDIpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZGF0YVN0cl0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgbGluay5kb3dubG9hZCA9IGB0YWN0aWNhbC1ycC1tYXAtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApfS5qc29uYDtcbiAgICBsaW5rLmNsaWNrKCk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICB9O1xuXG4gIC8vIEltcG9ydCBjYW1wYWlnbiBKU09OXG4gIGNvbnN0IGhhbmRsZUltcG9ydEZpbGUgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGV2ZW50LnRhcmdldD8ucmVzdWx0IGFzIHN0cmluZyk7XG4gICAgICAgICAgaWYgKHBhcnNlZCAmJiBwYXJzZWQub2N0YWdvbnMpIHtcbiAgICAgICAgICAgIG9uSW1wb3J0Q2FtcGFpZ24ocGFyc2VkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ9Cd0LXQstC10YDQvdGL0Lkg0YTQvtGA0LzQsNGCINGE0LDQudC70LAg0LrQsNC80L/QsNC90LjQuC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0L/RgNC4INGH0YLQtdC90LjQuCBKU09OINGE0LDQudC70LAuJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSWYgTk9UIGFkbWluLCBzaG93IGNsZWFuIGxvY2sgLyBhdXRoIGVudHJ5XG4gIGlmICghaXNBZG1pbikge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXppbmMtOTUwLzkwIGJvcmRlciBib3JkZXItemluYy04MDAgcm91bmRlZC14bCBwLTMgc2hhZG93LTJ4bCBiYWNrZHJvcC1ibHVyLW1kIHctNzIgdGV4dC14c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0yIHBiLTIgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGZvbnQtbW9ubyB0ZXh0LXppbmMtMzAwIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+0J/QsNC90LXQu9GMINCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGA0LA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy16aW5jLTkwMCB0ZXh0LXppbmMtNTAwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgINCg0LXQttC40Lwg0JjQs9GA0L7QutCwXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIHRleHQtWzExcHhdIG1iLTMgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAg0JTQu9GPINC00L7RgdGC0YPQv9CwINC6INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y4g0YLQtdGA0YDQuNGC0L7RgNC40LksINC90LDQtNC/0LjRgdC10Lkg0Lgg0LrQu9GO0YfQtdCy0YvRhSDQvNC10YHRgiDQstCy0LXQtNC40YLQtSDQv9Cw0YDQvtC70Ywg0YjRgtCw0LHQsDpcbiAgICAgICAgPC9wPlxuXG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVMb2dpblN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkSW5wdXR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgc2V0UGFzc3dvcmRJbnB1dChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgIHNldExvZ2luRXJyb3IoZmFsc2UpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi0JLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMINCw0LTQvNC40L3QsC4uLlwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgYmctemluYy05MDAgYm9yZGVyICR7XG4gICAgICAgICAgICAgIGxvZ2luRXJyb3IgPyAnYm9yZGVyLXJlZC01MDAgcmluZy0xIHJpbmctcmVkLTUwMCcgOiAnYm9yZGVyLXppbmMtNzAwJ1xuICAgICAgICAgICAgfSByb3VuZGVkLWxnIHB4LTMgcHktMS41IHRleHQteHMgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci16aW5jLTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWVtZXJhbGQtNTAwIGZvbnQtbW9ub2B9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7bG9naW5FcnJvciAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtcmVkLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAg0J3QtdCy0LXRgNC90YvQuSDQv9Cw0YDQvtC70YwuINCf0L7QstGC0L7RgNC40YLQtSDQv9C+0L/Ri9GC0LrRgy5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctZW1lcmFsZC01MDAgaG92ZXI6YmctZW1lcmFsZC00MDAgdGV4dC16aW5jLTk1MCBmb250LWJvbGQgcHktMS41IHJvdW5kZWQtbGcgdGV4dC14cyB0cmFuc2l0aW9uIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgc2hhZG93XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VW5sb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPtCS0L7QudGC0Lgg0LrQsNC6INCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gQWRtaW4gQXV0aG9yaXplZCBWaWV3XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy16aW5jLTk1MC85NSBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHJvdW5kZWQteGwgc2hhZG93LVswXzBfMzBweF9yZ2JhKDAsMCwwLDAuODUpXSBiYWNrZHJvcC1ibHVyLW1kIHctODAgdGV4dC14cyBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbCBtYXgtaC1bODV2aF1cIj5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zLjUgcHktMi41IGJnLXppbmMtOTAwLzkwIGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDAgdHJhY2tpbmctd2lkZSB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgINCo0KLQkNCRIC8vINCQ0JTQnNCY0J0t0J/QkNCd0JXQm9CsXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0NvbGxhcHNlZCghaXNDb2xsYXBzZWQpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCByb3VuZGVkIGhvdmVyOmJnLXppbmMtODAwIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgdGl0bGU9e2lzQ29sbGFwc2VkID8gJ9Cg0LDQt9Cy0LXRgNC90YPRgtGMJyA6ICfQodCy0LXRgNC90YPRgtGMJ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aXNDb2xsYXBzZWQgPyA8Q2hldnJvbkRvd24gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IDogPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkxvZ291dH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSB0ZXh0LXJlZC00MDAgaG92ZXI6dGV4dC1yZWQtMzAwIHJvdW5kZWQgaG92ZXI6YmctcmVkLTk1MC80MCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgIHRpdGxlPVwi0JfQsNCx0LvQvtC60LjRgNC+0LLQsNGC0Ywg0Lgg0LLRi9C50YLQuCDQsiDRgNC10LbQuNC8INC40LPRgNC+0LrQsFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHshaXNDb2xsYXBzZWQgJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIHsvKiBUYWIgTmF2aWdhdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwIGJnLXppbmMtOTAwLzUwIHRleHQtWzExcHhdIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCd0b29scycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgcHktMiB0ZXh0LWNlbnRlciB0cmFuc2l0aW9uIGJvcmRlci1iLTIgJHtcbiAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICd0b29scydcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtNDAwIGJnLXppbmMtOTAwLzgwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg0K/Rh9C10LnQutC4XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignbGFiZWxzJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0yIHRleHQtY2VudGVyIHRyYW5zaXRpb24gYm9yZGVyLWItMiAke1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2xhYmVscydcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtNDAwIGJnLXppbmMtOTAwLzgwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg0J3QsNC00L/QuNGB0LhcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdncmlkJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0yIHRleHQtY2VudGVyIHRyYW5zaXRpb24gYm9yZGVyLWItMiAke1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2dyaWQnXG4gICAgICAgICAgICAgICAgICA/ICdib3JkZXItZW1lcmFsZC00MDAgdGV4dC1lbWVyYWxkLTQwMCBiZy16aW5jLTkwMC84MCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgINCh0LXRgtC60LBcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdjYW1wYWlnbicpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgcHktMiB0ZXh0LWNlbnRlciB0cmFuc2l0aW9uIGJvcmRlci1iLTIgJHtcbiAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdjYW1wYWlnbidcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtNDAwIGJnLXppbmMtOTAwLzgwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg0JTQsNC90L3Ri9C1XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBUYWIgQm9keSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG8gcC0zIHNwYWNlLXktMy41XCI+XG4gICAgICAgICAgICB7LyogVEFCOiBUT09MUyAoT2N0YWdvbnMgQnJ1c2gpICovfVxuICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3Rvb2xzJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgey8qIEFjdGl2ZSBUb29sIFNlbGVjdG9yICovfVxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgdXBwZXJjYXNlIGZvbnQtbW9ubyB0cmFja2luZy13aWRlciBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAg0KDQtdC20LjQvCDQutGD0YDRgdC+0YDQsDpcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0zIGdhcC0xLjUgZm9udC1tb25vIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUb29sKCduYXZpZ2F0ZScpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkIGJvcmRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUb29sID09PSAnbmF2aWdhdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTUwMCBiZy1lbWVyYWxkLTk1MC80MCB0ZXh0LWVtZXJhbGQtMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItemluYy04MDAgYmctemluYy05MDAgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPENvbXBhc3MgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+0J7RgdC80L7RgtGAPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVG9vbCgncGFpbnRfY2VsbCcpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkIGJvcmRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUb29sID09PSAncGFpbnRfY2VsbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWVtZXJhbGQtNTAwIGJnLWVtZXJhbGQtOTUwLzQwIHRleHQtZW1lcmFsZC0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci16aW5jLTgwMCBiZy16aW5jLTkwMCB0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8UGFpbnRicnVzaCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QmtGA0LDRgdC40YLRjDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRvb2woJ2VyYXNlcicpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkIGJvcmRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUb29sID09PSAnZXJhc2VyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItcmVkLTUwMCBiZy1yZWQtOTUwLzQwIHRleHQtcmVkLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXppbmMtODAwIGJnLXppbmMtOTAwIHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxFcmFzZXIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+0JvQsNGB0YLQuNC6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIE9jdGFnb24gVHlwZXMgU2VsZWN0aW9uICovfVxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgdXBwZXJjYXNlIGZvbnQtbW9ubyB0cmFja2luZy13aWRlciBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAg0KLQuNC/IDgt0YPQs9C+0LvRjNC90LjQutCwOlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTEuNSB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnJ1c2hUeXBlKCdzb2xpZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlVG9vbCgncGFpbnRfY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQgYm9yZGVyIHRleHQtbGVmdCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBicnVzaFR5cGUgPT09ICdzb2xpZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWVtZXJhbGQtNDAwIGJnLWVtZXJhbGQtOTUwLzMwIHRleHQtZW1lcmFsZC0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci16aW5jLTgwMCBiZy16aW5jLTkwMCB0ZXh0LXppbmMtMzAwIGhvdmVyOmJnLXppbmMtODUwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgcm91bmRlZC1zbSBiZy1lbWVyYWxkLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj7QodC/0LvQvtGI0L3QvtC5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnJ1c2hUeXBlKCdzdHJpcGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVUb29sKCdwYWludF9jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZCBib3JkZXIgdGV4dC1sZWZ0IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJydXNoVHlwZSA9PT0gJ3N0cmlwZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTQwMCBiZy1lbWVyYWxkLTk1MC8zMCB0ZXh0LWVtZXJhbGQtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItemluYy04MDAgYmctemluYy05MDAgdGV4dC16aW5jLTMwMCBob3ZlcjpiZy16aW5jLTg1MCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHJvdW5kZWQtc20gYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMCBiZy1bbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCMxMGI5ODFfMjUlLHRyYW5zcGFyZW50XzI1JSx0cmFuc3BhcmVudF81MCUsIzEwYjk4MV81MCUsIzEwYjk4MV83NSUsdHJhbnNwYXJlbnRfNzUlLHRyYW5zcGFyZW50KV0gYmctW2xlbmd0aDo2cHhfNnB4XSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj7QqNGC0YDQuNGFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnJ1c2hUeXBlKCd0cmFuc3BhcmVudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlVG9vbCgncGFpbnRfY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQgYm9yZGVyIHRleHQtbGVmdCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBicnVzaFR5cGUgPT09ICd0cmFuc3BhcmVudCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWVtZXJhbGQtNDAwIGJnLWVtZXJhbGQtOTUwLzMwIHRleHQtZW1lcmFsZC0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci16aW5jLTgwMCBiZy16aW5jLTkwMCB0ZXh0LXppbmMtMzAwIGhvdmVyOmJnLXppbmMtODUwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgcm91bmRlZC1zbSBiZy1za3ktNDAwLzQwIGJvcmRlciBib3JkZXItc2t5LTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj7Qn9GA0L7Qt9GA0LDRh9C90YvQuTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEJydXNoVHlwZSgndHJhZGVfYXJyb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZVRvb2woJ3BhaW50X2NlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkIGJvcmRlciB0ZXh0LWxlZnQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJ1c2hUeXBlID09PSAndHJhZGVfYXJyb3cnXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1hbWJlci00MDAgYmctYW1iZXItOTUwLzMwIHRleHQtYW1iZXItMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItemluYy04MDAgYmctemluYy05MDAgdGV4dC16aW5jLTMwMCBob3ZlcjpiZy16aW5jLTg1MCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPtCh0YLRgNC10LvQutCwINC/0YPRgtC4PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnJ1c2hUeXBlKCdhbGVydF9yZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZVRvb2woJ3BhaW50X2NlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkIGJvcmRlciB0ZXh0LWxlZnQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJ1c2hUeXBlID09PSAnYWxlcnRfcmVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItcmVkLTQwMCBiZy1yZWQtOTUwLzQwIHRleHQtcmVkLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXppbmMtODAwIGJnLXppbmMtOTAwIHRleHQtemluYy0zMDAgaG92ZXI6YmctemluYy04NTAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJlZC00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+0JrRgNCw0YHQvdGL0Lkg0YLRgNC10LLQvtCz0LAgKCEpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnJ1c2hUeXBlKCdteXN0ZXJ5X3doaXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVUb29sKCdwYWludF9jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZCBib3JkZXIgdGV4dC1sZWZ0IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJydXNoVHlwZSA9PT0gJ215c3Rlcnlfd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1za3ktMzAwIGJnLXNreS05NTAvMzAgdGV4dC1za3ktMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItemluYy04MDAgYmctemluYy05MDAgdGV4dC16aW5jLTMwMCBob3ZlcjpiZy16aW5jLTg1MCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxIZWxwQ2lyY2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtemluYy0xMDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+0JHQtdC70YvQuSDRgtCw0LnQvdCwICg/KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBBcnJvdyBEaXJlY3Rpb24gQ29udHJvbHMgZm9yIFRyYWRlIFJvdXRlICovfVxuICAgICAgICAgICAgICAgIHticnVzaFR5cGUgPT09ICd0cmFkZV9hcnJvdycgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC80MCByb3VuZGVkLWxnIHAtMi41IHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QndCw0L/RgNCw0LLQu9C10L3QuNC1INGB0YLRgNC10LvQutC4ICjRgtC+0YDQs9C+0LLRi9C5INC/0YPRgtGMKTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+e2JydXNoQXJyb3dEaXJlY3Rpb259wrA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtNCBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtDT01QQVNTX0RJUkVDVElPTlMubWFwKChkaXIpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkaXIuYW5nbGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRCcnVzaEFycm93RGlyZWN0aW9uKGRpci5hbmdsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBib3JkZXIgdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJydXNoQXJyb3dEaXJlY3Rpb24gPT09IGRpci5hbmdsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwIHRleHQtemluYy05NTAgZm9udC1ib2xkIGJvcmRlci1hbWJlci00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTk1MCBib3JkZXItemluYy04MDAgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14c1wiPntkaXIuYXJyb3d9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZGlyLmxhYmVsLnNwbGl0KCcgJylbMF19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXg9XCIzNjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD1cIjE1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXticnVzaEFycm93RGlyZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCcnVzaEFycm93RGlyZWN0aW9uKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1hbWJlci01MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBLZXkgTG9jYXRpb24gVG9nZ2xlIG9uIEJydXNoICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMi41IHJvdW5kZWQtbGcgYmctemluYy05MDAvOTAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtemluYy0yMDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAg0J/Rg9C70YzRgdC40YDRg9GO0YnQtdC1INC60LvRjtGH0LXQstC+0LUg0LzQtdGB0YLQvlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAg0JzRj9Cz0LrQsNGPINCw0L3QuNC80LDRhtC40Y8g0Lgg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDQv9GA0LjQutGA0LXQv9C40YLRjCDQuNC90YTQvlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2JydXNoSXNLZXlMb2NhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCcnVzaElzS2V5TG9jYXRpb24oZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgYWNjZW50LWVtZXJhbGQtNTAwIGN1cnNvci1wb2ludGVyIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBDb2xvciAmIEdyYWRpZW50IFBhbGV0dGUgKi99XG4gICAgICAgICAgICAgICAgPENvbG9yR3JhZGllbnRQaWNrZXJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwi0KbQstC10YIg0Y/Rh9C10LnQutC4INC4INCz0YDQsNC00LjQtdC90YJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2JydXNoQ29sb3J9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0QnJ1c2hDb2xvcn1cbiAgICAgICAgICAgICAgICAgIHNob3dPcGFjaXR5PXticnVzaFR5cGUgPT09ICd0cmFuc3BhcmVudCcgfHwgYnJ1c2hUeXBlID09PSAnc29saWQnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIFRBQjogTEFCRUxTICovfVxuICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2xhYmVscycgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17b25BZGROZXdMYWJlbH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yIGJnLWVtZXJhbGQtNTAwIGhvdmVyOmJnLWVtZXJhbGQtNDAwIHRleHQtemluYy05NTAgZm9udC1ib2xkIHJvdW5kZWQtbGcgdGV4dC14cyB0cmFuc2l0aW9uIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgc2hhZG93XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8VHlwZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPisg0JTQvtCx0LDQstC40YLRjCDQvdC+0LLRg9GOINC90LDQtNC/0LjRgdGMPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAge3NlbGVjdGVkTGFiZWwgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItc2t5LTUwMC80MCByb3VuZGVkLWxnIHAtMyBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMS41IGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1za3ktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICDQn9Cw0YDQsNC80LXRgtGA0Ysg0LLRi9C00LXQu9C10L3QvdC+0Lkg0L3QsNC00L/QuNGB0LhcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkRlbGV0ZVNlbGVjdGVkTGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgdGV4dC1yZWQtNDAwIGhvdmVyOnRleHQtcmVkLTMwMCByb3VuZGVkIGhvdmVyOmJnLXJlZC05NTAvNDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCLQo9C00LDQu9C40YLRjFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEVyYXNlciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzEwcHhdIHRleHQtemluYy00MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAg0KLQtdC60YHRgiDQvdCw0LTQv9C40YHQuDpcbiAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkTGFiZWwudGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25VcGRhdGVTZWxlY3RlZExhYmVsKHsgdGV4dDogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctemluYy05NTAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCByb3VuZGVkIHB4LTIuNSBweS0xLjUgdGV4dC16aW5jLTEwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb2N1czpib3JkZXItc2t5LTQwMCBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBGb250IFNlbGVjdG9yICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgINCo0YDQuNGE0YIg0L3QsNC00L/QuNGB0Lg6XG4gICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRMYWJlbC5mb250RmFtaWx5fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblVwZGF0ZVNlbGVjdGVkTGFiZWwoeyBmb250RmFtaWx5OiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHJvdW5kZWQgcHgtMiBweS0xLjUgdGV4dC16aW5jLTIwMCB0ZXh0LXhzIGZvY3VzOmJvcmRlci1za3ktNDAwIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge0ZPTlRfT1BUSU9OUy5tYXAoKGYpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2YuaWR9IHZhbHVlPXtmLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogRm9udCBTaXplICYgU3RyZXRjaCAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPtCg0LDQt9C80LXRgCDRiNGA0LjRhNGC0LA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ub1wiPntzZWxlY3RlZExhYmVsLmZvbnRTaXplfXB4PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9XCI3MlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZExhYmVsLmZvbnRTaXplfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTZWxlY3RlZExhYmVsKHsgZm9udFNpemU6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXNreS00MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQtWzEwcHhdIHRleHQtemluYy00MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QqNC40YDQuNC90LAg0LHQu9C+0LrQsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vXCI+e3NlbGVjdGVkTGFiZWwud2lkdGh9cHg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49XCI4MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heD1cIjYwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA9XCIxMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZExhYmVsLndpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTZWxlY3RlZExhYmVsKHsgd2lkdGg6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXNreS00MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFJvdGF0aW9uICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7Qo9Cz0L7QuyDQv9C+0LLQvtGA0L7RgtCwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vXCI+e3NlbGVjdGVkTGFiZWwucm90YXRpb24gfHwgMH3CsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW49XCItMTgwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heD1cIjE4MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwPVwiNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRMYWJlbC5yb3RhdGlvbiB8fCAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZVNlbGVjdGVkTGFiZWwoeyByb3RhdGlvbjogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1za3ktNDAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogU3R5bGUgVG9nZ2xlcyAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTZWxlY3RlZExhYmVsKHsgaXNCb2xkOiAhc2VsZWN0ZWRMYWJlbC5pc0JvbGQgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQgYm9yZGVyIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZExhYmVsLmlzQm9sZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXppbmMtODAwIHRleHQtc2t5LTQwMCBib3JkZXItc2t5LTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItemluYy04MDAgdGV4dC16aW5jLTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgINCWXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZVNlbGVjdGVkTGFiZWwoeyBpc0l0YWxpYzogIXNlbGVjdGVkTGFiZWwuaXNJdGFsaWMgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQgYm9yZGVyIGl0YWxpYyAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZExhYmVsLmlzSXRhbGljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctemluYy04MDAgdGV4dC1za3ktNDAwIGJvcmRlci1za3ktNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci16aW5jLTgwMCB0ZXh0LXppbmMtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAg0JpcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlU2VsZWN0ZWRMYWJlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVcHBlcmNhc2U6ICFzZWxlY3RlZExhYmVsLmlzVXBwZXJjYXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZCBib3JkZXIgdXBwZXJjYXNlIHRleHQtWzEwcHhdICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTGFiZWwuaXNVcHBlcmNhc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy16aW5jLTgwMCB0ZXh0LXNreS00MDAgYm9yZGVyLXNreS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXppbmMtODAwIHRleHQtemluYy00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICDQkNCQXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBMYWJlbCBDb2xvciAmIEdyYWRpZW50ICovfVxuICAgICAgICAgICAgICAgICAgICA8Q29sb3JHcmFkaWVudFBpY2tlclxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi0KbQstC10YIg0YLQtdC60YHRgtCwINC4INCz0YDQsNC00LjQtdC90YJcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0dyYWRpZW50OiAhIXNlbGVjdGVkTGFiZWwuaXNHcmFkaWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzZWxlY3RlZExhYmVsLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnRTdGFydDogc2VsZWN0ZWRMYWJlbC5ncmFkaWVudFN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnRFbmQ6IHNlbGVjdGVkTGFiZWwuZ3JhZGllbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudEFuZ2xlOiBzZWxlY3RlZExhYmVsLmdyYWRpZW50QW5nbGUsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHZhbCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlU2VsZWN0ZWRMYWJlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB2YWwuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzR3JhZGllbnQ6IHZhbC5pc0dyYWRpZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudFN0YXJ0OiB2YWwuZ3JhZGllbnRTdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnRFbmQ6IHZhbC5ncmFkaWVudEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnRBbmdsZTogdmFsLmdyYWRpZW50QW5nbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBzaG93T3BhY2l0eT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNTAwIHRleHQtWzExcHhdIHRleHQtY2VudGVyIHB5LTQgYmctemluYy05MDAvNDAgYm9yZGVyIGJvcmRlci1kYXNoZWQgYm9yZGVyLXppbmMtODAwIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICAgICAgICAgICAg0JrQu9C40LrQvdC40YLQtSDQvdCwINC70Y7QsdGD0Y4g0L3QsNC00L/QuNGB0Ywg0L3QsCDQutCw0YDRgtC1INC00LvRjyDQtdGRINC80LDRgdGI0YLQsNCx0LjRgNC+0LLQsNC90LjRjywg0LLRgNCw0YnQtdC90LjRjyDQuNC70Lgg0L3QsNGB0YLRgNC+0LnQutC4INGI0YDQuNGE0YLQsC5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIFRBQjogR1JJRCAqL31cbiAgICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdncmlkJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgYmctemluYy05MDAvNjAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCByb3VuZGVkLWxnIHAtM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCBmb250LW1lZGl1bVwiPtCe0YLQvtCx0YDQsNC20LXQvdC40LUg0YHQtdGC0LrQuDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtncmlkU2V0dGluZ3Muc2hvd0dyaWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVHcmlkU2V0dGluZ3MoeyBzaG93R3JpZDogZS50YXJnZXQuY2hlY2tlZCB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IGFjY2VudC1lbWVyYWxkLTUwMCBjdXJzb3ItcG9pbnRlciByb3VuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMzAwIGZvbnQtbWVkaXVtXCI+0KLQvtC70YzQutC+INGC0LXRgNGA0LjRgtC+0YDQuNC4PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2dyaWRTZXR0aW5ncy5zaG93VGVycml0b3J5T25seX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUdyaWRTZXR0aW5ncyh7IHNob3dUZXJyaXRvcnlPbmx5OiBlLnRhcmdldC5jaGVja2VkIH0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgYWNjZW50LWVtZXJhbGQtNTAwIGN1cnNvci1wb2ludGVyIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDAgZm9udC1tZWRpdW1cIj7QmtC+0L7RgNC00LjQvdCw0YLRiyDRj9GH0LXQtdC6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2dyaWRTZXR0aW5ncy5zaG93Q29vcmRpbmF0ZXN9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVHcmlkU2V0dGluZ3MoeyBzaG93Q29vcmRpbmF0ZXM6IGUudGFyZ2V0LmNoZWNrZWQgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCBhY2NlbnQtZW1lcmFsZC01MDAgY3Vyc29yLXBvaW50ZXIgcm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBHcmlkIFNpemluZyAmIE9wYWNpdHkgKi99XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPtCg0LDQt9C80LXRgCA4LdGD0LPQvtC70YzQvdC40LrQvtCyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC16aW5jLTIwMFwiPntncmlkU2V0dGluZ3MuY2VsbFNpemV9cHg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICBtaW49XCIxMFwiXG4gICAgICAgICAgICAgICAgICAgIG1heD1cIjQ4XCJcbiAgICAgICAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z3JpZFNldHRpbmdzLmNlbGxTaXplfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVHcmlkU2V0dGluZ3MoeyBjZWxsU2l6ZTogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtZW1lcmFsZC01MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHsvKiBRdWljayBQcmVzZXQgQnV0dG9ucyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtNCBnYXAtMSBtdC0xIHRleHQtWzlweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblVwZGF0ZUdyaWRTZXR0aW5ncyh7IGNlbGxTaXplOiAxMiB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0xIHJvdW5kZWQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkU2V0dGluZ3MuY2VsbFNpemUgPT09IDEyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtMzAwIGJnLWVtZXJhbGQtOTUwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItemluYy04MDAgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgMTJweFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVXBkYXRlR3JpZFNldHRpbmdzKHsgY2VsbFNpemU6IDE5IH0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTEgcm91bmRlZCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRTZXR0aW5ncy5jZWxsU2l6ZSA9PT0gMTlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0zMDAgYmctZW1lcmFsZC05NTAvNDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci16aW5jLTgwMCB0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAxOXB4ICjQpTIpXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25VcGRhdGVHcmlkU2V0dGluZ3MoeyBjZWxsU2l6ZTogMjggfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHktMSByb3VuZGVkIGJvcmRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFNldHRpbmdzLmNlbGxTaXplID09PSAyOFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItZW1lcmFsZC00MDAgdGV4dC1lbWVyYWxkLTMwMCBiZy1lbWVyYWxkLTk1MC80MCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXppbmMtODAwIHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDI4cHhcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblVwZGF0ZUdyaWRTZXR0aW5ncyh7IGNlbGxTaXplOiAzOCB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0xIHJvdW5kZWQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkU2V0dGluZ3MuY2VsbFNpemUgPT09IDM4XG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtMzAwIGJnLWVtZXJhbGQtOTUwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItemluYy04MDAgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgMzhweFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy01MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICDQodC10YLQutCwINGD0LzQtdC90YzRiNC10L3QsCDQsiAyINGA0LDQt9CwINC00LvRjyDQvNCw0LrRgdC40LzQsNC70YzQvdC+0Lkg0YLQsNC60YLQuNGH0LXRgdC60L7QuSDRgtC+0YfQvdC+0YHRgtC4XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQtWzEwcHhdIHRleHQtemluYy00MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7Qn9GA0L7Qt9GA0LDRh9C90L7RgdGC0Ywg0LvQuNC90LjQuSDRgdC10YLQutC4PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC16aW5jLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtNYXRoLnJvdW5kKGdyaWRTZXR0aW5ncy5vcGFjaXR5ICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj1cIjAuMDVcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9XCIwLjhcIlxuICAgICAgICAgICAgICAgICAgICBzdGVwPVwiMC4wNVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtncmlkU2V0dGluZ3Mub3BhY2l0eX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlR3JpZFNldHRpbmdzKHsgb3BhY2l0eTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWVtZXJhbGQtNTAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogVGhlbWUgQWNjZW50ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2UgZm9udC1tb25vIHRyYWNraW5nLXdpZGVyIG1iLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICDQptCy0LXRgtC+0LLQsNGPINCz0LDQvNC80LAg0LjQvdGC0LXRgNGE0LXQudGB0LAgKEhVRCk6XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAge1RIRU1FX0FDQ0VOVFMubWFwKCh0KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0LmNvbG9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZVRoZW1lQWNjZW50KHQuY29sb3IpfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGJvcmRlciB0cmFuc2l0aW9uIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWVBY2NlbnQgPT09IHQuY29sb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItd2hpdGUgYmctemluYy04MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItemluYy04MDAgYmctemluYy05MDAgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiB0LmNvbG9yIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3QubmFtZS5zcGxpdCgnICcpWzBdfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogVEFCOiBDQU1QQUlHTiBEQVRBICovfVxuICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2NhbXBhaWduJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zLjVcIj5cbiAgICAgICAgICAgICAgICB7LyogMS4gU2hhcmUgTGluayBmb3IgUGxheWVycyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXppbmMtOTAwLzkwIGJvcmRlciBib3JkZXItc2t5LTUwMC80MCByb3VuZGVkLWxnIHAtMyBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNreS00MDAgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTaGFyZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QodGB0YvQu9C60LAg0L3QsCDRgdCw0LnRgiDQtNC70Y8g0LjQs9GA0L7QutC+0LI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdGV4dC1bMTFweF0gbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgINCj0LrQsNC20LjRgtC1INCw0LTRgNC10YEg0LLQsNGI0LXQs9C+INGF0L7RgdGC0LjQvdCz0LAgKNC90LDQv9GA0LjQvNC10YAsINC90LAgUmVuZGVyKSwg0YfRgtC+0LHRiyDRgdC60L7Qv9C40YDQvtCy0LDQvdC90LDRjyDRgdGB0YvQu9C60LAg0LLQtdC70LAg0L3QsCDQstCw0Ygg0YHQsNC50YI6XG4gICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VzdG9tUmVuZGVyVXJsfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlVXBkYXRlQ3VzdG9tVXJsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImh0dHBzOi8vZmFsbG91dC1ycC1tYXAub25yZW5kZXIuY29tXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctemluYy05NTAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBmb2N1czpib3JkZXItc2t5LTQwMCByb3VuZGVkIHB4LTIuNSBweS0xLjUgdGV4dC14cyB0ZXh0LXNreS0yMDAgZm9udC1tb25vIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29weVBsYXllckxpbmt9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yIGJnLXNreS01MDAgaG92ZXI6Ymctc2t5LTQwMCB0ZXh0LXppbmMtOTUwIGZvbnQtYm9sZCByb3VuZGVkIHRleHQteHMgdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHNoYWRvd1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc0NvcGllZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC16aW5jLTk1MFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QodGB0YvQu9C60LAg0YHQutC+0L/QuNGA0L7QstCw0L3QsCDQsiDQsdGD0YTQtdGAITwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+0KHQutC+0L/QuNGA0L7QstCw0YLRjCDRgdGB0YvQu9C60YMg0LTQu9GPINC40LPRgNC+0LrQvtCyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgIHtjdXN0b21SZW5kZXJVcmwudHJpbSgpID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+0JLQtdC00LXRgiDQvdCwOiB7Y3VzdG9tUmVuZGVyVXJsLnRyaW0oKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWFtYmVyLTQwMC85MCBmb250LW1vbm8gbGVhZGluZy10aWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgIOKEue+4jyDQldGB0LvQuCDRhdC+0YHRgtC40YLQtSDQvdCwIFJlbmRlciwg0LLRgdGC0LDQstGM0YLQtSDQsNC00YDQtdGBINCy0YvRiNC1LCDRh9GC0L7QsdGLINGB0YHRi9C70LrQsCDQvdC1INCy0LXQu9CwINC90LAg0YLQtdGB0YLQvtCy0YPRjiDRgdGA0LXQtNGDLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogMi4gRnVsbCBQcm9qZWN0IFpJUCBmb3IgUmVuZGVyICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MCByb3VuZGVkLWxnIHAtMyBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1lbWVyYWxkLTQwMCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZpbGVBcmNoaXZlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+0J/QtdGA0LXQvdC+0YEg0YHQsNC50YLQsCDQvdCwIFJlbmRlciAoWklQKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC16aW5jLTQwMCB0ZXh0LVsxMXB4XSBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAg0KHQutCw0YfQuNCy0LDQtdGCINCy0LXRgdGMINC80LDRgdGB0LjQsiDRhNCw0LnQu9C+0LIg0L/RgNC+0LXQutGC0LAgKNC40YHRhdC+0LTQvdC40LrQuCwg0LrQsNGA0YLQsCwg0YLQtdC60YPRidCw0Y8g0YDQsNGB0YHRgtCw0L3QvtCy0LrQsCDRj9GH0LXQtdC6LCDQutC+0L3RhNC40LMgUmVuZGVyINC4INC40L3RgdGC0YDRg9C60YbQuNGPKTpcbiAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzWmlwcGluZ31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRaaXB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yIGJnLWVtZXJhbGQtNTAwIGhvdmVyOmJnLWVtZXJhbGQtNDAwIGRpc2FibGVkOm9wYWNpdHktNjAgdGV4dC16aW5jLTk1MCBmb250LWJvbGQgcm91bmRlZCB0ZXh0LXhzIHRyYW5zaXRpb24gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBzaGFkb3dcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtpc1ppcHBpbmcgPyAn0KHQsdC+0YDQutCwINCw0YDRhdC40LLQsC4uLicgOiAn0KHQutCw0YfQsNGC0Ywg0LLQtdGB0Ywg0L/RgNC+0LXQutGCINC00LvRjyBSZW5kZXIgKC5aSVApJ31cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogMy4gQ2FtcGFpZ24gSlNPTiBiYWNrdXAgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy16aW5jLTkwMC82MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHJvdW5kZWQtbGcgcC0yLjUgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgdXBwZXJjYXNlIGZvbnQtbW9ubyB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgICDQoNC10LfQtdGA0LLQvdCw0Y8g0LrQvtC/0LjRjyDRgdGG0LXQvdCw0YDQuNGPIChKU09OKTpcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnR9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHktMS41IGJnLXppbmMtODAwIGhvdmVyOmJnLXppbmMtNzAwIGJvcmRlciBib3JkZXItemluYy03MDAgdGV4dC16aW5jLTIwMCBmb250LW1vbm8gcm91bmRlZCB0ZXh0LVsxMXB4XSB0cmFuc2l0aW9uIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+0K3QutGB0L/QvtGA0YIgSlNPTjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInB5LTEuNSBiZy16aW5jLTgwMCBob3ZlcjpiZy16aW5jLTcwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwIHRleHQtemluYy0yMDAgZm9udC1tb25vIHJvdW5kZWQgdGV4dC1bMTFweF0gdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFVwbG9hZCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+0JjQvNC/0L7RgNGCIEpTT048L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCIuanNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW1wb3J0RmlsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIDQuIFJlc2V0IHRvIGRlZmF1bHQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0xXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0oJ9Ch0LHRgNC+0YHQuNGC0Ywg0LrQsNGA0YLRgyDQtNC+INC90LDRh9Cw0LvRjNC90L7Qs9C+INGB0L7RgdGC0L7Rj9C90LjRjz8g0JLRgdC1INC90LXRgdC+0YXRgNCw0L3QtdC90L3Ri9C1INC40LfQvNC10L3QtdC90LjRjyDQsdGD0LTRg9GCINGD0YLQtdGA0Y/QvdGLLicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlc2V0VG9EZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMS41IHRleHQtcmVkLTQwMCBob3Zlcjp0ZXh0LXJlZC0zMDAgaG92ZXI6YmctcmVkLTk1MC8zMCByb3VuZGVkIGJvcmRlciBib3JkZXItcmVkLTk1MCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFJvdGF0ZUNjdyBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+0KHQsdGA0L7RgdC40YLRjCDQuiDRiNCw0LHQu9C+0L3RgyDQv9C+INGD0LzQvtC70YfQsNC90LjRjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=