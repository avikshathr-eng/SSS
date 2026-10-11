import re
def inner(fn):
    s=open(fn).read(); return re.search(r'<title>.*?</title>(.*)</svg>',s,re.S).group(1)
def mark(k,w,extra=""): return f'<svg viewBox="0 0 256 256" width="{w}" {extra}>{inner(f"production/mark-{k}.svg")}</svg>'
def small(k,w): return f'<svg viewBox="0 0 256 256" width="{w}">{inner(f"production/mark-small-{k}.svg")}</svg>'
def lock(k,w): return f'<svg viewBox="24 22 800 212" width="{w}">{inner(f"lockups/lockup-horizontal-{k}.svg")}</svg>'
# document header (A4 @300dpi) for invoices / fee proposals
li=inner("lockups/lockup-horizontal-ink.svg")
open("documents/document-header-ink.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2480 340"><title>Document header</title><svg x="160" y="46" width="1040" height="275.6" viewBox="24 22 800 212">{li}</svg><rect x="160" y="330" width="2160" height="3" fill="#C8A064"/></svg>')
html=f'''<!doctype html><html><head><meta charset="utf-8"><title>Structure and Sky Studios - Logo Usage Guide</title><style>
@page{{size:A4 landscape;margin:0}}*{{box-sizing:border-box}}body{{margin:0;width:1123px;height:794px;background:#F4EEE3;color:#0E1824;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;line-height:1.45;padding:34px 40px}}
h1{{font-size:12px;letter-spacing:.28em;margin:0}}h2{{font-size:9.5px;letter-spacing:.2em;color:#A87C3E;margin:0 0 8px;text-transform:uppercase}}
.top{{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #C8A064;padding-bottom:12px;margin-bottom:16px}}
.grid{{display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:22px}}.tile{{border-radius:8px;display:flex;align-items:center;justify-content:center;padding:12px}}
.row{{display:flex;gap:8px;margin-bottom:8px}}.l{{background:#fff}}.d{{background:#0E1824}}.b{{background:#C8A064}}.cap{{font-size:9px;color:#6b6f75;margin-top:3px}}
.sw{{display:flex;align-items:center;gap:8px;margin-bottom:5px}}.sw i{{width:26px;height:26px;border-radius:5px;border:1px solid #0001;flex:none}}.sw b{{display:block;font-size:10.5px}}.sw span{{font-size:9px;color:#6b6f75}}
ul{{margin:0;padding-left:14px}}li{{margin-bottom:3px}}.no{{position:relative}}.no:after{{content:"";position:absolute;inset:0;background:linear-gradient(to top right,transparent 47%,#c0392b 48%,#c0392b 52%,transparent 53%)}}
</style></head><body>
<div class="top"><div>{lock("ink",330)}</div><div style="text-align:right"><h1>LOGO USAGE GUIDE</h1><div class="cap">Version 1.0 &middot; October 2026</div></div></div>
<div class="grid"><div>
<h2>The logo</h2><p style="margin:0 0 10px">A building seen before it exists: floors, a lifted roof, and a drone dot on an open orbit. Use the master mark wherever it can be 32 px / 9 mm tall or larger. Below that, use the small cut.</p>
<div class="row"><div class="tile l" style="flex:1;border:1px solid #0001">{mark("ink",92)}</div><div class="tile d" style="flex:1">{mark("ivory",92)}</div></div>
<div class="row"><div class="tile l" style="flex:1;border:1px solid #0001">{mark("black",70)}</div><div class="tile b" style="flex:1">{mark("black",70)}</div><div class="tile d" style="flex:1">{mark("white",70)}</div></div>
<div class="cap">Master on light &middot; master on dark &middot; one-colour black / on brass / white</div>
<div class="row" style="margin-top:10px;align-items:flex-end"><div class="tile l" style="flex:1;border:1px solid #0001;gap:16px">{small("ink",48)}{small("ink",24)}{small("ink",16)}</div></div>
<div class="cap">Small cut: 4 floors, no orbit. For favicons and sizes under 32 px.</div></div>
<div><h2>Clear space and size</h2>
<div class="tile l" style="border:1px solid #0001;padding:24px"><div style="outline:1.5px dashed #C8A064;padding:33px;position:relative;line-height:0">{mark("ink",150)}</div></div>
<div class="cap">Keep clear space on every side equal to one sixth of the mark height (about the height of the lifted roof). Nothing enters it.</div>
<ul style="margin-top:8px"><li>Master mark: minimum 32 px / 9 mm tall</li><li>Small cut: 16 px / 5 mm tall</li><li>Horizontal lockup: minimum 120 px / 30 mm wide</li><li>Stacked lockup: minimum 90 px / 24 mm wide</li></ul>
<h2 style="margin-top:12px">Over renders and video</h2>
<ul><li>Use the one-colour white mark at 60% opacity</li><li>Bottom-right corner, margin 4% of frame width</li><li>Under 64 px tall, use the small cut</li><li>Never over faces or the building being shown</li></ul></div>
<div><h2>Colour</h2>
<div class="sw"><i style="background:#0E1824"></i><div><b>Ink #0E1824</b><span>RGB 14 24 36 &middot; CMYK ~61 33 0 86</span></div></div>
<div class="sw"><i style="background:#F2EBDD"></i><div><b>Ivory #F2EBDD</b><span>RGB 242 235 221 &middot; CMYK ~0 3 9 5</span></div></div>
<div class="sw"><i style="background:#C8A064"></i><div><b>Brass #C8A064</b><span>RGB 200 160 100 &middot; CMYK ~0 20 50 22</span></div></div>
<div class="sw"><i style="background:#A87C3E"></i><div><b>Deep brass #A87C3E</b><span>Brass on light backgrounds &middot; CMYK ~0 26 63 34</span></div></div>
<div class="sw"><i style="background:#6b6f75"></i><div><b>Slate #6B6F75</b><span>Secondary text &middot; CMYK ~0 0 0 65</span></div></div>
<div class="cap">CMYK values are straight conversions. Proof before printing; pick Pantone matches by eye.</div>
<h2 style="margin-top:12px">Please don't</h2>
<div class="row" style="flex-wrap:wrap">
<div class="tile l no" style="width:92px;height:70px;border:1px solid #0001"><div style="transform:scaleX(1.7);line-height:0">{mark("ink",44)}</div></div>
<div class="tile l no" style="width:92px;height:70px;border:1px solid #0001">{mark("ink",44,'style="filter:hue-rotate(160deg) saturate(3)"')}</div>
<div class="tile l no" style="width:92px;height:70px;border:1px solid #0001">{mark("ink",44,'style="transform:rotate(25deg)"')}</div>
<div class="tile l no" style="width:92px;height:70px;border:1px solid #0001">{mark("ink",44,'style="filter:drop-shadow(3px 4px 3px #0008)"')}</div></div>
<div class="cap">Stretch &middot; recolour &middot; rotate &middot; add shadows or effects. Also: don't move the dot off its orbit, don't outline the mark, don't change the weights in the wordmark, don't put the master on busy images (use one-colour).</div>
<h2 style="margin-top:12px">Motion</h2><ul><li>Intro plays once, about 5 seconds; don't speed it up</li><li>End on the still logo</li><li>Reduced-motion viewers get the still logo</li></ul></div></div>
</body></html>'''
open("guide/logo-usage-guide.html","w",encoding="utf-8").write(html)
