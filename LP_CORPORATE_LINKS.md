# LP共通：コーポレートサイト導線 — 実装ガイド

株式会社クレステックの各LP（ランディングページ）に、**公式サイトへの導線を共通化**するための手順書です。  
デザインはLPごとに自由ですが、**配置・役割・文言・リンク先**はこの仕組みで揃えます。

---

## 1. 何が共通化されるか

| 共通化する | 共通化しない |
|-----------|-------------|
| リンク文言（全LP同一） | LP全体のレイアウト・配色・フォント |
| 公式サイト・お問い合わせのURL | メインCTAのデザイン |
| ヘッダー／フッター／CTA補助の**役割と配置ルール** | ヒーロー・製品説明などのコンテンツ |

### 統一文言（変更する場合は JS のみ編集）

| 配置 | 文言 |
|------|------|
| ヘッダー | 株式会社クレステック公式サイトへ |
| CTA付近（任意） | 会社情報を確認する |
| フッター | 公式サイトを見る ／ お問い合わせ |
| フッター補足 | 本ページは株式会社クレステックが運営しています。… |

---

## 2. ファイル構成

```
itdc-lp/
├── css/
│   └── lp-corporate-links.css   … 見た目（dark / light テーマ）
├── js/
│   └── lp-corporate-links.js    … 文言・URL・HTML生成・自動マウント
├── odomasy.html                 … 導入済み（参考: dark）
├── itdc.html                    … 導入済み（参考: light + 一部 dark）
├── about_itdc.html              … 未導入の例
└── LP_CORPORATE_LINKS.md        … 本ドキュメント
```

**一元管理する場所**

- URL・文言: `js/lp-corporate-links.js` 内の `LP_CORPORATE_CONFIG`
- 見た目の基本: `css/lp-corporate-links.css`
- LP固有の微調整: 各 HTML の `<style>` で `.lp-corp-*` を上書き（必要な場合のみ）

---

## 3. 新しい HTML に追加する手順（チェックリスト）

### 必須

- [ ] `<head>` に CSS を読み込む
- [ ] ヘッダー（またはナビ）右上付近に `data-lp-corp="header"` を置く
- [ ] ページ最下部に `data-lp-corp="footer"` を置く
- [ ] `</body>` 直前に JS を読み込む
- [ ] 外部リンクアイコン用に **Font Awesome** が読み込まれていること

### 推奨（任意）

- [ ] 問い合わせCTAの直下に `data-lp-corp="cta-sub"` を置く
- [ ] テーマ（`dark` / `light`）を背景色に合わせて選ぶ
- [ ] フッターにコピーライト行を `data-lp-corp-copyright` で渡す

---

## 4. 最小実装テンプレート

`your-lp.html` が **`itdc-lp/` フォルダ直下**にある場合の例です。

### 4.1 `<head>` に追加

```html
<link rel="stylesheet" href="css/lp-corporate-links.css">
<!-- Font Awesome 未導入の場合のみ -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

### 4.2 ヘッダー導線（必須）

ナビの右側・メインCTAの左など、**目立ちすぎない位置**に空要素を置きます。

```html
<nav class="...">
  <!-- ロゴ・ページ内リンクなど -->
  <div data-lp-corp="header" data-lp-corp-theme="light"></div>
  <a href="#contact">お問い合わせ</a>
</nav>
```

- PC: ヘッダー右上
- SP: ハンバーガー内でも可。`odomasy.html` は常時表示のコンパクトリンク

### 4.3 CTA付近の補助導線（任意・推奨）

メインの問い合わせボタンの**直下**に置きます。

```html
<a href="https://www.crestec.co.jp/contact/" class="...">お問い合わせ</a>
<div data-lp-corp="cta-sub" data-lp-corp-theme="light"></div>
```

### 4.4 フッター導線（必須）

既存フッターの**さらに下（ページ最下部）**、または既存フッターを置き換える形で設置します。

```html
<div
  data-lp-corp="footer"
  data-lp-corp-theme="light"
  data-lp-corp-copyright="© 2026 株式会社クレステック All Rights Reserved."
