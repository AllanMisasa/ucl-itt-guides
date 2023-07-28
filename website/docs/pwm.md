---
title: PWM teori og basale kodeeksempler
---

## Hvad er PWM?

PWM står for pulse-width modulation (pulsbreddemodulation på dansk). Det er en teknik der bliver brugt meget i motorstyring, lysstyring og lyd. 

Ret basalt fungere PWM sådan at vi "pulser" elektricitet i stedet for at give det 100% af tiden. På den måde kan vi f.eks. styre hvor hurtigt en motor roterer og hvor lys en pære er. 

Det kan f.eks. illustreres som følger:

![PWM variation](https://upload.wikimedia.org/wikipedia/commons/0/02/PWM_duty_cycle_with_label.gif)

Dette er et ekempel på et Pulsbreddemodulation (PWM) signal med varierende arbejdscyklus (duty cycle = D; 10% trin) og fast periodetid.

## PWM på ESP32 med MicroPython

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

Denne effekt er illustreret som følger:

![PWM servo](https://www.meccanismocomplesso.org/wp-content/uploads/2020/08/Arduino-PWM-duty-cycle-angolo-del-servo-motore.jpg)