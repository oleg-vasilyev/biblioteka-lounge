import { raw, type TrustedHtml } from "#shared/html/html.ts";


export const muralDrawing = (): TrustedHtml =>
  raw(`<svg viewBox="0 0 320 200" aria-hidden="true" fill="none" stroke="#8F2430" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
<line x1="118" y1="4" x2="118" y2="20"/>
<path d="M107 20 L129 20 L137 38 L99 38 Z"/>
<path d="M108 46 Q118 54 128 46"/>
<path d="M12 40 Q18 24 36 28 Q44 14 62 20 Q78 12 84 28 Q98 30 90 44"/>
<path d="M226 34 Q234 20 250 24 Q260 12 276 20 Q292 16 296 32 Q306 36 298 46"/>
<circle cx="118" cy="76" r="11"/>
<path d="M107 70 Q118 60 129 70"/>
<path d="M100 100 Q118 88 136 100"/>
<line x1="100" y1="100" x2="96" y2="122"/>
<line x1="136" y1="100" x2="140" y2="122"/>
<path d="M96 122 L118 116 L140 122"/>
<path d="M96 122 L118 128 L140 122"/>
<line x1="118" y1="116" x2="118" y2="132"/>
<path d="M90 160 Q100 142 118 140 Q136 142 146 160"/>
<path d="M90 160 Q118 174 146 160"/>
<circle cx="254" cy="82" r="10"/>
<path d="M263 76 Q272 90 268 106"/>
<path d="M262 92 Q270 118 266 148 L266 170"/>
<path d="M222 170 L240 124"/>
<path d="M240 124 L262 146"/>
<path d="M256 100 Q234 114 230 144"/>
<line x1="216" y1="170" x2="240" y2="170"/>
<circle cx="184" cy="158" r="10"/>
<line x1="184" y1="148" x2="184" y2="118"/>
<path d="M177 118 L191 118 L188 108 L180 108 Z"/>
<path d="M176 162 Q162 168 158 178"/>
<line x1="16" y1="184" x2="304" y2="184"/>
</svg>`);
