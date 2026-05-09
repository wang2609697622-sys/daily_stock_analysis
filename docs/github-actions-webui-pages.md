# GitHub Actions WebUI Pages Deployment

This repository contains two browser experiences:

- A static report dashboard generated for GitHub Pages.
- The full React/Vite WebUI in `apps/dsa-web`, published under `/app/`.

## Setup

1. Fork or push this repository to your GitHub account.
2. Open `Settings` -> `Pages`.
3. Set `Build and deployment` -> `Source` to `GitHub Actions`.
4. Configure the daily analysis secrets, especially an AI provider key and `STOCK_LIST`.
5. Open `Actions` -> `每日股票分析` -> `Run workflow`.
6. After the workflow finishes, open the Pages URL shown in the deployment summary.

For a project repository, the URL usually looks like:

```text
https://YOUR_USER_NAME.github.io/daily_stock_analysis/
```

The root URL shows the static report dashboard. The full WebUI is published at:

```text
https://YOUR_USER_NAME.github.io/daily_stock_analysis/app/
```

## Optional API URL

GitHub Pages can host static files, but it cannot run the Python FastAPI backend.
If you deploy the backend elsewhere, set one of these before running the workflow:

- Repository variable `WEBUI_API_URL`
- Manual workflow input `api_base_url`

Example:

```text
https://api.example.com
```

When no API URL is provided, the report dashboard still works. The full WebUI is still built and deployed, but API-backed pages need a running backend to return live data.

## Daily Analysis Workflow

`.github/workflows/webui-pages.yml` is also available as a manual-only workflow when you only want to rebuild and redeploy the WebUI/static shell after frontend changes. Running it does not run stock analysis, so the daily workflow is the normal deployment path for report updates.
