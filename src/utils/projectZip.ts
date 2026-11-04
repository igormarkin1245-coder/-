const JSZip = __vite__cjsImport0_jszip;import __vite__cjsImport0_jszip from "jszip";
export async function generateProjectZip(currentCampaign) {
	const zip = new JSZip();
	// 1. package.json
	const packageJson = {
		name: "fallout-equestria-rp-map",
		private: true,
		version: "1.0.0",
		type: "module",
		scripts: {
			dev: "vite",
			build: "vite build",
			preview: "vite preview"
		},
		dependencies: {
			"@tailwindcss/vite": "^4.3.3",
			"@vitejs/plugin-react": "^6.1.1",
			"jszip": "^3.10.1",
			"lucide-react": "^0.546.0",
			"react": "^19.0.1",
			"react-dom": "^19.0.1",
			"tailwindcss": "^4.3.3",
			"vite": "^8.3.0"
		},
		devDependencies: {
			"@types/jszip": "^3.4.1",
			"@types/node": "^22.14.0",
			"@types/react": "^19.3.0",
			"@types/react-dom": "^19.3.0",
			"typescript": "^7.0.2"
		}
	};
	zip.file("package.json", JSON.stringify(packageJson, null, 2));
	// 2. vite.config.ts
	const viteConfig = `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
`;
	zip.file("vite.config.ts", viteConfig);
	// 3. tsconfig.json
	const tsConfig = `{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "types": ["vite/client"],
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./*"]
    },
    "noEmit": true
  },
  "exclude": ["dist"]
}
`;
	zip.file("tsconfig.json", tsConfig);
	// 4. index.html
	const indexHtml = `<!doctype html>
<html lang="ru" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FALLOUT: EQUESTRIA - Tactical RP Map</title>
    <meta name="description" content="Интерактивная тактическая ролевая карта Fallout: Equestria с восьмиугольной сеткой, зонами контроля, торговыми путями и админ-панелью." />
    <meta property="og:title" content="FALLOUT: EQUESTRIA - Tactical RP Map" />
    <meta property="og:description" content="Интерактивная тактическая ролевая карта Fallout: Equestria с восьмиугольной сеткой, зонами контроля, торговыми путями и админ-панелью." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=JetBrains+Mono:wght@400;600;800&family=MedievalSharp&family=Montserrat:wght@400;600;800;900&family=Orbitron:wght@500;700;900&family=Playfair+Display:ital,wght@0,600;0,900;1,700&family=Rajdhani:wght@500;600;700&family=Russo+One&family=Share+Tech+Mono&display=swap" rel="stylesheet">
  </head>
  <body class="bg-zinc-950 text-zinc-100 overflow-hidden select-none">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"><\/script>
  </body>
</html>
`;
	zip.file("index.html", indexHtml);
	// 5. README.md with Render deployment guide
	const readme = `# FALLOUT: EQUESTRIA - Tactical RP Map

Интерактивная тактическая ролевая карта с восьмиугольной сеткой, зонами контроля, торговыми путями, ключевыми точками и защищенной админ-панелью (Пароль: DTDT228).

## Инструкция по развертыванию на Render (https://render.com)

### Способ 1: Static Site на Render (Рекомендуемый, Бесплатный и самый быстрый)
1. Создайте репозиторий на GitHub и загрузите в него содержимое этой папки.
2. Зайдите в панель [Render Dashboard](https://dashboard.render.com).
3. Нажмите **New +** -> **Static Site**.
4. Подключите ваш GitHub репозиторий.
5. Укажите следующие параметры:
   - **Name**: \`fallout-equestria-map\` (или любое имя)
   - **Branch**: \`main\`
   - **Build Command**: \`npm install && npm run build\`
   - **Publish Directory**: \`dist\`
6. Нажмите **Create Static Site**. Через 1 минуту ваш сайт будет доступен по ссылке \`https://fallout-equestria-map.onrender.com\`!

### Способ 2: Локальный запуск
\`\`\`bash
npm install
npm run dev
\`\`\`
Откройте браузер по адресу \`http://localhost:3000\`.

## Пароль администратора
Пароль для входа в командный штаб: \`DTDT228\`
`;
	zip.file("README.md", readme);
	// 6. Fetch the map image asset and pack into public/assets/aistudio/...
	try {
		const imgUrl = "/assets/aistudio/5195356406373096378_fefdb8d0.jpg";
		const response = await fetch(imgUrl);
		if (response.ok) {
			const imgBlob = await response.blob();
			zip.file("public/assets/aistudio/5195356406373096378_fefdb8d0.jpg", imgBlob);
		}
	} catch (e) {
		console.warn("Failed to bundle map image into zip", e);
	}
	// 7. Embedded Campaign with current edits
	const campaignJson = JSON.stringify(currentCampaign, null, 2);
	zip.file("src/data/defaultCampaign.ts", `import { CampaignState } from '../types/map';

export const INITIAL_CAMPAIGN: CampaignState = ${campaignJson};
`);
	// 8. Fetch current source files from the app if possible or read from bundle
	const filesToFetch = [
		"src/main.tsx",
		"src/index.css",
		"src/types/map.ts",
		"src/utils/octagon.ts",
		"src/utils/projectZip.ts",
		"src/components/AdminPanel.tsx",
		"src/components/ColorGradientPicker.tsx",
		"src/components/KeyLocationModal.tsx",
		"src/components/KeyLocationTooltip.tsx",
		"src/components/MapLabelItem.tsx",
		"src/components/Minimap.tsx",
		"src/components/OctagonItem.tsx",
		"src/components/SvgPatterns.tsx",
		"src/components/TacticalHud.tsx",
		"src/App.tsx"
	];
	for (const filePath of filesToFetch) {
		try {
			const res = await fetch("/" + filePath);
			if (res.ok) {
				const text = await res.text();
				zip.file(filePath, text);
			}
		} catch (e) {
			console.warn("Failed to fetch " + filePath, e);
		}
	}
	return await zip.generateAsync({ type: "blob" });
}

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXO0FBR2xCLE9BQU8sZUFBZSxtQkFBbUIsaUJBQStDO0NBQ3RGLE1BQU0sTUFBTSxJQUFJLE1BQU07O0NBR3RCLE1BQU0sY0FBYztFQUNsQixNQUFNO0VBQ04sU0FBUztFQUNULFNBQVM7RUFDVCxNQUFNO0VBQ04sU0FBUztHQUNQLEtBQUs7R0FDTCxPQUFPO0dBQ1AsU0FBUztFQUNYO0VBQ0EsY0FBYztHQUNaLHFCQUFxQjtHQUNyQix3QkFBd0I7R0FDeEIsU0FBUztHQUNULGdCQUFnQjtHQUNoQixTQUFTO0dBQ1QsYUFBYTtHQUNiLGVBQWU7R0FDZixRQUFRO0VBQ1Y7RUFDQSxpQkFBaUI7R0FDZixnQkFBZ0I7R0FDaEIsZUFBZTtHQUNmLGdCQUFnQjtHQUNoQixvQkFBb0I7R0FDcEIsY0FBYztFQUNoQjtDQUNGO0NBQ0EsSUFBSSxLQUFLLGdCQUFnQixLQUFLLFVBQVUsYUFBYSxNQUFNLENBQUMsQ0FBQzs7Q0FHN0QsTUFBTSxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQm5CLElBQUksS0FBSyxrQkFBa0IsVUFBVTs7Q0FHckMsTUFBTSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0JqQixJQUFJLEtBQUssaUJBQWlCLFFBQVE7O0NBR2xDLE1BQU0sWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJsQixJQUFJLEtBQUssY0FBYyxTQUFTOztDQUdoQyxNQUFNLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E0QmYsSUFBSSxLQUFLLGFBQWEsTUFBTTs7Q0FHNUIsSUFBSTtFQUNGLE1BQU0sU0FBUztFQUNmLE1BQU0sV0FBVyxNQUFNLE1BQU0sTUFBTTtFQUNuQyxJQUFJLFNBQVMsSUFBSTtHQUNmLE1BQU0sVUFBVSxNQUFNLFNBQVMsS0FBSztHQUNwQyxJQUFJLEtBQUssMkRBQTJELE9BQU87RUFDN0U7Q0FDRixTQUFTLEdBQUc7RUFDVixRQUFRLEtBQUssdUNBQXVDLENBQUM7Q0FDdkQ7O0NBR0EsTUFBTSxlQUFlLEtBQUssVUFBVSxpQkFBaUIsTUFBTSxDQUFDO0NBQzVELElBQUksS0FBSywrQkFBK0I7O2lEQUVPLGFBQWE7Q0FDN0Q7O0NBR0MsTUFBTSxlQUFlO0VBQ25CO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtDQUNGO0NBRUEsS0FBSyxNQUFNLFlBQVksY0FBYztFQUNuQyxJQUFJO0dBQ0YsTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLFFBQVE7R0FDdEMsSUFBSSxJQUFJLElBQUk7SUFDVixNQUFNLE9BQU8sTUFBTSxJQUFJLEtBQUs7SUFDNUIsSUFBSSxLQUFLLFVBQVUsSUFBSTtHQUN6QjtFQUNGLFNBQVMsR0FBRztHQUNWLFFBQVEsS0FBSyxxQkFBcUIsVUFBVSxDQUFDO0VBQy9DO0NBQ0Y7Q0FFQSxPQUFPLE1BQU0sSUFBSSxjQUFjLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDakQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsicHJvamVjdFppcC50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnO1xuaW1wb3J0IHsgQ2FtcGFpZ25TdGF0ZSB9IGZyb20gJy4uL3R5cGVzL21hcCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVByb2plY3RaaXAoY3VycmVudENhbXBhaWduOiBDYW1wYWlnblN0YXRlKTogUHJvbWlzZTxCbG9iPiB7XG4gIGNvbnN0IHppcCA9IG5ldyBKU1ppcCgpO1xuXG4gIC8vIDEuIHBhY2thZ2UuanNvblxuICBjb25zdCBwYWNrYWdlSnNvbiA9IHtcbiAgICBuYW1lOiAnZmFsbG91dC1lcXVlc3RyaWEtcnAtbWFwJyxcbiAgICBwcml2YXRlOiB0cnVlLFxuICAgIHZlcnNpb246ICcxLjAuMCcsXG4gICAgdHlwZTogJ21vZHVsZScsXG4gICAgc2NyaXB0czoge1xuICAgICAgZGV2OiAndml0ZScsXG4gICAgICBidWlsZDogJ3ZpdGUgYnVpbGQnLFxuICAgICAgcHJldmlldzogJ3ZpdGUgcHJldmlldydcbiAgICB9LFxuICAgIGRlcGVuZGVuY2llczoge1xuICAgICAgJ0B0YWlsd2luZGNzcy92aXRlJzogJ140LjMuMycsXG4gICAgICAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnOiAnXjYuMS4xJyxcbiAgICAgICdqc3ppcCc6ICdeMy4xMC4xJyxcbiAgICAgICdsdWNpZGUtcmVhY3QnOiAnXjAuNTQ2LjAnLFxuICAgICAgJ3JlYWN0JzogJ14xOS4wLjEnLFxuICAgICAgJ3JlYWN0LWRvbSc6ICdeMTkuMC4xJyxcbiAgICAgICd0YWlsd2luZGNzcyc6ICdeNC4zLjMnLFxuICAgICAgJ3ZpdGUnOiAnXjguMy4wJ1xuICAgIH0sXG4gICAgZGV2RGVwZW5kZW5jaWVzOiB7XG4gICAgICAnQHR5cGVzL2pzemlwJzogJ14zLjQuMScsXG4gICAgICAnQHR5cGVzL25vZGUnOiAnXjIyLjE0LjAnLFxuICAgICAgJ0B0eXBlcy9yZWFjdCc6ICdeMTkuMy4wJyxcbiAgICAgICdAdHlwZXMvcmVhY3QtZG9tJzogJ14xOS4zLjAnLFxuICAgICAgJ3R5cGVzY3JpcHQnOiAnXjcuMC4yJ1xuICAgIH1cbiAgfTtcbiAgemlwLmZpbGUoJ3BhY2thZ2UuanNvbicsIEpTT04uc3RyaW5naWZ5KHBhY2thZ2VKc29uLCBudWxsLCAyKSk7XG5cbiAgLy8gMi4gdml0ZS5jb25maWcudHNcbiAgY29uc3Qgdml0ZUNvbmZpZyA9IGBpbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB0YWlsd2luZGNzcygpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBob3N0OiB0cnVlLFxuICB9LFxufSk7XG5gO1xuICB6aXAuZmlsZSgndml0ZS5jb25maWcudHMnLCB2aXRlQ29uZmlnKTtcblxuICAvLyAzLiB0c2NvbmZpZy5qc29uXG4gIGNvbnN0IHRzQ29uZmlnID0gYHtcbiAgXCJjb21waWxlck9wdGlvbnNcIjoge1xuICAgIFwidGFyZ2V0XCI6IFwiRVMyMDIyXCIsXG4gICAgXCJleHBlcmltZW50YWxEZWNvcmF0b3JzXCI6IHRydWUsXG4gICAgXCJ1c2VEZWZpbmVGb3JDbGFzc0ZpZWxkc1wiOiBmYWxzZSxcbiAgICBcIm1vZHVsZVwiOiBcIkVTTmV4dFwiLFxuICAgIFwidHlwZXNcIjogW1widml0ZS9jbGllbnRcIl0sXG4gICAgXCJsaWJcIjogW1wiRVMyMDIyXCIsIFwiRE9NXCIsIFwiRE9NLkl0ZXJhYmxlXCJdLFxuICAgIFwic2tpcExpYkNoZWNrXCI6IHRydWUsXG4gICAgXCJtb2R1bGVSZXNvbHV0aW9uXCI6IFwiYnVuZGxlclwiLFxuICAgIFwiaXNvbGF0ZWRNb2R1bGVzXCI6IHRydWUsXG4gICAgXCJtb2R1bGVEZXRlY3Rpb25cIjogXCJmb3JjZVwiLFxuICAgIFwiYWxsb3dKc1wiOiB0cnVlLFxuICAgIFwianN4XCI6IFwicmVhY3QtanN4XCIsXG4gICAgXCJwYXRoc1wiOiB7XG4gICAgICBcIkAvKlwiOiBbXCIuLypcIl1cbiAgICB9LFxuICAgIFwibm9FbWl0XCI6IHRydWVcbiAgfSxcbiAgXCJleGNsdWRlXCI6IFtcImRpc3RcIl1cbn1cbmA7XG4gIHppcC5maWxlKCd0c2NvbmZpZy5qc29uJywgdHNDb25maWcpO1xuXG4gIC8vIDQuIGluZGV4Lmh0bWxcbiAgY29uc3QgaW5kZXhIdG1sID0gYDwhZG9jdHlwZSBodG1sPlxuPGh0bWwgbGFuZz1cInJ1XCIgY2xhc3M9XCJkYXJrXCI+XG4gIDxoZWFkPlxuICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiIC8+XG4gICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIiAvPlxuICAgIDx0aXRsZT5GQUxMT1VUOiBFUVVFU1RSSUEgLSBUYWN0aWNhbCBSUCBNYXA8L3RpdGxlPlxuICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCLQmNC90YLQtdGA0LDQutGC0LjQstC90LDRjyDRgtCw0LrRgtC40YfQtdGB0LrQsNGPINGA0L7Qu9C10LLQsNGPINC60LDRgNGC0LAgRmFsbG91dDogRXF1ZXN0cmlhINGBINCy0L7RgdGM0LzQuNGD0LPQvtC70YzQvdC+0Lkg0YHQtdGC0LrQvtC5LCDQt9C+0L3QsNC80Lgg0LrQvtC90YLRgNC+0LvRjywg0YLQvtGA0LPQvtCy0YvQvNC4INC/0YPRgtGP0LzQuCDQuCDQsNC00LzQuNC9LdC/0LDQvdC10LvRjNGOLlwiIC8+XG4gICAgPG1ldGEgcHJvcGVydHk9XCJvZzp0aXRsZVwiIGNvbnRlbnQ9XCJGQUxMT1VUOiBFUVVFU1RSSUEgLSBUYWN0aWNhbCBSUCBNYXBcIiAvPlxuICAgIDxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PVwi0JjQvdGC0LXRgNCw0LrRgtC40LLQvdCw0Y8g0YLQsNC60YLQuNGH0LXRgdC60LDRjyDRgNC+0LvQtdCy0LDRjyDQutCw0YDRgtCwIEZhbGxvdXQ6IEVxdWVzdHJpYSDRgSDQstC+0YHRjNC80LjRg9Cz0L7Qu9GM0L3QvtC5INGB0LXRgtC60L7QuSwg0LfQvtC90LDQvNC4INC60L7QvdGC0YDQvtC70Y8sINGC0L7RgNCz0L7QstGL0LzQuCDQv9GD0YLRj9C80Lgg0Lgg0LDQtNC80LjQvS3Qv9Cw0L3QtdC70YzRji5cIiAvPlxuICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dHlwZVwiIGNvbnRlbnQ9XCJ3ZWJzaXRlXCIgLz5cbiAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjpjYXJkXCIgY29udGVudD1cInN1bW1hcnlfbGFyZ2VfaW1hZ2VcIiAvPlxuICAgIDxsaW5rIHJlbD1cInByZWNvbm5lY3RcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbVwiPlxuICAgIDxsaW5rIHJlbD1cInByZWNvbm5lY3RcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVwiIGNyb3Nzb3JpZ2luPlxuICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNpbnplbDp3Z2h0QDUwMDs3MDA7OTAwJmZhbWlseT1KZXRCcmFpbnMrTW9ubzp3Z2h0QDQwMDs2MDA7ODAwJmZhbWlseT1NZWRpZXZhbFNoYXJwJmZhbWlseT1Nb250c2VycmF0OndnaHRANDAwOzYwMDs4MDA7OTAwJmZhbWlseT1PcmJpdHJvbjp3Z2h0QDUwMDs3MDA7OTAwJmZhbWlseT1QbGF5ZmFpcitEaXNwbGF5Oml0YWwsd2dodEAwLDYwMDswLDkwMDsxLDcwMCZmYW1pbHk9UmFqZGhhbmk6d2dodEA1MDA7NjAwOzcwMCZmYW1pbHk9UnVzc28rT25lJmZhbWlseT1TaGFyZStUZWNoK01vbm8mZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICA8L2hlYWQ+XG4gIDxib2R5IGNsYXNzPVwiYmctemluYy05NTAgdGV4dC16aW5jLTEwMCBvdmVyZmxvdy1oaWRkZW4gc2VsZWN0LW5vbmVcIj5cbiAgICA8ZGl2IGlkPVwicm9vdFwiPjwvZGl2PlxuICAgIDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiIHNyYz1cIi9zcmMvbWFpbi50c3hcIj48L3NjcmlwdD5cbiAgPC9ib2R5PlxuPC9odG1sPlxuYDtcbiAgemlwLmZpbGUoJ2luZGV4Lmh0bWwnLCBpbmRleEh0bWwpO1xuXG4gIC8vIDUuIFJFQURNRS5tZCB3aXRoIFJlbmRlciBkZXBsb3ltZW50IGd1aWRlXG4gIGNvbnN0IHJlYWRtZSA9IGAjIEZBTExPVVQ6IEVRVUVTVFJJQSAtIFRhY3RpY2FsIFJQIE1hcFxuXG7QmNC90YLQtdGA0LDQutGC0LjQstC90LDRjyDRgtCw0LrRgtC40YfQtdGB0LrQsNGPINGA0L7Qu9C10LLQsNGPINC60LDRgNGC0LAg0YEg0LLQvtGB0YzQvNC40YPQs9C+0LvRjNC90L7QuSDRgdC10YLQutC+0LksINC30L7QvdCw0LzQuCDQutC+0L3RgtGA0L7Qu9GPLCDRgtC+0YDQs9C+0LLRi9C80Lgg0L/Rg9GC0Y/QvNC4LCDQutC70Y7Rh9C10LLRi9C80Lgg0YLQvtGH0LrQsNC80Lgg0Lgg0LfQsNGJ0LjRidC10L3QvdC+0Lkg0LDQtNC80LjQvS3Qv9Cw0L3QtdC70YzRjiAo0J/QsNGA0L7Qu9GMOiBEVERUMjI4KS5cblxuIyMg0JjQvdGB0YLRgNGD0LrRhtC40Y8g0L/QviDRgNCw0LfQstC10YDRgtGL0LLQsNC90LjRjiDQvdCwIFJlbmRlciAoaHR0cHM6Ly9yZW5kZXIuY29tKVxuXG4jIyMg0KHQv9C+0YHQvtCxIDE6IFN0YXRpYyBTaXRlINC90LAgUmVuZGVyICjQoNC10LrQvtC80LXQvdC00YPQtdC80YvQuSwg0JHQtdGB0L/Qu9Cw0YLQvdGL0Lkg0Lgg0YHQsNC80YvQuSDQsdGL0YHRgtGA0YvQuSlcbjEuINCh0L7Qt9C00LDQudGC0LUg0YDQtdC/0L7Qt9C40YLQvtGA0LjQuSDQvdCwIEdpdEh1YiDQuCDQt9Cw0LPRgNGD0LfQuNGC0LUg0LIg0L3QtdCz0L4g0YHQvtC00LXRgNC20LjQvNC+0LUg0Y3RgtC+0Lkg0L/QsNC/0LrQuC5cbjIuINCX0LDQudC00LjRgtC1INCyINC/0LDQvdC10LvRjCBbUmVuZGVyIERhc2hib2FyZF0oaHR0cHM6Ly9kYXNoYm9hcmQucmVuZGVyLmNvbSkuXG4zLiDQndCw0LbQvNC40YLQtSAqKk5ldyArKiogLT4gKipTdGF0aWMgU2l0ZSoqLlxuNC4g0J/QvtC00LrQu9GO0YfQuNGC0LUg0LLQsNGIIEdpdEh1YiDRgNC10L/QvtC30LjRgtC+0YDQuNC5LlxuNS4g0KPQutCw0LbQuNGC0LUg0YHQu9C10LTRg9GO0YnQuNC1INC/0LDRgNCw0LzQtdGC0YDRizpcbiAgIC0gKipOYW1lKio6IFxcYGZhbGxvdXQtZXF1ZXN0cmlhLW1hcFxcYCAo0LjQu9C4INC70Y7QsdC+0LUg0LjQvNGPKVxuICAgLSAqKkJyYW5jaCoqOiBcXGBtYWluXFxgXG4gICAtICoqQnVpbGQgQ29tbWFuZCoqOiBcXGBucG0gaW5zdGFsbCAmJiBucG0gcnVuIGJ1aWxkXFxgXG4gICAtICoqUHVibGlzaCBEaXJlY3RvcnkqKjogXFxgZGlzdFxcYFxuNi4g0J3QsNC20LzQuNGC0LUgKipDcmVhdGUgU3RhdGljIFNpdGUqKi4g0KfQtdGA0LXQtyAxINC80LjQvdGD0YLRgyDQstCw0Ygg0YHQsNC50YIg0LHRg9C00LXRgiDQtNC+0YHRgtGD0L/QtdC9INC/0L4g0YHRgdGL0LvQutC1IFxcYGh0dHBzOi8vZmFsbG91dC1lcXVlc3RyaWEtbWFwLm9ucmVuZGVyLmNvbVxcYCFcblxuIyMjINCh0L/QvtGB0L7QsSAyOiDQm9C+0LrQsNC70YzQvdGL0Lkg0LfQsNC/0YPRgdC6XG5cXGBcXGBcXGBiYXNoXG5ucG0gaW5zdGFsbFxubnBtIHJ1biBkZXZcblxcYFxcYFxcYFxu0J7RgtC60YDQvtC50YLQtSDQsdGA0LDRg9C30LXRgCDQv9C+INCw0LTRgNC10YHRgyBcXGBodHRwOi8vbG9jYWxob3N0OjMwMDBcXGAuXG5cbiMjINCf0LDRgNC+0LvRjCDQsNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgNCwXG7Qn9Cw0YDQvtC70Ywg0LTQu9GPINCy0YXQvtC00LAg0LIg0LrQvtC80LDQvdC00L3Ri9C5INGI0YLQsNCxOiBcXGBEVERUMjI4XFxgXG5gO1xuICB6aXAuZmlsZSgnUkVBRE1FLm1kJywgcmVhZG1lKTtcblxuICAvLyA2LiBGZXRjaCB0aGUgbWFwIGltYWdlIGFzc2V0IGFuZCBwYWNrIGludG8gcHVibGljL2Fzc2V0cy9haXN0dWRpby8uLi5cbiAgdHJ5IHtcbiAgICBjb25zdCBpbWdVcmwgPSAnL2Fzc2V0cy9haXN0dWRpby81MTk1MzU2NDA2MzczMDk2Mzc4X2ZlZmRiOGQwLmpwZyc7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChpbWdVcmwpO1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgY29uc3QgaW1nQmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgIHppcC5maWxlKCdwdWJsaWMvYXNzZXRzL2Fpc3R1ZGlvLzUxOTUzNTY0MDYzNzMwOTYzNzhfZmVmZGI4ZDAuanBnJywgaW1nQmxvYik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKCdGYWlsZWQgdG8gYnVuZGxlIG1hcCBpbWFnZSBpbnRvIHppcCcsIGUpO1xuICB9XG5cbiAgLy8gNy4gRW1iZWRkZWQgQ2FtcGFpZ24gd2l0aCBjdXJyZW50IGVkaXRzXG4gIGNvbnN0IGNhbXBhaWduSnNvbiA9IEpTT04uc3RyaW5naWZ5KGN1cnJlbnRDYW1wYWlnbiwgbnVsbCwgMik7XG4gIHppcC5maWxlKCdzcmMvZGF0YS9kZWZhdWx0Q2FtcGFpZ24udHMnLCBgaW1wb3J0IHsgQ2FtcGFpZ25TdGF0ZSB9IGZyb20gJy4uL3R5cGVzL21hcCc7XG5cbmV4cG9ydCBjb25zdCBJTklUSUFMX0NBTVBBSUdOOiBDYW1wYWlnblN0YXRlID0gJHtjYW1wYWlnbkpzb259O1xuYCk7XG5cbiAgLy8gOC4gRmV0Y2ggY3VycmVudCBzb3VyY2UgZmlsZXMgZnJvbSB0aGUgYXBwIGlmIHBvc3NpYmxlIG9yIHJlYWQgZnJvbSBidW5kbGVcbiAgY29uc3QgZmlsZXNUb0ZldGNoID0gW1xuICAgICdzcmMvbWFpbi50c3gnLFxuICAgICdzcmMvaW5kZXguY3NzJyxcbiAgICAnc3JjL3R5cGVzL21hcC50cycsXG4gICAgJ3NyYy91dGlscy9vY3RhZ29uLnRzJyxcbiAgICAnc3JjL3V0aWxzL3Byb2plY3RaaXAudHMnLFxuICAgICdzcmMvY29tcG9uZW50cy9BZG1pblBhbmVsLnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL0NvbG9yR3JhZGllbnRQaWNrZXIudHN4JyxcbiAgICAnc3JjL2NvbXBvbmVudHMvS2V5TG9jYXRpb25Nb2RhbC50c3gnLFxuICAgICdzcmMvY29tcG9uZW50cy9LZXlMb2NhdGlvblRvb2x0aXAudHN4JyxcbiAgICAnc3JjL2NvbXBvbmVudHMvTWFwTGFiZWxJdGVtLnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL01pbmltYXAudHN4JyxcbiAgICAnc3JjL2NvbXBvbmVudHMvT2N0YWdvbkl0ZW0udHN4JyxcbiAgICAnc3JjL2NvbXBvbmVudHMvU3ZnUGF0dGVybnMudHN4JyxcbiAgICAnc3JjL2NvbXBvbmVudHMvVGFjdGljYWxIdWQudHN4JyxcbiAgICAnc3JjL0FwcC50c3gnLFxuICBdO1xuXG4gIGZvciAoY29uc3QgZmlsZVBhdGggb2YgZmlsZXNUb0ZldGNoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvJyArIGZpbGVQYXRoKTtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlcy50ZXh0KCk7XG4gICAgICAgIHppcC5maWxlKGZpbGVQYXRoLCB0ZXh0KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBmZXRjaCAnICsgZmlsZVBhdGgsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhd2FpdCB6aXAuZ2VuZXJhdGVBc3luYyh7IHR5cGU6ICdibG9iJyB9KTtcbn1cbiJdfQ==