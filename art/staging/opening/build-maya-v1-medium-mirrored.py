from pathlib import Path
import hashlib, json
import cv2
import numpy as np
from PIL import Image, ImageFilter

root = Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design")
staging = root / "art" / "staging" / "opening"
source_path = staging / "maya-opening-office-coffee-v1-provider-original.png"
master_path = root / "art" / "production" / "opening" / "axiom-opening-office-master-v1-production.png"
output_path = staging / "axiom-opening-office-shot01-maya-v1-medium-desk-side-left-facing-candidate.png"
receipt_path = staging / "maya-opening-office-coffee-v1-medium-left-facing-receipt.json"

crop_box = (1052, 480, 1500, 732)
cw, ch = crop_box[2]-crop_box[0], crop_box[3]-crop_box[1]
sx, sy = 1920/cw, 1080/ch
medium = Image.open(master_path).convert("RGBA").crop(crop_box).resize((1920,1080), Image.Resampling.LANCZOS)

source = cv2.imread(str(source_path), cv2.IMREAD_COLOR)
mask = np.zeros(source.shape[:2], np.uint8)
bgd_model = np.zeros((1,65), np.float64)
fgd_model = np.zeros((1,65), np.float64)
cv2.grabCut(source, mask, (610,50,650,980), bgd_model, fgd_model, 8, cv2.GC_INIT_WITH_RECT)
alpha = np.where((mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD),255,0).astype("uint8")
ys,xs=np.where(alpha>0); x0,x1,y0,y1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
rgba=cv2.cvtColor(source,cv2.COLOR_BGR2RGBA); rgba[:,:,3]=alpha
high=Image.fromarray(rgba).crop((x0,y0,x1,y1)).transpose(Image.Transpose.FLIP_LEFT_RIGHT)
foreground=high.resize((round(132*sx),round(292*sy)),Image.Resampling.LANCZOS)
foreground.putalpha(foreground.getchannel("A").filter(ImageFilter.GaussianBlur(0.55)))
target=(round((1202-crop_box[0])*sx),round((492-crop_box[1])*sy))
medium.alpha_composite(foreground,target)
medium.save(output_path,optimize=True)

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest().upper()
receipt={"status":"staging review candidate only; no production promotion; no runtime binding","m5":{"path":str(master_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(master_path),"literalCrop":list(crop_box),"modified":False},"foreground":{"providerOriginal":str(source_path.relative_to(root)).replace("\\\\","/"),"providerOriginalSha256":sha(source_path),"transform":"horizontal mirror of Maya-only transparent full-resolution foreground","worldRegistration":{"bbox":[1202,492,1334,784],"mediumTarget":list(target)},"identityPixels":"unchanged apart from horizontal orientation","cup":"same provider-held cup mirrored with the hand"},"output":{"path":str(output_path.relative_to(root)).replace("\\\\","/"),"sha256":sha(output_path)},"offscreenDeskDirection":"Maya now faces image-left, toward the desk and offscreen Adrian operator zone"}
receipt_path.write_text(json.dumps(receipt,indent=2)+"\n",encoding="utf-8")
print(json.dumps(receipt,indent=2))
