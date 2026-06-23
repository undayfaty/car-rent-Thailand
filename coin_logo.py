import os

coin_logo_html = '''<div className="flex flex-col items-center justify-center gap-1">
  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-600 border-[3px] border-yellow-100 shadow-lg flex items-center justify-center p-1.5 ring-2 ring-yellow-400">
    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
  </div>
  <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-brand-800 drop-shadow-sm whitespace-nowrap">Car Rent Thailand</span>
</div>'''

files = {
    r"src\app\[locale]\page.tsx": [
        ('<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" /><span className="text-xl font-bold tracking-tight">Car Rent Thailand</span></div>', coin_logo_html)
    ],
    r"src\app\[locale]\destinations\page.tsx": [
        ('<Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-600"><img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" /><span>Car Rent Thailand</span></Link>', 
         '<Link href="/" className="inline-block hover:scale-105 transition-transform">' + coin_logo_html + '</Link>')
    ],
    r"src\app\[locale]\dashboard\layout.tsx": [
        ('<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" /><span className="text-xl font-bold tracking-tight text-brand-600 dark:text-brand-500">Car Rent Thailand</span></div>', coin_logo_html)
    ],
    r"src\app\[locale]\book\page.tsx": [
        ('<Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-600"><img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" /><span>Car Rent Thailand</span></Link>', 
         '<Link href="/" className="inline-block hover:scale-105 transition-transform">' + coin_logo_html + '</Link>')
    ],
}

for path, replacements in files.items():
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        for old, new in replacements:
            content = content.replace(old, new)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"File not found: {path}")
