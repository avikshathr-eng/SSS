import re
def inner(fn):
    s=open(fn).read(); return re.search(r'<title>.*?</title>(.*)</svg>',s,re.S).group(1)
def mark(k,w): return f'<svg viewBox="0 0 256 256" width="{w}">{inner(f"production/mark-{k}.svg")}</svg>'
def small(k,w): return f'<svg viewBox="0 0 256 256" width="{w}">{inner(f"production/mark-small-{k}.svg")}</svg>'
def lock(k,w,vb="24 22 800 212",f="lockups/lockup-horizontal-%s.svg"): return f'<svg viewBox="{vb}" width="{w}">{inner(f%k)}</svg>'
h=f'''<!doctype html><meta charset="utf-8"><title>Structure and Sky Studios - Logo Sheet</title><style>
body{{margin:0;background:#EDE7DC;font-family:'Segoe UI',Arial,sans-serif;color:#0E1824;padding:36px;width:1280px}}
.row{{display:flex;gap:18px;margin-bottom:18px}}.c{{border-radius:14px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;padding:22px;font-size:11px;letter-spacing:.12em}}
.l{{background:#F4EEE3}}.d{{background:#0E1824;color:#9aa3ad}}.w{{background:#fff}}.b{{background:#C8A064}}
.sw{{width:150px;height:92px;border-radius:12px;padding:12px;font-size:12px;display:flex;align-items:flex-end}}</style>
<div class="row"><div class="c l" style="width:330px">{mark("ink",250)}MASTER ON IVORY</div><div class="c d" style="width:330px">{mark("ivory",250)}MASTER ON INK</div>
<div class="c w" style="width:200px">{mark("black",150)}ONE COLOUR</div><div class="c b" style="width:200px;color:#0E1824">{mark("black",150)}ON BRASS</div></div>
<div class="row"><div class="c l" style="width:620px">{lock("ink",560)}HORIZONTAL LOCKUP</div><div class="c d" style="width:300px;flex-direction:row;gap:26px">{small("ivory",96)}{small("ivory",48)}{small("ivory",24)}{small("ivory",16)}</div>
<div class="c w" style="width:240px;flex-direction:row;gap:20px">{small("ink",96)}{small("ink",32)}{small("ink",16)}</div></div>
<div class="row"><div class="c d" style="width:360px">{lock("ivory",300,"36 22 576 392","lockups/lockup-stacked-%s.svg")}STACKED LOCKUP</div>
<div style="display:flex;gap:12px;flex-wrap:wrap;width:880px;align-content:flex-start"><div class="sw" style="background:#0E1824;color:#F2EBDD">Ink #0E1824</div><div class="sw" style="background:#F2EBDD">Ivory #F2EBDD</div><div class="sw" style="background:#C8A064">Brass #C8A064</div><div class="sw" style="background:#A87C3E;color:#fff">Deep brass #A87C3E</div><div class="sw" style="background:#6b6f75;color:#fff">Slate #6B6F75</div></div></div>'''
open("logo-sheet.html","w",encoding="utf-8").write(h)
