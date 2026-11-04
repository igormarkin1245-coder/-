# FALLOUT: EQUESTRIA - Tactical RP Map

Интерактивная тактическая ролевая карта с восьмиугольной сеткой, зонами контроля, торговыми путями, ключевыми точками и защищенной админ-панелью (Пароль: DTDT228).

## Инструкция по развертыванию на Render (https://render.com)

### Способ 1: Static Site на Render (Рекомендуемый, Бесплатный и самый быстрый)
1. Создайте репозиторий на GitHub и загрузите в него содержимое этой папки.
2. Зайдите в панель [Render Dashboard](https://dashboard.render.com).
3. Нажмите **New +** -> **Static Site**.
4. Подключите ваш GitHub репозиторий.
5. Укажите следующие параметры:
   - **Name**: `fallout-equestria-map` (или любое имя)
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Нажмите **Create Static Site**. Через 1 минуту ваш сайт будет доступен по ссылке `https://fallout-equestria-map.onrender.com`!

### Способ 2: Локальный запуск
```bash
npm install
npm run dev
```
Откройте браузер по адресу `http://localhost:3000`.

## Пароль администратора
Пароль для входа в командный штаб: `DTDT228`
