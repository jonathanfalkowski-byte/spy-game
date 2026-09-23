"""Offline symbolic planning diagrams/data only. No source-image editing or provider access."""
from pathlib import Path
import csv
import hashlib
import json
import math
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent
ROOT = Path(__file__).resolve().parents[4]
assert (ROOT / 'src/content/scenes.ts').is_file()
def save_json(name, value):
    (OUT / name).write_text(json.dumps(value, indent=2, ensure_ascii=False)+'\n', encoding='utf-8', newline='\n')
def csv_file(name, rows):
    with (OUT / name).open('w', encoding='utf-8-sig', newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator='\n');w.writeheader();w.writerows(rows)

unknown = 'Not authored; no new visible placement or movement inferred'
common = dict(desk_position='Fixed proposed master; source does not assign coordinates',
              chair_position='No authored position or motion; proposed fixed chair, no sitting event asserted',
              phone_state='Recovered at security; subsequent exact location unestablished; off-frame',
              coat_state='Usual commute coat recovered; later storage/wearing unestablished; off-frame; not closet jacket',
              badge_state='Employee badge used at security; later position unestablished; no lanyard invented',
              lighting='Proposed diffuse office daylight; no authored fixture/direction or afternoon change')
chronology=[]
def beat(node,time,people,movement,slate,terminal,cups,evidence,camera,source,**overrides):
    row=dict(node=node,time_of_day=time,characters_present=people,entry_exit_direction=movement,**common,
             benton_slate=slate,helix_terminal_file=terminal,coffees=cups,evidence_state=evidence,
             camera_requirement=camera,evidence_source=source)
    row.update(overrides);chronology.append(row)
beat('commute.arrival','08:10','Adrian travelling; Daniel waiting at desk; security guards in lobby only',
     'Home > curb > tower doors > security > inner gate > elevator > floor; next action approaches desk. Compass directions unassigned.',
     'Not introduced','No Helix assignment yet','0 authored','None yet','A endpoint: Daniel waiting; Adrian outside frame, not already at desk',
     'src/content/scenes.ts:88-106',phone_state='Pocket > tray > recovered; do not duplicate',coat_state='Usual coat worn > tray > recovered; closet jacket remains separate',badge_state='Scanned at reader and inner gate; no badge restriction')
beat('office.daniel','08:11','Adrian standing; Daniel at desk/divider','Adrian has approached; Daniel waits. Daniel workstation two desks over; side not authored.',
     'Not present','No acquired case state','0 authored','Promotion news only','A + standing Adrian; hold responses','src/content/scenes.ts:110-124; src/content/dialogue.ts promotion.*')
beat('office.benton','08:14','Daniel leaves, then Adrian standing + Benton','Daniel pushes off divider and leaves; director smoked-glass door opens; Benton crosses to desk edge. Do not show simultaneous final pairings.',
     'One thin black slate carried by Benton','No shared claim of opened file before selected response','0 authored','Narrow Helix/Novagen assignment given','A: replace Daniel with Benton; intermediate walk unaddressable','src/content/scenes.ts:127-143')
beat('office.departure','08:16','Adrian; Benton returns to his office','All Benton replies place slate on desk, then Benton departs; final state no Benton',
     'On Adrian desk in every response; hand no longer holds it','Helix file wakes ON SLATE. promotion branch opens it earlier in response; no terminal transfer authored','0 authored','Deadline 12:00; distribution Benton only','A: slate surface variant, Benton absent','src/content/scenes.ts:147-155; src/content/dialogue.ts benton.obey/push/promotion')
beat('helix.brief','08:18','Adrian; Marcus is named only','No relocation/posture movement authored',
     'Desk state carries forward; not confiscated or returned','Brief opened after slate assignment; do not invent transfer','0 authored','Helix/Novagen rationale; Marcus sponsor, no proof of hidden theory','B same-camera object crop','src/content/scenes.ts:159-173')
beat('helix.documents','Casework, before 11:53','Adrian','No physical relocation',
     'No new custody event','Casework UI records; no physical paper spread','0 authored','Only records actually read; at least two before analysis','B hold; existing UI shows earned content','src/content/scenes.ts:177-185')
