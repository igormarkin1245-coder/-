const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useCallback = __vite__cjsImport0_react["useCallback"];const _jsxDEV = __vite__cjsImport11_react_jsxDevRuntime["jsxDEV"];/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/
import * as __vite__cjsImport0_react from "react";
import { INITIAL_CAMPAIGN } from "./data/defaultCampaign.ts";
import { getGridMetrics, getOctagonPoints, worldToGrid, gridToWorldCenter, cellKey } from "./utils/octagon.ts";
import { SvgDefs } from "./components/SvgPatterns.tsx";
import { OctagonItem } from "./components/OctagonItem.tsx";
import { MapLabelItem } from "./components/MapLabelItem.tsx";
import { AdminPanel } from "./components/AdminPanel.tsx";
import { TacticalHud } from "./components/TacticalHud.tsx";
import { Minimap } from "./components/Minimap.tsx";
import { KeyLocationTooltip } from "./components/KeyLocationTooltip.tsx";
import { KeyLocationModal } from "./components/KeyLocationModal.tsx";
var _jsxFileName = "/app/applet/src/App.tsx";
import * as __vite__cjsImport11_react_jsxDevRuntime from "react/jsx-dev-runtime";
const MAP_IMAGE_URL = "/assets/aistudio/5195356406373096378_fefdb8d0.jpg";
const STORAGE_KEY = "tactical_rp_campaign_v3";
const ADMIN_PASSWORD = "DTDT228";
export default function App() {
	// Campaign State
	const [campaign, setCampaign] = useState(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed && parsed.octagons) return parsed;
			}
		} catch (e) {
			console.warn("Failed to parse saved campaign", e);
		}
		return INITIAL_CAMPAIGN;
	});
	// Save changes to localStorage
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(campaign));
		} catch (e) {
			console.warn("Failed to save to localStorage", e);
		}
	}, [campaign]);
	// Admin Auth State
	const [isAdmin, setIsAdmin] = useState(() => {
		return sessionStorage.getItem("rp_is_admin") === "true";
	});
	const [showAdminPanel, setShowAdminPanel] = useState(false);
	const [activeTool, setActiveTool] = useState("navigate");
	// Brush Config
	const [brushType, setBrushType] = useState("solid");
	const [brushColor, setBrushColor] = useState({
		isGradient: false,
		color: "#10b981",
		opacity: .85
	});
	const [brushArrowDirection, setBrushArrowDirection] = useState(90);
	const [brushIsKeyLocation, setBrushIsKeyLocation] = useState(false);
	// Label Selection
	const [selectedLabelId, setSelectedLabelId] = useState(null);
	// Key Location Modal & Tooltip
	const [modalCell, setModalCell] = useState(null);
	const [hoveredCell, setHoveredCell] = useState(null);
	// Viewport Transform (Pan & Zoom)
	const containerRef = useRef(null);
	const [transform, setTransform] = useState({
		x: 0,
		y: 0,
		scale: .85
	});
	const [isPanning, setIsPanning] = useState(false);
	const panStartRef = useRef({
		x: 0,
		y: 0,
		viewX: 0,
		viewY: 0
	});
	// Map natural dimensions
	const [mapSize, setMapSize] = useState({
		width: 1920,
		height: 1080
	});
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	// Cursor coordinates
	const [cursorPos, setCursorPos] = useState(null);
	// Ghost Cell for Hover Brush Preview
	const [ghostCell, setGhostCell] = useState(null);
	// Drag-paint tracking
	const isMouseDownRef = useRef(false);
	// Initialize Map image and calculate initial fit
	const onImageLoad = (e) => {
		const img = e.currentTarget;
		const w = img.naturalWidth || 1920;
		const h = img.naturalHeight || 1080;
		setMapSize({
			width: w,
			height: h
		});
		setIsImageLoaded(true);
		if (containerRef.current) {
			const cw = containerRef.current.clientWidth;
			const ch = containerRef.current.clientHeight;
			const fitScale = Math.min(cw / w, ch / h) * .95;
			const fitX = (cw - w * fitScale) / 2;
			const fitY = (ch - h * fitScale) / 2;
			setTransform({
				x: fitX,
				y: fitY,
				scale: fitScale
			});
		}
	};
	// Center & Fit Viewport
	const fitMapToScreen = useCallback(() => {
		if (!containerRef.current || mapSize.width === 0) return;
		const cw = containerRef.current.clientWidth;
		const ch = containerRef.current.clientHeight;
		const fitScale = Math.min(cw / mapSize.width, ch / mapSize.height) * .95;
		const fitX = (cw - mapSize.width * fitScale) / 2;
		const fitY = (ch - mapSize.height * fitScale) / 2;
		setTransform({
			x: fitX,
			y: fitY,
			scale: fitScale
		});
	}, [mapSize]);
	// Zoom Helpers
	const handleZoom = (factor, clientCenter) => {
		setTransform((prev) => {
			const newScale = Math.min(5, Math.max(.12, prev.scale * factor));
			if (!containerRef.current) return {
				...prev,
				scale: newScale
			};
			const rect = containerRef.current.getBoundingClientRect();
			const cx = clientCenter ? clientCenter.x - rect.left : rect.width / 2;
			const cy = clientCenter ? clientCenter.y - rect.top : rect.height / 2;
			const newX = cx - (cx - prev.x) * (newScale / prev.scale);
			const newY = cy - (cy - prev.y) * (newScale / prev.scale);
			return {
				x: newX,
				y: newY,
				scale: newScale
			};
		});
	};
	// Wheel zoom handler
	const handleWheel = (e) => {
		e.preventDefault();
		const factor = e.deltaY < 0 ? 1.12 : .89;
		handleZoom(factor, {
			x: e.clientX,
			y: e.clientY
		});
	};
	// Pointer / Mouse Down for Pan or Paint
	const handleMouseDown = (e) => {
		// If middle click or space key or navigate tool, start panning
		if (e.button === 1 || e.button === 2 || activeTool === "navigate" || e.shiftKey) {
			e.preventDefault();
			setIsPanning(true);
			panStartRef.current = {
				x: e.clientX,
				y: e.clientY,
				viewX: transform.x,
				viewY: transform.y
			};
			return;
		}
		if (e.button === 0 && isAdmin && (activeTool === "paint_cell" || activeTool === "eraser")) {
			isMouseDownRef.current = true;
			applyPaintAtCursor(e);
		}
	};
	// Convert client coordinate into world coordinate
	const clientToWorld = useCallback((clientX, clientY) => {
		if (!containerRef.current) return {
			x: 0,
			y: 0
		};
		const rect = containerRef.current.getBoundingClientRect();
		const screenX = clientX - rect.left;
		const screenY = clientY - rect.top;
		const worldX = (screenX - transform.x) / transform.scale;
		const worldY = (screenY - transform.y) / transform.scale;
		return {
			x: Math.round(worldX),
			y: Math.round(worldY)
		};
	}, [transform]);
	// Apply Paint or Eraser at current mouse position
	const applyPaintAtCursor = (e) => {
		const world = clientToWorld(e.clientX, e.clientY);
		if (world.x < 0 || world.y < 0 || world.x > mapSize.width || world.y > mapSize.height) {
			return;
		}
		const { col, row } = worldToGrid(world.x, world.y, campaign.gridSettings.cellSize);
		const key = cellKey(col, row);
		if (activeTool === "eraser") {
			setCampaign((prev) => {
				const next = { ...prev.octagons };
				delete next[key];
				return {
					...prev,
					octagons: next
				};
			});
			return;
		}
		if (activeTool === "paint_cell") {
			const { cx, cy } = gridToWorldCenter(col, row, campaign.gridSettings.cellSize);
			setCampaign((prev) => {
				const existing = prev.octagons[key];
				const updated = {
					id: key,
					col,
					row,
					cx,
					cy,
					type: brushType,
					fillColor: brushColor.color,
					isGradient: brushColor.isGradient,
					gradientStart: brushColor.gradientStart,
					gradientEnd: brushColor.gradientEnd,
					gradientAngle: brushColor.gradientAngle,
					opacity: brushColor.opacity,
					arrowDirection: brushType === "trade_arrow" ? brushArrowDirection : undefined,
					isKeyLocation: brushIsKeyLocation || existing?.isKeyLocation || false,
					keyLocationData: existing?.keyLocationData
				};
				return {
					...prev,
					octagons: {
						...prev.octagons,
						[key]: updated
					}
				};
			});
		}
	};
	// Mouse Move
	const handleMouseMove = (e) => {
		if (isPanning) {
			const dx = e.clientX - panStartRef.current.x;
			const dy = e.clientY - panStartRef.current.y;
			setTransform((prev) => ({
				...prev,
				x: panStartRef.current.viewX + dx,
				y: panStartRef.current.viewY + dy
			}));
			return;
		}
		const world = clientToWorld(e.clientX, e.clientY);
		const { col, row } = worldToGrid(world.x, world.y, campaign.gridSettings.cellSize);
		setCursorPos({
			x: world.x,
			y: world.y,
			col,
			row
		});
		// Update ghost preview when painting
		if (isAdmin && (activeTool === "paint_cell" || activeTool === "eraser")) {
			const { cx, cy } = gridToWorldCenter(col, row, campaign.gridSettings.cellSize);
			setGhostCell({
				col,
				row,
				cx,
				cy
			});
			if (isMouseDownRef.current) {
				applyPaintAtCursor(e);
			}
		} else {
			setGhostCell(null);
		}
	};
	// Mouse Up
	const handleMouseUp = () => {
		setIsPanning(false);
		isMouseDownRef.current = false;
	};
	// Admin Login / Logout
	const handleLogin = (password) => {
		if (password === ADMIN_PASSWORD) {
			setIsAdmin(true);
			sessionStorage.setItem("rp_is_admin", "true");
			setShowAdminPanel(true);
			return true;
		}
		return false;
	};
	const handleLogout = () => {
		setIsAdmin(false);
		sessionStorage.removeItem("rp_is_admin");
		setShowAdminPanel(false);
		setActiveTool("navigate");
	};
	// Octagon click handler
	const handleOctagonClick = (cell, e) => {
		e.stopPropagation();
		// If Admin in eraser mode
		if (isAdmin && activeTool === "eraser") {
			setCampaign((prev) => {
				const next = { ...prev.octagons };
				delete next[cell.id];
				return {
					...prev,
					octagons: next
				};
			});
			return;
		}
		// If Admin in paint mode
		if (isAdmin && activeTool === "paint_cell") {
			applyPaintAtCursor(e);
			return;
		}
		// If clicking on key location or in key location mode: open dossier modal!
		if (cell.isKeyLocation || isAdmin && activeTool === "key_location") {
			setModalCell(cell);
		}
	};
	// Add new Map Label
	const handleAddNewLabel = () => {
		// Place new label in center of current view
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const centerWorld = clientToWorld(rect.left + rect.width / 2, rect.top + rect.height / 2);
		const newLabel = {
			id: `label-${Date.now()}`,
			text: "НОВАЯ ТЕРРИТОРИЯ",
			x: centerWorld.x - 100,
			y: centerWorld.y - 20,
			width: 220,
			fontSize: 16,
			fontFamily: "Orbitron",
			color: "#34d399",
			isBold: true,
			letterSpacing: 2,
			backgroundColor: "rgba(9, 9, 11, 0.75)",
			borderColor: "#059669",
			borderWidth: 1.5,
			borderRadius: 4,
			rotation: 0
		};
		setCampaign((prev) => ({
			...prev,
			labels: [...prev.labels, newLabel]
		}));
		setSelectedLabelId(newLabel.id);
	};
	// Update selected label
	const handleUpdateSelectedLabel = (updated) => {
		if (!selectedLabelId) return;
		setCampaign((prev) => ({
			...prev,
			labels: prev.labels.map((l) => l.id === selectedLabelId ? {
				...l,
				...updated
			} : l)
		}));
	};
	// Delete selected label
	const handleDeleteSelectedLabel = () => {
		if (!selectedLabelId) return;
		setCampaign((prev) => ({
			...prev,
			labels: prev.labels.filter((l) => l.id !== selectedLabelId)
		}));
		setSelectedLabelId(null);
	};
	// Save updated Key Location data
	const handleSaveKeyLocation = (updatedCell) => {
		setCampaign((prev) => ({
			...prev,
			octagons: {
				...prev.octagons,
				[updatedCell.id]: updatedCell
			}
		}));
		setModalCell(null);
	};
	// Delete key location data (keep cell or remove)
	const handleDeleteKeyLocation = () => {
		if (!modalCell) return;
		setCampaign((prev) => {
			const existing = prev.octagons[modalCell.id];
			if (!existing) return prev;
			return {
				...prev,
				octagons: {
					...prev.octagons,
					[modalCell.id]: {
						...existing,
						isKeyLocation: false,
						keyLocationData: undefined
					}
				}
			};
		});
		setModalCell(null);
	};
	// Key locations list
	const keyLocations = Object.values(campaign.octagons).filter((o) => o.isKeyLocation);
	// Jump viewport to selected key location
	const handleNavigateToCell = (cell) => {
		if (!containerRef.current) return;
		const cw = containerRef.current.clientWidth;
		const ch = containerRef.current.clientHeight;
		const targetScale = Math.max(1.1, transform.scale);
		const targetX = cw / 2 - cell.cx * targetScale;
		const targetY = ch / 2 - cell.cy * targetScale;
		setTransform({
			x: targetX,
			y: targetY,
			scale: targetScale
		});
		setModalCell(cell);
	};
	const selectedLabel = campaign.labels.find((l) => l.id === selectedLabelId) || null;
	const gridMetrics = getGridMetrics(campaign.gridSettings.cellSize);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "relative w-screen h-screen overflow-hidden bg-zinc-950 font-sans select-none",
		onContextMenu: (e) => e.preventDefault(),
		children: [
			/* @__PURE__ */ _jsxDEV(TacticalHud, {
				zoom: transform.scale,
				onZoomIn: () => handleZoom(1.2),
				onZoomOut: () => handleZoom(.83),
				onResetZoom: () => setTransform((prev) => ({
					...prev,
					scale: 1
				})),
				onFitMap: fitMapToScreen,
				cursorWorldPos: cursorPos,
				isAdmin,
				showAdminPanel,
				onToggleAdminPanel: () => setShowAdminPanel(!showAdminPanel),
				accentColor: campaign.themeAccent || "#22c55e",
				keyLocations,
				onSelectKeyLocation: handleNavigateToCell
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 442,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				ref: containerRef,
				onWheel: handleWheel,
				onMouseDown: handleMouseDown,
				onMouseMove: handleMouseMove,
				onMouseUp: handleMouseUp,
				onMouseLeave: () => {
					handleMouseUp();
					setGhostCell(null);
					setHoveredCell(null);
				},
				className: `w-full h-full relative cursor-grab active:cursor-grabbing ${isAdmin && activeTool === "paint_cell" ? "!cursor-crosshair" : ""}`,
				children: /* @__PURE__ */ _jsxDEV("div", {
					style: {
						transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
						transformOrigin: "0 0",
						width: `${mapSize.width}px`,
						height: `${mapSize.height}px`
					},
					className: "absolute top-0 left-0 transition-transform duration-75 ease-out",
					children: [
						/* @__PURE__ */ _jsxDEV("img", {
							src: MAP_IMAGE_URL,
							alt: "Tactical Map",
							onLoad: onImageLoad,
							draggable: false,
							className: "absolute top-0 left-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 484,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("svg", {
							className: "absolute top-0 left-0 w-full h-full",
							viewBox: `0 0 ${mapSize.width} ${mapSize.height}`,
							onClick: (e) => {
								if (selectedLabelId) setSelectedLabelId(null);
							},
							children: [
								/* @__PURE__ */ _jsxDEV(SvgDefs, {
									octagons: campaign.octagons,
									labels: campaign.labels,
									accentColor: campaign.themeAccent || "#22c55e"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 501,
									columnNumber: 13
								}, this),
								campaign.gridSettings.showGrid && !campaign.gridSettings.showTerritoryOnly && /* @__PURE__ */ _jsxDEV("g", {
									opacity: campaign.gridSettings.opacity,
									stroke: campaign.gridSettings.color || "#22c55e",
									strokeWidth: .8,
									fill: "none",
									pointerEvents: "none",
									children: Array.from({ length: Math.ceil(mapSize.width / campaign.gridSettings.cellSize) + 1 }).flatMap((_, col) => Array.from({ length: Math.ceil(mapSize.height / campaign.gridSettings.cellSize) + 1 }).map((_, row) => {
										const { cx, cy } = gridToWorldCenter(col, row, campaign.gridSettings.cellSize);
										return /* @__PURE__ */ _jsxDEV("polygon", { points: getOctagonPoints(cx, cy, gridMetrics.radius) }, `grid-bg-${col}-${row}`, false, {
											fileName: _jsxFileName,
											lineNumber: 528,
											columnNumber: 23
										}, this);
									}))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 509,
									columnNumber: 15
								}, this),
								campaign.gridSettings.showCoordinates && /* @__PURE__ */ _jsxDEV("g", {
									opacity: Math.min(1, campaign.gridSettings.opacity * 1.8),
									fill: campaign.gridSettings.color || "#22c55e",
									fontSize: gridMetrics.radius * .3,
									fontFamily: "Share Tech Mono, monospace",
									textAnchor: "middle",
									pointerEvents: "none",
									children: Array.from({ length: Math.ceil(mapSize.width / campaign.gridSettings.cellSize) + 1 }).flatMap((_, col) => Array.from({ length: Math.ceil(mapSize.height / campaign.gridSettings.cellSize) + 1 }).map((_, row) => {
										const { cx, cy } = gridToWorldCenter(col, row, campaign.gridSettings.cellSize);
										return /* @__PURE__ */ _jsxDEV("text", {
											x: cx,
											y: cy + 3,
											children: [
												col,
												":",
												row
											]
										}, `coord-${col}-${row}`, true, {
											fileName: _jsxFileName,
											lineNumber: 560,
											columnNumber: 23
										}, this);
									}))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 540,
									columnNumber: 15
								}, this),
								Object.values(campaign.octagons).map((cell) => /* @__PURE__ */ _jsxDEV(OctagonItem, {
									cell,
									radius: gridMetrics.radius,
									isSelected: modalCell?.id === cell.id,
									isHovered: hoveredCell?.cell.id === cell.id,
									onMouseEnter: (e) => {
										if (cell.isKeyLocation) {
											setHoveredCell({
												cell,
												screenX: e.clientX,
												screenY: e.clientY
											});
										}
									},
									onMouseLeave: () => setHoveredCell(null),
									onClick: (e) => handleOctagonClick(cell, e)
								}, cell.id, false, {
									fileName: _jsxFileName,
									lineNumber: 571,
									columnNumber: 15
								}, this)),
								isAdmin && ghostCell && /* @__PURE__ */ _jsxDEV("g", {
									pointerEvents: "none",
									children: /* @__PURE__ */ _jsxDEV("polygon", {
										points: getOctagonPoints(ghostCell.cx, ghostCell.cy, gridMetrics.radius),
										fill: activeTool === "eraser" ? "#ef4444" : brushColor.color,
										fillOpacity: .4,
										stroke: activeTool === "eraser" ? "#ef4444" : "#38bdf8",
										strokeWidth: 2,
										strokeDasharray: "3 3"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 594,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 593,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 493,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "absolute inset-0 pointer-events-none",
							children: campaign.labels.map((lbl) => /* @__PURE__ */ _jsxDEV("div", {
								className: "pointer-events-auto",
								children: /* @__PURE__ */ _jsxDEV(MapLabelItem, {
									label: lbl,
									isSelected: selectedLabelId === lbl.id,
									isAdmin,
									zoom: transform.scale,
									onSelect: () => {
										setSelectedLabelId(lbl.id);
									},
									onUpdate: handleUpdateSelectedLabel,
									onDelete: handleDeleteSelectedLabel
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 610,
									columnNumber: 17
								}, this)
							}, lbl.id, false, {
								fileName: _jsxFileName,
								lineNumber: 609,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 607,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 474,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 458,
				columnNumber: 7
			}, this),
			hoveredCell && !modalCell && /* @__PURE__ */ _jsxDEV(KeyLocationTooltip, {
				cell: hoveredCell.cell,
				x: hoveredCell.screenX,
				y: hoveredCell.screenY
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 629,
				columnNumber: 9
			}, this),
			modalCell && /* @__PURE__ */ _jsxDEV(KeyLocationModal, {
				cell: modalCell,
				isAdmin,
				onClose: () => setModalCell(null),
				onSave: handleSaveKeyLocation,
				onDeleteKeyLocation: handleDeleteKeyLocation
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 638,
				columnNumber: 9
			}, this),
			showAdminPanel && /* @__PURE__ */ _jsxDEV("div", {
				className: "absolute top-16 right-4 z-40",
				children: /* @__PURE__ */ _jsxDEV(AdminPanel, {
					isAdmin,
					activeTool,
					setActiveTool,
					onLogin: handleLogin,
					onLogout: handleLogout,
					brushType,
					setBrushType,
					brushColor,
					setBrushColor,
					brushArrowDirection,
					setBrushArrowDirection,
					brushIsKeyLocation,
					setBrushIsKeyLocation,
					selectedLabel,
					onUpdateSelectedLabel: handleUpdateSelectedLabel,
					onDeleteSelectedLabel: handleDeleteSelectedLabel,
					onAddNewLabel: handleAddNewLabel,
					gridSettings: campaign.gridSettings,
					onUpdateGridSettings: (s) => setCampaign((prev) => ({
						...prev,
						gridSettings: {
							...prev.gridSettings,
							...s
						}
					})),
					themeAccent: campaign.themeAccent,
					onChangeThemeAccent: (color) => setCampaign((prev) => ({
						...prev,
						themeAccent: color
					})),
					campaign,
					onImportCampaign: (imported) => {
						setCampaign(imported);
						alert("Кампания успешно загружена!");
					},
					onResetToDefault: () => setCampaign(INITIAL_CAMPAIGN)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 650,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 649,
				columnNumber: 9
			}, this),
			isImageLoaded && /* @__PURE__ */ _jsxDEV(Minimap, {
				imageSrc: MAP_IMAGE_URL,
				mapWidth: mapSize.width,
				mapHeight: mapSize.height,
				viewX: transform.x,
				viewY: transform.y,
				viewZoom: transform.scale,
				containerWidth: containerRef.current?.clientWidth || 1e3,
				containerHeight: containerRef.current?.clientHeight || 800,
				octagons: campaign.octagons,
				onNavigate: (nx, ny) => setTransform((prev) => ({
					...prev,
					x: nx,
					y: ny
				})),
				accentColor: campaign.themeAccent || "#22c55e"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 691,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 scanlines-overlay pointer-events-none opacity-30 z-10" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 709,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 437,
		columnNumber: 5
	}, this);
}

//# sourceMappingURL=data:application/json;base64,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YUFBYSxJQUFJLE9BQ2YsY0FBYyxVQUFVO0tBQUUsR0FBRztLQUFNLEdBQUc7S0FBSSxHQUFHO0lBQUcsRUFBRTtJQUVwRCxhQUFhLFNBQVMsZUFBZTtHQUN0Qzs7Ozs7R0FJSCx3QkFBQyxPQUFELEVBQUssV0FBVSx5RUFBMEU7Ozs7O0VBQ3RGOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBcHAudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBDYW1wYWlnblN0YXRlLFxuICBPY3RhZ29uQ2VsbCxcbiAgT2N0YWdvblR5cGUsXG4gIE1hcExhYmVsLFxuICBBY3RpdmVUb29sLFxuICBHcmlkU2V0dGluZ3MsXG59IGZyb20gJy4vdHlwZXMvbWFwJztcbmltcG9ydCB7IElOSVRJQUxfQ0FNUEFJR04gfSBmcm9tICcuL2RhdGEvZGVmYXVsdENhbXBhaWduJztcbmltcG9ydCB7XG4gIGdldEdyaWRNZXRyaWNzLFxuICBnZXRPY3RhZ29uUG9pbnRzLFxuICB3b3JsZFRvR3JpZCxcbiAgZ3JpZFRvV29ybGRDZW50ZXIsXG4gIGNlbGxLZXksXG59IGZyb20gJy4vdXRpbHMvb2N0YWdvbic7XG5pbXBvcnQgeyBTdmdEZWZzIH0gZnJvbSAnLi9jb21wb25lbnRzL1N2Z1BhdHRlcm5zJztcbmltcG9ydCB7IE9jdGFnb25JdGVtIH0gZnJvbSAnLi9jb21wb25lbnRzL09jdGFnb25JdGVtJztcbmltcG9ydCB7IE1hcExhYmVsSXRlbSB9IGZyb20gJy4vY29tcG9uZW50cy9NYXBMYWJlbEl0ZW0nO1xuaW1wb3J0IHsgQ29sb3JHcmFkaWVudFZhbHVlIH0gZnJvbSAnLi9jb21wb25lbnRzL0NvbG9yR3JhZGllbnRQaWNrZXInO1xuaW1wb3J0IHsgQWRtaW5QYW5lbCB9IGZyb20gJy4vY29tcG9uZW50cy9BZG1pblBhbmVsJztcbmltcG9ydCB7IFRhY3RpY2FsSHVkIH0gZnJvbSAnLi9jb21wb25lbnRzL1RhY3RpY2FsSHVkJztcbmltcG9ydCB7IE1pbmltYXAgfSBmcm9tICcuL2NvbXBvbmVudHMvTWluaW1hcCc7XG5pbXBvcnQgeyBLZXlMb2NhdGlvblRvb2x0aXAgfSBmcm9tICcuL2NvbXBvbmVudHMvS2V5TG9jYXRpb25Ub29sdGlwJztcbmltcG9ydCB7IEtleUxvY2F0aW9uTW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvS2V5TG9jYXRpb25Nb2RhbCc7XG5cbmNvbnN0IE1BUF9JTUFHRV9VUkwgPSAnL2Fzc2V0cy9haXN0dWRpby81MTk1MzU2NDA2MzczMDk2Mzc4X2ZlZmRiOGQwLmpwZyc7XG5jb25zdCBTVE9SQUdFX0tFWSA9ICd0YWN0aWNhbF9ycF9jYW1wYWlnbl92Myc7XG5jb25zdCBBRE1JTl9QQVNTV09SRCA9ICdEVERUMjI4JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xuICAvLyBDYW1wYWlnbiBTdGF0ZVxuICBjb25zdCBbY2FtcGFpZ24sIHNldENhbXBhaWduXSA9IHVzZVN0YXRlPENhbXBhaWduU3RhdGU+KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG4gICAgICBpZiAoc2F2ZWQpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShzYXZlZCk7XG4gICAgICAgIGlmIChwYXJzZWQgJiYgcGFyc2VkLm9jdGFnb25zKSByZXR1cm4gcGFyc2VkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRmFpbGVkIHRvIHBhcnNlIHNhdmVkIGNhbXBhaWduJywgZSk7XG4gICAgfVxuICAgIHJldHVybiBJTklUSUFMX0NBTVBBSUdOO1xuICB9KTtcblxuICAvLyBTYXZlIGNoYW5nZXMgdG8gbG9jYWxTdG9yYWdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShjYW1wYWlnbikpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRmFpbGVkIHRvIHNhdmUgdG8gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgfVxuICB9LCBbY2FtcGFpZ25dKTtcblxuICAvLyBBZG1pbiBBdXRoIFN0YXRlXG4gIGNvbnN0IFtpc0FkbWluLCBzZXRJc0FkbWluXSA9IHVzZVN0YXRlPGJvb2xlYW4+KCgpID0+IHtcbiAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncnBfaXNfYWRtaW4nKSA9PT0gJ3RydWUnO1xuICB9KTtcblxuICBjb25zdCBbc2hvd0FkbWluUGFuZWwsIHNldFNob3dBZG1pblBhbmVsXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZVRvb2wsIHNldEFjdGl2ZVRvb2xdID0gdXNlU3RhdGU8QWN0aXZlVG9vbD4oJ25hdmlnYXRlJyk7XG5cbiAgLy8gQnJ1c2ggQ29uZmlnXG4gIGNvbnN0IFticnVzaFR5cGUsIHNldEJydXNoVHlwZV0gPSB1c2VTdGF0ZTxPY3RhZ29uVHlwZT4oJ3NvbGlkJyk7XG4gIGNvbnN0IFticnVzaENvbG9yLCBzZXRCcnVzaENvbG9yXSA9IHVzZVN0YXRlPENvbG9yR3JhZGllbnRWYWx1ZT4oe1xuICAgIGlzR3JhZGllbnQ6IGZhbHNlLFxuICAgIGNvbG9yOiAnIzEwYjk4MScsXG4gICAgb3BhY2l0eTogMC44NSxcbiAgfSk7XG4gIGNvbnN0IFticnVzaEFycm93RGlyZWN0aW9uLCBzZXRCcnVzaEFycm93RGlyZWN0aW9uXSA9IHVzZVN0YXRlPG51bWJlcj4oOTApO1xuICBjb25zdCBbYnJ1c2hJc0tleUxvY2F0aW9uLCBzZXRCcnVzaElzS2V5TG9jYXRpb25dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIExhYmVsIFNlbGVjdGlvblxuICBjb25zdCBbc2VsZWN0ZWRMYWJlbElkLCBzZXRTZWxlY3RlZExhYmVsSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gS2V5IExvY2F0aW9uIE1vZGFsICYgVG9vbHRpcFxuICBjb25zdCBbbW9kYWxDZWxsLCBzZXRNb2RhbENlbGxdID0gdXNlU3RhdGU8T2N0YWdvbkNlbGwgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2hvdmVyZWRDZWxsLCBzZXRIb3ZlcmVkQ2VsbF0gPSB1c2VTdGF0ZTx7XG4gICAgY2VsbDogT2N0YWdvbkNlbGw7XG4gICAgc2NyZWVuWDogbnVtYmVyO1xuICAgIHNjcmVlblk6IG51bWJlcjtcbiAgfSB8IG51bGw+KG51bGwpO1xuXG4gIC8vIFZpZXdwb3J0IFRyYW5zZm9ybSAoUGFuICYgWm9vbSlcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgW3RyYW5zZm9ybSwgc2V0VHJhbnNmb3JtXSA9IHVzZVN0YXRlKHsgeDogMCwgeTogMCwgc2NhbGU6IDAuODUgfSk7XG4gIGNvbnN0IFtpc1Bhbm5pbmcsIHNldElzUGFubmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHBhblN0YXJ0UmVmID0gdXNlUmVmKHsgeDogMCwgeTogMCwgdmlld1g6IDAsIHZpZXdZOiAwIH0pO1xuXG4gIC8vIE1hcCBuYXR1cmFsIGRpbWVuc2lvbnNcbiAgY29uc3QgW21hcFNpemUsIHNldE1hcFNpemVdID0gdXNlU3RhdGUoeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiAxMDgwIH0pO1xuICBjb25zdCBbaXNJbWFnZUxvYWRlZCwgc2V0SXNJbWFnZUxvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gQ3Vyc29yIGNvb3JkaW5hdGVzXG4gIGNvbnN0IFtjdXJzb3JQb3MsIHNldEN1cnNvclBvc10gPSB1c2VTdGF0ZTx7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBjb2w6IG51bWJlcjtcbiAgICByb3c6IG51bWJlcjtcbiAgfSB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEdob3N0IENlbGwgZm9yIEhvdmVyIEJydXNoIFByZXZpZXdcbiAgY29uc3QgW2dob3N0Q2VsbCwgc2V0R2hvc3RDZWxsXSA9IHVzZVN0YXRlPHsgY29sOiBudW1iZXI7IHJvdzogbnVtYmVyOyBjeDogbnVtYmVyOyBjeTogbnVtYmVyIH0gfCBudWxsPihudWxsKTtcblxuICAvLyBEcmFnLXBhaW50IHRyYWNraW5nXG4gIGNvbnN0IGlzTW91c2VEb3duUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICAvLyBJbml0aWFsaXplIE1hcCBpbWFnZSBhbmQgY2FsY3VsYXRlIGluaXRpYWwgZml0XG4gIGNvbnN0IG9uSW1hZ2VMb2FkID0gKGU6IFJlYWN0LlN5bnRoZXRpY0V2ZW50PEhUTUxJbWFnZUVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgaW1nID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHcgPSBpbWcubmF0dXJhbFdpZHRoIHx8IDE5MjA7XG4gICAgY29uc3QgaCA9IGltZy5uYXR1cmFsSGVpZ2h0IHx8IDEwODA7XG4gICAgc2V0TWFwU2l6ZSh7IHdpZHRoOiB3LCBoZWlnaHQ6IGggfSk7XG4gICAgc2V0SXNJbWFnZUxvYWRlZCh0cnVlKTtcblxuICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkge1xuICAgICAgY29uc3QgY3cgPSBjb250YWluZXJSZWYuY3VycmVudC5jbGllbnRXaWR0aDtcbiAgICAgIGNvbnN0IGNoID0gY29udGFpbmVyUmVmLmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3QgZml0U2NhbGUgPSBNYXRoLm1pbihjdyAvIHcsIGNoIC8gaCkgKiAwLjk1O1xuICAgICAgY29uc3QgZml0WCA9IChjdyAtIHcgKiBmaXRTY2FsZSkgLyAyO1xuICAgICAgY29uc3QgZml0WSA9IChjaCAtIGggKiBmaXRTY2FsZSkgLyAyO1xuICAgICAgc2V0VHJhbnNmb3JtKHsgeDogZml0WCwgeTogZml0WSwgc2NhbGU6IGZpdFNjYWxlIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBDZW50ZXIgJiBGaXQgVmlld3BvcnRcbiAgY29uc3QgZml0TWFwVG9TY3JlZW4gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjb250YWluZXJSZWYuY3VycmVudCB8fCBtYXBTaXplLndpZHRoID09PSAwKSByZXR1cm47XG4gICAgY29uc3QgY3cgPSBjb250YWluZXJSZWYuY3VycmVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBjaCA9IGNvbnRhaW5lclJlZi5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBmaXRTY2FsZSA9IE1hdGgubWluKGN3IC8gbWFwU2l6ZS53aWR0aCwgY2ggLyBtYXBTaXplLmhlaWdodCkgKiAwLjk1O1xuICAgIGNvbnN0IGZpdFggPSAoY3cgLSBtYXBTaXplLndpZHRoICogZml0U2NhbGUpIC8gMjtcbiAgICBjb25zdCBmaXRZID0gKGNoIC0gbWFwU2l6ZS5oZWlnaHQgKiBmaXRTY2FsZSkgLyAyO1xuICAgIHNldFRyYW5zZm9ybSh7IHg6IGZpdFgsIHk6IGZpdFksIHNjYWxlOiBmaXRTY2FsZSB9KTtcbiAgfSwgW21hcFNpemVdKTtcblxuICAvLyBab29tIEhlbHBlcnNcbiAgY29uc3QgaGFuZGxlWm9vbSA9IChmYWN0b3I6IG51bWJlciwgY2xpZW50Q2VudGVyPzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSA9PiB7XG4gICAgc2V0VHJhbnNmb3JtKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuZXdTY2FsZSA9IE1hdGgubWluKDUuMCwgTWF0aC5tYXgoMC4xMiwgcHJldi5zY2FsZSAqIGZhY3RvcikpO1xuICAgICAgaWYgKCFjb250YWluZXJSZWYuY3VycmVudCkgcmV0dXJuIHsgLi4ucHJldiwgc2NhbGU6IG5ld1NjYWxlIH07XG5cbiAgICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGN4ID0gY2xpZW50Q2VudGVyID8gY2xpZW50Q2VudGVyLnggLSByZWN0LmxlZnQgOiByZWN0LndpZHRoIC8gMjtcbiAgICAgIGNvbnN0IGN5ID0gY2xpZW50Q2VudGVyID8gY2xpZW50Q2VudGVyLnkgLSByZWN0LnRvcCA6IHJlY3QuaGVpZ2h0IC8gMjtcblxuICAgICAgY29uc3QgbmV3WCA9IGN4IC0gKGN4IC0gcHJldi54KSAqIChuZXdTY2FsZSAvIHByZXYuc2NhbGUpO1xuICAgICAgY29uc3QgbmV3WSA9IGN5IC0gKGN5IC0gcHJldi55KSAqIChuZXdTY2FsZSAvIHByZXYuc2NhbGUpO1xuXG4gICAgICByZXR1cm4geyB4OiBuZXdYLCB5OiBuZXdZLCBzY2FsZTogbmV3U2NhbGUgfTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBXaGVlbCB6b29tIGhhbmRsZXJcbiAgY29uc3QgaGFuZGxlV2hlZWwgPSAoZTogUmVhY3QuV2hlZWxFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmYWN0b3IgPSBlLmRlbHRhWSA8IDAgPyAxLjEyIDogMC44OTtcbiAgICBoYW5kbGVab29tKGZhY3RvciwgeyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9KTtcbiAgfTtcblxuICAvLyBQb2ludGVyIC8gTW91c2UgRG93biBmb3IgUGFuIG9yIFBhaW50XG4gIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgLy8gSWYgbWlkZGxlIGNsaWNrIG9yIHNwYWNlIGtleSBvciBuYXZpZ2F0ZSB0b29sLCBzdGFydCBwYW5uaW5nXG4gICAgaWYgKGUuYnV0dG9uID09PSAxIHx8IGUuYnV0dG9uID09PSAyIHx8IGFjdGl2ZVRvb2wgPT09ICduYXZpZ2F0ZScgfHwgZS5zaGlmdEtleSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0SXNQYW5uaW5nKHRydWUpO1xuICAgICAgcGFuU3RhcnRSZWYuY3VycmVudCA9IHtcbiAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICB5OiBlLmNsaWVudFksXG4gICAgICAgIHZpZXdYOiB0cmFuc2Zvcm0ueCxcbiAgICAgICAgdmlld1k6IHRyYW5zZm9ybS55LFxuICAgICAgfTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS5idXR0b24gPT09IDAgJiYgaXNBZG1pbiAmJiAoYWN0aXZlVG9vbCA9PT0gJ3BhaW50X2NlbGwnIHx8IGFjdGl2ZVRvb2wgPT09ICdlcmFzZXInKSkge1xuICAgICAgaXNNb3VzZURvd25SZWYuY3VycmVudCA9IHRydWU7XG4gICAgICBhcHBseVBhaW50QXRDdXJzb3IoZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIENvbnZlcnQgY2xpZW50IGNvb3JkaW5hdGUgaW50byB3b3JsZCBjb29yZGluYXRlXG4gIGNvbnN0IGNsaWVudFRvV29ybGQgPSB1c2VDYWxsYmFjayhcbiAgICAoY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIpID0+IHtcbiAgICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybiB7IHg6IDAsIHk6IDAgfTtcbiAgICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHNjcmVlblggPSBjbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgY29uc3Qgc2NyZWVuWSA9IGNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgIGNvbnN0IHdvcmxkWCA9IChzY3JlZW5YIC0gdHJhbnNmb3JtLngpIC8gdHJhbnNmb3JtLnNjYWxlO1xuICAgICAgY29uc3Qgd29ybGRZID0gKHNjcmVlblkgLSB0cmFuc2Zvcm0ueSkgLyB0cmFuc2Zvcm0uc2NhbGU7XG4gICAgICByZXR1cm4geyB4OiBNYXRoLnJvdW5kKHdvcmxkWCksIHk6IE1hdGgucm91bmQod29ybGRZKSB9O1xuICAgIH0sXG4gICAgW3RyYW5zZm9ybV1cbiAgKTtcblxuICAvLyBBcHBseSBQYWludCBvciBFcmFzZXIgYXQgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuICBjb25zdCBhcHBseVBhaW50QXRDdXJzb3IgPSAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IHdvcmxkID0gY2xpZW50VG9Xb3JsZChlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgaWYgKHdvcmxkLnggPCAwIHx8IHdvcmxkLnkgPCAwIHx8IHdvcmxkLnggPiBtYXBTaXplLndpZHRoIHx8IHdvcmxkLnkgPiBtYXBTaXplLmhlaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29sLCByb3cgfSA9IHdvcmxkVG9HcmlkKHdvcmxkLngsIHdvcmxkLnksIGNhbXBhaWduLmdyaWRTZXR0aW5ncy5jZWxsU2l6ZSk7XG4gICAgY29uc3Qga2V5ID0gY2VsbEtleShjb2wsIHJvdyk7XG5cbiAgICBpZiAoYWN0aXZlVG9vbCA9PT0gJ2VyYXNlcicpIHtcbiAgICAgIHNldENhbXBhaWduKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXYub2N0YWdvbnMgfTtcbiAgICAgICAgZGVsZXRlIG5leHRba2V5XTtcbiAgICAgICAgcmV0dXJuIHsgLi4ucHJldiwgb2N0YWdvbnM6IG5leHQgfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChhY3RpdmVUb29sID09PSAncGFpbnRfY2VsbCcpIHtcbiAgICAgIGNvbnN0IHsgY3gsIGN5IH0gPSBncmlkVG9Xb3JsZENlbnRlcihjb2wsIHJvdywgY2FtcGFpZ24uZ3JpZFNldHRpbmdzLmNlbGxTaXplKTtcbiAgICAgIHNldENhbXBhaWduKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gcHJldi5vY3RhZ29uc1trZXldO1xuICAgICAgICBjb25zdCB1cGRhdGVkOiBPY3RhZ29uQ2VsbCA9IHtcbiAgICAgICAgICBpZDoga2V5LFxuICAgICAgICAgIGNvbCxcbiAgICAgICAgICByb3csXG4gICAgICAgICAgY3gsXG4gICAgICAgICAgY3ksXG4gICAgICAgICAgdHlwZTogYnJ1c2hUeXBlLFxuICAgICAgICAgIGZpbGxDb2xvcjogYnJ1c2hDb2xvci5jb2xvcixcbiAgICAgICAgICBpc0dyYWRpZW50OiBicnVzaENvbG9yLmlzR3JhZGllbnQsXG4gICAgICAgICAgZ3JhZGllbnRTdGFydDogYnJ1c2hDb2xvci5ncmFkaWVudFN0YXJ0LFxuICAgICAgICAgIGdyYWRpZW50RW5kOiBicnVzaENvbG9yLmdyYWRpZW50RW5kLFxuICAgICAgICAgIGdyYWRpZW50QW5nbGU6IGJydXNoQ29sb3IuZ3JhZGllbnRBbmdsZSxcbiAgICAgICAgICBvcGFjaXR5OiBicnVzaENvbG9yLm9wYWNpdHksXG4gICAgICAgICAgYXJyb3dEaXJlY3Rpb246IGJydXNoVHlwZSA9PT0gJ3RyYWRlX2Fycm93JyA/IGJydXNoQXJyb3dEaXJlY3Rpb24gOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXNLZXlMb2NhdGlvbjogYnJ1c2hJc0tleUxvY2F0aW9uIHx8IGV4aXN0aW5nPy5pc0tleUxvY2F0aW9uIHx8IGZhbHNlLFxuICAgICAgICAgIGtleUxvY2F0aW9uRGF0YTogZXhpc3Rpbmc/LmtleUxvY2F0aW9uRGF0YSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgb2N0YWdvbnM6IHtcbiAgICAgICAgICAgIC4uLnByZXYub2N0YWdvbnMsXG4gICAgICAgICAgICBba2V5XTogdXBkYXRlZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIE1vdXNlIE1vdmVcbiAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoaXNQYW5uaW5nKSB7XG4gICAgICBjb25zdCBkeCA9IGUuY2xpZW50WCAtIHBhblN0YXJ0UmVmLmN1cnJlbnQueDtcbiAgICAgIGNvbnN0IGR5ID0gZS5jbGllbnRZIC0gcGFuU3RhcnRSZWYuY3VycmVudC55O1xuICAgICAgc2V0VHJhbnNmb3JtKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICB4OiBwYW5TdGFydFJlZi5jdXJyZW50LnZpZXdYICsgZHgsXG4gICAgICAgIHk6IHBhblN0YXJ0UmVmLmN1cnJlbnQudmlld1kgKyBkeSxcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JsZCA9IGNsaWVudFRvV29ybGQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIGNvbnN0IHsgY29sLCByb3cgfSA9IHdvcmxkVG9HcmlkKHdvcmxkLngsIHdvcmxkLnksIGNhbXBhaWduLmdyaWRTZXR0aW5ncy5jZWxsU2l6ZSk7XG4gICAgc2V0Q3Vyc29yUG9zKHsgeDogd29ybGQueCwgeTogd29ybGQueSwgY29sLCByb3cgfSk7XG5cbiAgICAvLyBVcGRhdGUgZ2hvc3QgcHJldmlldyB3aGVuIHBhaW50aW5nXG4gICAgaWYgKGlzQWRtaW4gJiYgKGFjdGl2ZVRvb2wgPT09ICdwYWludF9jZWxsJyB8fCBhY3RpdmVUb29sID09PSAnZXJhc2VyJykpIHtcbiAgICAgIGNvbnN0IHsgY3gsIGN5IH0gPSBncmlkVG9Xb3JsZENlbnRlcihjb2wsIHJvdywgY2FtcGFpZ24uZ3JpZFNldHRpbmdzLmNlbGxTaXplKTtcbiAgICAgIHNldEdob3N0Q2VsbCh7IGNvbCwgcm93LCBjeCwgY3kgfSk7XG5cbiAgICAgIGlmIChpc01vdXNlRG93blJlZi5jdXJyZW50KSB7XG4gICAgICAgIGFwcGx5UGFpbnRBdEN1cnNvcihlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2V0R2hvc3RDZWxsKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICAvLyBNb3VzZSBVcFxuICBjb25zdCBoYW5kbGVNb3VzZVVwID0gKCkgPT4ge1xuICAgIHNldElzUGFubmluZyhmYWxzZSk7XG4gICAgaXNNb3VzZURvd25SZWYuY3VycmVudCA9IGZhbHNlO1xuICB9O1xuXG4gIC8vIEFkbWluIExvZ2luIC8gTG9nb3V0XG4gIGNvbnN0IGhhbmRsZUxvZ2luID0gKHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAocGFzc3dvcmQgPT09IEFETUlOX1BBU1NXT1JEKSB7XG4gICAgICBzZXRJc0FkbWluKHRydWUpO1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncnBfaXNfYWRtaW4nLCAndHJ1ZScpO1xuICAgICAgc2V0U2hvd0FkbWluUGFuZWwodHJ1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcbiAgICBzZXRJc0FkbWluKGZhbHNlKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdycF9pc19hZG1pbicpO1xuICAgIHNldFNob3dBZG1pblBhbmVsKGZhbHNlKTtcbiAgICBzZXRBY3RpdmVUb29sKCduYXZpZ2F0ZScpO1xuICB9O1xuXG4gIC8vIE9jdGFnb24gY2xpY2sgaGFuZGxlclxuICBjb25zdCBoYW5kbGVPY3RhZ29uQ2xpY2sgPSAoY2VsbDogT2N0YWdvbkNlbGwsIGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgLy8gSWYgQWRtaW4gaW4gZXJhc2VyIG1vZGVcbiAgICBpZiAoaXNBZG1pbiAmJiBhY3RpdmVUb29sID09PSAnZXJhc2VyJykge1xuICAgICAgc2V0Q2FtcGFpZ24oKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldi5vY3RhZ29ucyB9O1xuICAgICAgICBkZWxldGUgbmV4dFtjZWxsLmlkXTtcbiAgICAgICAgcmV0dXJuIHsgLi4ucHJldiwgb2N0YWdvbnM6IG5leHQgfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIEFkbWluIGluIHBhaW50IG1vZGVcbiAgICBpZiAoaXNBZG1pbiAmJiBhY3RpdmVUb29sID09PSAncGFpbnRfY2VsbCcpIHtcbiAgICAgIGFwcGx5UGFpbnRBdEN1cnNvcihlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiBjbGlja2luZyBvbiBrZXkgbG9jYXRpb24gb3IgaW4ga2V5IGxvY2F0aW9uIG1vZGU6IG9wZW4gZG9zc2llciBtb2RhbCFcbiAgICBpZiAoY2VsbC5pc0tleUxvY2F0aW9uIHx8IChpc0FkbWluICYmIGFjdGl2ZVRvb2wgPT09ICdrZXlfbG9jYXRpb24nKSkge1xuICAgICAgc2V0TW9kYWxDZWxsKGNlbGwpO1xuICAgIH1cbiAgfTtcblxuICAvLyBBZGQgbmV3IE1hcCBMYWJlbFxuICBjb25zdCBoYW5kbGVBZGROZXdMYWJlbCA9ICgpID0+IHtcbiAgICAvLyBQbGFjZSBuZXcgbGFiZWwgaW4gY2VudGVyIG9mIGN1cnJlbnQgdmlld1xuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgY2VudGVyV29ybGQgPSBjbGllbnRUb1dvcmxkKHJlY3QubGVmdCArIHJlY3Qud2lkdGggLyAyLCByZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMik7XG5cbiAgICBjb25zdCBuZXdMYWJlbDogTWFwTGFiZWwgPSB7XG4gICAgICBpZDogYGxhYmVsLSR7RGF0ZS5ub3coKX1gLFxuICAgICAgdGV4dDogJ9Cd0J7QktCQ0K8g0KLQldCg0KDQmNCi0J7QoNCY0K8nLFxuICAgICAgeDogY2VudGVyV29ybGQueCAtIDEwMCxcbiAgICAgIHk6IGNlbnRlcldvcmxkLnkgLSAyMCxcbiAgICAgIHdpZHRoOiAyMjAsXG4gICAgICBmb250U2l6ZTogMTYsXG4gICAgICBmb250RmFtaWx5OiAnT3JiaXRyb24nLFxuICAgICAgY29sb3I6ICcjMzRkMzk5JyxcbiAgICAgIGlzQm9sZDogdHJ1ZSxcbiAgICAgIGxldHRlclNwYWNpbmc6IDIsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDksIDksIDExLCAwLjc1KScsXG4gICAgICBib3JkZXJDb2xvcjogJyMwNTk2NjknLFxuICAgICAgYm9yZGVyV2lkdGg6IDEuNSxcbiAgICAgIGJvcmRlclJhZGl1czogNCxcbiAgICAgIHJvdGF0aW9uOiAwLFxuICAgIH07XG5cbiAgICBzZXRDYW1wYWlnbigocHJldikgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBsYWJlbHM6IFsuLi5wcmV2LmxhYmVscywgbmV3TGFiZWxdLFxuICAgIH0pKTtcbiAgICBzZXRTZWxlY3RlZExhYmVsSWQobmV3TGFiZWwuaWQpO1xuICB9O1xuXG4gIC8vIFVwZGF0ZSBzZWxlY3RlZCBsYWJlbFxuICBjb25zdCBoYW5kbGVVcGRhdGVTZWxlY3RlZExhYmVsID0gKHVwZGF0ZWQ6IFBhcnRpYWw8TWFwTGFiZWw+KSA9PiB7XG4gICAgaWYgKCFzZWxlY3RlZExhYmVsSWQpIHJldHVybjtcbiAgICBzZXRDYW1wYWlnbigocHJldikgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBsYWJlbHM6IHByZXYubGFiZWxzLm1hcCgobCkgPT4gKGwuaWQgPT09IHNlbGVjdGVkTGFiZWxJZCA/IHsgLi4ubCwgLi4udXBkYXRlZCB9IDogbCkpLFxuICAgIH0pKTtcbiAgfTtcblxuICAvLyBEZWxldGUgc2VsZWN0ZWQgbGFiZWxcbiAgY29uc3QgaGFuZGxlRGVsZXRlU2VsZWN0ZWRMYWJlbCA9ICgpID0+IHtcbiAgICBpZiAoIXNlbGVjdGVkTGFiZWxJZCkgcmV0dXJuO1xuICAgIHNldENhbXBhaWduKChwcmV2KSA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIGxhYmVsczogcHJldi5sYWJlbHMuZmlsdGVyKChsKSA9PiBsLmlkICE9PSBzZWxlY3RlZExhYmVsSWQpLFxuICAgIH0pKTtcbiAgICBzZXRTZWxlY3RlZExhYmVsSWQobnVsbCk7XG4gIH07XG5cbiAgLy8gU2F2ZSB1cGRhdGVkIEtleSBMb2NhdGlvbiBkYXRhXG4gIGNvbnN0IGhhbmRsZVNhdmVLZXlMb2NhdGlvbiA9ICh1cGRhdGVkQ2VsbDogT2N0YWdvbkNlbGwpID0+IHtcbiAgICBzZXRDYW1wYWlnbigocHJldikgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBvY3RhZ29uczoge1xuICAgICAgICAuLi5wcmV2Lm9jdGFnb25zLFxuICAgICAgICBbdXBkYXRlZENlbGwuaWRdOiB1cGRhdGVkQ2VsbCxcbiAgICAgIH0sXG4gICAgfSkpO1xuICAgIHNldE1vZGFsQ2VsbChudWxsKTtcbiAgfTtcblxuICAvLyBEZWxldGUga2V5IGxvY2F0aW9uIGRhdGEgKGtlZXAgY2VsbCBvciByZW1vdmUpXG4gIGNvbnN0IGhhbmRsZURlbGV0ZUtleUxvY2F0aW9uID0gKCkgPT4ge1xuICAgIGlmICghbW9kYWxDZWxsKSByZXR1cm47XG4gICAgc2V0Q2FtcGFpZ24oKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gcHJldi5vY3RhZ29uc1ttb2RhbENlbGwuaWRdO1xuICAgICAgaWYgKCFleGlzdGluZykgcmV0dXJuIHByZXY7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBvY3RhZ29uczoge1xuICAgICAgICAgIC4uLnByZXYub2N0YWdvbnMsXG4gICAgICAgICAgW21vZGFsQ2VsbC5pZF06IHtcbiAgICAgICAgICAgIC4uLmV4aXN0aW5nLFxuICAgICAgICAgICAgaXNLZXlMb2NhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBrZXlMb2NhdGlvbkRhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBzZXRNb2RhbENlbGwobnVsbCk7XG4gIH07XG5cbiAgLy8gS2V5IGxvY2F0aW9ucyBsaXN0XG4gIGNvbnN0IGtleUxvY2F0aW9ucyA9IE9iamVjdC52YWx1ZXMoY2FtcGFpZ24ub2N0YWdvbnMpLmZpbHRlcigobykgPT4gby5pc0tleUxvY2F0aW9uKTtcblxuICAvLyBKdW1wIHZpZXdwb3J0IHRvIHNlbGVjdGVkIGtleSBsb2NhdGlvblxuICBjb25zdCBoYW5kbGVOYXZpZ2F0ZVRvQ2VsbCA9IChjZWxsOiBPY3RhZ29uQ2VsbCkgPT4ge1xuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBjdyA9IGNvbnRhaW5lclJlZi5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGNoID0gY29udGFpbmVyUmVmLmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IHRhcmdldFNjYWxlID0gTWF0aC5tYXgoMS4xLCB0cmFuc2Zvcm0uc2NhbGUpO1xuICAgIGNvbnN0IHRhcmdldFggPSBjdyAvIDIgLSBjZWxsLmN4ICogdGFyZ2V0U2NhbGU7XG4gICAgY29uc3QgdGFyZ2V0WSA9IGNoIC8gMiAtIGNlbGwuY3kgKiB0YXJnZXRTY2FsZTtcbiAgICBzZXRUcmFuc2Zvcm0oeyB4OiB0YXJnZXRYLCB5OiB0YXJnZXRZLCBzY2FsZTogdGFyZ2V0U2NhbGUgfSk7XG4gICAgc2V0TW9kYWxDZWxsKGNlbGwpO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdGVkTGFiZWwgPSBjYW1wYWlnbi5sYWJlbHMuZmluZCgobCkgPT4gbC5pZCA9PT0gc2VsZWN0ZWRMYWJlbElkKSB8fCBudWxsO1xuICBjb25zdCBncmlkTWV0cmljcyA9IGdldEdyaWRNZXRyaWNzKGNhbXBhaWduLmdyaWRTZXR0aW5ncy5jZWxsU2l6ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LXNjcmVlbiBoLXNjcmVlbiBvdmVyZmxvdy1oaWRkZW4gYmctemluYy05NTAgZm9udC1zYW5zIHNlbGVjdC1ub25lXCJcbiAgICAgIG9uQ29udGV4dE1lbnU9eyhlKSA9PiBlLnByZXZlbnREZWZhdWx0KCl9XG4gICAgPlxuICAgICAgey8qIFRhY3RpY2FsIEhVRCBIZWFkZXIgJiBDb3JuZXIgQnJhY2tldHMgKi99XG4gICAgICA8VGFjdGljYWxIdWRcbiAgICAgICAgem9vbT17dHJhbnNmb3JtLnNjYWxlfVxuICAgICAgICBvblpvb21Jbj17KCkgPT4gaGFuZGxlWm9vbSgxLjIpfVxuICAgICAgICBvblpvb21PdXQ9eygpID0+IGhhbmRsZVpvb20oMC44Myl9XG4gICAgICAgIG9uUmVzZXRab29tPXsoKSA9PiBzZXRUcmFuc2Zvcm0oKHByZXYpID0+ICh7IC4uLnByZXYsIHNjYWxlOiAxLjAgfSkpfVxuICAgICAgICBvbkZpdE1hcD17Zml0TWFwVG9TY3JlZW59XG4gICAgICAgIGN1cnNvcldvcmxkUG9zPXtjdXJzb3JQb3N9XG4gICAgICAgIGlzQWRtaW49e2lzQWRtaW59XG4gICAgICAgIHNob3dBZG1pblBhbmVsPXtzaG93QWRtaW5QYW5lbH1cbiAgICAgICAgb25Ub2dnbGVBZG1pblBhbmVsPXsoKSA9PiBzZXRTaG93QWRtaW5QYW5lbCghc2hvd0FkbWluUGFuZWwpfVxuICAgICAgICBhY2NlbnRDb2xvcj17Y2FtcGFpZ24udGhlbWVBY2NlbnQgfHwgJyMyMmM1NWUnfVxuICAgICAgICBrZXlMb2NhdGlvbnM9e2tleUxvY2F0aW9uc31cbiAgICAgICAgb25TZWxlY3RLZXlMb2NhdGlvbj17aGFuZGxlTmF2aWdhdGVUb0NlbGx9XG4gICAgICAvPlxuXG4gICAgICB7LyogTWFpbiBJbnRlcmFjdGl2ZSBNYXAgVmlld3BvcnQgKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgICBvbldoZWVsPXtoYW5kbGVXaGVlbH1cbiAgICAgICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgb25Nb3VzZU1vdmU9e2hhbmRsZU1vdXNlTW92ZX1cbiAgICAgICAgb25Nb3VzZVVwPXtoYW5kbGVNb3VzZVVwfVxuICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHtcbiAgICAgICAgICBoYW5kbGVNb3VzZVVwKCk7XG4gICAgICAgICAgc2V0R2hvc3RDZWxsKG51bGwpO1xuICAgICAgICAgIHNldEhvdmVyZWRDZWxsKG51bGwpO1xuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgaC1mdWxsIHJlbGF0aXZlIGN1cnNvci1ncmFiIGFjdGl2ZTpjdXJzb3ItZ3JhYmJpbmcgJHtcbiAgICAgICAgICBpc0FkbWluICYmIGFjdGl2ZVRvb2wgPT09ICdwYWludF9jZWxsJyA/ICchY3Vyc29yLWNyb3NzaGFpcicgOiAnJ1xuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgey8qIFRyYW5zZm9ybSBDb250YWluZXIgKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7dHJhbnNmb3JtLnh9cHgsICR7dHJhbnNmb3JtLnl9cHgpIHNjYWxlKCR7dHJhbnNmb3JtLnNjYWxlfSlgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCAwJyxcbiAgICAgICAgICAgIHdpZHRoOiBgJHttYXBTaXplLndpZHRofXB4YCxcbiAgICAgICAgICAgIGhlaWdodDogYCR7bWFwU2l6ZS5oZWlnaHR9cHhgLFxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTc1IGVhc2Utb3V0XCJcbiAgICAgICAgPlxuICAgICAgICAgIHsvKiAxLiBVbmRlcmx5aW5nIFRhY3RpY2FsIE1hcCBJbWFnZSAqL31cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9e01BUF9JTUFHRV9VUkx9XG4gICAgICAgICAgICBhbHQ9XCJUYWN0aWNhbCBNYXBcIlxuICAgICAgICAgICAgb25Mb2FkPXtvbkltYWdlTG9hZH1cbiAgICAgICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgdy1mdWxsIGgtZnVsbCBvYmplY3QtY29udGFpbiBwb2ludGVyLWV2ZW50cy1ub25lIGRyb3Atc2hhZG93LTJ4bFwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHsvKiAyLiBJbnRlcmFjdGl2ZSBTVkcgT3ZlcmxheSAoR3JpZCwgQ3VzdG9tIE9jdGFnb25zLCBIaWdobGlnaHRzKSAqL31cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgdy1mdWxsIGgtZnVsbFwiXG4gICAgICAgICAgICB2aWV3Qm94PXtgMCAwICR7bWFwU2l6ZS53aWR0aH0gJHttYXBTaXplLmhlaWdodH1gfVxuICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTGFiZWxJZCkgc2V0U2VsZWN0ZWRMYWJlbElkKG51bGwpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7LyogU1ZHIERlZnMgZm9yIEdyYWRpZW50cyBhbmQgU3RyaXBlZCBIYXRjaGluZyAqL31cbiAgICAgICAgICAgIDxTdmdEZWZzXG4gICAgICAgICAgICAgIG9jdGFnb25zPXtjYW1wYWlnbi5vY3RhZ29uc31cbiAgICAgICAgICAgICAgbGFiZWxzPXtjYW1wYWlnbi5sYWJlbHN9XG4gICAgICAgICAgICAgIGFjY2VudENvbG9yPXtjYW1wYWlnbi50aGVtZUFjY2VudCB8fCAnIzIyYzU1ZSd9XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICB7LyogQmFja2dyb3VuZCBPY3RhZ29uYWwgR3JpZCBMaW5lcyAqL31cbiAgICAgICAgICAgIHtjYW1wYWlnbi5ncmlkU2V0dGluZ3Muc2hvd0dyaWQgJiYgIWNhbXBhaWduLmdyaWRTZXR0aW5ncy5zaG93VGVycml0b3J5T25seSAmJiAoXG4gICAgICAgICAgICAgIDxnXG4gICAgICAgICAgICAgICAgb3BhY2l0eT17Y2FtcGFpZ24uZ3JpZFNldHRpbmdzLm9wYWNpdHl9XG4gICAgICAgICAgICAgICAgc3Ryb2tlPXtjYW1wYWlnbi5ncmlkU2V0dGluZ3MuY29sb3IgfHwgJyMyMmM1NWUnfVxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXswLjh9XG4gICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudHM9XCJub25lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtBcnJheS5mcm9tKHtcbiAgICAgICAgICAgICAgICAgIGxlbmd0aDogTWF0aC5jZWlsKG1hcFNpemUud2lkdGggLyBjYW1wYWlnbi5ncmlkU2V0dGluZ3MuY2VsbFNpemUpICsgMSxcbiAgICAgICAgICAgICAgICB9KS5mbGF0TWFwKChfLCBjb2wpID0+XG4gICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHtcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBNYXRoLmNlaWwobWFwU2l6ZS5oZWlnaHQgLyBjYW1wYWlnbi5ncmlkU2V0dGluZ3MuY2VsbFNpemUpICsgMSxcbiAgICAgICAgICAgICAgICAgIH0pLm1hcCgoXywgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY3gsIGN5IH0gPSBncmlkVG9Xb3JsZENlbnRlcihcbiAgICAgICAgICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbXBhaWduLmdyaWRTZXR0aW5ncy5jZWxsU2l6ZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2BncmlkLWJnLSR7Y29sfS0ke3Jvd31gfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzPXtnZXRPY3RhZ29uUG9pbnRzKGN4LCBjeSwgZ3JpZE1ldHJpY3MucmFkaXVzKX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogT3B0aW9uYWwgQ29vcmRpbmF0ZXMgbGFiZWxzIG9uIEdyaWQgKi99XG4gICAgICAgICAgICB7Y2FtcGFpZ24uZ3JpZFNldHRpbmdzLnNob3dDb29yZGluYXRlcyAmJiAoXG4gICAgICAgICAgICAgIDxnXG4gICAgICAgICAgICAgICAgb3BhY2l0eT17TWF0aC5taW4oMSwgY2FtcGFpZ24uZ3JpZFNldHRpbmdzLm9wYWNpdHkgKiAxLjgpfVxuICAgICAgICAgICAgICAgIGZpbGw9e2NhbXBhaWduLmdyaWRTZXR0aW5ncy5jb2xvciB8fCAnIzIyYzU1ZSd9XG4gICAgICAgICAgICAgICAgZm9udFNpemU9e2dyaWRNZXRyaWNzLnJhZGl1cyAqIDAuM31cbiAgICAgICAgICAgICAgICBmb250RmFtaWx5PVwiU2hhcmUgVGVjaCBNb25vLCBtb25vc3BhY2VcIlxuICAgICAgICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudHM9XCJub25lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtBcnJheS5mcm9tKHtcbiAgICAgICAgICAgICAgICAgIGxlbmd0aDogTWF0aC5jZWlsKG1hcFNpemUud2lkdGggLyBjYW1wYWlnbi5ncmlkU2V0dGluZ3MuY2VsbFNpemUpICsgMSxcbiAgICAgICAgICAgICAgICB9KS5mbGF0TWFwKChfLCBjb2wpID0+XG4gICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHtcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBNYXRoLmNlaWwobWFwU2l6ZS5oZWlnaHQgLyBjYW1wYWlnbi5ncmlkU2V0dGluZ3MuY2VsbFNpemUpICsgMSxcbiAgICAgICAgICAgICAgICAgIH0pLm1hcCgoXywgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY3gsIGN5IH0gPSBncmlkVG9Xb3JsZENlbnRlcihcbiAgICAgICAgICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbXBhaWduLmdyaWRTZXR0aW5ncy5jZWxsU2l6ZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGtleT17YGNvb3JkLSR7Y29sfS0ke3Jvd31gfSB4PXtjeH0geT17Y3kgKyAzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x9Ontyb3d9XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogUmVuZGVyZWQgT2NjdXBpZWQgLyBDdXN0b21pemVkIE9jdGFnb25zICovfVxuICAgICAgICAgICAge09iamVjdC52YWx1ZXMoY2FtcGFpZ24ub2N0YWdvbnMpLm1hcCgoY2VsbCkgPT4gKFxuICAgICAgICAgICAgICA8T2N0YWdvbkl0ZW1cbiAgICAgICAgICAgICAgICBrZXk9e2NlbGwuaWR9XG4gICAgICAgICAgICAgICAgY2VsbD17Y2VsbH1cbiAgICAgICAgICAgICAgICByYWRpdXM9e2dyaWRNZXRyaWNzLnJhZGl1c31cbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXttb2RhbENlbGw/LmlkID09PSBjZWxsLmlkfVxuICAgICAgICAgICAgICAgIGlzSG92ZXJlZD17aG92ZXJlZENlbGw/LmNlbGwuaWQgPT09IGNlbGwuaWR9XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuaXNLZXlMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRIb3ZlcmVkQ2VsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgY2VsbCxcbiAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5YOiBlLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgc2NyZWVuWTogZS5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZENlbGwobnVsbCl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IGhhbmRsZU9jdGFnb25DbGljayhjZWxsLCBlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuXG4gICAgICAgICAgICB7LyogR2hvc3QgQ2VsbCBCcnVzaCBQcmV2aWV3IChmb3IgQWRtaW4gUGFpbnQvRXJhc2UgbW9kZSkgKi99XG4gICAgICAgICAgICB7aXNBZG1pbiAmJiBnaG9zdENlbGwgJiYgKFxuICAgICAgICAgICAgICA8ZyBwb2ludGVyRXZlbnRzPVwibm9uZVwiPlxuICAgICAgICAgICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgICAgICAgICBwb2ludHM9e2dldE9jdGFnb25Qb2ludHMoZ2hvc3RDZWxsLmN4LCBnaG9zdENlbGwuY3ksIGdyaWRNZXRyaWNzLnJhZGl1cyl9XG4gICAgICAgICAgICAgICAgICBmaWxsPXthY3RpdmVUb29sID09PSAnZXJhc2VyJyA/ICcjZWY0NDQ0JyA6IGJydXNoQ29sb3IuY29sb3J9XG4gICAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eT17MC40fVxuICAgICAgICAgICAgICAgICAgc3Ryb2tlPXthY3RpdmVUb29sID09PSAnZXJhc2VyJyA/ICcjZWY0NDQ0JyA6ICcjMzhiZGY4J31cbiAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsyfVxuICAgICAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PVwiMyAzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvc3ZnPlxuXG4gICAgICAgICAgey8qIDMuIE1hcCBMYWJlbHMgTGF5ZXIgKERyYWdnYWJsZSAmIFJlc2l6YWJsZSBUZXh0cykgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgICAgIHtjYW1wYWlnbi5sYWJlbHMubWFwKChsYmwpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2xibC5pZH0gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtYXV0b1wiPlxuICAgICAgICAgICAgICAgIDxNYXBMYWJlbEl0ZW1cbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtsYmx9XG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXtzZWxlY3RlZExhYmVsSWQgPT09IGxibC5pZH1cbiAgICAgICAgICAgICAgICAgIGlzQWRtaW49e2lzQWRtaW59XG4gICAgICAgICAgICAgICAgICB6b29tPXt0cmFuc2Zvcm0uc2NhbGV9XG4gICAgICAgICAgICAgICAgICBvblNlbGVjdD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZExhYmVsSWQobGJsLmlkKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvblVwZGF0ZT17aGFuZGxlVXBkYXRlU2VsZWN0ZWRMYWJlbH1cbiAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXtoYW5kbGVEZWxldGVTZWxlY3RlZExhYmVsfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBGbG9hdGluZyBLZXkgTG9jYXRpb24gSG92ZXIgVG9vbHRpcCAqL31cbiAgICAgIHtob3ZlcmVkQ2VsbCAmJiAhbW9kYWxDZWxsICYmIChcbiAgICAgICAgPEtleUxvY2F0aW9uVG9vbHRpcFxuICAgICAgICAgIGNlbGw9e2hvdmVyZWRDZWxsLmNlbGx9XG4gICAgICAgICAgeD17aG92ZXJlZENlbGwuc2NyZWVuWH1cbiAgICAgICAgICB5PXtob3ZlcmVkQ2VsbC5zY3JlZW5ZfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIEZ1bGwgS2V5IExvY2F0aW9uIERvc3NpZXIgTW9kYWwgKi99XG4gICAgICB7bW9kYWxDZWxsICYmIChcbiAgICAgICAgPEtleUxvY2F0aW9uTW9kYWxcbiAgICAgICAgICBjZWxsPXttb2RhbENlbGx9XG4gICAgICAgICAgaXNBZG1pbj17aXNBZG1pbn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRNb2RhbENlbGwobnVsbCl9XG4gICAgICAgICAgb25TYXZlPXtoYW5kbGVTYXZlS2V5TG9jYXRpb259XG4gICAgICAgICAgb25EZWxldGVLZXlMb2NhdGlvbj17aGFuZGxlRGVsZXRlS2V5TG9jYXRpb259XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogQWRtaW4gUGFuZWwgRHJhd2VyIC8gQmFyICovfVxuICAgICAge3Nob3dBZG1pblBhbmVsICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMTYgcmlnaHQtNCB6LTQwXCI+XG4gICAgICAgICAgPEFkbWluUGFuZWxcbiAgICAgICAgICAgIGlzQWRtaW49e2lzQWRtaW59XG4gICAgICAgICAgICBhY3RpdmVUb29sPXthY3RpdmVUb29sfVxuICAgICAgICAgICAgc2V0QWN0aXZlVG9vbD17c2V0QWN0aXZlVG9vbH1cbiAgICAgICAgICAgIG9uTG9naW49e2hhbmRsZUxvZ2lufVxuICAgICAgICAgICAgb25Mb2dvdXQ9e2hhbmRsZUxvZ291dH1cbiAgICAgICAgICAgIGJydXNoVHlwZT17YnJ1c2hUeXBlfVxuICAgICAgICAgICAgc2V0QnJ1c2hUeXBlPXtzZXRCcnVzaFR5cGV9XG4gICAgICAgICAgICBicnVzaENvbG9yPXticnVzaENvbG9yfVxuICAgICAgICAgICAgc2V0QnJ1c2hDb2xvcj17c2V0QnJ1c2hDb2xvcn1cbiAgICAgICAgICAgIGJydXNoQXJyb3dEaXJlY3Rpb249e2JydXNoQXJyb3dEaXJlY3Rpb259XG4gICAgICAgICAgICBzZXRCcnVzaEFycm93RGlyZWN0aW9uPXtzZXRCcnVzaEFycm93RGlyZWN0aW9ufVxuICAgICAgICAgICAgYnJ1c2hJc0tleUxvY2F0aW9uPXticnVzaElzS2V5TG9jYXRpb259XG4gICAgICAgICAgICBzZXRCcnVzaElzS2V5TG9jYXRpb249e3NldEJydXNoSXNLZXlMb2NhdGlvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkTGFiZWw9e3NlbGVjdGVkTGFiZWx9XG4gICAgICAgICAgICBvblVwZGF0ZVNlbGVjdGVkTGFiZWw9e2hhbmRsZVVwZGF0ZVNlbGVjdGVkTGFiZWx9XG4gICAgICAgICAgICBvbkRlbGV0ZVNlbGVjdGVkTGFiZWw9e2hhbmRsZURlbGV0ZVNlbGVjdGVkTGFiZWx9XG4gICAgICAgICAgICBvbkFkZE5ld0xhYmVsPXtoYW5kbGVBZGROZXdMYWJlbH1cbiAgICAgICAgICAgIGdyaWRTZXR0aW5ncz17Y2FtcGFpZ24uZ3JpZFNldHRpbmdzfVxuICAgICAgICAgICAgb25VcGRhdGVHcmlkU2V0dGluZ3M9eyhzKSA9PlxuICAgICAgICAgICAgICBzZXRDYW1wYWlnbigocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIGdyaWRTZXR0aW5nczogeyAuLi5wcmV2LmdyaWRTZXR0aW5ncywgLi4ucyB9LFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoZW1lQWNjZW50PXtjYW1wYWlnbi50aGVtZUFjY2VudH1cbiAgICAgICAgICAgIG9uQ2hhbmdlVGhlbWVBY2NlbnQ9eyhjb2xvcikgPT5cbiAgICAgICAgICAgICAgc2V0Q2FtcGFpZ24oKHByZXYpID0+ICh7IC4uLnByZXYsIHRoZW1lQWNjZW50OiBjb2xvciB9KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbXBhaWduPXtjYW1wYWlnbn1cbiAgICAgICAgICAgIG9uSW1wb3J0Q2FtcGFpZ249eyhpbXBvcnRlZCkgPT4ge1xuICAgICAgICAgICAgICBzZXRDYW1wYWlnbihpbXBvcnRlZCk7XG4gICAgICAgICAgICAgIGFsZXJ0KCfQmtCw0LzQv9Cw0L3QuNGPINGD0YHQv9C10YjQvdC+INC30LDQs9GA0YPQttC10L3QsCEnKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvblJlc2V0VG9EZWZhdWx0PXsoKSA9PiBzZXRDYW1wYWlnbihJTklUSUFMX0NBTVBBSUdOKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBSYWRhciBNaW5pbWFwICovfVxuICAgICAge2lzSW1hZ2VMb2FkZWQgJiYgKFxuICAgICAgICA8TWluaW1hcFxuICAgICAgICAgIGltYWdlU3JjPXtNQVBfSU1BR0VfVVJMfVxuICAgICAgICAgIG1hcFdpZHRoPXttYXBTaXplLndpZHRofVxuICAgICAgICAgIG1hcEhlaWdodD17bWFwU2l6ZS5oZWlnaHR9XG4gICAgICAgICAgdmlld1g9e3RyYW5zZm9ybS54fVxuICAgICAgICAgIHZpZXdZPXt0cmFuc2Zvcm0ueX1cbiAgICAgICAgICB2aWV3Wm9vbT17dHJhbnNmb3JtLnNjYWxlfVxuICAgICAgICAgIGNvbnRhaW5lcldpZHRoPXtjb250YWluZXJSZWYuY3VycmVudD8uY2xpZW50V2lkdGggfHwgMTAwMH1cbiAgICAgICAgICBjb250YWluZXJIZWlnaHQ9e2NvbnRhaW5lclJlZi5jdXJyZW50Py5jbGllbnRIZWlnaHQgfHwgODAwfVxuICAgICAgICAgIG9jdGFnb25zPXtjYW1wYWlnbi5vY3RhZ29uc31cbiAgICAgICAgICBvbk5hdmlnYXRlPXsobngsIG55KSA9PlxuICAgICAgICAgICAgc2V0VHJhbnNmb3JtKChwcmV2KSA9PiAoeyAuLi5wcmV2LCB4OiBueCwgeTogbnkgfSkpXG4gICAgICAgICAgfVxuICAgICAgICAgIGFjY2VudENvbG9yPXtjYW1wYWlnbi50aGVtZUFjY2VudCB8fCAnIzIyYzU1ZSd9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogU3VidGxlIFNjYW5saW5lcyBlZmZlY3Qgb3ZlcmxheSBmb3IgYnVua2VyIGFlc3RoZXRpYyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBzY2FubGluZXMtb3ZlcmxheSBwb2ludGVyLWV2ZW50cy1ub25lIG9wYWNpdHktMzAgei0xMFwiIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXX0=