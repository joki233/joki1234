@echo off
chcp 65001 >nul
powershell -NoProfile -Command ^
  "$files = Get-ChildItem -Path 'md' -Filter '*.md' | Select-Object -ExpandProperty Name;" ^
  "$content = 'const mdFiles = [' + [Environment]::NewLine;" ^
  "for ($i = 0; $i -lt $files.Count; $i++) {" ^
  "  $comma = if ($i -lt $files.Count - 1) { ',' } else { '' };" ^
  "  $content += '  \"' + $files[$i] + '\"' + $comma + [Environment]::NewLine;" ^
  "}" ^
  "$content += '];';" ^
  "Set-Content -Path 'notes-data.js' -Value $content -Encoding UTF8"
echo 笔记列表已更新！
pause
