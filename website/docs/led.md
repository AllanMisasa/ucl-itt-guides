---
title: LED
---

## Øvelser i standard 5mm LED'er

Ligesom vi i programmering har et ritual til første test ("Hello World"), så har vi i indlejrede systemer også et; *blinky*. Blinky handler om at vi kan styre (blinke) en LED med 2 elementer:

1. Et program på en mikrocontroller
2. Et kredsløb med en (eller flere) LED

Når vi skal konstruere et sådant system, plejer vi at starte med at sætte kredsløb op, og derefter programmere mikrocontrolleren for at styre komponenterne.

1. Vi starter med at sætte kredsløbet op. Det kan illustreres som følger:

![ESP32 LED](images/ESP32-LED.png)

2. Alternativt i tabelform:

    | ESP32 pin | Rød LED |
    |--- | --- |
    | GPIO 13 | Anode + (langt ben) via 91 ohm modstand |
    | GND | Cathode - (kort ben) |

3. Vi skal så overføre koden via Thonny til ESP32. Koden er som følger:

```python
from machine import Pin
from time import sleep

led = Pin(5, Pin.OUT)

while True:
    led.value(1)
    sleep(0.5)
```

4. Koden tænder bare LED'en. Prøv på en linje under `sleep(0.5)` at tilføje `led.value(0)`, og kør koden igen. Hvad sker der så?

### Øvelse 2 - Modstand og anden kontrol

1. Prøv at sætte en større modstand til LED'en. Hvad sker der så? Hvorfor tror du at en større modstand påvirker LED'en sådan?

2. Prøv at fjerne modstanden fra kredsløbet, altså sæt det lange ben direkte til ESP32 GPIO 5, og kør jeres kode igen. Hvordan påvirker det lyset?

2. Prøv at sætte `sleep(0.5)` højere, og derefter lavere end 0.5. Forklar hvad du ser.

### Øvelse 3 - Morseblink

Dette er en øvelse til selvstudie (anbefales at gøre i jeres studiegruppe) og en opgave til næste gang. 

Morsekode er i princippet et alfabet som vi kan bruge til at kommunikere via lys. Måske har i set det i film, eller prøvet det i skolen, f.eks. med en lommelygte. F.eks. er bogstavet "a" et hurtigt blink, efterfulgt af et langt blink. Det kunne måske redde os i en nødsituation, men det kræver at vi ved hvordan vi skriver "SOS" med lys.

1. Oversæt SOS til morse - f.eks. ved brug af en [oversætter](https://morsecode.world/international/translator.html).
2. Ændre i koden så at i tænder og slukker LED'en så den siger SOS i Morse.