></div>
```

### 4.5 `</body>` 直前に追加

```html
<script src="js/lp-corporate-links.js"></script>
```

読み込むと `DOMContentLoaded` 時に、ページ内の `[data-lp-corp]` が自動で中身に差し替わります。

---

## 5. マウントポイント一覧（data 属性）

| 属性 | 値 | 必須 | 生成される内容 |
|------|-----|------|----------------|
| `data-lp-corp` | `header` | **必須** | 「株式会社クレステック公式サイトへ」リンク |
| `data-lp-corp` | `cta-sub` | 任意 | 「会社情報を確認する」テキストリンク |
| `data-lp-corp` | `footer` | **必須** | 運営会社表記・補足文・公式サイト／お問い合わせ |
| `data-lp-corp-theme` | `dark` または `light` | 推奨 | 背景に合わせた配色（省略時は `dark`） |
| `data-lp-corp-copyright` | 任意の文字列 | 任意 | フッター最下段のコピーライト |
| `data-lp-corp-note` | `false` | 任意 | フッター補足文を非表示にする |

**例: 補足文なしフッター**

```html
<div data-lp-corp="footer" data-lp-corp-theme="light" data-lp-corp-note="false"></div>
```

同一ページに `data-lp-corp="cta-sub"` を複数置いても構いません（`itdc.html` はヒーローと問い合わせブロックの2箇所）。

---

## 6. テーマの選び方

| テーマ | 向いているLP | 例 |
|--------|-------------|-----|
| `dark` | 暗い背景・ダークUI | `odomasy.html`、暗色フッター上の CTA 補助 |
| `light` | 白〜明るい背景 | `itdc.html` のヘッダー・最下部フッター |

**背景がページ内で変わる場合**

- 明るいエリア → `data-lp-corp-theme="light"`
- 暗いエリア → `data-lp-corp-theme="dark"`

`itdc.html` では問い合わせブロック（暗背景）の CTA 補助だけ `dark` にしています。

---

## 7. HTML が `itdc-lp/` のサブフォルダにある場合

相対パスが1段深くなります。

```html
<link rel="stylesheet" href="../css/lp-corporate-links.css">
<script src="../js/lp-corporate-links.js"></script>
```

`portal/itdc/` 直下など **別ディレクトリ**から使う場合も、CSS/JS への相対パスをその都度合わせてください。  
文言・URLの管理は変わらず `itdc-lp/js/lp-corporate-links.js` のみ編集します。

---

## 8. 文言・URL を変更するとき

**各 HTML は編集しない。** 次のファイルだけ変更します。

`js/lp-corporate-links.js` → `LP_CORPORATE_CONFIG`

```javascript
const LP_CORPORATE_CONFIG = {
    corporateUrl: 'https://www.crestec.co.jp/',
    contactUrl: 'https://www.crestec.co.jp/contact/',
    companyName: '株式会社クレステック',
    copy: {
        header: '株式会社クレステック公式サイトへ',
        ctaSub: '会社情報を確認する',
        footerOfficial: '公式サイトを見る',
        footerContact: 'お問い合わせ',
        // ...
    },
};
```

保存後、導線を読み込んでいる全LPに反映されます。

---

## 9. 見た目をLPに合わせて調整する

基本スタイルは `css/lp-corporate-links.css` です。  
LP固有の色に寄せたいときは、その HTML の `<style>` で上書きします。

```html
<style>
  /* 例: about_itdc 系の primary 色に合わせる */
  .lp-corp-theme-light .lp-corp-header-link:hover {
    color: #6a87d6;
    border-color: #6a87d6;
  }
</style>
```

**上書きしてよいもの**: 色・余白・フォントサイズ  
**変えないもの**: 文言（JS側）、リンク先（JS側）、配置の役割（ヘッダー＝控えめ、フッター＝必須）

---

## 10. JavaScript API（手動で差し込む場合）

通常は `data-lp-corp` だけで十分です。  
動的に組み立てる場合は、読み込み後に次が使えます。

```javascript
// 再マウント（SPA的にDOMを差し替えた後など）
LpCorporateLinks.mount();

// 要素を自前で生成して append
const header = LpCorporateLinks.CorporateSiteLink('dark');
document.getElementById('my-nav').appendChild(header);

// 設定の参照
console.log(LpCorporateLinks.CONFIG.corporateUrl);
```

---

## 11. アクセシビリティ・外部リンク

- 公式サイト・お問い合わせは **新しいタブ**で開く（`target="_blank"` `rel="noopener noreferrer"`）
- `aria-label` に「（新しいタブで開きます）」を付与
- 外部リンクアイコン: Font Awesome `fa-arrow-up-right-from-square`

LP独自の問い合わせボタンも、可能なら同様に `target="_blank"` と `aria-label` を付けてください。

---

## 12. 導入済みページ（参考実装）

| ファイル | ヘッダー | CTA補助 | フッター | 備考 |
|----------|----------|---------|----------|------|
| `odomasy.html` | `dark` | `dark` ×1 | `dark` + copyright | ナビ右、SPでもヘッダーリンク表示 |
| `itdc.html` | `light` | `light` + `dark` ×2 | `light` + copyright | 暗い問い合わせブロックのみ CTA が `dark` |
| `about_itdc.html` | 未導入 | — | — | 本ガイドに沿って追加可能 |

---

## 13. 公開前の確認項目

1. ヘッダーに「株式会社クレステック公式サイトへ」が表示される
2. ページ最下部に「運営会社：株式会社クレステック」と「公式サイトを見る／お問い合わせ」がある
3. リンク先が `www.crestec.co.jp` および `/contact/` になっている
4. 「本体へ戻る」「会社サイトへ」など **独自文言が残っていない**
5. CSS/JS のパスが404になっていない（サブフォルダ配置時に注意）
6. Font Awesome が読み込まれ、外部リンクアイコンが表示される

---

## 14. よくある質問

### Q. なぜ HTML に直接書かないのか

LPが増えると、文言・URLの修正が複数ファイルに散らばり、依頼仕様の「LP間で導線のバラつきがない」状態を保ちにくいためです。

### Q. React や Vue の LP でも使えるか

静的 HTML 向けです。フレームワーク LP では `LpCorporateLinks` の生成ロジックと `LP_CORPORATE_CONFIG` を移植するか、ビルド時に同じ文言・URLを共有してください。

### Q. フッターを既存デザインと二重にしたくない

既存フッターの**下**に `data-lp-corp="footer"` だけ足す方法（`itdc.html`）か、既存のコピーライト部分を削除して共通フッターに寄せる方法のどちらでも構いません。運営表記と公式リンクは必ず残してください。

---

## 15. 問い合わせ・更新履歴

- 仕様の元ドキュメント: 社内「LP共通：コーポレートサイト導線ルール」
- 実装・本ガイドの管理: `itdc-lp/` フォルダ（ITDC LP）

文言・URLの変更依頼は `js/lp-corporate-links.js` を更新し、本ガイドの表（セクション1）と実際の表示を合わせてください。