beat('helix.analysis','Casework, before 11:53','Adrian','Connections/hint/investigate are UI actions, not new room movement',
     'No new custody event','Same workstation, branch evidence in UI','0 authored','Read records and valid connections only; optional investigation varies','B hold; no answer illustration','src/content/scenes.ts:189-198')
beat('helix.review','11:53','Adrian','No physical move; conclusion revisable; no independent attachment-selection action',
     'No new custody event','Unsent review, not a sent confirmation','0 authored','Chosen conclusion, reviewed records and recorded connections; no fabricated correctness','B intentional hold','src/content/scenes.ts:202-208; src/ui/Casework.tsx')
beat('helix.submitted','11:54','Adrian','Completed send; no recipient physically arrives',
     'No authored removal; retain if visible','Report explicitly leaves TERMINAL, Benton only; no prior transfer animation','0 authored','Chosen conclusion with reviewed records and recorded connections; no correct-theory badge','B neutral completed-send prop/UI variant','src/content/scenes.ts:212-220; src/ui/Casework.tsx')
beat('maya.promotion','12:06','Adrian + Maya; no Daniel/Benton','Maya crosses from compliance; sets one cup beside terminal and keeps one. Final frame after placement.',
     'No authored removal; retain if visible','Submitted report; header can be seen, not details','2 total: Adrian desk 1, Maya held 1','No new shared hidden facts from mere arrival','A Maya settled with split cup custody','src/content/scenes.ts:224-234,323-337')
beat('maya.invitation','12:08','Adrian + Maya','Conversation hold; preceding deflect response slides Adrian cup closer; other responses no movement',
     'Same as previous','No new report state','2 total; Adrian cup closer ONLY after mayaPromotion.deflect','No new evidence disclosure','A hold; conditional cup transform only','src/content/scenes.ts:238-245,338-347; src/content/dialogue.ts mayaPromotion.*')
beat('maya.case','12:10','Adrian + Maya','Maya notices header from existing standing zone; no move closer authored',
     'Same as previous','Helix/Novagen header visible to Maya, details NOT visible','2; preserve completed cup position','Disclosure not selected yet; no visible secret contents','A hold with constrained screen angle/content','src/content/scenes.ts:249-262')
beat('maya.goodbye','12:11','Adrian + Maya departing','Disclosure response; yes invitation taps desk twice; then Maya lifts own cup and starts toward compliance; Adrian returns attention to terminal',
     'No new custody event','Already sent; no display of earned disclosures as physical pages','Maya takes own cup, Adrian retains 1','Only chosen disclosure known; do not illustrate hidden knowledge','A departing layer after action; no intimate touch','src/content/scenes.ts:266-270,348-376; src/content/dialogue.ts disclosure.*')
beat('ending.complete','Opening milestone; after 12:11','Adrian at desk; Maya gone from desk','Quiet desk again; Adrian takes a sip; no new relocation',
     'No removal authored; retain if still visible','Report already sent','1 retained Adrian cup, raised for sip; no extra desk duplicate','Existing decisions remain; no new result','A alone + sip layer','src/content/scenes.ts:274-286')
csv_file('chronology.csv',chronology)

shots=[]
def shot(id,nodes,treatment,anchor,state,characters,props,counts=True):
    shots.append(dict(shot_id=id,nodes=nodes,treatment=treatment,camera_anchor=anchor,visual_state=state,character_layers=characters,prop_layers=props,
                      reachable_after_future_approval_and_binding=counts,current_asset='NONE',current_runtime_art='UNBOUND / text fallback',
                      source='src/ui/scene-art.ts openingShot; src/content/scenes.ts; src/content/dialogue.ts'))
