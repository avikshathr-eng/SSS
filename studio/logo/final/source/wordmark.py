"""Outlines the wordmark from Montserrat (SIL OFL 1.1, see source/fonts/OFL.txt). Run from the final/ folder."""
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
FONT="source/fonts/Montserrat[wght].ttf"
_cache={}
def inst(w):
    if w not in _cache: _cache[w]=instancer.instantiateVariableFont(TTFont(FONT),{"wght":w})
    return _cache[w]
def adv(font,ch): return font["hmtx"][font.getBestCmap()[ord(ch)]][0]
def width(font,text,size,track):
    s=size/font["head"].unitsPerEm; return sum(adv(font,c)*s+track for c in text)-track
def draw(font,text,size,track,x,y):
    gs=font.getGlyphSet(); cmap=font.getBestCmap(); s=size/font["head"].unitsPerEm; out=[]
    for c in text:
        g=cmap[ord(c)]; pen=SVGPathPen(gs,ntos=lambda v:f"{v:.2f}")
        gs[g].draw(TransformPen(pen,(s,0,0,-s,x,y))); out.append(pen.getCommands()); x+=adv(font,c)*s+track
    return "".join(out),x
def layout(target1=520,target2=300):
    b,l,r=inst(700),inst(300),inst(400)
    size=40; tr=.1
    w=width(b,"STRUCTURE",size,tr*size)+tr*size+width(l," & SKY",size,tr*size)
    size=size*target1/w; t1=tr*size
    w1=width(b,"STRUCTURE",size,t1)+t1+width(l," & SKY",size,t1)
    size2=size*.46; w0=width(r,"STUDIOS",size2,0); t2=(target2-w0)/6
    return dict(b=b,l=l,r=r,size=size,t1=t1,w1=w1,size2=size2,t2=t2,w2=target2)
def line1(L,x,y):
    d1,xe=draw(L["b"],"STRUCTURE",L["size"],L["t1"],x,y)
    d2,_=draw(L["l"]," & SKY",L["size"],L["t1"],xe+L["t1"],y); return d1+d2
def line2(L,x,y): return draw(L["r"],"STUDIOS",L["size2"],L["t2"],x,y)[0]
if __name__=="__main__":
    L=layout(); print(round(L["size"],1),round(L["w1"],1))
