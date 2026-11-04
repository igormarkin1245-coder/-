// Octagon geometry utilities for truncated square tiling
export const SQRT2 = Math.SQRT2;
export const COS_22_5 = Math.cos(Math.PI / 8);
export const SIN_22_5 = Math.sin(Math.PI / 8);
/**
* Calculates the polygon points string for an SVG regular octagon centered at (cx, cy)
*/
export function getOctagonPoints(cx, cy, radius) {
	const points = [];
	// 8 vertices rotated so edges are aligned with axes
	for (let i = 0; i < 8; i++) {
		const angle = (i * 45 + 22.5) * (Math.PI / 180);
		const x = cx + radius * Math.cos(angle);
		const y = cy + radius * Math.sin(angle);
		points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
	}
	return points.join(" ");
}
/**
* Returns the 8 vertex coordinates as array of [x, y]
*/
export function getOctagonVertices(cx, cy, radius) {
	const vertices = [];
	for (let i = 0; i < 8; i++) {
		const angle = (i * 45 + 22.5) * (Math.PI / 180);
		vertices.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
	}
	return vertices;
}
/**
* Given cell size (diameter D), calculates step size and vertex radius
*/
export function getGridMetrics(cellSize) {
	// cellSize is width/height of the octagon
	const step = cellSize;
	// Radius from center to each vertex:
	const radius = cellSize / 2 / COS_22_5;
	return {
		step,
		radius
	};
}
/**
* Converts map (x, y) coordinates into grid cell (col, row)
*/
export function worldToGrid(x, y, cellSize) {
	const col = Math.floor(x / cellSize);
	const row = Math.floor(y / cellSize);
	return {
		col,
		row
	};
}
/**
* Gets center coordinates for a grid cell (col, row)
*/
export function gridToWorldCenter(col, row, cellSize) {
	const cx = col * cellSize + cellSize / 2;
	const cy = row * cellSize + cellSize / 2;
	return {
		cx,
		cy
	};
}
/**
* Generates cell key
*/
export function cellKey(col, row) {
	return `${col}_${row}`;
}
/**
* Parses cell key
*/
export function parseCellKey(key) {
	const [c, r] = key.split("_").map(Number);
	return {
		col: c,
		row: r
	};
}

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sTUFBTSxRQUFRLEtBQUs7QUFDMUIsT0FBTyxNQUFNLFdBQVcsS0FBSyxJQUFJLEtBQUssS0FBSyxDQUFDO0FBQzVDLE9BQU8sTUFBTSxXQUFXLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQzs7OztBQUs1QyxPQUFPLFNBQVMsaUJBQWlCLElBQVksSUFBWSxRQUF3QjtDQUMvRSxNQUFNLFNBQW1CLENBQUM7O0NBRTFCLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7RUFDMUIsTUFBTSxTQUFTLElBQUksS0FBSyxTQUFTLEtBQUssS0FBSztFQUMzQyxNQUFNLElBQUksS0FBSyxTQUFTLEtBQUssSUFBSSxLQUFLO0VBQ3RDLE1BQU0sSUFBSSxLQUFLLFNBQVMsS0FBSyxJQUFJLEtBQUs7RUFDdEMsT0FBTyxLQUFLLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7Q0FDL0M7Q0FDQSxPQUFPLE9BQU8sS0FBSyxHQUFHO0FBQ3hCOzs7O0FBS0EsT0FBTyxTQUFTLG1CQUFtQixJQUFZLElBQVksUUFBb0M7Q0FDN0YsTUFBTSxXQUErQixDQUFDO0NBQ3RDLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7RUFDMUIsTUFBTSxTQUFTLElBQUksS0FBSyxTQUFTLEtBQUssS0FBSztFQUMzQyxTQUFTLEtBQUssQ0FBQyxLQUFLLFNBQVMsS0FBSyxJQUFJLEtBQUssR0FBRyxLQUFLLFNBQVMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDO0NBQzlFO0NBQ0EsT0FBTztBQUNUOzs7O0FBS0EsT0FBTyxTQUFTLGVBQWUsVUFBa0I7O0NBRS9DLE1BQU0sT0FBTzs7Q0FFYixNQUFNLFNBQVUsV0FBVyxJQUFLO0NBQ2hDLE9BQU87RUFBRTtFQUFNO0NBQU87QUFDeEI7Ozs7QUFLQSxPQUFPLFNBQVMsWUFBWSxHQUFXLEdBQVcsVUFBZ0Q7Q0FDaEcsTUFBTSxNQUFNLEtBQUssTUFBTSxJQUFJLFFBQVE7Q0FDbkMsTUFBTSxNQUFNLEtBQUssTUFBTSxJQUFJLFFBQVE7Q0FDbkMsT0FBTztFQUFFO0VBQUs7Q0FBSTtBQUNwQjs7OztBQUtBLE9BQU8sU0FBUyxrQkFBa0IsS0FBYSxLQUFhLFVBQThDO0NBQ3hHLE1BQU0sS0FBSyxNQUFNLFdBQVcsV0FBVztDQUN2QyxNQUFNLEtBQUssTUFBTSxXQUFXLFdBQVc7Q0FDdkMsT0FBTztFQUFFO0VBQUk7Q0FBRztBQUNsQjs7OztBQUtBLE9BQU8sU0FBUyxRQUFRLEtBQWEsS0FBcUI7Q0FDeEQsT0FBTyxHQUFHLElBQUksR0FBRztBQUNuQjs7OztBQUtBLE9BQU8sU0FBUyxhQUFhLEtBQTJDO0NBQ3RFLE1BQU0sQ0FBQyxHQUFHLEtBQUssSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTTtDQUN4QyxPQUFPO0VBQUUsS0FBSztFQUFHLEtBQUs7Q0FBRTtBQUMxQiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJvY3RhZ29uLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbIi8vIE9jdGFnb24gZ2VvbWV0cnkgdXRpbGl0aWVzIGZvciB0cnVuY2F0ZWQgc3F1YXJlIHRpbGluZ1xuXG5leHBvcnQgY29uc3QgU1FSVDIgPSBNYXRoLlNRUlQyO1xuZXhwb3J0IGNvbnN0IENPU18yMl81ID0gTWF0aC5jb3MoTWF0aC5QSSAvIDgpOyAvLyB+MC45MjM4OFxuZXhwb3J0IGNvbnN0IFNJTl8yMl81ID0gTWF0aC5zaW4oTWF0aC5QSSAvIDgpOyAvLyB+MC4zODI2OFxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHBvbHlnb24gcG9pbnRzIHN0cmluZyBmb3IgYW4gU1ZHIHJlZ3VsYXIgb2N0YWdvbiBjZW50ZXJlZCBhdCAoY3gsIGN5KVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2N0YWdvblBvaW50cyhjeDogbnVtYmVyLCBjeTogbnVtYmVyLCByYWRpdXM6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IHBvaW50czogc3RyaW5nW10gPSBbXTtcbiAgLy8gOCB2ZXJ0aWNlcyByb3RhdGVkIHNvIGVkZ2VzIGFyZSBhbGlnbmVkIHdpdGggYXhlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGNvbnN0IGFuZ2xlID0gKGkgKiA0NSArIDIyLjUpICogKE1hdGguUEkgLyAxODApO1xuICAgIGNvbnN0IHggPSBjeCArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICBjb25zdCB5ID0gY3kgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgcG9pbnRzLnB1c2goYCR7eC50b0ZpeGVkKDIpfSwke3kudG9GaXhlZCgyKX1gKTtcbiAgfVxuICByZXR1cm4gcG9pbnRzLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSA4IHZlcnRleCBjb29yZGluYXRlcyBhcyBhcnJheSBvZiBbeCwgeV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9jdGFnb25WZXJ0aWNlcyhjeDogbnVtYmVyLCBjeTogbnVtYmVyLCByYWRpdXM6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl1bXSB7XG4gIGNvbnN0IHZlcnRpY2VzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBjb25zdCBhbmdsZSA9IChpICogNDUgKyAyMi41KSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICB2ZXJ0aWNlcy5wdXNoKFtjeCArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSwgY3kgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSldKTtcbiAgfVxuICByZXR1cm4gdmVydGljZXM7XG59XG5cbi8qKlxuICogR2l2ZW4gY2VsbCBzaXplIChkaWFtZXRlciBEKSwgY2FsY3VsYXRlcyBzdGVwIHNpemUgYW5kIHZlcnRleCByYWRpdXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdyaWRNZXRyaWNzKGNlbGxTaXplOiBudW1iZXIpIHtcbiAgLy8gY2VsbFNpemUgaXMgd2lkdGgvaGVpZ2h0IG9mIHRoZSBvY3RhZ29uXG4gIGNvbnN0IHN0ZXAgPSBjZWxsU2l6ZTtcbiAgLy8gUmFkaXVzIGZyb20gY2VudGVyIHRvIGVhY2ggdmVydGV4OlxuICBjb25zdCByYWRpdXMgPSAoY2VsbFNpemUgLyAyKSAvIENPU18yMl81O1xuICByZXR1cm4geyBzdGVwLCByYWRpdXMgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBtYXAgKHgsIHkpIGNvb3JkaW5hdGVzIGludG8gZ3JpZCBjZWxsIChjb2wsIHJvdylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkVG9HcmlkKHg6IG51bWJlciwgeTogbnVtYmVyLCBjZWxsU2l6ZTogbnVtYmVyKTogeyBjb2w6IG51bWJlcjsgcm93OiBudW1iZXIgfSB7XG4gIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoeCAvIGNlbGxTaXplKTtcbiAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcih5IC8gY2VsbFNpemUpO1xuICByZXR1cm4geyBjb2wsIHJvdyB9O1xufVxuXG4vKipcbiAqIEdldHMgY2VudGVyIGNvb3JkaW5hdGVzIGZvciBhIGdyaWQgY2VsbCAoY29sLCByb3cpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncmlkVG9Xb3JsZENlbnRlcihjb2w6IG51bWJlciwgcm93OiBudW1iZXIsIGNlbGxTaXplOiBudW1iZXIpOiB7IGN4OiBudW1iZXI7IGN5OiBudW1iZXIgfSB7XG4gIGNvbnN0IGN4ID0gY29sICogY2VsbFNpemUgKyBjZWxsU2l6ZSAvIDI7XG4gIGNvbnN0IGN5ID0gcm93ICogY2VsbFNpemUgKyBjZWxsU2l6ZSAvIDI7XG4gIHJldHVybiB7IGN4LCBjeSB9O1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBjZWxsIGtleVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2VsbEtleShjb2w6IG51bWJlciwgcm93OiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7Y29sfV8ke3Jvd31gO1xufVxuXG4vKipcbiAqIFBhcnNlcyBjZWxsIGtleVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDZWxsS2V5KGtleTogc3RyaW5nKTogeyBjb2w6IG51bWJlcjsgcm93OiBudW1iZXIgfSB7XG4gIGNvbnN0IFtjLCByXSA9IGtleS5zcGxpdCgnXycpLm1hcChOdW1iZXIpO1xuICByZXR1cm4geyBjb2w6IGMsIHJvdzogciB9O1xufVxuIl19