shot('opening.axiom.shot04-desk','commute.arrival','NEW COMPOSITION','A','1 Daniel waits; Adrian has not approached','Daniel','none')
shot('opening.office.shot01-daniel','office.daniel','LAYER VARIANT','A','2 completed approach','Adrian-neutral + Daniel','none')
shot('opening.office.shot01-departed','office.benton intermediate only','LAYER VARIANT','A','Unaddressable intermediate; excluded','remove Daniel; do not add Benton early','none',False)
shot('opening.office.shot02-benton','office.benton','LAYER VARIANT','A','3 Benton at desk','Adrian-neutral + Benton','slate in Benton hand')
shot('opening.office.shot03-file','office.departure','PROP VARIANT','A','4 Benton absent; slate awake','Adrian-neutral','slate on desk')
shot('opening.helix.shot01-brief','helix.brief','REUSE','B crop of A','5 workstation evidence hold','none required in crop','slate + neutral terminal')
shot('opening.helix.shot02-documents','helix.documents; helix.analysis','INTENTIONAL HOLD','B','5 reused, not new count','same crop','earned evidence in existing UI')
shot('opening.helix.shot03-review','helix.review','INTENTIONAL HOLD','B','5 reused; still unsent','same crop','selected report in UI, no sent mask')
shot('opening.helix.shot04-submitted','helix.submitted','PROP VARIANT','B','6 completed terminal send','same crop','neutral sent variant; Benton only')
shot('opening.maya.shot01-coffee','maya.promotion; maya.invitation; maya.case','LAYER VARIANT','A','7 Maya visit; optional deflect cup slide adds conditional state','Adrian-neutral + Maya-coffee','1 desk cup + 1 Maya cup; slate retained')
shot('opening.maya.shot02-departure','maya.goodbye','LAYER VARIANT','A','8 actual departure','Adrian-neutral + Maya-departing','1 Adrian cup; Maya leaves with own')
shot('opening.office.shot04-alone','ending.complete','LAYER / PROP VARIANT','A','9 alone sip','Adrian-sip; no Maya','single Adrian cup in hand; no duplicate')
csv_file('shot-family.csv',shots)
sources=['src/content/scenes.ts','src/content/dialogue.ts','src/ui/Casework.tsx','src/ui/scene-art.ts','src/ui/chapter5-beats.ts','docs/art/ADRIAN_REFERENCE_AUTHORITY.md','docs/art/EVE_ART_BIBLE.md','docs/art/GLOBAL_CINEMATIC_ART_RULES.md','art/reference/adrian/approved-references.json','art/staging/cast-scenes/records.json','src/ui/approved-scene-art.json']
save_json('package.json',{
 'id':'axiom-opening-office-master-v1','role':'staging-specification','approvalStatus':'pending','ownerApprovedEnvironment':False,'runtimeBound':False,'productionPromoted':False,
 'contract':'docs/art/AXIOM_OFFICE_PRODUCTION_PACKAGE.md','diagramsAre':'Symbolic layout/camera proposals, not canonical geometry or perspective-calibrated plates',
 'dimensions':{'proposedWorking':[3840,2160],'delivery':[1920,1080],'providerCapability':'not quoted/verified'},
 'cameraAnchors':[{'id':'A','kind':'fixed desk wide','proposal':'southwest looking northeast, eye-level, approx 45-55mm; preserve headroom and paths'}, {'id':'B','kind':'crop of A, same optical center','proposal':'slate and terminal surface; bounds deferred to final plate approval; no independent camera'}],
 'geometry':{'authored':['desk','divider','terminal','director smoked-glass door','Daniel two desks over','compliance route'], 'proposed':['north-south desk, terminal east facing west','fixed west/south chair; no sitting event','north guest zone and aisle','northeast director door','east compliance route','clear southwest camera/operator corridor'], 'calibrationStatus':'PENDING approved plate; no canonical metrics or invented transform values'},
 'layers':[{'id':i,'purpose':p,'authority':a} for i,p,a in [
 ('Adrian-A-neutral','standing through Daniel/Benton; restrained ordinary pose','V2 face + documented body/wardrobe, shot pose pending'),
 ('Adrian-A-sip','single retained cup at milestone','same sources; hand/cup contact review'),
 ('Daniel-A-divider','desk news and response hold','prose; staging portrait pending owner selection'),
 ('Benton-A-slate','held slate at desk','prose; staging portrait pending owner selection'),
 ('Maya-A-coffee','one held cup after placing Adrian cup','prose; staging portrait pending owner selection'),
 ('Maya-A-departing','leaves with own cup toward compliance','same scoped identity; new compatible action pose')]],
 'propLayers':['slate held contact mask','slate tabletop','slate screen awake','terminal neutral screen','terminal sent-state mask','Adrian cup standard/closer/held','Maya cup with contact masks'],
 'compositeOrder':['approved empty plate','rear path character','main character layers with correct contact shadows','slate/cups registered to hands or desk','desk/divider foreground occlusion masks','controlled screen masks/text from reached state','reviewed whole-frame grading'],
 'requiredTransformRecord':['source SHA256','camera anchor','pixel position','uniform scale','crop','alpha/occlusion mask hash','z-order','light-treatment hash','exact permitted shot/state'],
 'costPlanning':{'environment':1,'characterSources':6,'props':0,'fullScenes':0,'minimumOutputs':7,'conditionalAdditional':['optional seated Adrian','optional separate B plate if crop fails','optional prop sheet'],'upperWithNamedContingencies':10,'credits':'unquoted','authorizedOutputs':0},
 'coverage':{'currentlyReachableOpeningFamilies':3,'noInspectionOpening':1,'currentlyReachableOffice':0,'mappedOfficeIds':11,'officeDistinctStatesAfterFutureApprovalAndIntegration':9,'conditionalDeflectPropState':1,'normalOpeningAfterCompletion':10,'withOptionalApartmentInspections':'10-12','withDeflectVariant':'11-13','intermediateCutsExcluded':True},
 'sourceHashes':{s:hashlib.sha256((ROOT/s).read_bytes()).hexdigest() for s in sources}
})

