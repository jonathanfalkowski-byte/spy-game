from PIL import Image, ImageDraw
from pathlib import Path
import hashlib, json

out_dir = Path(r"C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design\art\staging\opening")
png = out_dir / "maya-opening-office-departure-clean-conditioning-plate.png"
receipt = out_dir / "maya-opening-office-departure-clean-conditioning-plate.json"
W,H=1920,1080
im=Image.new("RGB",(W,H),(102,107,113)); d=ImageDraw.Draw(im)
# Unannotated rightward-walking construction: different body action from coffee V1, cup physically in hand.
d.ellipse((802,115,1002,325),fill=(162,107,77),outline=(49,43,43),width=9)
d.ellipse((795,87,1015,220),fill=(16,19,23),outline=(7,9,11),width=8)
d.polygon([(803,335),(1000,335),(1080,614),(733,614)],fill=(29,57,90),outline=(18,31,45))
d.line((805,350,746,602),fill=(26,50,79),width=50)
d.line((1000,355,1128,505),fill=(26,50,79),width=48)
d.ellipse((1088,480,1150,543),fill=(162,107,77),outline=(49,43,43),width=6)
d.rounded_rectangle((1110,443,1190,557),radius=12,fill=(205,194,168),outline=(67,59,50),width=7)
d.ellipse((1110,438,1190,461),fill=(83,76,66),outline=(52,48,43),width=5)
# Rightward stride: front leg and rear leg differ; cup hand overlaps existing guide hand.
d.polygon([(750,613),(901,613),(873,858),(710,876)],fill=(25,43,66),outline=(17,26,39))
d.polygon([(912,613),(1046,613),(1123,841),(952,871)],fill=(25,43,66),outline=(17,26,39))
d.polygon([(684,864),(882,852),(905,905),(667,917)],fill=(25,28,32),outline=(14,16,18))
d.polygon([(943,858),(1142,829),(1182,879),(958,911)],fill=(25,28,32),outline=(14,16,18))
d.ellipse((648,892,1200,959),fill=(84,89,94))
im.save(png,optimize=True)
sha=hashlib.sha256(png.read_bytes()).hexdigest().upper()
data={"assetId":"maya-opening-office-departure-clean-conditioning-plate","kind":"zero-cost clean character-only departure pose and cup-contact guide","dimensions":{"width":W,"height":H,"aspect":"16:9"},"sha256":sha,"providerUploadAuthority":"Maya coffee V1 identity reference plus this departure guide only; M5 excluded","figure":{"subject":"Maya Reyes","pose":"rightward departure walk toward compliance, not a translated or mirrored stationary stance","cup":"one plain unmarked paper cup physically overlapped by existing hand","identity":"same warm brown skin, loose black knot, navy suit with turned cuffs"},"m5RegistrationTarget":{"canvas":[1920,1080],"bbox":[1385,476,1517,768],"footPoint":[1451,768],"direction":"east/right toward compliance exit","adrian":"remains at central desk","adrianCup":"retained at base or deflect position","slate":"retained on desk but outside intended medium departure crop"},"status":"staging-only; not production-approved; not runtime-bound"}
receipt.write_text(json.dumps(data,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"png":str(png),"sha256":sha,"receipt":str(receipt)}))
