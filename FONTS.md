# Гайд: шрифты на сайте Cyberpanks

Все настройки шрифтов — в **`css/fonts.css`**. Там же подключается кастомный шрифт логотипа.

## Какие шрифты где

| Элемент | Переменная | Сейчас |
|---------|------------|--------|
| Логотип в шапке, заголовок **Cyberpanks**, подвал | `--font-logo` | **CyberSiberia** (файлы в `assets/fonts/`) |
| Заголовки секций, товаров, модалка | `--font-heading` | **Syne** (Google Fonts) |
| Текст, кнопки, формы | `--font-body` | **Manrope** (Google Fonts) |

---

## Быстро поменять шрифт логотипа (без своего файла)

Откройте `css/fonts.css` и измените `--font-logo`, например:

```css
--font-logo: "Syne", sans-serif;
```

Чтобы отключить CyberSiberia, закомментируйте блок `@font-face` для `CyberSiberia` в том же файле.

---

## Подключить свой шрифт (как CyberSiberia)

### 1. Положите файлы в проект

Скопируйте в `assets/fonts/`:

- `имя.woff2` (обязательно для современных браузеров)
- `имя.woff` и/или `имя.ttf` (запасные варианты)

Исходник `.svg` с [font-carrier](https://font-carrier.com) или `.ttf` из Figma/Adobe — тоже можно положить сюда для архива.

### 2. Пропишите `@font-face` в `css/fonts.css`

```css
@font-face {
  font-family: "МойШрифт";
  src:
    url("../assets/fonts/moy-shrift.woff2") format("woff2"),
    url("../assets/fonts/moy-shrift.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-logo: "МойШрифт", sans-serif;
}
```

### 3. Конвертация SVG → woff2 (если есть только `.svg`)

В папке проекта есть скрипт (нужен [Node.js](https://nodejs.org/)):

```powershell
cd c:\brend
node tools\convert-font.js
```

По умолчанию он читает `assets/fonts/cybersiberia.svg` и создаёт `.ttf`, `.woff`, `.woff2`.

Для **другого** SVG: замените файл или отредактируйте пути в `tools/convert-font.js`.

Альтернатива без Node: [CloudConvert](https://cloudconvert.com/svg-to-woff2) или [Transfonter](https://transfonter.org).

---

## Поменять шрифт заголовков или текста

### Google Fonts

1. Выберите шрифт на [fonts.google.com](https://fonts.google.com).
2. Замените ссылку в `index.html` (блок `<link href="https://fonts.googleapis.com/...">`).
3. В `css/fonts.css` обновите переменную:

```css
--font-heading: "НазваниеИзGoogle", sans-serif;
/* или */
--font-body: "НазваниеИзGoogle", sans-serif;
```

### Системный шрифт (без загрузки)

```css
--font-body: system-ui, -apple-system, "Segoe UI", sans-serif;
```

---

## Проверка после смены

1. Обновите страницу с очисткой кэша: `Ctrl+F5`.
2. Убедитесь, что в шапке, на главном экране и в подвале отображается нужный шрифт логотипа.
3. После правок на GitHub: `git push` — сайт обновится через Actions (1–2 мин).

---

## Файлы в `assets/fonts/`

| Файл | Назначение |
|------|------------|
| `cybersiberia.svg` | Исходник (font-carrier) |
| `cybersiberia.woff2` | Основной формат для сайта |
| `cybersiberia.woff` / `.ttf` | Запас для старых браузеров |

Не удаляйте `.woff2` — без него логотип может отображаться запасным Syne.
