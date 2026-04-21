import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist', 'main');
const outputPath = resolve(distDir, 'index.html');

const html = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Little 로그인 처리 중...</title>
  </head>
  <body>
    <script>
      (function () {
        var currentUrl = new URL(window.location.href);
        var accessToken = currentUrl.searchParams.get('access_token');
        var refreshToken = currentUrl.searchParams.get('refresh_token');
        var keyword = currentUrl.searchParams.get('keyword');
        var target = new URL('/', currentUrl.origin);

        if (accessToken) localStorage.setItem('access_token', accessToken);
        if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
        if (keyword) target.searchParams.set('keyword', keyword);

        window.location.replace(target.toString());
      })();
    </script>
  </body>
</html>
`;

await mkdir(distDir, { recursive: true });
await writeFile(outputPath, html, 'utf8');
