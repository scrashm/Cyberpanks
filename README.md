# Cyberpanks — лендинг бренда одежды

Одностраничный сайт: Hero → О нас → Каталог → Контакты. Фиксированное меню справа сверху, плавный скролл, модалка товаров.

## Запуск

Откройте `index.html` в браузере двойным кликом или через локальный сервер:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Сайт будет доступен по адресу `http://localhost:8080`.

## Структура

```
index.html      — разметка
css/fonts.css   — шрифты (логотип, заголовки, текст)
css/styles.css  — стили
assets/fonts/   — файлы шрифта CyberSiberia
js/main.js      — навигация, модалка
FONTS.md        — гайд по смене шрифтов
TZ.md           — техническое задание
```

## Замена контента

- **Тексты и цены** — в `index.html` и объекте `PRODUCTS` в `js/main.js`
- **Изображения** — замените URL Unsplash на свои в `css/styles.css` и `js/main.js`
- **Контакты** — ссылки в секции `#contact`

## Деплой на GitHub Pages

Репозиторий: [scrashm/Cyberpanks](https://github.com/scrashm/Cyberpanks)

### Обязательно перед первым деплоем

Если workflow падает на шаге **Setup Pages** (≈8 секунд, красный крестик):

1. Откройте **Settings → Pages** в репозитории.
2. В блоке **Build and deployment** выберите **Source: GitHub Actions** (не «Deploy from a branch»).
3. Сохраните, затем **Actions → Deploy to GitHub Pages → Run workflow** (или сделайте любой `git push`).

Без этого шага Pages в репозитории не создан, и деплой всегда будет падать.

### Адрес сайта

`https://scrashm.github.io/Cyberpanks/`

Повторные правки — `git push`; деплой запустится автоматически.
