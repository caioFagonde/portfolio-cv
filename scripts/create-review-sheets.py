"""Build labeled screenshot overview sheets for manual review (requires Pillow)."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'artifacts/reports/screenshots-manifest.json').read_text())
output = root / 'artifacts/reports'
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 13)
except OSError:
    font = ImageFont.load_default()
for viewport in manifest['viewports']:
    shots = [s for s in manifest['screenshots'] if s['viewport']['name'] == viewport['name']]
    # Opening view at a readable scale, for the full route/viewport matrix.
    width = 320
    tile_height = round(viewport['height'] * width / viewport['width']) + 38
    columns = 4
    rows = (len(shots) + columns - 1) // columns
    sheet = Image.new('RGB', (columns * (width + 16) + 16, rows * (tile_height + 16) + 16), '#e5e4df')
    draw = ImageDraw.Draw(sheet)
    for i, shot in enumerate(shots):
        source = Image.open(root / shot['path']).convert('RGB')
        top = source.crop((0, 0, source.width, min(viewport['height'], source.height)))
        top = top.resize((width, round(top.height * width / top.width)), Image.Resampling.LANCZOS)
        x = 16 + (i % columns) * (width + 16)
        y = 16 + (i // columns) * (tile_height + 16)
        draw.text((x, y), shot['route'], fill='#191714', font=font)
        sheet.paste(top, (x, y + 30))
    sheet.save(output / f"review-openings-{viewport['name']}.png")
    # Full pages split across three-route sheets for hierarchy and section review.
    for batch in range(0, len(shots), 3):
        thumbs=[]
        for shot in shots[batch:batch+3]:
            source=Image.open(root / shot['path']).convert('RGB')
            source=source.resize((320,round(source.height*320/source.width)),Image.Resampling.LANCZOS)
            thumbs.append((shot,source))
        canvas=Image.new('RGB',(1024,max(im.height for _,im in thumbs)+54),'#e5e4df')
        draw=ImageDraw.Draw(canvas)
        for j,(shot,im) in enumerate(thumbs):
            draw.text((16+j*336,10),shot['route'],fill='#191714',font=font)
            canvas.paste(im,(16+j*336,38))
        canvas.save(output/f"review-full-{viewport['name']}-{batch//3+1}.png")
print(f"Generated review sheets for {len(manifest['screenshots'])} screenshots.")
