from pathlib import Path
import hashlib, json
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

root=Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design")
staging=root/"art"/"staging"/"opening"
source_path=staging/"adrian-opening-office-alone-sip-v1-provider-original.png"
layer_path=staging/"adrian-opening-office-alone-sip-v1-extracted-layer.png"
output_path=staging/"axiom-opening-office-shot04-alone-adrian-sip-v1-hold-candidate.png"
receipt_path=staging/"adrian-opening-office-alone-sip-v1-composite-receipt.json"
master_path=root/"art"/"production"/"opening"/"axiom-opening-office-master-v1-production.png"

crop_box=(640,480,1152,768) # exact 16:9; desk, terminal and retained-slate zone.
cw,ch=crop_box[2]-crop_box[0],crop_box[3]-crop_box[1]
sx,sy=1920/cw,1080/ch
canvas=Image.open(master_path).convert("RGBA").crop(crop_box).resize((1920,1080),Image.Resampling.LANCZOS)

# Approved slate geometry from axiom-casework-zero-cost-receipt, transformed with the M5 crop.
overlay=Image.new("RGBA",canvas.size,(0,0,0,0)); d=ImageDraw.Draw(overlay)
def mapped(points): return [((x-crop_box[0])*sx,(y-crop_box[1])*sy) for x,y in points]
d.polygon(mapped([(763,701),(898,701),(888,641),(774,641)]),fill=(0,0,0,42))
d.polygon(mapped([(775,636),(883,636),(891,691),(765,691)]),fill=(24,29,34,255),outline=(11,14,17,255))
d.polygon(mapped([(781,643),(877,643),(883,681),(773,681)]),fill=(67,77,82,255))
canvas.alpha_composite(overlay)

source=cv2.imread(str(source_path),cv2.IMREAD_COLOR)
mask=np.zeros(source.shape[:2],np.uint8); bg=np.zeros((1,65),np.float64); fg=np.zeros((1,65),np.float64)
cv2.grabCut(source,mask,(480,40,970,1030),bg,fg,8,cv2.GC_INIT_WITH_RECT)
alpha=np.where((mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD),255,0).astype("uint8")
ys,xs=np.where(alpha>0); x0,x1,y0,y1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
rgba=cv2.cvtColor(source,cv2.COLOR_BGR2RGBA); rgba[:,:,3]=alpha
high=Image.fromarray(rgba).crop((x0,y0,x1,y1))
target_h=1010; target_w=round(high.width*target_h/high.height)
layer=high.resize((target_w,target_h),Image.Resampling.LANCZOS)
layer.putalpha(layer.getchannel("A").filter(ImageFilter.GaussianBlur(0.55)))
layer.save(layer_path,optimize=True)
# Position at image right so the approved slate remains visibly left of Adrian's body.
canvas.alpha_composite(layer,(900,70))
canvas.save(output_path,optimize=True)

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest().upper()
receipt={"status":"staging review candidate only; no production promotion; no runtime binding","sources":{"m5":{"path":str(master_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(master_path),"providerUpload":False},"adrianProviderOriginal":{"path":str(source_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(source_path)}},"foreground":{"method":"full-resolution GrabCut then 0.55px alpha feather","sourceCrop":[int(x0),int(y0),int(x1),int(y1)],"layer":{"path":str(layer_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(layer_path)},"targetRect":[900,70,900+target_w,70+target_h],"framingFix":"foreground translated down 50px; complete hair has top breathing room and torso exits at bottom image boundary"},"composition":{"path":str(output_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(output_path),"literalM5Crop":list(crop_box),"characters":{"adrian":"one provider layer; Maya, Daniel and Benton absent"},"cups":{"adrian":"one provider-held plain cup at lips","deskCup":"absent"},"slate":{"retainedOnDesk":True,"fullPolygon":[[775,636],[883,636],[891,691],[765,691]],"visibleLeftOfAdrian":True}},"endingState":"Maya gone; Adrian sips retained cup; report absent; neutral reflection only"}
receipt_path.write_text(json.dumps(receipt,indent=2)+"\n",encoding="utf-8")
print(json.dumps(receipt,indent=2))
