import math
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
cx=128; dx=56*math.cos(math.radians(30)); dy=28; T=12; PITCH=19; N=6; Y0=188; CY,RX,RY=170,92,22; LIFT=34
def chev(y,t): return Polygon([(cx-dx,y),(cx,y+dy),(cx+dx,y),(cx+dx,y+t),(cx,y+dy+t),(cx-dx,y+t)])
def arcpoly(n=140):
    c=[(cx+RX*math.cos(math.radians(-25+230*i/n)),CY+RY*math.sin(math.radians(-25+230*i/n)),i/n) for i in range(n+1)];L=[];R=[]
    for i,(x,y,s) in enumerate(c):
        a=c[max(i-1,0)];b=c[min(i+1,n)];tx,ty=b[0]-a[0],b[1]-a[1];m=math.hypot(tx,ty);nx,ny=-ty/m,tx/m
        w=(1.2+9*math.sin(math.pi*s)**1.1)/2;L.append((x+nx*w,y+ny*w));R.append((x-nx*w,y-ny*w))
    return Polygon(L+R[::-1]).buffer(0)
def d(g):
    g=g.simplify(0.08,preserve_topology=True)
    out=[]
    geoms=g.geoms if hasattr(g,'geoms') else [g]
    for p in geoms:
        for ring in [p.exterior,*p.interiors]:
            pts=list(ring.coords)[:-1]; out.append("M"+"L".join(f"{x:.2f} {y:.2f}" for x,y in pts)+"Z")
    return "".join(out)
def ring(poly,w): return poly.buffer(w/2,join_style=2,mitre_limit=10).difference(poly.buffer(-w/2,join_style=2,mitre_limit=10))
ytop=Y0-PITCH*(N-1)
lid=Polygon([(cx-dx,ytop-LIFT),(cx,ytop-LIFT-dy),(cx+dx,ytop-LIFT),(cx,ytop-LIFT+dy)])
arc=arcpoly(); floors=unary_union([chev(Y0-PITCH*i,T) for i in range(N)]).difference(arc.buffer(3.5))
dot=(cx+RX*math.cos(math.radians(-37)),CY+RY*math.sin(math.radians(-37)))
main=unary_union([floors,arc,ring(lid,7)])
# small cut
Y2,P2,T2,N2=172,34,20,4; yt=Y2-P2*(N2-1)
lid2=Polygon([(cx-dx,yt-32),(cx,yt-32-dy),(cx+dx,yt-32),(cx,yt-32+dy)])
small=unary_union([chev(Y2-P2*i,T2) for i in range(N2)]+[ring(lid2,13)])
def svg(body,title): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img"><title>{title}</title>{body}</svg>'
cols={"ink":("#0E1824","#C8A064"),"ivory":("#F2EBDD","#C8A064"),"black":("#000","#000"),"white":("#fff","#fff"),"brass":("#C8A064","#C8A064")}
for k,(fg,dc) in cols.items():
    open(f"production/mark-{k}.svg","w").write(svg(f'<path fill="{fg}" fill-rule="evenodd" d="{d(main)}"/><circle cx="{dot[0]:.2f}" cy="{dot[1]:.2f}" r="6" fill="{dc}"/>',"Structure and Sky Studios"))
    open(f"production/mark-small-{k}.svg","w").write(svg(f'<path transform="translate(0 16)" fill="{fg}" fill-rule="evenodd" d="{d(small)}"/>',"Structure and Sky Studios (small)"))
print(len(d(main)))
