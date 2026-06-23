import os

files = [
    r"src\app\[locale]\page.tsx",
    r"src\app\[locale]\destinations\page.tsx",
    r"src\app\[locale]\dashboard\layout.tsx",
    r"src\app\[locale]\book\page.tsx",
]

for path in files:
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace w-8 h-8 with w-14 h-14 to enlarge logo
        content = content.replace('className="w-8 h-8 object-contain"', 'className="w-14 h-14 object-contain"')
        
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print("Updated", path)
