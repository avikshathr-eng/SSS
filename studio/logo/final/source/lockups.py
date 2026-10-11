import re, sys
sys.path.insert(0,"source")
import wordmark as W
def inner(fn):
    s=open(fn).read(); return re.search(r'<title>.*?</title>(.*)</svg>',s,re.S).group(1)
L=W.layout()
cols={"ink":("#0E1824","#6b6f75"),"ivory":("#F2EBDD","#9aa3ad"),"black":("#000","#000"),"white":("#fff","#fff")}
for k,(fg,sub) in cols.items():
    m=inner(f"production/mark-{k}.svg")
    l1=W.line1(L,292,122); l2=W.line2(L,294,170)
    h=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="24 22 800 212" role="img"><title>Structure and Sky Studios</title><g>{m}</g><path fill="{fg}" d="{l1}"/><path fill="{sub}" d="{l2}"/></svg>'
    open(f"lockups/lockup-horizontal-{k}.svg","w").write(h)
    x1=324-L["w1"]/2; x2=324-L["w2"]/2
    s=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="36 22 576 392" role="img"><title>Structure and Sky Studios</title><g transform="translate(192 0)">{m}</g><path fill="{fg}" d="{W.line1(L,x1,328)}"/><path fill="{sub}" d="{W.line2(L,x2,380)}"/></svg>'
    open(f"lockups/lockup-stacked-{k}.svg","w").write(s)
m=inner("production/mark-white.svg"); sm=inner("production/mark-small-white.svg")
open("video/watermark-white.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><title>Watermark</title><g opacity=".6">{m}</g></svg>')
open("video/watermark-small-white.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><title>Watermark small</title><g opacity=".6">{sm}</g></svg>')
open("video/watermark-lockup-white.svg","w").write(open("lockups/lockup-horizontal-white.svg").read().replace('<g>','<g opacity=".6">',1).replace('<path fill="#fff" d=','<path opacity=".6" fill="#fff" d=').replace('<title>Structure and Sky Studios</title>','<title>Watermark lockup</title>'))