# Local original diagram drawing; no reference-image inputs.
BG='#111d28'; PANEL='#203340'; INK='#e6edf1'; MUTED='#a6bdc9'; GOLD='#edc775'; TEAL='#71cbbb'
FONT=Path('C:/Windows/Fonts/segoeui.ttf');BOLD=Path('C:/Windows/Fonts/segoeuib.ttf')
def font(size,bold=False):return ImageFont.truetype(str(BOLD if bold else FONT),size)
def board(title,subtitle):
 im=Image.new('RGB',(1600,1100),BG); d=ImageDraw.Draw(im)
 d.text((48,30),title,font=font(34,True),fill=INK);d.text((48,83),subtitle,font=font(21),fill=GOLD)
 return im,d
def box(d,xy,label,fill=PANEL):
 d.rounded_rectangle(xy,radius=9,fill=fill,outline=MUTED,width=2);d.text((xy[0]+12,xy[1]+9),label,font=font(19),fill=INK)
def label(d,xy,text,color=INK,size=20):d.text(xy,text,font=font(size),fill=color)
def arrow(d,pts,color=GOLD):
 d.line(pts,fill=color,width=4);a,b=pts[-2:];angle=math.atan2(b[1]-a[1],b[0]-a[0]);end=b
 d.polygon([end,(end[0]-16*math.cos(angle-.5),end[1]-16*math.sin(angle-.5)),(end[0]-16*math.cos(angle+.5),end[1]-16*math.sin(angle+.5))],fill=color)
def person(d,x,y,name):
 d.ellipse((x-21,y-21,x+21,y+21),outline=TEAL,width=3);label(d,(x+27,y-14),name,TEAL,18)

