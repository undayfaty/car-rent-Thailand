import os

files = {
    r"src\app\[locale]\partner-register\page.tsx": [
        ("PrimeRide TH", "Car Rent Thailand")
    ],
    r"src\app\[locale]\page.tsx": [
        ('<span className="text-xl font-bold tracking-tight">PrimeRide TH</span>', '<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="text-xl font-bold tracking-tight">Car Rent Thailand</span></div>')
    ],
    r"src\app\[locale]\login\page.tsx": [
        ("PrimeRide TH", "Car Rent Thailand")
    ],
    r"src\app\[locale]\intro\page.tsx": [
        ("PrimeRide TH", "Car Rent Thailand")
    ],
    r"src\app\[locale]\destinations\page.tsx": [
        ('<Link href="/" className="text-2xl font-bold tracking-tight text-brand-600">PrimeRide TH</Link>', '<Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-600"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span>Car Rent Thailand</span></Link>')
    ],
    r"src\app\[locale]\dashboard\settings\page.tsx": [
        ("@primeride.com", "@carrentthailand.com")
    ],
    r"src\app\[locale]\dashboard\layout.tsx": [
        ('<span className="text-xl font-bold tracking-tight text-brand-600 dark:text-brand-500">PrimeRide Admin</span>', '<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="text-xl font-bold tracking-tight text-brand-600 dark:text-brand-500">Car Rent Thailand</span></div>')
    ],
    r"src\app\[locale]\book\page.tsx": [
        ('<Link href="/" className="text-2xl font-bold tracking-tight text-brand-600">PrimeRide TH</Link>', '<Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-600"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span>Car Rent Thailand</span></Link>')
    ],
    r"src\app\[locale]\dashboard\bookings\page.tsx": [
        ("PrimeRide TH", "Car Rent Thailand")
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
