"""Create deterministic, staging-only M3 structural-review boards."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
M3 = OUT / 'axiom-opening-office-master-v1-m3-reference-guided.png'
CONTROL = OUT / 'axiom-office-geometry-locked-control-plate.png'
ANCHORS = OUT / 'axiom-office-geometry-locked-anchor-overlay.png'
STATES = OUT / 'axiom-office-geometry-locked-nine-state-blocking-board.png'
for item in (M3, CONTROL, ANCHORS, STATES): assert item.is_file(), item
FONT = Path('C:/Windows/Fonts/segoeui.ttf'); BOLD = Path('C:/Windows/Fonts/segoeuib.ttf')
def font(size,bold=False): return ImageFont.truetype(str(BOLD if bold else FONT),size)
def fit(image,bounds):
    value=image.copy(); value.thumbnail(bounds,Image.Resampling.LANCZOS); return value
def text(d,xy,value,size=24,color='#e6edf1',bold=False): d.text(xy,value,font=font(size,bold),fill=color)

master=Image.open(M3).convert('RGB'); control=Image.open(CONTROL).convert('RGB'); anchors=Image.open(ANCHORS).convert('RGB'); states=Image.open(STATES).convert('RGB')
assert master.size==(1920,1080)
board=Image.new('RGB',(2560,2460),'#101923'); d=ImageDraw.Draw(board)
text(d,(48,30),'EVE / AXIOM M3 REFERENCE-GUIDED REVIEW',43,bold=True)
text(d,(48,88),'STAGING REVIEW ONLY — reference guidance was used; output is not promoted or runtime-bound',25,'#edc775')

m_panel=fit(master,(1450,816)); board.paste(m_panel,(48,145))
sx=m_panel.width/master.width; sy=m_panel.height/master.height
# Mark actual M3 violations: readable labels, cup, chair clutter and layout arrows.
markers=[('readable structural labels',(1025,260)),('baked coffee cup',(930,635)),('foreground chairs',(750,650)),('baked arrows / camera text',(1040,820)),('state text / route labels',(1450,555))]
for label,(x,y) in markers:
    px=48+int(x*sx); py=145+int(y*sy); d.ellipse((px-14,py-14,px+14,py+14),fill='#ff9696',outline='#101923',width=2); text(d,(px+20,py-14),label,18,'#ff9696',True)
text(d,(48,980),'M3 master: reference-conditioned geometry appears, but its control annotations and state props were baked into the plate.',22,'#ffba80')

cp=fit(control,(930,523)); ap=fit(anchors,(930,523)); board.paste(cp,(1570,145)); board.paste(ap,(1570,705))
text(d,(1570,680),'Approved control plate / geometry authority',20,'#edc775',True)
text(d,(1570,1240),'Approved anchor authority',20,'#edc775',True)

text(d,(48,1050),'Twelve-point geometry comparison',32,'#edc775',True)
points=[
 ('1 desk footprint','MINOR DRIFT','desk exists but appears as a raised centered table rather than locked A framing'),
 ('2 low divider','PASS','low divider is visible'),
 ('3 guest zone','BLOCKING DRIFT','zone is baked as readable annotation, not reusable environment space'),
 ('4 common floor plane','BLOCKING DRIFT','multiple chairs occupy circulation / character floor plane'),
 ('5 Daniel workstation','MINOR DRIFT','two west desks appear, but chair clutter changes their usable relationship'),
 ('6 Daniel path','BLOCKING DRIFT','path is only baked arrow/text, not a clean open visual route'),
 ('7 Benton path','BLOCKING DRIFT','baked arrow/text and furniture prevent a reusable stopping proof'),
 ('8 Maya coffee blocking','BLOCKING DRIFT','coffee cup is baked into base and route is annotation text'),
 ('9 smoked-glass office/door','PASS','smoked glass office relationship is visible'),
 ('10 evidence surface','BLOCKING DRIFT','surface includes baked slate-like object / labels'),
 ('11 blank terminal','MINOR DRIFT','dark blank screen exists, but legible nearby structural text contaminates plate'),
 ('12 A / B crops','BLOCKING DRIFT','camera/route labels bake staging overlay into the proposed environment')
]
for i,(name,status,reason) in enumerate(points):
    col=i%2; row=i//2; x=48+col*1235; y=1110+row*125
    color='#71cbbb' if status=='PASS' else ('#ffba80' if status=='MINOR DRIFT' else '#ff9696')
    text(d,(x,y),f'{name} — {status}',20,color,True); text(d,(x,y+33),reason,18,'#c6d4da')

sp=fit(states,(1000,563)); board.paste(sp,(48,1890)); text(d,(1080,1890),'Nine-state reuse result',30,'#edc775',True)
for i,line in enumerate([
 '1–9: BLOCKED BY CURRENT MASTER.',
 'The base contains a baked coffee cup, readable route/camera/zone labels,',
 'arrows, and state-like evidence markers. These contaminate every reusable',
 'empty-state family; later crop/layer work cannot remove them without an',
 'unapproved structural edit. Geometry reference adherence is insufficient',
 'when the deliverable is not a clean state-safe environment plate.',
 'Classification: REJECT — no further paid generation is authorized automatically.'
]): text(d,(1080,1950+i*54),line,22,'#ff9696' if i in (0,6) else '#e6edf1',i in (0,6))
board.save(OUT/'axiom-opening-office-master-v1-m3-reference-guided-review-board.png')
print('Created M3 review-only structural comparison board.')
