import os, glob

md_dir = os.path.join(os.path.dirname(__file__), "md")
files = sorted(glob.glob(os.path.join(md_dir, "*.md")))
names = [os.path.basename(f) for f in files]

lines = ["const mdFiles = ["]
for i, name in enumerate(names):
    comma = "," if i < len(names) - 1 else ""
    lines.append(f'  "{name}"{comma}')
lines.append("];")

output = "\n".join(lines) + "\n"
with open(os.path.join(os.path.dirname(__file__), "notes-data.js"), "w", encoding="utf-8") as f:
    f.write(output)

print(f"笔记列表已更新！共 {len(names)} 篇笔记")
