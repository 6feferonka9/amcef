Ahojte, spravil som čo som stihol (dnes už cestujem), ale na posúdenie kvality kódu by to malo stačiť. Strávený čas 7-8 hodín.

Snažil som sa dodržať požiadvky a stack v zadaní, keďže predpokladám že sú to prevažne technológie s ktorými pracujete ale niektoré veci by som spravil inak.
1. Použil by som Remix. 100x lepší dev experience a menej bugov ako Next.js. S Nextom som mal viackrát problémy a podla ich git issues, niesom jediný. Remix krásne pracuje s formulármi, vo vačšine prípadoch nahradí Tansatack (react query). Natívny form na post, dynamicky pre-renderuje stránky a invaliduje data. Nemusel by som taktiež manuálne nastavovať searchParams ako som musel v todosFiltering.tsx.
2. Ja mám rád CSS, možno by som použil inú libku, pri ktorej by to dávalo vačší zmysel a nepoužil tailwind. Kód je čitatelnejší ak sú štýly oddelené od logiky. Ale to záleží od projektu.

Poznámky: 
1. Design som moc neriešil, rovnako ako responzivitu
2. Spravil som iba basic Zod validáciu
3. Požiadavka: Viaceré routy aplikácie - nemal som moc čo routovať, je tam iba jeden, nechcel som zbytočne prekomplikovávať appku

Čo by som dorobil + refactoring:
1. Ohandloval viac edge-case scenáre (napríklad custom input do filtering searchParams)
2. Pridal loading indikátory na buttony - pri vykonaní nejakej akcie
3. Pridal loading skeletony pri requeste a čakaní na TODOS
4. Po vyplnení formulára zatvoriť Popover a vymazať conent formulára
5. V dynamickej route by som skôr použil slug kategórie ako ID, viac readable. Ak otváram link /category/work tak vidím hneď na čo klikám.
6. Pridal možnosť na vymazávanie kategórii
7. Pridal notifikácie - pri errore alebo úspešnej akcie (“failed to delete todo” alebo “category created”)
