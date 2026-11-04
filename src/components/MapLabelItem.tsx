const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import * as __vite__cjsImport0_react from "react";
import { Move, RotateCw, Trash2, Edit3, Maximize2 } from "lucide-react";
var _jsxFileName = "/app/applet/src/components/MapLabelItem.tsx";
import * as __vite__cjsImport2_react_jsxDevRuntime from "react/jsx-dev-runtime";
export const MapLabelItem = ({ label, isSelected, isAdmin, zoom, onSelect, onUpdate, onDelete }) => {
	const [isEditingInline, setIsEditingInline] = useState(false);
	const [tempText, setTempText] = useState(label.text);
	// Dragging movement
	const handleDragStart = (e) => {
		if (!isAdmin) return;
		e.stopPropagation();
		onSelect();
		const startX = e.clientX;
		const startY = e.clientY;
		const initialLabelX = label.x;
		const initialLabelY = label.y;
		const onMouseMove = (moveEvent) => {
			const dx = (moveEvent.clientX - startX) / zoom;
			const dy = (moveEvent.clientY - startY) / zoom;
			onUpdate({
				x: Math.round(initialLabelX + dx),
				y: Math.round(initialLabelY + dy)
			});
		};
		const onMouseUp = () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};
	// Stretching / Resizing handle
	const handleResizeStart = (e) => {
		if (!isAdmin) return;
		e.stopPropagation();
		const startX = e.clientX;
		const initialWidth = label.width || 200;
		const initialFontSize = label.fontSize || 16;
		const onMouseMove = (moveEvent) => {
			const dx = (moveEvent.clientX - startX) / zoom;
			const newWidth = Math.max(60, Math.round(initialWidth + dx));
			// Proportional font scaling when stretched
			const fontRatio = newWidth / initialWidth;
			const newFontSize = Math.max(9, Math.min(80, Math.round(initialFontSize * (1 + (fontRatio - 1) * .5))));
			onUpdate({
				width: newWidth,
				fontSize: newFontSize
			});
		};
		const onMouseUp = () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};
	// Rotation handle
	const handleRotateStart = (e) => {
		if (!isAdmin) return;
		e.stopPropagation();
		const initialRotation = label.rotation || 0;
		const startX = e.clientX;
		const onMouseMove = (moveEvent) => {
			const dx = moveEvent.clientX - startX;
			const newRotation = Math.round((initialRotation + dx * .5) % 360);
			onUpdate({ rotation: newRotation });
		};
		const onMouseUp = () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};
	const textStyle = {
		fontFamily: `${label.fontFamily}, sans-serif`,
		fontSize: `${label.fontSize || 16}px`,
		fontWeight: label.isBold ? 700 : 500,
		fontStyle: label.isItalic ? "italic" : "normal",
		letterSpacing: `${label.letterSpacing ?? 1}px`,
		textTransform: label.isUppercase ? "uppercase" : "none",
		color: label.isGradient ? "transparent" : label.color || "#34d399",
		backgroundImage: label.isGradient ? `linear-gradient(${label.gradientAngle ?? 135}deg, ${label.gradientStart || label.color}, ${label.gradientEnd || "#38bdf8"})` : undefined,
		WebkitBackgroundClip: label.isGradient ? "text" : undefined,
		backgroundClip: label.isGradient ? "text" : undefined,
		textShadow: !label.isGradient ? `0 0 10px ${label.color}88, 0 2px 4px rgba(0,0,0,0.9)` : undefined,
		transform: `scale(${label.scaleX ?? 1}, ${label.scaleY ?? 1})`,
		transformOrigin: "left center"
	};
	const boxStyle = {
		position: "absolute",
		left: `${label.x}px`,
		top: `${label.y}px`,
		width: `${label.width}px`,
		transform: `rotate(${label.rotation || 0}deg)`,
		transformOrigin: "top left",
		backgroundColor: label.backgroundColor || "rgba(9, 9, 11, 0.75)",
		borderWidth: `${label.borderWidth ?? 1}px`,
		borderColor: label.borderColor || "rgba(52, 211, 153, 0.4)",
		borderStyle: label.borderWidth === 0 ? "none" : "solid",
		borderRadius: `${label.borderRadius ?? 4}px`
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		style: boxStyle,
		onClick: (e) => {
			e.stopPropagation();
			onSelect();
		},
		className: `group transition-shadow cursor-pointer select-none backdrop-blur-[2px] ${isSelected ? "ring-2 ring-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] z-40" : "hover:border-emerald-400/80 z-20"}`,
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "px-3 py-1.5 flex items-center justify-between overflow-hidden",
			children: isEditingInline ? /* @__PURE__ */ _jsxDEV("input", {
				autoFocus: true,
				value: tempText,
				onChange: (e) => setTempText(e.target.value),
				onBlur: () => {
					setIsEditingInline(false);
					onUpdate({ text: tempText });
				},
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						setIsEditingInline(false);
						onUpdate({ text: tempText });
					}
					if (e.key === "Escape") {
						setIsEditingInline(false);
						setTempText(label.text);
					}
				},
				className: "w-full bg-zinc-950 border border-sky-400 rounded px-1.5 py-0.5 text-white font-mono text-xs focus:outline-none"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 162,
				columnNumber: 11
			}, this) : /* @__PURE__ */ _jsxDEV("div", {
				style: textStyle,
				onDoubleClick: () => {
					if (isAdmin) {
						setTempText(label.text);
						setIsEditingInline(true);
					}
				},
				className: "truncate select-none leading-tight",
				children: label.text
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 183,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 160,
			columnNumber: 7
		}, this), isAdmin && isSelected && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "absolute -top-9 left-0 flex items-center gap-1 bg-zinc-950 border border-sky-500/80 px-2 py-0.5 rounded shadow-lg text-[10px] text-zinc-200 z-50 pointer-events-auto",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					onMouseDown: handleDragStart,
					className: "cursor-move p-1 hover:bg-zinc-800 rounded text-emerald-400 flex items-center gap-1 font-mono",
					title: "Зажмите и тяните для перемещения",
					children: [/* @__PURE__ */ _jsxDEV(Move, { className: "w-3 h-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 15
					}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Тянуть" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 213,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 207,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("div", { className: "h-3 w-px bg-zinc-800 mx-0.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					onMouseDown: handleRotateStart,
					className: "cursor-ew-resize p-1 hover:bg-zinc-800 rounded text-sky-400 flex items-center gap-1 font-mono",
					title: "Зажмите и ведите вправо/влево для вращения",
					children: [/* @__PURE__ */ _jsxDEV(RotateCw, { className: "w-3 h-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 15
					}, this), /* @__PURE__ */ _jsxDEV("span", { children: [label.rotation || 0, "°"] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 219,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("div", { className: "h-3 w-px bg-zinc-800 mx-0.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 228,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => {
						setTempText(label.text);
						setIsEditingInline(true);
					},
					className: "p-1 hover:bg-zinc-800 rounded text-amber-400",
					title: "Изменить текст",
					children: /* @__PURE__ */ _jsxDEV(Edit3, { className: "w-3 h-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 231,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: onDelete,
					className: "p-1 hover:bg-red-900/50 rounded text-red-400 hover:text-red-300",
					title: "Удалить надпись",
					children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3 h-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 244,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 202,
			columnNumber: 11
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			onMouseDown: handleResizeStart,
			className: "absolute -bottom-2 -right-2 w-5 h-5 bg-sky-500 hover:bg-sky-400 text-zinc-950 rounded cursor-nwse-resize flex items-center justify-center shadow-md z-50 transition transform hover:scale-110",
			title: "Зажмите и тяните для растягивания надписи",
			children: /* @__PURE__ */ _jsxDEV(Maximize2, { className: "w-3 h-3 transform rotate-90" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 260,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 255,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 200,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 147,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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RDtLQUNFLE1BQUs7S0FDTCxTQUFTO0tBQ1QsV0FBVTtLQUNWLE9BQU07ZUFFTix3QkFBQyxRQUFELEVBQVEsV0FBVSxVQUFXOzs7OztJQUN2Qjs7Ozs7R0FDTDs7Ozs7WUFHTCx3QkFBQyxPQUFEO0dBQ0UsYUFBYTtHQUNiLFdBQVU7R0FDVixPQUFNO2FBRU4sd0JBQUMsV0FBRCxFQUFXLFdBQVUsOEJBQStCOzs7OztFQUNqRDs7OztVQUNMOzs7O1VBRUQ7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIk1hcExhYmVsSXRlbS50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXBMYWJlbCB9IGZyb20gJy4uL3R5cGVzL21hcCc7XG5pbXBvcnQgeyBNb3ZlLCBSb3RhdGVDdywgVHJhc2gyLCBFZGl0MywgTWF4aW1pemUyIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgbGFiZWw6IE1hcExhYmVsO1xuICBpc1NlbGVjdGVkOiBib29sZWFuO1xuICBpc0FkbWluOiBib29sZWFuO1xuICB6b29tOiBudW1iZXI7XG4gIG9uU2VsZWN0OiAoKSA9PiB2b2lkO1xuICBvblVwZGF0ZTogKHVwZGF0ZWQ6IFBhcnRpYWw8TWFwTGFiZWw+KSA9PiB2b2lkO1xuICBvbkRlbGV0ZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IE1hcExhYmVsSXRlbTogUmVhY3QuRkM8UHJvcHM+ID0gKHtcbiAgbGFiZWwsXG4gIGlzU2VsZWN0ZWQsXG4gIGlzQWRtaW4sXG4gIHpvb20sXG4gIG9uU2VsZWN0LFxuICBvblVwZGF0ZSxcbiAgb25EZWxldGUsXG59KSA9PiB7XG4gIGNvbnN0IFtpc0VkaXRpbmdJbmxpbmUsIHNldElzRWRpdGluZ0lubGluZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt0ZW1wVGV4dCwgc2V0VGVtcFRleHRdID0gdXNlU3RhdGUobGFiZWwudGV4dCk7XG5cbiAgLy8gRHJhZ2dpbmcgbW92ZW1lbnRcbiAgY29uc3QgaGFuZGxlRHJhZ1N0YXJ0ID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoIWlzQWRtaW4pIHJldHVybjtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIG9uU2VsZWN0KCk7XG5cbiAgICBjb25zdCBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgY29uc3Qgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IGluaXRpYWxMYWJlbFggPSBsYWJlbC54O1xuICAgIGNvbnN0IGluaXRpYWxMYWJlbFkgPSBsYWJlbC55O1xuXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAobW92ZUV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkeCA9IChtb3ZlRXZlbnQuY2xpZW50WCAtIHN0YXJ0WCkgLyB6b29tO1xuICAgICAgY29uc3QgZHkgPSAobW92ZUV2ZW50LmNsaWVudFkgLSBzdGFydFkpIC8gem9vbTtcbiAgICAgIG9uVXBkYXRlKHtcbiAgICAgICAgeDogTWF0aC5yb3VuZChpbml0aWFsTGFiZWxYICsgZHgpLFxuICAgICAgICB5OiBNYXRoLnJvdW5kKGluaXRpYWxMYWJlbFkgKyBkeSksXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gIH07XG5cbiAgLy8gU3RyZXRjaGluZyAvIFJlc2l6aW5nIGhhbmRsZVxuICBjb25zdCBoYW5kbGVSZXNpemVTdGFydCA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCFpc0FkbWluKSByZXR1cm47XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICBjb25zdCBpbml0aWFsV2lkdGggPSBsYWJlbC53aWR0aCB8fCAyMDA7XG4gICAgY29uc3QgaW5pdGlhbEZvbnRTaXplID0gbGFiZWwuZm9udFNpemUgfHwgMTY7XG5cbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChtb3ZlRXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGR4ID0gKG1vdmVFdmVudC5jbGllbnRYIC0gc3RhcnRYKSAvIHpvb207XG4gICAgICBjb25zdCBuZXdXaWR0aCA9IE1hdGgubWF4KDYwLCBNYXRoLnJvdW5kKGluaXRpYWxXaWR0aCArIGR4KSk7XG4gICAgICAvLyBQcm9wb3J0aW9uYWwgZm9udCBzY2FsaW5nIHdoZW4gc3RyZXRjaGVkXG4gICAgICBjb25zdCBmb250UmF0aW8gPSBuZXdXaWR0aCAvIGluaXRpYWxXaWR0aDtcbiAgICAgIGNvbnN0IG5ld0ZvbnRTaXplID0gTWF0aC5tYXgoOSwgTWF0aC5taW4oODAsIE1hdGgucm91bmQoaW5pdGlhbEZvbnRTaXplICogKDEgKyAoZm9udFJhdGlvIC0gMSkgKiAwLjUpKSkpO1xuXG4gICAgICBvblVwZGF0ZSh7XG4gICAgICAgIHdpZHRoOiBuZXdXaWR0aCxcbiAgICAgICAgZm9udFNpemU6IG5ld0ZvbnRTaXplLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VVcCA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICB9O1xuXG4gIC8vIFJvdGF0aW9uIGhhbmRsZVxuICBjb25zdCBoYW5kbGVSb3RhdGVTdGFydCA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCFpc0FkbWluKSByZXR1cm47XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGNvbnN0IGluaXRpYWxSb3RhdGlvbiA9IGxhYmVsLnJvdGF0aW9uIHx8IDA7XG4gICAgY29uc3Qgc3RhcnRYID0gZS5jbGllbnRYO1xuXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAobW92ZUV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkeCA9IG1vdmVFdmVudC5jbGllbnRYIC0gc3RhcnRYO1xuICAgICAgY29uc3QgbmV3Um90YXRpb24gPSBNYXRoLnJvdW5kKChpbml0aWFsUm90YXRpb24gKyBkeCAqIDAuNSkgJSAzNjApO1xuICAgICAgb25VcGRhdGUoeyByb3RhdGlvbjogbmV3Um90YXRpb24gfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VVcCA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICB9O1xuXG4gIGNvbnN0IHRleHRTdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcbiAgICBmb250RmFtaWx5OiBgJHtsYWJlbC5mb250RmFtaWx5fSwgc2Fucy1zZXJpZmAsXG4gICAgZm9udFNpemU6IGAke2xhYmVsLmZvbnRTaXplIHx8IDE2fXB4YCxcbiAgICBmb250V2VpZ2h0OiBsYWJlbC5pc0JvbGQgPyA3MDAgOiA1MDAsXG4gICAgZm9udFN0eWxlOiBsYWJlbC5pc0l0YWxpYyA/ICdpdGFsaWMnIDogJ25vcm1hbCcsXG4gICAgbGV0dGVyU3BhY2luZzogYCR7bGFiZWwubGV0dGVyU3BhY2luZyA/PyAxfXB4YCxcbiAgICB0ZXh0VHJhbnNmb3JtOiBsYWJlbC5pc1VwcGVyY2FzZSA/ICd1cHBlcmNhc2UnIDogJ25vbmUnLFxuICAgIGNvbG9yOiBsYWJlbC5pc0dyYWRpZW50ID8gJ3RyYW5zcGFyZW50JyA6IGxhYmVsLmNvbG9yIHx8ICcjMzRkMzk5JyxcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6IGxhYmVsLmlzR3JhZGllbnRcbiAgICAgID8gYGxpbmVhci1ncmFkaWVudCgke2xhYmVsLmdyYWRpZW50QW5nbGUgPz8gMTM1fWRlZywgJHtsYWJlbC5ncmFkaWVudFN0YXJ0IHx8IGxhYmVsLmNvbG9yfSwgJHtcbiAgICAgICAgICBsYWJlbC5ncmFkaWVudEVuZCB8fCAnIzM4YmRmOCdcbiAgICAgICAgfSlgXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBXZWJraXRCYWNrZ3JvdW5kQ2xpcDogbGFiZWwuaXNHcmFkaWVudCA/ICd0ZXh0JyA6IHVuZGVmaW5lZCxcbiAgICBiYWNrZ3JvdW5kQ2xpcDogbGFiZWwuaXNHcmFkaWVudCA/ICd0ZXh0JyA6IHVuZGVmaW5lZCxcbiAgICB0ZXh0U2hhZG93OiAhbGFiZWwuaXNHcmFkaWVudFxuICAgICAgPyBgMCAwIDEwcHggJHtsYWJlbC5jb2xvcn04OCwgMCAycHggNHB4IHJnYmEoMCwwLDAsMC45KWBcbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7bGFiZWwuc2NhbGVYID8/IDF9LCAke2xhYmVsLnNjYWxlWSA/PyAxfSlgLFxuICAgIHRyYW5zZm9ybU9yaWdpbjogJ2xlZnQgY2VudGVyJyxcbiAgfTtcblxuICBjb25zdCBib3hTdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICBsZWZ0OiBgJHtsYWJlbC54fXB4YCxcbiAgICB0b3A6IGAke2xhYmVsLnl9cHhgLFxuICAgIHdpZHRoOiBgJHtsYWJlbC53aWR0aH1weGAsXG4gICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7bGFiZWwucm90YXRpb24gfHwgMH1kZWcpYCxcbiAgICB0cmFuc2Zvcm1PcmlnaW46ICd0b3AgbGVmdCcsXG4gICAgYmFja2dyb3VuZENvbG9yOiBsYWJlbC5iYWNrZ3JvdW5kQ29sb3IgfHwgJ3JnYmEoOSwgOSwgMTEsIDAuNzUpJyxcbiAgICBib3JkZXJXaWR0aDogYCR7bGFiZWwuYm9yZGVyV2lkdGggPz8gMX1weGAsXG4gICAgYm9yZGVyQ29sb3I6IGxhYmVsLmJvcmRlckNvbG9yIHx8ICdyZ2JhKDUyLCAyMTEsIDE1MywgMC40KScsXG4gICAgYm9yZGVyU3R5bGU6IGxhYmVsLmJvcmRlcldpZHRoID09PSAwID8gJ25vbmUnIDogJ3NvbGlkJyxcbiAgICBib3JkZXJSYWRpdXM6IGAke2xhYmVsLmJvcmRlclJhZGl1cyA/PyA0fXB4YCxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXtib3hTdHlsZX1cbiAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIG9uU2VsZWN0KCk7XG4gICAgICB9fVxuICAgICAgY2xhc3NOYW1lPXtgZ3JvdXAgdHJhbnNpdGlvbi1zaGFkb3cgY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmUgYmFja2Ryb3AtYmx1ci1bMnB4XSAke1xuICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgPyAncmluZy0yIHJpbmctc2t5LTQwMCBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoNTYsMTg5LDI0OCwwLjUpXSB6LTQwJ1xuICAgICAgICAgIDogJ2hvdmVyOmJvcmRlci1lbWVyYWxkLTQwMC84MCB6LTIwJ1xuICAgICAgfWB9XG4gICAgPlxuICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTMgcHktMS41IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAge2lzRWRpdGluZ0lubGluZSA/IChcbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgdmFsdWU9e3RlbXBUZXh0fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUZW1wVGV4dChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBvbkJsdXI9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0SXNFZGl0aW5nSW5saW5lKGZhbHNlKTtcbiAgICAgICAgICAgICAgb25VcGRhdGUoeyB0ZXh0OiB0ZW1wVGV4dCB9KTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHNldElzRWRpdGluZ0lubGluZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgb25VcGRhdGUoeyB0ZXh0OiB0ZW1wVGV4dCB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgc2V0SXNFZGl0aW5nSW5saW5lKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXRUZW1wVGV4dChsYWJlbC50ZXh0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXNreS00MDAgcm91bmRlZCBweC0xLjUgcHktMC41IHRleHQtd2hpdGUgZm9udC1tb25vIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt0ZXh0U3R5bGV9XG4gICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpc0FkbWluKSB7XG4gICAgICAgICAgICAgICAgc2V0VGVtcFRleHQobGFiZWwudGV4dCk7XG4gICAgICAgICAgICAgICAgc2V0SXNFZGl0aW5nSW5saW5lKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJ1bmNhdGUgc2VsZWN0LW5vbmUgbGVhZGluZy10aWdodFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVsLnRleHR9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEFkbWluIEZsb2F0aW5nIENvbnRyb2wgSGFuZGxlcyB3aGVuIFNlbGVjdGVkICovfVxuICAgICAge2lzQWRtaW4gJiYgaXNTZWxlY3RlZCAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgey8qIFRvcCBCYXIgd2l0aCBSb3RhdGlvbiAmIFF1aWNrIEFjdGlvbnMgKi99XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC05IGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXNreS01MDAvODAgcHgtMiBweS0wLjUgcm91bmRlZCBzaGFkb3ctbGcgdGV4dC1bMTBweF0gdGV4dC16aW5jLTIwMCB6LTUwIHBvaW50ZXItZXZlbnRzLWF1dG9cIlxuICAgICAgICAgICAgb25DbGljaz17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIE1vdmUgaGFuZGxlICovfVxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBvbk1vdXNlRG93bj17aGFuZGxlRHJhZ1N0YXJ0fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItbW92ZSBwLTEgaG92ZXI6YmctemluYy04MDAgcm91bmRlZCB0ZXh0LWVtZXJhbGQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwi0JfQsNC20LzQuNGC0LUg0Lgg0YLRj9C90LjRgtC1INC00LvRjyDQv9C10YDQtdC80LXRidC10L3QuNGPXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE1vdmUgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPtCi0Y/QvdGD0YLRjDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMyB3LXB4IGJnLXppbmMtODAwIG14LTAuNVwiIC8+XG5cbiAgICAgICAgICAgIHsvKiBSb3RhdGUgaGFuZGxlICovfVxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBvbk1vdXNlRG93bj17aGFuZGxlUm90YXRlU3RhcnR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN1cnNvci1ldy1yZXNpemUgcC0xIGhvdmVyOmJnLXppbmMtODAwIHJvdW5kZWQgdGV4dC1za3ktNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwi0JfQsNC20LzQuNGC0LUg0Lgg0LLQtdC00LjRgtC1INCy0L/RgNCw0LLQvi/QstC70LXQstC+INC00LvRjyDQstGA0LDRidC10L3QuNGPXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJvdGF0ZUN3IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57bGFiZWwucm90YXRpb24gfHwgMH3CsDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMyB3LXB4IGJnLXppbmMtODAwIG14LTAuNVwiIC8+XG5cbiAgICAgICAgICAgIHsvKiBFZGl0IGlubGluZSB0ZXh0ICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRlbXBUZXh0KGxhYmVsLnRleHQpO1xuICAgICAgICAgICAgICAgIHNldElzRWRpdGluZ0lubGluZSh0cnVlKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIGhvdmVyOmJnLXppbmMtODAwIHJvdW5kZWQgdGV4dC1hbWJlci00MDBcIlxuICAgICAgICAgICAgICB0aXRsZT1cItCY0LfQvNC10L3QuNGC0Ywg0YLQtdC60YHRglwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxFZGl0MyBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogRGVsZXRlIGJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uRGVsZXRlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgaG92ZXI6YmctcmVkLTkwMC81MCByb3VuZGVkIHRleHQtcmVkLTQwMCBob3Zlcjp0ZXh0LXJlZC0zMDBcIlxuICAgICAgICAgICAgICB0aXRsZT1cItCj0LTQsNC70LjRgtGMINC90LDQtNC/0LjRgdGMXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJpZ2h0L0JvdHRvbSBTdHJldGNoIEhhbmRsZSAqL31cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBvbk1vdXNlRG93bj17aGFuZGxlUmVzaXplU3RhcnR9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtYm90dG9tLTIgLXJpZ2h0LTIgdy01IGgtNSBiZy1za3ktNTAwIGhvdmVyOmJnLXNreS00MDAgdGV4dC16aW5jLTk1MCByb3VuZGVkIGN1cnNvci1ud3NlLXJlc2l6ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbWQgei01MCB0cmFuc2l0aW9uIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMTBcIlxuICAgICAgICAgICAgdGl0bGU9XCLQl9Cw0LbQvNC40YLQtSDQuCDRgtGP0L3QuNGC0LUg0LTQu9GPINGA0LDRgdGC0Y/Qs9C40LLQsNC90LjRjyDQvdCw0LTQv9C40YHQuFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1heGltaXplMiBjbGFzc05hbWU9XCJ3LTMgaC0zIHRyYW5zZm9ybSByb3RhdGUtOTBcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19