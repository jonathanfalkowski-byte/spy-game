"""Offline deterministic Axiom geometry control plate; no source images or provider access."""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
ROOT = Path(__file__).resolve().parents[4]
assert (ROOT / 'docs/art/AXIOM_OFFICE_PRODUCTION_PACKAGE.md').is_file()
assert (Path(__file__).resolve().parent / 'office-geometry.png').is_file()

W, H = 1920, 1080
BG, FLOOR, WALL, INK, MUTED = '#101923', '#263642', '#344a58', '#edf3f5', '#b2c4cd'
GOLD, TEAL, RED, GLASS, DESK = '#efc875', '#78d2c2', '#ff9696', '#315461', '#526f7f'
FONT = Path('C:/Windows/Fonts/segoeui.ttf'); BOLD = Path('C:/Windows/Fonts/segoeuib.ttf')
def font(size, bold=False): return ImageFont.truetype(str(BOLD if bold else FONT), size)
def text(d, xy, value, size=24, color=INK, bold=False): d.text(xy, value, font=font(size, bold), fill=color)
def polygon(d, points, fill, outline=None, width=2): d.polygon(points, fill=fill); outline and d.line(points + [points[0]], fill=outline, width=width, joint='curve')
def box(d, xy, value, fill='#1e303b', color=INK, width=2, size=20):
    d.rounded_rectangle(xy, radius=9, fill=fill, outline=color, width=width); text(d, (xy[0]+11, xy[1]+8), value, size, color)
def arrow(d, start, end, color=GOLD, width=5):
    d.line((start, end), fill=color, width=width)
    x, y = end; d.polygon([(x,y),(x-15,y-8),(x-15,y+8)], fill=color)
def person(d, x, y, label, color=TEAL, scale=1.0):
    r = int(16*scale); d.ellipse((x-r,y-r,x+r,y+r), fill=BG, outline=color, width=3)
    d.line((x,y+r,x,y+r+int(25*scale)), fill=color, width=3)
    d.line((x-int(12*scale),y+r+int(11*scale),x+int(12*scale),y+r+int(11*scale)), fill=color, width=3)
    text(d, (x+r+7,y-r), label, 17, color, True)

def shell(title, subtitle):
    im = Image.new('RGB', (W,H), BG); d = ImageDraw.Draw(im)
    text(d,(42,28),title,38,INK,True); text(d,(42,78),subtitle,21,GOLD)
    return im,d

def room(d, labels=True, silhouettes=(), props=(), show_cameras=False):
    # Single fixed perspective/floor coordinate system shared by every output.
    polygon(d, [(130,190),(1735,190),(1870,915),(55,915)], FLOOR, MUTED, 3)
    d.line((130,430,1735,430), fill='#54707e', width=3) # north main aisle
    d.line((970,190,970,915), fill='#405965', width=2)
    # west workstations: Daniel is two desks over, shown as two fixed work surfaces.
    for x, name in ((230,'Daniel desk'),(425,'Between')):
        polygon(d, [(x,385),(x+135,385),(x+160,570),(x-15,570)], '#395463', MUTED)
        d.rectangle((x+40,426,x+108,468), fill=BG, outline=TEAL, width=2)
        labels and text(d,(x+8,575),name,16,TEAL)
    # director office, visible smoked glass and open door toward main aisle.
    polygon(d, [(1245,235),(1670,235),(1700,505),(1208,505)], '#18303c', GLASS, 4)
    d.line((1245,235,1208,505), fill=GOLD, width=8)
    d.line((1245,235,1670,235), fill=GOLD, width=5)
    d.line((1425,235,1420,505), fill=GLASS, width=3)
    labels and text(d,(1305,260),'Director office / smoked glass',19,GOLD,True)
    labels and text(d,(1175,510),'open door',17,GOLD)
    # Adrian desk stays constant; deliberately open front, low divider at north/back edge.
    polygon(d, [(695,525),(1125,525),(1235,780),(590,780)], DESK, INK, 3)
    polygon(d, [(695,500),(1125,500),(1125,548),(695,548)], '#6b8992', GOLD, 3)
    labels and text(d,(735,556),'LOW DIVIDER / Daniel lean edge',17,GOLD,True)
    # terminal east side facing west, evidence and coffee surfaces stay clear.
    polygon(d, [(1015,590),(1100,590),(1120,684),(1028,684)], BG, TEAL, 3)
    labels and text(d,(1030,689),'blank terminal\nfaces west',15,TEAL)
    polygon(d, [(760,620),(895,620),(915,713),(740,713)], '#6a8390', TEAL, 3)
    labels and text(d,(720,720),'stable evidence / slate surface',15,TEAL)
    d.ellipse((920,638,948,666), outline=GOLD, width=3); labels and text(d,(918,675),'coffee-safe',15,GOLD)
    # character plane and named zones
    d.rounded_rectangle((735,440,975,520), radius=13, outline=TEAL, width=3)
    labels and text(d,(748,452),'guest / NPC standing zone',17,TEAL,True)
    d.rounded_rectangle((1260,510,1570,810), radius=14, outline=TEAL, width=3)
    labels and text(d,(1280,532),'east compliance route',18,TEAL,True)
    arrow(d,(1210,430),(1000,470),GOLD); labels and text(d,(1070,400),'Benton approach',17,GOLD)
    arrow(d,(1560,690),(990,480),TEAL); labels and text(d,(1430,715),'Maya in/out',17,TEAL)
    labels and text(d,(64,875),'CONTINUOUS COMMON FLOOR PLANE — no furniture in character circulation',20,INK,True)
    for name,x,y in silhouettes: person(d,x,y,name,TEAL)
    for name,x,y in props:
        d.rectangle((x-17,y-11,x+17,y+11), fill=GOLD, outline=INK, width=2); text(d,(x+23,y-12),name,15,GOLD)
    if show_cameras:
        d.ellipse((380,815,414,849), fill=GOLD); text(d,(425,817),'A / eye-level southwest master',18,GOLD,True)
        d.line((397,832,670,525), fill=GOLD, width=3); d.line((397,832,1210,525), fill=GOLD, width=3)
        d.rectangle((700,545,1150,775), outline=GOLD, width=4); text(d,(712,784),'B / same-pixel work-evidence crop',18,GOLD,True)