im,d=board('AXIOM / OFFICE GEOMETRY','STAGING ONLY - proposed coordinates, not approved geography or surveyed dimensions')
box(d,(45,130,1190,880),'Strategic Intelligence / symbolic top view')
box(d,(800,180,1160,305),'Director office')
d.line((835,305,925,305),fill=GOLD,width=8);label(d,(813,313),'smoked-glass door',GOLD,18)
box(d,(155,440,285,665),'Daniel desk')
box(d,(330,440,450,665),'Between')
box(d,(625,440,790,705),'Adrian desk')
box(d,(750,510,775,595),'',fill='#425e70');label(d,(799,540),'terminal faces west',MUTED,17)
box(d,(508,641,590,718),'chair')
d.line((625,440,790,440),fill=GOLD,width=7);label(d,(615,408),'low divider / edge',GOLD,17)
d.rectangle((650,585,710,662),outline=TEAL,width=2);label(d,(803,610),'slate surface',TEAL,18)
d.ellipse((645,480,668,503),outline=GOLD,width=3);label(d,(800,478),'coffee-safe corner',GOLD,18)
person(d,552,550,'Adrian')
person(d,700,370,'')
label(d,(621,330),'guest zone',TEAL,18)
arrow(d,[(880,330),(880,370),(749,370)])
arrow(d,[(1150,390),(1050,390),(765,390)],TEAL);label(d,(967,418),'compliance route',TEAL,18)
arrow(d,[(645,370),(500,370),(330,370)]);label(d,(113,345),'shared aisle / Daniel exit destination unspecified',GOLD,18)
d.ellipse((470,794,504,828),fill=GOLD);label(d,(514,798),'Camera A',GOLD,20)
d.line((489,798,525,421),fill=MUTED,width=2);d.line((489,798,996,323),fill=MUTED,width=2)
box(d,(1214,130,1555,880),'AUTHORED vs PROPOSED')
for y,txt,col in [(195,'Authored:',INK),(233,'desk / divider',INK),(268,'smoked-glass door',INK),(303,'two desks over',INK),(338,'compliance approach',INK),(407,'Proposed:',GOLD),(445,'all compass directions',GOLD),(480,'furniture dimensions',GOLD),(515,'camera / lens / crop',GOLD),(550,'fixed empty chair',GOLD),(585,'cup / slate anchors',GOLD),(670,'No source names a',MUTED),(705,'post-Benton sitting',MUTED),(740,'event or coat hook.',MUTED)]:label(d,(1230,y),txt,col,20)
label(d,(48,923),'A single empty plate supports arrivals, held dialogue and completed departures.',INK,25)
label(d,(48,970),'Portable slate, cups, coat, phone and evidence are NOT baked into the master.',GOLD,23)
label(d,(48,1025),'Concept review required. No provider call, final art, promotion or runtime binding.',MUTED,20)
im.save(OUT/'office-geometry.png')

im,d=board('AXIOM / TWO COMPOSITION ANCHORS','STAGING ONLY - A is one camera; B is a crop of A, not a second viewpoint')
box(d,(45,145,1020,735),'A / desk wide - symbolic image-plane planning')
box(d,(765,220,972,405),'Director door')
d.line((100,445,952,445),fill=MUTED,width=2);label(d,(108,368),'common aisle; compliance continues off-frame right',MUTED,17)
box(d,(290,495,750,655),'fixed desk / independent props')
box(d,(600,450,705,530),'screen')
person(d,380,437,'Adrian')
person(d,717,403,'visitor')
d.rectangle((530,432,749,636),outline=GOLD,width=4);label(d,(542,667),'B crop region*',GOLD,20)
box(d,(1050,145,1555,475),'B / evidence detail')
box(d,(1280,232,1495,342),'neutral terminal')
box(d,(1100,324,1237,427),'slate')
label(d,(1070,492),'*Final crop/scale/masks set only',GOLD,20)
label(d,(1070,525),'after plate approval. No invented',GOLD,20)
label(d,(1070,558),'calibrated pixel coordinates.',GOLD,20)
arrow(d,[(765,606),(1050,445)])
label(d,(55,780),'LAYER ORDER',INK,25)
for x,txt in [(55,'empty plate'),(330,'characters'),(610,'props / contact'),(970,'occlusion'),(1260,'screen / grade')]:
 box(d,(x,828,x+245,905),txt)
label(d,(55,947),'A: Daniel -> Benton -> slate left -> Maya coffee -> Maya departs -> alone sip',INK,24)
label(d,(55,989),'B: brief = documents = analysis = review HOLD; submitted changes only after send.',GOLD,22)
label(d,(55,1030),'Standing required for Daniel/Benton. No invented sitting, visible secrets, romance or extra cups.',MUTED,20)
im.save(OUT/'camera-anchors.png')
outputs=['chronology.csv','shot-family.csv','package.json','office-geometry.png','camera-anchors.png','build-blockouts.py']
save_json('receipt.json',{'id':'axiom-office-m1-zero-credit-package','date':'2026-09-20','role':'staging-planning-package','approvalStatus':'pending','method':'Local deterministic Python CSV/JSON and Pillow symbolic diagrams; no reference pixels edited','creditsThisPass':0,'providerCalls':0,'productionPromoted':False,'runtimeBound':False,'outputHashes':{p:hashlib.sha256((OUT/p).read_bytes()).hexdigest() for p in outputs},'scope':'Reviewable specification only; no environment or character authority approval'})
print('Created 14-node chronology, shot map, layer spec, 2 symbolic diagrams and zero-credit receipt.')
