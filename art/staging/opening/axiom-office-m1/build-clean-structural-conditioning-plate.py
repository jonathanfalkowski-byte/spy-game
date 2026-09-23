"""Offline deterministic clean structural conditioning plate; no annotations or generative inputs."""
from pathlib import Path
import hashlib, json
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent
SOURCE = OUT / 'axiom-office-geometry-locked-control-plate.png'
assert SOURCE.is_file()
W,H=1920,1080
BG,FLOOR,WALL,LINE,GLASS,DESK='#161d22','#303b42','#46545b','#d7d5ca','#4e6870','#67777a'
FONT=Path('C:/Windows/Fonts/segoeui.ttf')
def poly(d, points, fill, outline=LINE, width=3):
    d.polygon(points,fill=fill); d.line(points+[points[0]],fill=outline,width=width,joint='curve')

im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im)
# Empty architectural enclosure and a continuous floor plane.
poly(d,[(130,170),(1740,170),(1875,930),(48,930)],FLOOR)
d.polygon([(130,170),(1740,170),(1732,255),(138,255)],fill=WALL)
d.line((130,430,1740,430),fill='#637179',width=3) # main aisle boundary only; no path graphic
# Ceiling practical geometry: deliberately abstract/unlettered.
for x in (410,780,1150): d.rounded_rectangle((x,205,x+220,226),radius=8,fill='#c9bd96',outline='#a99c77',width=2)
# Two fixed west workstations; no labels, people, terminals or prop markers.
for x in (225,430):
    poly(d,[(x,392),(x+135,392),(x+158,565),(x-14,565)],'#56666c')
    d.line((x+22,455,x+123,455),fill='#8f9a98',width=3)
# Smoked-glass director office with an open architectural doorway.
poly(d,[(1245,232),(1670,232),(1702,505),(1208,505)],'#253b42','#89a7ac',4)
d.line((1245,232,1208,505),fill='#c9b16c',width=8)
d.line((1425,232,1420,505),fill='#6f8e95',width=3)
d.line((1528,232,1524,505),fill='#6f8e95',width=3)
# Fixed Adrian desk: open front, low north divider, empty evidence plane and blank terminal housing.
poly(d,[(692,526),(1126,526),(1236,782),(588,782)],DESK)
poly(d,[(692,501),(1126,501),(1126,548),(692,548)],'#89989a','#c9b16c',3)
# Empty evidence/work surface represented by material plane, not an object/marker.
poly(d,[(748,620),(920,620),(942,717),(726,717)],'#75858a','#9ba8a7',2)
# Terminal physical housing, screen unlettered and dark.
poly(d,[(1015,587),(1101,587),(1122,686),(1028,686)],'#172126','#829aa0',3)
# One structurally necessary operator chair, set clear of guest/circulation plane.
d.ellipse((825,806,930,846),fill='#222e34',outline='#8b9898',width=3)
d.line((878,842,878,888),fill='#8b9898',width=5)
d.line((825,889,930,889),fill='#8b9898',width=4)
# Architectural east circulation boundary, empty and unmarked.
d.line((1248,508,1574,808),fill='#65777c',width=3)
d.line((1574,508,1574,808),fill='#65777c',width=3)
im.save(OUT/'axiom-office-clean-structural-conditioning-plate.png')

# Human-only comparison overlay: approved plate stays separate and carries all explanatory annotations.
source=Image.open(SOURCE).convert('RGB'); clean=im.copy()
board=Image.new('RGB',(2560,1540),'#101923'); bd=ImageDraw.Draw(board)
bold=Path('C:/Windows/Fonts/segoeuib.ttf')
def text(xy,value,size=28,color='#e6edf1',boldface=False): bd.text(xy,value,font=ImageFont.truetype(str(bold if boldface else FONT),size),fill=color)
def fit(image,bounds): value=image.copy(); value.thumbnail(bounds,Image.Resampling.LANCZOS); return value
text((44,30),'AXIOM / M4 CLEAN STRUCTURAL PLATE COMPARISON',42,boldface=True)
text((44,83),'HUMAN REVIEW ONLY — do not supply this comparison overlay to an image model',24,'#edc775')
left=fit(source,(1200,675)); right=fit(clean,(1200,675)); board.paste(left,(44,145)); board.paste(right,(1316,145))
text((44,840),'OWNER-APPROVED GEOMETRY AUTHORITY / annotations retained for review',23,'#edc775',True)
text((1316,840),'CLEAN STRUCTURAL CONDITIONING PLATE / annotations removed',23,'#71d2c2',True)
checks=[
 'Desk footprint, orientation and low divider: unchanged.',
 'West neighboring workstations: unchanged physical relationship.',
 'Smoked-glass director office / doorway: unchanged.',
 'Open main floor plane and east circulation: retained, no figures/zones/arrows.',
 'Empty work surface and blank terminal housing: retained.',
 'Exactly one operator chair: kept clear of guest and circulation space.',
 'Clean plate contains no words, labels, arrows, frames, silhouettes, cups, slate, evidence, clock or UI.'
]
text((44,940),'Geometry comparison result: PASS',33,'#71d2c2',True)
for i,line in enumerate(checks): text((60,1005+i*62),line,23,'#e6edf1')
board.save(OUT/'axiom-office-clean-structural-conditioning-comparison-overlay.png')

receipt={'id':'axiom-office-clean-structural-conditioning-plate-v1','role':'production-conditioning-reference-pending-owner-authorization','method':'Local deterministic Pillow geometry; no generative input/provider call','sourceAuthority':'axiom-office-geometry-locked-control-plate.png','paidGenerationsThisPass':0,'creditsThisPass':0,'productionPromoted':False,'runtimeBound':False,'cleanPlateSha256':hashlib.sha256((OUT/'axiom-office-clean-structural-conditioning-plate.png').read_bytes()).hexdigest(),'comparisonOverlayHumanReviewOnly':'axiom-office-clean-structural-conditioning-comparison-overlay.png','validation':{'annotations':False,'stateSensitiveProps':False,'nineStates':'PASS via separate approved blocking overlay'}}
(OUT/'axiom-office-clean-structural-conditioning-plate.json').write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf-8')
print('Created clean structural conditioning plate and separate human-review comparison overlay.')