# A: perspective control plate.
im,d = shell('AXIOM / GEOMETRY-LOCKED CONTROL PLATE','STAGING BLOCKING AUTHORITY — deterministic coordinates; not final art')
room(d, show_cameras=False)
box(d,(1435,82,1865,302),'M1 LOCKS',fill='#1c2b34',color=GOLD,size=18)
for i,line in enumerate(['desk + low divider','smoked-glass director door','Daniel two desks west','Benton + Maya routes','blank terminal / evidence plane']): text(d,(1455,176+i*31),line,17,GOLD)
im.save(OUT/'axiom-office-geometry-locked-control-plate.png')

# B: same room with anchor overlays.
im,d = shell('AXIOM / CAMERA-ANCHOR OVERLAY','A is the interaction master; B is a same-pixel crop, never a second invented viewpoint')
room(d, show_cameras=True)
box(d,(55,105,595,175),'ANCHOR A: preserve director entry, Daniel desks, low divider, guest zone and compliance lane',fill='#1c2b34',color=GOLD,size=17)
box(d,(55,185,595,255),'ANCHOR B: crop desk + blank terminal + evidence surface; retain same floor plane and scale',fill='#1c2b34',color=TEAL,size=17)
im.save(OUT/'axiom-office-geometry-locked-anchor-overlay.png')

# C: nine fixed-state previews.
im,d = shell('AXIOM / NINE-STATE BLOCKING BOARD','Simple labeled silhouettes only — constant geometry, furniture, scale and floor plane across all panels')
states = [
 ('1 Daniel waits',[('DANIEL',470,465)],[]),
 ('2 Daniel / Adrian',[('ADRIAN',820,468),('DANIEL',700,468)],[]),
 ('3 Benton slate',[('ADRIAN',820,468),('BENTON',930,468)],[('slate',930,585)]),
 ('4 Slate awake',[('ADRIAN',820,468)],[('awake slate',820,650)]),
 ('5 Evidence hold',[('ADRIAN',820,468)],[('evidence',820,650)]),
 ('6 Submitted',[('ADRIAN',820,468)],[('sent mask',1065,640)]),
 ('7 Maya coffee',[('ADRIAN',820,468),('MAYA',900,468)],[('desk cup',925,650),('Maya cup',900,520)]),
 ('8 Maya departs',[('ADRIAN',820,468),('MAYA',1390,635)],[('Adrian cup',925,650),('Maya cup',1390,690)]),
 ('9 Alone sip',[('ADRIAN',820,468)],[('held cup',850,520)]),
 ]
for i,(name,chars,props) in enumerate(states):
    col=i%3; row=i//3; x=34+col*625; y=135+row*292
    tile=Image.new('RGB',(590,260),BG); td=ImageDraw.Draw(tile)
    # mini scale mapping keeps all room positions invariant.
    td.rounded_rectangle((4,4,586,256),radius=10,outline=MUTED,width=2)
    td.polygon([(30,52),(555,52),(575,225),(15,225)],fill=FLOOR,outline=MUTED)
    td.rectangle((210,135,385,195),fill=DESK,outline=INK,width=2); td.rectangle((210,126,385,137),fill='#6b8992',outline=GOLD,width=2)
    td.rectangle((430,64,540,128),fill='#18303c',outline=GLASS,width=2); td.rectangle((62,105,112,148),fill='#395463',outline=TEAL,width=1); td.rectangle((130,105,180,148),fill='#395463',outline=TEAL,width=1)
    for n,px,py in chars:
        sx=int(px/1920*590); sy=int(py/1080*260); person(td,sx,sy,n,TEAL,.48)
    for n,px,py in props:
        sx=int(px/1920*590); sy=int(py/1080*260); td.rectangle((sx-7,sy-5,sx+7,sy+5),fill=GOLD); text(td,(sx+10,sy-8),n,10,GOLD)
    text(td,(15,14),name,16,INK,True); text(td,(485,14),'PASS',16,TEAL,True)
    im.paste(tile,(x,y))
im.save(OUT/'axiom-office-geometry-locked-nine-state-blocking-board.png')

receipt = {
 'id':'axiom-office-geometry-locked-control-plate-v1', 'role':'staging-blocking-authority',
 'method':'Local deterministic Pillow vector geometry and simple labeled silhouettes; no generative inputs or provider calls',
 'paidGenerationsThisPass':0, 'creditsThisPass':0, 'productionPromoted':False, 'runtimeBound':False,
 'anchors':{'A':'southwest desk-wide interaction master','B':'same-pixel desk-terminal-evidence crop'},
 'states':{str(i+1):'PASS' for i in range(9)},
 'authority':['docs/art/AXIOM_OFFICE_PRODUCTION_PACKAGE.md','art/staging/opening/axiom-office-m1/office-geometry.png','art/staging/opening/AXIOM_OFFICE_M2_RETRY_CORRECTION_PLAN.md','art/staging/opening/AXIOM_OFFICE_M2_RETRY_REVIEW.md'],
 'failedMasters':'Referenced only as failure-learning records; not used as geometry inputs.'
}
(OUT/'axiom-office-geometry-locked-control-plate.json').write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf-8')
print('Created deterministic Axiom control plate, anchor overlay, nine-state board and receipt.')
