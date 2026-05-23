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
css/styles.css  — стили
js/main.js      — навигация, модалка, форма
TZ.md           — техническое задание
```

## Замена контента

- **Тексты и цены** — в `index.html` и объекте `PRODUCTS` в `js/main.js`
- **Изображения** — замените URL Unsplash на свои в `css/styles.css` и `js/main.js`
- **Контакты** — ссылки в секции `#contact`

## Деплой на GitHub Pages

1. Создайте репозиторий на [github.com/new](https://github.com/new) (например `cyberpanks`).
2. В корне проекта выполните (подставьте свой логин):

```bash
git init -b main
git add .
git commit -m "Initial commit: Cyberpanks landing"
git remote add origin https://github.com/ВАШ_ЛОГИН/cyberpanks.git
git push -u origin main
```

3. На GitHub: **Settings → Pages → Build and deployment** → Source: **GitHub Actions**.
4. После успешного workflow сайт откроется по адресу:

`https://ВАШ_ЛОГИН.github.io/cyberpanks/`

Повторные правки — просто `git push`; деплой запустится автоматически.
