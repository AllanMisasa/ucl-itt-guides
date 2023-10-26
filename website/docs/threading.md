---
title: Threading
---

## Threading teori

### Hvornår skal vi bruge threading?

Det mest basale eksempel på hvornår vi er tvunget til at bruge threading, er f.eks. hvis vi vil køre 2 forskellige `while` loops der gentager kode i forskellige intervaller. Hvis vi ikke bruger threading, så vil det ene loop køre først, og det andet loop vil først køre når det første loop er færdigt. Det er ikke altid det vi ønsker. Eksempelvis vores rover: der er sensorer der skal måle hele tiden, og motorene skal også køre. Hvis vi ikke bruger threading, så vil vi ikke kunne køre begge dele "samtidigt".

### Threading versus multiprocessing (parallelisering)

Threading og parallelisering bliver ofte forvekslet med hinanden. Men de er faktisk meget forskellige, selvom de ikke nødvendigvis synligt er forskellige.

Lad os starte med parallelisering, det er når vi har en opgave, som vi kan dele op i mindre opgaver, som kan udføres samtidigt. Det er f.eks. hvis vi har en liste med tal, og vi skal finde summen af alle tallene. Så kan vi dele listen op i mindre lister, og så kan vi finde summen af hver liste samtidigt. Når vi har fundet summen af hver liste, så kan vi finde summen af de 2 summer. Altså handler parallelisering om at tage 1 opgave, dele den op i bidder, og så udføre hver bid samtidigt på forskellige processorer. Det er derfor vi snakker om kerner i processorer ofte, f.eks. dual-core, quad-core og octa-core. Quad-core betyder for eksempel 4 kerner, hvilket vil sige vi kan køre 4 processer simultant.

Threading er egentligt bare meget hurtige skift mellem funktioner. For husk at jeres ESP's processor kan klare millioner af beregninger i sekundet, og jeres PC'er oftest flere milliarder. Hvis vi skifter mellem funktioner hurtigt nok, så kan det godt se ud som om at de kører samtidigt. Threading fungerer på selv enkelt-kerne processorer. Threading handler så i kontrast til parallelisering, om at kunne køre forskelligartede processer som om de kører samtidigt. Det er derfor vi kan køre et `while` loop der kører motorene, og et andet `while` loop der kører sensorerne, samtidigt.

## Threading eksempler i Python

### Simpelt eksempel

```python
"""This is a simple example of threading"""
import threading
from time import sleep

def print_hello():
    """Prints hello every second"""
    while True:
        print("hello")
        sleep(1)

def print_world():
    """Prints world every second"""
    while True:
        print("world")
        sleep(1)

def run():
    """Starts the two threads"""
    t1 = threading.Thread(target=print_hello)
    t2 = threading.Thread(target=print_world)

    t1.start()
    t2.start()
```

### Eksempel til motorstyring med logik

```python
"""This is the main file for the motors"""

import random
import threading
from time import sleep

def turn_randomizer():
    """Randomly prints left, right, straight, or back every second"""
    while True:
        turn = random.randint(0, 3)
        if turn == 0:
            print( "left")
        elif turn == 1:
            print( "right")
        elif turn == 2:
            print( "straight")
        elif turn == 3:
            print( "back")
        sleep(1)

def servo_control():
    """Randomly prints up, forward, down, or back every half second"""
    while True:
        servo_commmand = random.randint(0, 3)
        if servo_commmand == 0:
            print( "up")
        elif servo_commmand == 1:
            print( "forward")
        elif servo_commmand == 2:
            print( "down")
        elif servo_commmand == 3:
            print( "back")
        sleep(0.5)

def run():
    """Starts the two threads"""
    t1 = threading.Thread(target=turn_randomizer)
    t2 = threading.Thread(target=servo_control)

    t1.start()
    t2.start()

if __name__ == "__main__":
    run()
```
