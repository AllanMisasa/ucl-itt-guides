---
title: Asynkron programmering
---

## Teori og eksempler

### Hvad er asynkron programmering?

Har du en enhed der skal vente på et signal - f.eks. på at nogen gør noget med joystick, eller en sensor siger noget bestemt - men ikke må blokere resten af programmet? Ved du ikke hvornår du præcist kan forvente et signal? Så er asynkron programmering løsningen. 

Først et simpelt eksempel på hvordan vi uden asynkron programmering ville vente på et signal:

```python
from time import sleep
button_state = 0

while True:
    if button_state == 0:
        pass
    else:
        print("Button pressed")
    sleep(0.1)
```

Problemet med dette, er at while-løkken blokerer resten af programmet, samt bruger vi unødvendig meget CPU-tid på at tjekke om knappen er trykket ned.

I stedet kan vi bruge asynkron programmering, som gør at vi kan fortsætte med resten af programmet, og kun tjekke knappen når der er et signal. Det gør vi således:

```python
import asyncio
from time import sleep

button_state = 0

async def button_check():
    while True:
        if button_state == 0:
            pass
        else:
            print("Button pressed")
        await asyncio.sleep(0.1)

button_check_task = asyncio.create_task(button_check())
button_check_task.run_forever()
```

Forskellen her, er at funktionen er asynkron (`async`), og vi sætter den til at køre i baggrunden (sidste 2 linjer). Det betyder at vi kan fortsætte med resten af programmet, og kun tjekke knappen når der er et signal. Det er meget mere effektivt, og vi bruger ikke unødvendig meget CPU-tid på at tjekke knappen.

Når vi bruger `await` nøgleordet, så venter vi på at der kommer et signal. Det er derfor vi kan bruge `await asyncio.sleep(0.1)`, fordi vi venter på at der kommer et signal fra knappen, og så tjekker vi om den er trykket ned. Dette er til forskel fra den sleep vi kender, for `await asyncio.sleep` er ikke blokerende, og vi kan fortsætte med resten af programmet.
Med andre ord, så er await et slags checkpoint hvor programmet ved at det er okay at lave andre ting. 

Tænk på en fjernstyret rover f.eks. Hvis den kører i autopilot skal den køre nogle funktioner for at den kan køre, men samtidigt skal den lytte efter et signal fra joystick om at den skal stoppe og begynde at tage inputs. 

### Hvad er en coroutine?

En coroutine er en asynkron funktion. Det er en funktion der kan køre i baggrunden, og som ikke blokerer resten af programmet. Det er ikke det samme som at de kører i parallel, og derfor kan asynkron programmering lade sig gøre selv på en enkelt CPU kerne. 

### Hvad er et event loop?

Et event loop er en funktion der kører i baggrunden, og som sørger for at køre alle coroutines. Det er den der sørger for at køre alle coroutines i baggrunden, og sørger for at de ikke blokerer resten af programmet.

### Opbygningen af et asynkront program

Når vi bygger et asynkront program, sørger vi først for at lave de forskellige coroutines (asynkrone funktioner) der skal køre i baggrunden. Derefter laver vi en event loop, som sørger for at køre alle coroutines. Derfor er dette også en meget strukturet måde at programmere  

### Praktisk eksempel med ESP32 til LED

OBS: Kræver MicroPython 1.21 eller nyere.

Lad os sige vi har en LED som hele tiden skal blinke, samtidigt med at brugeren kan justere lysstyrken med et potentiometer. 

Følgende tabel viser opkoblingen:

| ESP32 | LED/potentiometer |
| :---: | :---: |
| Pin 2 | LED+ |
| GND | LED- |
| Pin 34 | Potentiometer output |
| 3V3 | Potentiometer + |
| GND | Potentiometer - |

I dette tilfælde har vi brug for 2 "coroutines" (asynkrone funktioner), en der blinker LED'en, og en der aflæser potentiometeret. 

```python
from machine import Pin, PWM, ADC
import asyncio

pot = ADC(Pin(34))
pot.atten(ADC.ATTN_11DB)
led = PWM(Pin(2), 5000)
brightness = int(pot.read() / 4095 * 1023)

async def blink():
    while True:
        led.duty(1023)
        await asyncio.sleep(0.5)
        led.duty(0)
        await asyncio.sleep(0.5)

async def read_pot():
    while True:
        brightness = int(pot.read() / 4095 * 1023)
        led.duty(brightness)
        await asyncio.sleep(0.1)

loop = asyncio.get_event_loop()
loop.create_task(blink())
loop.create_task(read_pot())
loop.run_forever()
```

Uden async ville vi ikke kunne variere lysstyrken imens den blinker. Med async kan vi endda også justere blinkraten imens den kører, samttidigt med at vi kan justere lysstyrken, og de behøver ikke at være synkroniseret. Altså kan man variere de forskellige parametre uafhængigt af hinanden.
