---
title: PWM teori og basale kodeeksempler
---

## Hvad er PWM?

PWM står for pulse-width modulation (pulsbreddemodulation på dansk). Det er en teknik der bliver brugt meget i motorstyring, lysstyring og lyd. 

Ret basalt fungere PWM sådan at vi "pulser" elektricitet i stedet for at give det 100% af tiden. På den måde kan vi f.eks. styre hvor hurtigt en motor roterer og hvor lys en pære er. 

Det kan f.eks. illustreres som følger:

![PWM variation](https://upload.wikimedia.org/wikipedia/commons/0/02/PWM_duty_cycle_with_label.gif)

Dette er et ekempel på et Pulsbreddemodulation (PWM) signal med varierende arbejdscyklus (duty cycle = D; 10% trin) og fast periodetid.

Vi kan oversætte duty cycle til spænding. Se følgende billede:

![PWM spænding](images/duty_cycle.jpg)

Så det der sker her, er at vi med trinene justere 10% ad gangen, og dvs. at vi kan variere hvor meget af tiden vi sender strøm igennem. Vi kan selv indstille PWM til at den tilføre strøm i 10% af tiden, 20% af tiden, 30% af tiden osv. Når vi gør det i små nok bidder, f.eks. i milisekunder, så kan vi f.eks. med en LED få den til at lyse svagere eller kraftigere. Det sker ved at den faktisk blinker! Ved 10% duty cycle er den kun tændt i 10% af den tid vi vælger at skære bidderne op i. Så hvis vi vælger perioden til at være 10 milisekunder, så lyser den i 1 milisekund hver 10. milisekund. Derfor blinker den, men så hurtigt at vi ikke kan se det. Det vil bare føles meget svagere end hvis den var tændt hele tiden.

## PWM til LED på ESP32 med MicroPython

ESP32 har mange pins der kan bruges til at sende PWM signaler ud. Faktisk kan en ESP32 styre 16 PWM signaler uafhængige af hinanden. Find en af dem, f.eks. ved at kigge på en pinout:

![ESP32 pinout](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/_images/esp32-devkitC-v4-pinout.png)

Når du har valgt en pin, kan du koble en LED til, og så kan du bruge følgende kode til at sende PWM ud på den:

```python
from machine import Pin, PWM
from time import sleep

frequency = 5000
led = PWM(Pin(5), frequency)

for duty_cycle in range(0, 1024):
    led.duty(duty_cycle)
    sleep(0.005)
```

## PWM til servostyring

Analoge servomotorer bruger PWM til at styre motorakslens position. 

PWM-signalet er normalt omkring 50 Hz, hvilket er en periode på 20 ms. Inden for den periode varieres pulsbredden, en kortere puls positionerer servoen mod nul-gradersmærket, mens en længere bevæger motorakslen mod 180 (eller 270) graders position.

Pulsen tilføres hele tiden til motorens kontrolinputs og låser akslen i den ønskede position.

Denne effekt er illustreret som følger:

![PWM servo](https://www.meccanismocomplesso.org/wp-content/uploads/2020/08/Arduino-PWM-duty-cycle-angolo-del-servo-motore.jpg)

## PWM til DC Motorstyring

DC motorer kan også styres med PWM. I stedet for at styre positionen, styrer vi hastigheden. Grunden til at PWM virker med DC motorer er ikke den samme som med LED'er, for vi justere ikke hastigheden i små milisekunder. Det er dog sådan at når vi vælger at sende ud halvdelen af tiden f.eks., så er der faktisk et lille øjeblik hvor strømmen er slukket. Det er nok til at DC motoren bremser lidt, og derfor kan vi styre hastigheden. 

Rent teknisk set, så er en DC motor for langsom til at reagere på at vi slukker i meget kort tid til at den vil stoppe. Dette kan dog indstilles. Det kan læses mere om hos Adafruit: [link til artikel om PWM frekvens](https://learn.adafruit.com/improve-brushed-dc-motor-performance/pwm-frequency).

Adafruit har en god artikel der går lidt mere i dybden om hvordan duty cycle påvirker spændingen der går til en DC motor: [Adafruit link til DC motor duty cycle](https://learn.adafruit.com/improve-brushed-dc-motor-performance/duty-cycle).
