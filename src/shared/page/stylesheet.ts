import type { Locale } from "#shared/locale/locales.ts";
import { serifStack } from "#shared/page/webfonts.ts";


export const stylesheetFor = (locale: Locale): string => `:root{
  --paper:#F3EDE2; --paper-shade:#EAE1D1; --line:#D8CCB8;
  --ink:#221B14; --ink-muted:#5C5044;
  --night-line:#463B2F; --night-muted:#C2B49D;
  --oxblood:#8F2430;
  --s5:24px;--s6:32px;--s7:48px;--s8:64px;
  --serif:${serifStack(locale)};
  --serif-sys:Georgia,serif;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font:400 17px/1.55 var(--serif)}
img{display:block;max-width:100%}
.header{background:var(--paper);border-bottom:1px solid var(--line)}
.hwrap{display:flex;justify-content:flex-end;align-items:center;padding:2px 8px;max-width:960px;margin:0 auto}
.switch{display:flex}
.switch a{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;font-size:13px;letter-spacing:.05em;color:var(--ink);text-decoration:none;font-family:var(--serif-sys)}
.switch a[aria-current]{font-weight:600;text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--oxblood)}
.night{background:var(--ink);color:var(--paper)}
.wrap{max-width:680px;margin:0 auto}
.hero{padding:var(--s7) 20px var(--s6);text-align:center}
.brand-big{margin:0}
.logo{display:block;width:100%;max-width:286px;margin:0 auto}
.logo .coin{fill:var(--paper)}
.logo .emblem{fill:var(--ink)}
.logo .letters{fill:currentColor}
.tagline{margin:26px auto 0;max-width:32ch;font-size:18px;line-height:1.55;min-height:112px}
:lang(ka) .tagline{max-width:none;font-size:17px}
.meta{margin:18px auto 0;line-height:1.5}
.meta .addr{display:block;font-size:15.5px}
.meta .hrs{display:block;margin-top:2px;font-size:14px;color:var(--night-muted)}
.meta .rate{display:block;margin-top:2px;font-size:14px;color:var(--night-muted)}
.cta{display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:24px}
.btn{display:flex;align-items:center;justify-content:center;min-height:52px;width:100%;max-width:360px;background:var(--paper);color:var(--ink);font:600 16px/1.2 var(--serif);letter-spacing:.02em;text-decoration:none;border-radius:3px;padding:8px 20px;text-align:center}
.linklight{display:inline-flex;align-items:center;min-height:44px;color:var(--paper);font-size:14px;text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--night-muted);padding:0 8px}
.vlist .linklight{padding:0}
.sec{padding:var(--s7) 20px}
.label{font-size:12.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--oxblood);margin:0}
:lang(ka) .label{letter-spacing:.1em}
.night .label{color:var(--night-muted)}
.title{margin:10px 0 0;font-size:24px;line-height:1.3;font-weight:600;overflow-wrap:break-word}
:lang(ka) .title{font-size:22px}
@media(max-width:359px){
  .tagline{font-size:16px}
  :lang(ka) .tagline{font-size:15px}
  :lang(ka) .title{font-size:19px}
}
.ph{margin:28px 0 0}
.mat{background:var(--paper-shade);border:1px solid var(--line);padding:10px}
.mat img{width:100%;height:auto}
.arched .mat img{border-radius:999px 999px 3px 3px}
.ph figcaption{margin-top:10px;font-size:14px;line-height:1.5;color:var(--ink-muted)}
.ph figcaption::before{content:"\\2014\\00a0";color:var(--oxblood)}
.menu{background:var(--paper-shade)}
.msnap{margin:6px 0 0;font-size:13.5px;color:var(--ink-muted)}
.mcard{background:var(--paper);border:1px solid var(--line);border-radius:3px;padding:18px 16px 10px;margin-top:20px}
.mcard h3{margin:0 0 4px;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--oxblood)}
:lang(ka) .mcard h3{letter-spacing:.08em}
.row{display:flex;align-items:flex-end;gap:8px;padding:9px 0;margin:0}
.row .nm{flex:0 1 auto;font-size:16px;line-height:1.45;min-width:0;overflow-wrap:break-word}
.lari{font-family:var(--serif-sys)}
.sym{font-family:var(--serif-sys)}
.row .dots{flex:1 0 20px;border-bottom:2px dotted var(--line);margin-bottom:5px}
.row .pr{flex:none;font-size:16px;font-weight:600;font-variant-numeric:tabular-nums}
.mlink{display:inline-flex;align-items:center;min-height:44px;margin-top:4px;color:var(--oxblood);font-weight:600;font-size:15px;text-decoration:underline;text-underline-offset:4px}
.vlist{margin:22px 0 0;padding:0;list-style:none}
.vlist li{padding:7px 0;font-size:15.5px;line-height:1.5}
.vk{display:block;font-size:12.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--night-muted);margin-bottom:2px}
:lang(ka) .vk{letter-spacing:.09em}
.visit .cta{align-items:flex-start;margin-top:28px}
.visit{padding-bottom:var(--s6)}
.foot{border-top:1px solid var(--night-line);padding:18px 20px 30px;font-size:12.5px;line-height:1.6;color:var(--night-muted)}
.foot p{margin:4px 0}
@media(min-width:900px){
  .hero{padding-top:var(--s8)}
  .logo{max-width:380px}
  .tagline{font-size:20px;max-width:36ch;min-height:93px}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
  .grid2 .ph{margin-top:28px}
}`;
