import math
cx=128; dx=56*math.cos(math.radians(30)); dy=28; T=12; PITCH=19; N=6; Y0=188
CY,RX,RY=170,92,22
def f(v): return f"{v:.1f}"
def poly(pts): return "M"+"L".join(f"{f(x)} {f(y)}" for x,y in pts)+"Z"
floors="".join(poly([(cx-dx,y),(cx,y+dy),(cx+dx,y),(cx+dx,y+T),(cx,y+dy+T),(cx-dx,y+T)]) for y in [Y0-PITCH*i for i in range(N)])
ytop=Y0-PITCH*(N-1); lift=34
lid=[(cx-dx,ytop-lift),(cx,ytop-lift-dy),(cx+dx,ytop-lift),(cx,ytop-lift+dy)]
def arc(n=90):
    c=[];
    for i in range(n+1):
        s=i/n; a=math.radians(-25+230*s); c.append((cx+RX*math.cos(a),CY+RY*math.sin(a),s))
    L=[];R=[]
    for i,(x,y,s) in enumerate(c):
        a=c[max(i-1,0)];b=c[min(i+1,n)];tx,ty=b[0]-a[0],b[1]-a[1];m=math.hypot(tx,ty);nx,ny=-ty/m,tx/m
        w=(1.2+9*math.sin(math.pi*s)**1.1)/2
        L.append((x+nx*w,y+ny*w));R.append((x-nx*w,y-ny*w))
    return poly(L+R[::-1])
A=arc(); dot=(cx+RX*math.cos(math.radians(-37)),CY+RY*math.sin(math.radians(-37)))
def svg(fg,dotc,vb="0 0 256 256",extra="",title="Structure and Sky Studios"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img"><title>{title}</title>
<defs><mask id="k" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"><rect width="256" height="256" fill="#fff"/><path d="{A}" fill="#000" stroke="#000" stroke-width="7" stroke-linejoin="round"/></mask></defs>
<g fill="{fg}"><path mask="url(#k)" d="{floors}"/><path d="{A}"/></g>
<path d="{poly(lid)}" fill="none" stroke="{fg}" stroke-width="7" stroke-linejoin="miter"/>
<circle cx="{f(dot[0])}" cy="{f(dot[1])}" r="6" fill="{dotc}"/>{extra}</svg>'''
INK,IVO,BR="#0E1824","#F2EBDD","#C8A064"
def lockup(fg,dotc,sub):
    t=f'''<text x="292" y="124" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-size="46" letter-spacing="5" fill="{fg}"><tspan font-weight="700">STRUCTURE</tspan><tspan font-family="'Segoe UI Light','Segoe UI'" font-weight="300"> &amp; SKY</tspan></text><text x="294" y="172" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif" font-size="21" letter-spacing="21" fill="{sub}">STUDIOS</text>'''
    return svg(fg,dotc,"0 0 900 256",t)
open("mark-ink.svg","w").write(svg(INK,BR)); open("mark-ivory.svg","w").write(svg(IVO,BR))
open("mark-black.svg","w").write(svg("#000","#000")); open("mark-white.svg","w").write(svg("#fff","#fff"))
open("lockup-ink.svg","w").write(lockup(INK,BR,"#6b6f75")); open("lockup-ivory.svg","w").write(lockup(IVO,BR,"#9aa3ad"))
print(round(ytop-lift-dy),round(Y0+dy+T))
# small-size cut: 4 heavier floors, thick roof, no arc
T2=20;P2=34;N2=4;Y2=172
fl="".join(poly([(cx-dx,y),(cx,y+dy),(cx+dx,y),(cx+dx,y+T2),(cx,y+dy+T2),(cx-dx,y+T2)]) for y in [Y2-P2*i for i in range(N2)])
yt=Y2-P2*(N2-1); lp=[(cx-dx,yt-32),(cx,yt-32-dy),(cx+dx,yt-32),(cx,yt-32+dy)]
for name,fg in (("black","#000"),("ink",INK),("ivory",IVO)):
    open(f"mark-small-{name}.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img"><title>Structure and Sky Studios (small)</title><g transform="translate(0 16)"><path fill="{fg}" d="{fl}"/><path d="{poly(lp)}" fill="none" stroke="{fg}" stroke-width="13" stroke-linejoin="miter"/></g></svg>')
