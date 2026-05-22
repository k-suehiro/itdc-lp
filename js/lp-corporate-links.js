/**
 * LP共通：コーポレートサイト導線
 * 文言・URLはここで一元管理。各LPは data-lp-corp マウントポイントを設置する。
 */
(function (global) {
    'use strict';

    const LP_CORPORATE_CONFIG = {
        corporateUrl: 'https://www.crestec.co.jp/',
        contactUrl: 'https://www.crestec.co.jp/contact/',
        companyName: '株式会社クレステック',
        copy: {
            header: '株式会社クレステック公式サイトへ',
            ctaSub: '会社情報を確認する',
            footerOfficial: '公式サイトを見る',
            footerContact: 'お問い合わせ',
            footerOperator: '運営会社：株式会社クレステック',
            footerNote:
                '本ページは株式会社クレステックが運営しています。会社情報・事業内容の詳細は、公式コーポレートサイトをご覧ください。',
        },
    };

    const EXTERNAL_LABEL = '（新しいタブで開きます）';

    function getTheme(el) {
        const theme = el.getAttribute('data-lp-corp-theme');
        return theme === 'light' ? 'light' : 'dark';
    }

    function applyThemeClass(el, theme) {
        el.classList.add('lp-corp-theme-' + theme);
    }

    function externalIcon() {
        const i = document.createElement('i');
        i.className = 'fa-solid fa-arrow-up-right-from-square lp-corp-ext-icon';
        i.setAttribute('aria-hidden', 'true');
        return i;
    }

    function createExternalLink(href, text, className) {
        const a = document.createElement('a');
        a.href = href;
        a.className = className;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.appendChild(document.createTextNode(text));
        a.setAttribute('aria-label', text + EXTERNAL_LABEL);
        a.appendChild(externalIcon());
        return a;
    }

    /** ヘッダー：株式会社クレステック公式サイトへ */
    function CorporateSiteLink(theme) {
        const wrap = document.createElement('div');
        applyThemeClass(wrap, theme);
        const link = createExternalLink(
            LP_CORPORATE_CONFIG.corporateUrl,
            LP_CORPORATE_CONFIG.copy.header,
            'lp-corp-header-link'
        );
        wrap.appendChild(link);
        return wrap;
    }

    /** CTA付近：会社情報を確認する */
    function CompanyInfoSubLink(theme) {
        const wrap = document.createElement('div');
        wrap.className = 'lp-corp-cta-sub';
        applyThemeClass(wrap, theme);
        const link = createExternalLink(
            LP_CORPORATE_CONFIG.corporateUrl,
            LP_CORPORATE_CONFIG.copy.ctaSub,
            'lp-corp-cta-sub-link'
        );
        wrap.appendChild(link);
        return wrap;
    }

    /** フッター：運営会社表記・公式サイト・お問い合わせ */
    function LpFooter(theme, options) {
        const opts = options || {};
        const wrap = document.createElement('footer');
        wrap.className = 'lp-corp-footer';
        wrap.setAttribute('role', 'contentinfo');
        applyThemeClass(wrap, theme);

        const inner = document.createElement('div');
        inner.className = 'lp-corp-footer-inner';

        if (opts.showNote !== false) {
            const note = document.createElement('p');
            note.className = 'lp-corp-footer-note';
            note.textContent = LP_CORPORATE_CONFIG.copy.footerNote;
            inner.appendChild(note);
        }

        const operator = document.createElement('p');
        operator.className = 'lp-corp-footer-operator';
        operator.textContent = LP_CORPORATE_CONFIG.copy.footerOperator;
        inner.appendChild(operator);

        const links = document.createElement('ul');
        links.className = 'lp-corp-footer-links';

        const liOfficial = document.createElement('li');
        liOfficial.appendChild(
            createExternalLink(
                LP_CORPORATE_CONFIG.corporateUrl,
                LP_CORPORATE_CONFIG.copy.footerOfficial,
                ''
            )
        );

        const liSep = document.createElement('li');
        liSep.className = 'lp-corp-footer-sep';
        liSep.setAttribute('aria-hidden', 'true');
        liSep.textContent = '／';

        const liContact = document.createElement('li');
        liContact.appendChild(
            createExternalLink(
                LP_CORPORATE_CONFIG.contactUrl,
                LP_CORPORATE_CONFIG.copy.footerContact,
                ''
            )
        );

        links.appendChild(liOfficial);
        links.appendChild(liSep);
        links.appendChild(liContact);
        inner.appendChild(links);

        if (opts.copyright) {
            const copy = document.createElement('p');
            copy.className = 'lp-corp-footer-copy';
            copy.textContent = opts.copyright;
            inner.appendChild(copy);
        }

        wrap.appendChild(inner);
        return wrap;
    }

    function mount() {
        document.querySelectorAll('[data-lp-corp="header"]').forEach(function (el) {
            if (el.dataset.lpCorpMounted) return;
            const theme = getTheme(el);
            applyThemeClass(el, theme);
            el.appendChild(
                createExternalLink(
                    LP_CORPORATE_CONFIG.corporateUrl,
                    LP_CORPORATE_CONFIG.copy.header,
                    'lp-corp-header-link'
                )
            );
            el.dataset.lpCorpMounted = '1';
        });

        document.querySelectorAll('[data-lp-corp="cta-sub"]').forEach(function (el) {
            if (el.dataset.lpCorpMounted) return;
            const theme = getTheme(el);
            el.appendChild(CompanyInfoSubLink(theme));
            el.dataset.lpCorpMounted = '1';
        });

        document.querySelectorAll('[data-lp-corp="footer"]').forEach(function (el) {
            if (el.dataset.lpCorpMounted) return;
            const theme = getTheme(el);
            const copyright = el.getAttribute('data-lp-corp-copyright') || '';
            const showNote = el.getAttribute('data-lp-corp-note') !== 'false';
            el.appendChild(
                LpFooter(theme, {
                    copyright: copyright || undefined,
                    showNote: showNote,
                })
            );
            el.dataset.lpCorpMounted = '1';
        });
    }

    global.LpCorporateLinks = {
        CONFIG: LP_CORPORATE_CONFIG,
        CorporateSiteLink: CorporateSiteLink,
        CompanyInfoSubLink: CompanyInfoSubLink,
        LpFooter: LpFooter,
        mount: mount,
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})(typeof window !== 'undefined' ? window : this);
