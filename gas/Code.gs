/**
 * 2026 グローバルミーティング プログラム LP
 * Webアプリとして gm2026.html を配信
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('gm2026')
    .setTitle('2026 グローバルミーティング プログラム')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
