"""Create deterministic, human-only M4 comparison and leakage review board."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT=Path(__file__).resolve().parent.parent
M4=OUT/'axiom-opening-office-master-v1-m4-multireference.png'
CLEAN=OUT/'axiom-office-clean-structural-conditioning-plate.png'
STATES=OUT/'axiom-office-geometry-locked-nine-state-blocking-board.png'
for item in (M4,CLEAN,STATES): assert item.is_file(),item
FONT=Path('C:/Windows/Fonts/segoeui.ttf'); BOLD=Path('C:/Windows/Fonts/segoeuib.ttf')
def font(size,bold=False): return ImageFont.truetype(str(BOLD if bold else FONT),size)
def fit(image,bounds): value=image.copy(); value.thumbnail(bounds,Image.Resampling.LANCZOS); return value
def text(d,xy,value,size=24,color='#e6edf1',bold=False): d.text(xy,value,font=font(size,bold),fill=color)
m4=Image.open(M4).convert('RGB'); clean=Image.open(CLEAN).convert('RGB'); states=Image.open(STATES).convert('RGB')
assert m4.size==(1920,1080)
board=Image.new('RGB',(2560,2480),'#101923'); d=ImageDraw.Draw(board)
text(d,(44,28),'EVE / AXIOM M4 MULTI-REFERENCE REVIEW',43,bold=True)
text(d,(44,88),'HUMAN REVIEW ONLY — M4 is staging and not promoted or runtime-bound',25,'#edc775')
panel=fit(m4,(1450,816)); board.paste(panel,(44,145)); sx=panel.width/m4.width; sy=panel.height/m4.height
markers=[('Evelynn / gala leak',(1610,265)),('wine glass',(1400,520)),('gala gown',(1630,600)),('paperwork',(850,640)),('chair clutter',(820,690)),('frontal meeting table',(960,570))]
for label,(x,y) in markers:
    px=44+int(x*sx); py=145+int(y*sy); d.ellipse((px-14,py-14,px+14,py+14),fill='#ff9696',outline='#101923',width=2); text(d,(px+20,py-14),label,18,'#ff9696',True)
text(d,(44,980),'M4 master: style-reference subject and gala content leak directly into the empty office environment.',22,'#ff9696')
clean_panel=fit(clean,(930,523)); board.paste(clean_panel,(1570,145)); text(d,(1570,690),'Clean structural authority / reference 1',21,'#71d2c2',True)

text(d,(44,1045),'Fourteen-point structural result',32,'#edc775',True)
points=[
 ('1 desk footprint','BLOCKING DRIFT','replaced by frontal meeting table'),('2 desk orientation','BLOCKING DRIFT','structural desk orientation lost'),
 ('3 divider','BLOCKING DRIFT','low divider absent'),('4 guest zone','BLOCKING DRIFT','occupied/undefined by meeting furniture'),
 ('5 common floor plane','BLOCKING DRIFT','chairs and table obstruct circulation'),('6 Daniel workstation','BLOCKING DRIFT','west workstation relationship absent'),
 ('7 Daniel route','BLOCKING DRIFT','no clean route to Adrian desk'),('8 Benton route','BLOCKING DRIFT','director relationship and stopping space absent'),
 ('9 Maya coffee blocking','BLOCKING DRIFT','wine glass/person replaces state-safe empty zone'),('10 smoked-glass office','MINOR DRIFT','glass appears but not locked director-office relationship'),
 ('11 evidence surface','BLOCKING DRIFT','paperwork occupies table; required empty surface lost'),('12 terminal','MINOR DRIFT','terminal exists but is displaced/secondary'),
 ('13 anchor A','BLOCKING DRIFT','composition is a meeting-table/gala-character shot'),('14 anchor B','BLOCKING DRIFT','no stable same-pixel evidence crop')]
for i,(name,status,reason) in enumerate(points):
    col=i%2; row=i//2; x=44+col*1230; y=1105+row*112; color='#ff9696' if status=='BLOCKING DRIFT' else '#ffba80'
    text(d,(x,y),f'{name} — {status}',19,color,True); text(d,(x,y+31),reason,17,'#c6d4da')

states_panel=fit(states,(960,540)); board.paste(states_panel,(44,1905)); text(d,(1055,1905),'Nine-state reuse and style-leak result',30,'#edc775',True)
for i,line in enumerate([
 '1–9: BLOCKED BY CURRENT MASTER.',
 'Fixed furniture, scale and geometry cannot be preserved: M4 replaces the',
 'control-plate desk, divider, workstations and circulation with a meeting table',
 'and chairs. State-safe reuse is also impossible because a person, wine glass',
 'and paperwork are baked into the base.',
 'Style reference leakage: MATERIAL FAILURE. Evelynn, her gala gown, jewellery,',
 'gala pose/portrait framing and drink leaked despite the style-only instruction.',
 'Classification: REJECT — do not promote, bind, or automatically generate again.'
]): text(d,(1055,1965+i*55),line,22,'#ff9696' if i in (0,5,7) else '#e6edf1',i in (0,5,7))
board.save(OUT/'axiom-opening-office-master-v1-m4-multireference-review-board.png')
print('Created M4 human-only structural and style-leakage review board.')
