const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import * as __vite__cjsImport0_react from "react";
import { X, Shield, Upload, Check, Trash2, MapPin, Link as LinkIcon } from "lucide-react";
var _jsxFileName = "/app/applet/src/components/KeyLocationModal.tsx";
import * as __vite__cjsImport2_react_jsxDevRuntime from "react/jsx-dev-runtime";
const PRESET_IMAGES = [
	{
		name: "Военный Бункер",
		url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80"
	},
	{
		name: "Караванный Путь",
		url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80"
	},
	{
		name: "Зона Боевых Действий",
		url: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&auto=format&fit=crop&q=80"
	},
	{
		name: "Секретная Лаборатория",
		url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
	},
	{
		name: "Индустриальный Завод",
		url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
	},
	{
		name: "Заброшенный Город",
		url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
	}
];
export const KeyLocationModal = ({ cell, isAdmin, onClose, onSave, onDeleteKeyLocation }) => {
	const currentData = cell.keyLocationData || {
		title: `Сектор [${cell.col}, ${cell.row}]`,
		description: "",
		imageUrl: "",
		faction: "New Canterlot Republic",
		dangerLevel: "medium",
		tradeResource: ""
	};
	const [isEditing, setIsEditing] = useState(isAdmin && !cell.isKeyLocation);
	const [title, setTitle] = useState(currentData.title);
	const [description, setDescription] = useState(currentData.description);
	const [imageUrl, setImageUrl] = useState(currentData.imageUrl || "");
	const [faction, setFaction] = useState(currentData.faction || "");
	const [dangerLevel, setDangerLevel] = useState(currentData.dangerLevel || "medium");
	const [tradeResource, setTradeResource] = useState(currentData.tradeResource || "");
	// File upload for image
	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === "string") {
					setImageUrl(reader.result);
				}
			};
			reader.readAsDataURL(file);
		}
	};
	const handleSave = () => {
		onSave({
			...cell,
			isKeyLocation: true,
			keyLocationData: {
				title: title.trim() || `Сектор [${cell.col}, ${cell.row}]`,
				description,
				imageUrl,
				faction,
				dangerLevel,
				tradeResource,
				updatedAt: new Date().toISOString()
			}
		});
		setIsEditing(false);
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "relative w-full max-w-2xl bg-zinc-950 border border-emerald-500/60 rounded-xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col max-h-[90vh]",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between px-5 py-3.5 bg-zinc-900 border-b border-zinc-800",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ _jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 100,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV(MapPin, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 101,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("span", {
								className: "font-mono text-xs tracking-wider text-emerald-400 uppercase",
								children: [
									"Тактическое Досье // Сектор [",
									cell.col,
									", ",
									cell.row,
									"]"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 102,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [isAdmin && !isEditing && /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => setIsEditing(true),
							className: "px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-zinc-700 rounded transition font-medium",
							children: "Редактировать"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: onClose,
							className: "p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition",
							children: /* @__PURE__ */ _jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex-1 overflow-y-auto p-5 space-y-4",
					children: !isEditing ? /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-4",
						children: [
							currentData.imageUrl && /* @__PURE__ */ _jsxDEV("div", {
								className: "relative w-full h-56 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-md",
								children: [
									/* @__PURE__ */ _jsxDEV("img", {
										src: currentData.imageUrl,
										alt: currentData.title,
										className: "w-full h-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 140,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "absolute bottom-3 left-4 right-4 flex justify-between items-end",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs font-mono bg-zinc-900/80 backdrop-blur px-2 py-1 rounded text-zinc-300 border border-zinc-700",
											children: ["ID: ", cell.id]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 142,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs font-mono px-2.5 py-1 rounded border uppercase font-bold tracking-wider text-emerald-400 border-emerald-500/50 bg-emerald-950/80",
											children: currentData.dangerLevel?.toUpperCase() || "NORMAL"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 145,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
								className: "text-2xl font-bold font-rajdhani text-white tracking-wide",
								children: currentData.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-2 mt-1 text-sm text-zinc-400 font-mono",
								children: [
									/* @__PURE__ */ _jsxDEV(Shield, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 158,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: "Контролирующая фракция:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 159,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-sky-300 font-semibold",
										children: currentData.faction || "Неизвестно"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 160,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-zinc-900/70 border border-zinc-800/80 rounded-lg p-4 space-y-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs font-mono uppercase text-zinc-400 tracking-wider",
									children: "Разведывательная сводка и история:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 168,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap",
									children: currentData.description || "Сводка отсутствует. Разведгруппы еще не нанесли детальные данные."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 171,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 15
							}, this),
							currentData.tradeResource && /* @__PURE__ */ _jsxDEV("div", {
								className: "bg-amber-950/20 border border-amber-500/30 rounded-lg p-3.5 flex items-center gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-2xl",
									children: "📦"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 179,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs font-mono text-amber-400 uppercase tracking-wider",
									children: "Торговые ресурсы и логистика"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 181,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "text-sm text-amber-200 font-medium",
									children: currentData.tradeResource
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 184,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 13
					}, this) : 
					/* Edit Form (Admin) */
					/* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-4 text-xs",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-zinc-300 font-mono mb-1",
								children: "Название ключевого места"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "Например: Застава Стальных Рейнджеров №4",
								className: "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-zinc-300 font-mono mb-1",
									children: "Контролирующая фракция"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: faction,
									onChange: (e) => setFaction(e.target.value),
									placeholder: "NCR, Enclave, Changeling...",
									className: "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 212,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-zinc-300 font-mono mb-1",
									children: "Уровень угрозы / опасности"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: dangerLevel,
									onChange: (e) => setDangerLevel(e.target.value),
									className: "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500",
									children: [
										/* @__PURE__ */ _jsxDEV("option", {
											value: "safe",
											children: "Безопасно (Зеленый)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 230,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "low",
											children: "Низкая опасность"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 231,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "medium",
											children: "Средняя опасность"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 232,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "high",
											children: "Высокая угроза"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 233,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "critical",
											children: "КРИТИЧЕСКИЙ РИСК (Красный)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 234,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 225,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-zinc-300 font-mono mb-1",
								children: "Торговые ресурсы / Ценность сектора"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: tradeResource,
								onChange: (e) => setTradeResource(e.target.value),
								placeholder: "Оружие, медицинские препараты, энергия, редкие минералы...",
								className: "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 243,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-zinc-300 font-mono mb-1",
								children: "Подробное описание и лор для RP"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("textarea", {
								rows: 4,
								value: description,
								onChange: (e) => setDescription(e.target.value),
								placeholder: "Опишите историю этого места, укрепления, важные NPC, сюжетные зацепки для игроков...",
								className: "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 font-sans"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 256,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 252,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-zinc-300 font-mono mb-1",
										children: "Изображение (URL или загрузка файла)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 267,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "relative flex-1",
											children: [/* @__PURE__ */ _jsxDEV("input", {
												type: "text",
												value: imageUrl,
												onChange: (e) => setImageUrl(e.target.value),
												placeholder: "https://... прямая ссылка на изображение",
												className: "w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 272,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV(LinkIcon, { className: "w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 279,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 271,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("label", {
											className: "flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg cursor-pointer text-zinc-300 text-xs font-mono transition",
											children: [
												/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 282,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("span", { children: "Файл" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 283,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("input", {
													type: "file",
													accept: "image/*",
													onChange: handleFileUpload,
													className: "hidden"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 284,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 281,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 270,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex flex-wrap gap-1.5 pt-1",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-[10px] text-zinc-400 font-mono flex items-center mr-1",
											children: "Пресеты:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 295,
											columnNumber: 19
										}, this), PRESET_IMAGES.map((p, i) => /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => setImageUrl(p.url),
											className: "px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] rounded text-zinc-300 transition",
											children: p.name
										}, i, false, {
											fileName: _jsxFileName,
											lineNumber: 299,
											columnNumber: 21
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 294,
										columnNumber: 17
									}, this),
									imageUrl && /* @__PURE__ */ _jsxDEV("div", {
										className: "relative w-full h-36 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 mt-2",
										children: /* @__PURE__ */ _jsxDEV("img", {
											src: imageUrl,
											alt: "Preview",
											className: "w-full h-full object-cover",
											onError: (e) => {
												e.target.style.display = "none";
											}
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 313,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 312,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 128,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "px-5 py-3.5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between",
					children: [/* @__PURE__ */ _jsxDEV("div", { children: isAdmin && cell.isKeyLocation && /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: onDeleteKeyLocation,
						className: "flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 px-3 py-1.5 rounded transition",
						children: [/* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 337,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Удалить ключевое место" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 338,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 332,
						columnNumber: 15
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 330,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: isEditing ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => setIsEditing(false),
							className: "px-3.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition",
							children: "Отмена"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 346,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: handleSave,
							className: "flex items-center gap-1.5 px-4 py-1.5 text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-lg transition shadow-md",
							children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Сохранить досье" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 359,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 353,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 345,
							columnNumber: 15
						}, this) : /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: onClose,
							className: "px-4 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition",
							children: "Закрыть"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 363,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 329,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 93,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 89,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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LFlBQVksRUFBRSxHQUFHO1dBQ2hDLFdBQVU7cUJBRVQsRUFBRTtVQUNHLEdBTkQ7Ozs7aUJBTUMsQ0FDVCxDQUNFOzs7Ozs7U0FHSixZQUNDLHdCQUFDLE9BQUQ7VUFBSyxXQUFVO29CQUNiLHdCQUFDLE9BQUQ7V0FDRSxLQUFLO1dBQ0wsS0FBSTtXQUNKLFdBQVU7V0FDVixVQUFVLE1BQU07WUFDZCxBQUFDLEVBQUUsT0FBdUIsTUFBTSxVQUFVO1dBQzVDO1VBQ0Q7Ozs7O1NBQ0U7Ozs7O1FBRUo7Ozs7OztNQUNGOzs7Ozs7SUFFSjs7Ozs7SUFHTCx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmLENBQ0Usd0JBQUMsT0FBRCxZQUNHLFdBQVcsS0FBSyxpQkFDZix3QkFBQyxVQUFEO01BQ0UsTUFBSztNQUNMLFNBQVM7TUFDVCxXQUFVO2dCQUhaLENBS0Usd0JBQUMsUUFBRCxFQUFRLFdBQVUsY0FBZTs7OztnQkFDakMsd0JBQUMsUUFBRCxZQUFNLHlCQUE0Qjs7OztjQUM1Qjs7Ozs7Y0FFUDs7OztlQUVMLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUNaLFlBQ0MsZ0RBQ0Usd0JBQUMsVUFBRDtPQUNFLE1BQUs7T0FDTCxlQUFlLGFBQWEsS0FBSztPQUNqQyxXQUFVO2lCQUNYO01BRU87Ozs7Z0JBQ1Isd0JBQUMsVUFBRDtPQUNFLE1BQUs7T0FDTCxTQUFTO09BQ1QsV0FBVTtpQkFIWixDQUtFLHdCQUFDLE9BQUQsRUFBTyxXQUFVLFVBQVc7Ozs7aUJBQzVCLHdCQUFDLFFBQUQsWUFBTSxrQkFBcUI7Ozs7ZUFDckI7Ozs7O2NBQ1I7Ozs7aUJBRUYsd0JBQUMsVUFBRDtPQUNFLE1BQUs7T0FDTCxTQUFTO09BQ1QsV0FBVTtpQkFDWDtNQUVPOzs7OztLQUVQOzs7O2FBQ0Y7Ozs7OztHQUNGOzs7Ozs7Q0FDRjs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJLZXlMb2NhdGlvbk1vZGFsLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBPY3RhZ29uQ2VsbCwgRGFuZ2VyTGV2ZWwgfSBmcm9tICcuLi90eXBlcy9tYXAnO1xuaW1wb3J0IHtcbiAgWCxcbiAgU2hpZWxkLFxuICBBbGVydFRyaWFuZ2xlLFxuICBVcGxvYWQsXG4gIEltYWdlIGFzIEltYWdlSWNvbixcbiAgQ2hlY2ssXG4gIFRyYXNoMixcbiAgTWFwUGluLFxuICBTcGFya2xlcyxcbiAgTGluayBhcyBMaW5rSWNvbixcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgY2VsbDogT2N0YWdvbkNlbGw7XG4gIGlzQWRtaW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uU2F2ZTogKHVwZGF0ZWRDZWxsOiBPY3RhZ29uQ2VsbCkgPT4gdm9pZDtcbiAgb25EZWxldGVLZXlMb2NhdGlvbjogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgUFJFU0VUX0lNQUdFUyA9IFtcbiAgeyBuYW1lOiAn0JLQvtC10L3QvdGL0Lkg0JHRg9C90LrQtdGAJywgdXJsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1Nzg2MzI3NjcxMTUtMzUxNTk3Y2YyNDc3P3c9ODAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnIH0sXG4gIHsgbmFtZTogJ9Ca0LDRgNCw0LLQsNC90L3Ri9C5INCf0YPRgtGMJywgdXJsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MDkzMTY5NzU4NTAtZmY5YzVkZWIwY2Q5P3c9ODAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnIH0sXG4gIHsgbmFtZTogJ9CX0L7QvdCwINCR0L7QtdCy0YvRhSDQlNC10LnRgdGC0LLQuNC5JywgdXJsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDIyODEyODYtOWUwYTE2YmI3MzY2P3c9ODAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnIH0sXG4gIHsgbmFtZTogJ9Ch0LXQutGA0LXRgtC90LDRjyDQm9Cw0LHQvtGA0LDRgtC+0YDQuNGPJywgdXJsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTg3MDkyNjg4MDUtNGU5MDQyYWY5ZjIzP3c9ODAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnIH0sXG4gIHsgbmFtZTogJ9CY0L3QtNGD0YHRgtGA0LjQsNC70YzQvdGL0Lkg0JfQsNCy0L7QtCcsIHVybDogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTgxMDkxMjI2ODI1LWE2YTJhNWFlZTE1OD93PTgwMCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZxPTgwJyB9LFxuICB7IG5hbWU6ICfQl9Cw0LHRgNC+0YjQtdC90L3Ri9C5INCT0L7RgNC+0LQnLCB1cmw6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxODc3MDY2MDQzOS00NjM2MTkwYWY0NzU/dz04MDAmYXV0bz1mb3JtYXQmZml0PWNyb3AmcT04MCcgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBLZXlMb2NhdGlvbk1vZGFsOiBSZWFjdC5GQzxQcm9wcz4gPSAoe1xuICBjZWxsLFxuICBpc0FkbWluLFxuICBvbkNsb3NlLFxuICBvblNhdmUsXG4gIG9uRGVsZXRlS2V5TG9jYXRpb24sXG59KSA9PiB7XG4gIGNvbnN0IGN1cnJlbnREYXRhID0gY2VsbC5rZXlMb2NhdGlvbkRhdGEgfHwge1xuICAgIHRpdGxlOiBg0KHQtdC60YLQvtGAIFske2NlbGwuY29sfSwgJHtjZWxsLnJvd31dYCxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgaW1hZ2VVcmw6ICcnLFxuICAgIGZhY3Rpb246ICdOZXcgQ2FudGVybG90IFJlcHVibGljJyxcbiAgICBkYW5nZXJMZXZlbDogJ21lZGl1bScsXG4gICAgdHJhZGVSZXNvdXJjZTogJycsXG4gIH07XG5cbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGlzQWRtaW4gJiYgIWNlbGwuaXNLZXlMb2NhdGlvbik7XG4gIGNvbnN0IFt0aXRsZSwgc2V0VGl0bGVdID0gdXNlU3RhdGUoY3VycmVudERhdGEudGl0bGUpO1xuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKGN1cnJlbnREYXRhLmRlc2NyaXB0aW9uKTtcbiAgY29uc3QgW2ltYWdlVXJsLCBzZXRJbWFnZVVybF0gPSB1c2VTdGF0ZShjdXJyZW50RGF0YS5pbWFnZVVybCB8fCAnJyk7XG4gIGNvbnN0IFtmYWN0aW9uLCBzZXRGYWN0aW9uXSA9IHVzZVN0YXRlKGN1cnJlbnREYXRhLmZhY3Rpb24gfHwgJycpO1xuICBjb25zdCBbZGFuZ2VyTGV2ZWwsIHNldERhbmdlckxldmVsXSA9IHVzZVN0YXRlPERhbmdlckxldmVsPihjdXJyZW50RGF0YS5kYW5nZXJMZXZlbCB8fCAnbWVkaXVtJyk7XG4gIGNvbnN0IFt0cmFkZVJlc291cmNlLCBzZXRUcmFkZVJlc291cmNlXSA9IHVzZVN0YXRlKGN1cnJlbnREYXRhLnRyYWRlUmVzb3VyY2UgfHwgJycpO1xuXG4gIC8vIEZpbGUgdXBsb2FkIGZvciBpbWFnZVxuICBjb25zdCBoYW5kbGVGaWxlVXBsb2FkID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgc2V0SW1hZ2VVcmwocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZSA9ICgpID0+IHtcbiAgICBvblNhdmUoe1xuICAgICAgLi4uY2VsbCxcbiAgICAgIGlzS2V5TG9jYXRpb246IHRydWUsXG4gICAgICBrZXlMb2NhdGlvbkRhdGE6IHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLnRyaW0oKSB8fCBg0KHQtdC60YLQvtGAIFske2NlbGwuY29sfSwgJHtjZWxsLnJvd31dYCxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGltYWdlVXJsLFxuICAgICAgICBmYWN0aW9uLFxuICAgICAgICBkYW5nZXJMZXZlbCxcbiAgICAgICAgdHJhZGVSZXNvdXJjZSxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IGJnLWJsYWNrLzgwIGJhY2tkcm9wLWJsdXItc21cIlxuICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBtYXgtdy0yeGwgYmctemluYy05NTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC82MCByb3VuZGVkLXhsIHNoYWRvdy1bMF8wXzUwcHhfcmdiYSgxNiwxODUsMTI5LDAuMildIG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sIG1heC1oLVs5MHZoXVwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgPlxuICAgICAgICB7LyogVGFjdGljYWwgSFVEIEhlYWRlciBCYXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTUgcHktMy41IGJnLXppbmMtOTAwIGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgPE1hcFBpbiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQteHMgdHJhY2tpbmctd2lkZXIgdGV4dC1lbWVyYWxkLTQwMCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAg0KLQsNC60YLQuNGH0LXRgdC60L7QtSDQlNC+0YHRjNC1IC8vINCh0LXQutGC0L7RgCBbe2NlbGwuY29sfSwge2NlbGwucm93fV1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtpc0FkbWluICYmICFpc0VkaXRpbmcgJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNFZGl0aW5nKHRydWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHRleHQteHMgYmctemluYy04MDAgaG92ZXI6YmctemluYy03MDAgdGV4dC1lbWVyYWxkLTQwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwIHJvdW5kZWQgdHJhbnNpdGlvbiBmb250LW1lZGl1bVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXppbmMtMTAwIGhvdmVyOmJnLXppbmMtODAwIHJvdW5kZWQgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNb2RhbCBCb2R5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG8gcC01IHNwYWNlLXktNFwiPlxuICAgICAgICAgIHsvKiBSZWFkIFZpZXcgKi99XG4gICAgICAgICAgeyFpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICB7LyogSW1hZ2UgYmFubmVyICovfVxuICAgICAgICAgICAgICB7Y3VycmVudERhdGEuaW1hZ2VVcmwgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGgtNTYgcm91bmRlZC1sZyBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci16aW5jLTgwMCBiZy16aW5jLTkwMCBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtjdXJyZW50RGF0YS5pbWFnZVVybH1cbiAgICAgICAgICAgICAgICAgICAgYWx0PXtjdXJyZW50RGF0YS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXJcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20temluYy05NTAvOTAgdmlhLXRyYW5zcGFyZW50IHRvLXRyYW5zcGFyZW50XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTMgbGVmdC00IHJpZ2h0LTQgZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGJnLXppbmMtOTAwLzgwIGJhY2tkcm9wLWJsdXIgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC16aW5jLTMwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgSUQ6IHtjZWxsLmlkfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHB4LTIuNSBweS0xIHJvdW5kZWQgYm9yZGVyIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdGV4dC1lbWVyYWxkLTQwMCBib3JkZXItZW1lcmFsZC01MDAvNTAgYmctZW1lcmFsZC05NTAvODBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y3VycmVudERhdGEuZGFuZ2VyTGV2ZWw/LnRvVXBwZXJDYXNlKCkgfHwgJ05PUk1BTCd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHsvKiBUaXRsZSAmIEZhY3Rpb24gKi99XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCBmb250LXJhamRoYW5pIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAge2N1cnJlbnREYXRhLnRpdGxlfVxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtdC0xIHRleHQtc20gdGV4dC16aW5jLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+0JrQvtC90YLRgNC+0LvQuNGA0YPRjtGJ0LDRjyDRhNGA0LDQutGG0LjRjzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS0zMDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y3VycmVudERhdGEuZmFjdGlvbiB8fCAn0J3QtdC40LfQstC10YHRgtC90L4nfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRGVzY3JpcHRpb24gLyBMb3JlICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXppbmMtOTAwLzcwIGJvcmRlciBib3JkZXItemluYy04MDAvODAgcm91bmRlZC1sZyBwLTQgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB1cHBlcmNhc2UgdGV4dC16aW5jLTQwMCB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAg0KDQsNC30LLQtdC00YvQstCw0YLQtdC70YzQvdCw0Y8g0YHQstC+0LTQutCwINC4INC40YHRgtC+0YDQuNGPOlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy0yMDAgdGV4dC1zbSBsZWFkaW5nLXJlbGF4ZWQgd2hpdGVzcGFjZS1wcmUtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAge2N1cnJlbnREYXRhLmRlc2NyaXB0aW9uIHx8ICfQodCy0L7QtNC60LAg0L7RgtGB0YPRgtGB0YLQstGD0LXRgi4g0KDQsNC30LLQtdC00LPRgNGD0L/Qv9GLINC10YnQtSDQvdC1INC90LDQvdC10YHQu9C4INC00LXRgtCw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LUuJ31cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTdHJhdGVnaWMgUmVzb3VyY2UgLyBUcmFkZSBSb3V0ZSBkZXRhaWxzICovfVxuICAgICAgICAgICAgICB7Y3VycmVudERhdGEudHJhZGVSZXNvdXJjZSAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1hbWJlci05NTAvMjAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzAgcm91bmRlZC1sZyBwLTMuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCfk6Y8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1hbWJlci00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAg0KLQvtGA0LPQvtCy0YvQtSDRgNC10YHRg9GA0YHRiyDQuCDQu9C+0LPQuNGB0YLQuNC60LBcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWFtYmVyLTIwMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtjdXJyZW50RGF0YS50cmFkZVJlc291cmNlfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIC8qIEVkaXQgRm9ybSAoQWRtaW4pICovXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtemluYy0zMDAgZm9udC1tb25vIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgINCd0LDQt9Cy0LDQvdC40LUg0LrQu9GO0YfQtdCy0L7Qs9C+INC80LXRgdGC0LBcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUaXRsZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItCd0LDQv9GA0LjQvNC10YA6INCX0LDRgdGC0LDQstCwINCh0YLQsNC70YzQvdGL0YUg0KDQtdC50L3QtNC20LXRgNC+0LIg4oSWNFwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXNtIHRleHQtemluYy0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1lbWVyYWxkLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXppbmMtMzAwIGZvbnQtbW9ubyBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgINCa0L7QvdGC0YDQvtC70LjRgNGD0Y7RidCw0Y8g0YTRgNCw0LrRhtC40Y9cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZmFjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRGYWN0aW9uKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOQ1IsIEVuY2xhdmUsIENoYW5nZWxpbmcuLi5cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtemluYy0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1lbWVyYWxkLTUwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXppbmMtMzAwIGZvbnQtbW9ubyBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgINCj0YDQvtCy0LXQvdGMINGD0LPRgNC+0LfRiyAvINC+0L/QsNGB0L3QvtGB0YLQuFxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RhbmdlckxldmVsfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldERhbmdlckxldmVsKGUudGFyZ2V0LnZhbHVlIGFzIERhbmdlckxldmVsKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy03MDAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXppbmMtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItZW1lcmFsZC01MDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2FmZVwiPtCR0LXQt9C+0L/QsNGB0L3QviAo0JfQtdC70LXQvdGL0LkpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsb3dcIj7QndC40LfQutCw0Y8g0L7Qv9Cw0YHQvdC+0YHRgtGMPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtZWRpdW1cIj7QodGA0LXQtNC90Y/RjyDQvtC/0LDRgdC90L7RgdGC0Yw8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImhpZ2hcIj7QktGL0YHQvtC60LDRjyDRg9Cz0YDQvtC30LA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNyaXRpY2FsXCI+0JrQoNCY0KLQmNCn0JXQodCa0JjQmSDQoNCY0KHQmiAo0JrRgNCw0YHQvdGL0LkpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC16aW5jLTMwMCBmb250LW1vbm8gbWItMVwiPlxuICAgICAgICAgICAgICAgICAg0KLQvtGA0LPQvtCy0YvQtSDRgNC10YHRg9GA0YHRiyAvINCm0LXQvdC90L7RgdGC0Ywg0YHQtdC60YLQvtGA0LBcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RyYWRlUmVzb3VyY2V9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFRyYWRlUmVzb3VyY2UoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLQntGA0YPQttC40LUsINC80LXQtNC40YbQuNC90YHQutC40LUg0L/RgNC10L/QsNGA0LDRgtGLLCDRjdC90LXRgNCz0LjRjywg0YDQtdC00LrQuNC1INC80LjQvdC10YDQsNC70YsuLi5cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy03MDAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXppbmMtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItZW1lcmFsZC01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtemluYy0zMDAgZm9udC1tb25vIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgINCf0L7QtNGA0L7QsdC90L7QtSDQvtC/0LjRgdCw0L3QuNC1INC4INC70L7RgCDQtNC70Y8gUlBcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgcm93cz17NH1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RGVzY3JpcHRpb24oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLQntC/0LjRiNC40YLQtSDQuNGB0YLQvtGA0LjRjiDRjdGC0L7Qs9C+INC80LXRgdGC0LAsINGD0LrRgNC10L/Qu9C10L3QuNGPLCDQstCw0LbQvdGL0LUgTlBDLCDRgdGO0LbQtdGC0L3Ri9C1INC30LDRhtC10L/QutC4INC00LvRjyDQuNCz0YDQvtC60L7Qsi4uLlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtemluYy0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1lbWVyYWxkLTUwMCBmb250LXNhbnNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBJbWFnZSBhdHRhY2htZW50ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXppbmMtMzAwIGZvbnQtbW9ubyBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICDQmNC30L7QsdGA0LDQttC10L3QuNC1IChVUkwg0LjQu9C4INC30LDQs9GA0YPQt9C60LAg0YTQsNC50LvQsClcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtpbWFnZVVybH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEltYWdlVXJsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImh0dHBzOi8vLi4uINC/0YDRj9C80LDRjyDRgdGB0YvQu9C60LAg0L3QsCDQuNC30L7QsdGA0LDQttC10L3QuNC1XCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCByb3VuZGVkLWxnIHBsLTggcHItMyBweS0yIHRleHQteHMgdGV4dC16aW5jLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWVtZXJhbGQtNTAwIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rSWNvbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXppbmMtNTAwIGFic29sdXRlIGxlZnQtMi41IHRvcC0yLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgYmctemluYy04MDAgaG92ZXI6YmctemluYy03MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCByb3VuZGVkLWxnIGN1cnNvci1wb2ludGVyIHRleHQtemluYy0zMDAgdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+0KTQsNC50Ls8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlRmlsZVVwbG9hZH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBRdWljayBQcmVzZXRzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEuNSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBtci0xXCI+XG4gICAgICAgICAgICAgICAgICAgINCf0YDQtdGB0LXRgtGLOlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge1BSRVNFVF9JTUFHRVMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SW1hZ2VVcmwocC51cmwpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItemluYy04MDAgdGV4dC1bMTBweF0gcm91bmRlZCB0ZXh0LXppbmMtMzAwIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge3AubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBQcmV2aWV3ICovfVxuICAgICAgICAgICAgICAgIHtpbWFnZVVybCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBoLTM2IHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItemluYy04MDAgYmctemluYy05MDAgbXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cbiAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJQcmV2aWV3XCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRm9vdGVyIGFjdGlvbnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNSBweS0zLjUgYmctemluYy05MDAgYm9yZGVyLXQgYm9yZGVyLXppbmMtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7aXNBZG1pbiAmJiBjZWxsLmlzS2V5TG9jYXRpb24gJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25EZWxldGVLZXlMb2NhdGlvbn1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQteHMgdGV4dC1yZWQtNDAwIGhvdmVyOnRleHQtcmVkLTMwMCBob3ZlcjpiZy1yZWQtOTUwLzQwIHB4LTMgcHktMS41IHJvdW5kZWQgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj7Qo9C00LDQu9C40YLRjCDQutC70Y7Rh9C10LLQvtC1INC80LXRgdGC0L48L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0VkaXRpbmcoZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSB0ZXh0LXhzIHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDQntGC0LzQtdC90LBcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNhdmV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTQgcHktMS41IHRleHQteHMgYmctZW1lcmFsZC01MDAgaG92ZXI6YmctZW1lcmFsZC00MDAgdGV4dC16aW5jLTk1MCBmb250LWJvbGQgcm91bmRlZC1sZyB0cmFuc2l0aW9uIHNoYWRvdy1tZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+0KHQvtGF0YDQsNC90LjRgtGMINC00L7RgdGM0LU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0xLjUgdGV4dC14cyBiZy16aW5jLTgwMCBob3ZlcjpiZy16aW5jLTcwMCB0ZXh0LXppbmMtMjAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDQl9Cw0LrRgNGL0YLRjFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19