import os

old_html = '''<div className="flex flex-col items-center justify-center gap-1">
  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-600 border-[3px] border-yellow-100 shadow-lg flex items-center justify-center p-1.5 ring-2 ring-yellow-400">
    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
  </div>
  <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-brand-800 drop-shadow-sm whitespace-nowrap">Car Rent Thailand</span>
</div>'''

files = {
    r"src\app\[locale]\page.tsx": [
        (old_html, "<Logo />")
    ],
    r"src\app\[locale]\destinations\page.tsx": [
        ('<Link href="/" className="inline-block hover:scale-105 transition-transform">' + old_html + '</Link>', '<Link href="/"><Logo /></Link>')
    ],
    r"src\app\[locale]\dashboard\layout.tsx": [
        (old_html, "<Logo />")
    ],
    r"src\app\[locale]\book\page.tsx": [
        ('<Link href="/" className="inline-block hover:scale-105 transition-transform">' + old_html + '</Link>', '<Link href="/"><Logo /></Link>')
    ],
}

for path, replacements in files.items():
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Add import if missing
        if 'import Logo from "@/components/Logo";' not in content:
            # find last import
            lines = content.split('\n')
            last_import_idx = -1
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    last_import_idx = i
            if last_import_idx != -1:
                lines.insert(last_import_idx + 1, 'import Logo from "@/components/Logo";')
                content = '\n'.join(lines)
            else:
                content = 'import Logo from "@/components/Logo";\n' + content
        
        for old, new in replacements:
            content = content.replace(old, new)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"File not found: {path}")
