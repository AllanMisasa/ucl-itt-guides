---
title: Objekt-Orienteret Programmering Basics
---

## Objektorienteret programmering for IT teknologer del 1

## Hvorfor objektorienteret programmering?

Det kan godt være at vi kan bygge stort set alle programmer bare ved brug af variable, løkker og funktioner. Men hvis vi arbejder med større projekter, bliver det hurtigt uoverskueligt, og vanskeligt at arbejde med.

Derfor bruger vi objektorienteret programmering for at opnå følgende ønskværdige egenskaber:

* Læsbart
* Let at vedligeholde
* Genbrugeligt

Objekt-orienteret programmering finder mest anvendelse blandt IT teknologer når der er opdaget et mønster i løsninger til forskellige opgaver. Som f.eks. bruger vi meget ens kode når vi arbejder med PWM, uanset om det er motorer eller LED'er, så kan vi gøre det lettere at implementere kode til disse objekter. Samtidigt har disse komponenter mange forskellige funktioner som vi også har arbejdet med. Derfor er det ét godt eksempel på noget vi kunne, og måske bør, bruge objektorienteret progammering til.

## Objekter

Et objekt beskriver et **koncept** og ikke en datatype. Datatyper kan dog bruges til at beskrive disse koncepter. F.eks. så kan en datatype `int` bruges til at beskrive en persons alder, men ét koncept er hele denne person. En person har flere egenskaber end bare alder, så derfor er objektet summen af dens dele, som beskrives ved hjælp af datatyper.

## Klasser

En klasse, som vi i Python definerer med keyword `class`, er en slags skabelon, som vi kan lave objekter ud af. Så hvis vi f.eks. har en klasse der kan fungere som en skabelon til styring af PWM komponenter, så kan vi f.eks. lave mange motor-objekter ud fra den.

Ét eksempel på en klasse til PWM kontrol:

```python
from machine import Pin, PWM
class PWM_kontrol:
	def __init__(self, pin, pwm_type):
		self.pin = pin
		self.pwm_type = pwm_type
```

Først importerer vi de nødvendige biblioteker, `machine`, for igen, objekt-orienteret programmering er her for at vi ikke skal opfinde den dybe tallerken.
Så definerer vi en klasse der hedder `PWM_kontrol`.

Først i denne klasse er der en `___init__` funktion. Det er en speciel type funktion der benyttes i klasser til at konstruere objekter. Altså når man laver et objekt fra denne klasse, så starter den med at køre `__init__` funktionen for at begynde konstruktionen af et objekt. Så her definerer vi objektets fundamentale egenskaber. Her er det f.eks. `pin` som vi alligevel altid skal have for et GPIO komponent, og PWM_type, hvor brugeren kan fortælle om det er servo, DC motor, eller LED de skal bygge.

Disse variable er gemt bag `self` key word, hvilket vil sige at de egenskaber tilhører objektet selv. 

That is it, vi har allerede en klasse vi kan lave objekter ud af, med bare få linjer Python kode! 

At oprette et objekt ud fra denne klasse gøres så simpelt som:

```python
motor = PWM_kontrol(4, motor)
```

Her definerer vi en motor der bruger GPIO pin 4. Så er der nu et motorobjekt. Hvis man vil have en servo, kan vi bare kalde variablet `servo` og give servo som input nummer 2. 
Det kan ikke rigtigt noget endnu. Derfor har vi brug for metoder.

## Metoder

Metoder er en måde at beskrive objekters funktionalitet. Det er meget lig funktioner, men indeni klasser, og til at udføre noget på objekter. 

from machine import PWM
import math

```python
class Servo:
    """
    A simple class for controlling hobby servos.
    """
    def __init__(self, pin, freq=50, min_duty=50, max_duty=900, angle=0):
        self.min_duty = min_duty
        self.max_duty = max_duty
        self.freq = freq
        self.angle = angle
        self.pwm = PWM(pin, freq=freq, duty=0)

    def rotate(self, angle=None):
		"""Rotate the servo to the specified ``angle``."""
		duty_cycle = self.min_duty + (self.max_duty - self.min_duty) / 180 * angle
        self.pwm.duty(duty_cycle)
```

For at runde klassestruktur af, en illustration der opsummerer klassers opbygning:
![OOP](https://thumbs.dreamstime.com/z/object-oriented-programming-oop-paradigm-explanation-outline-diagram-object-oriented-programming-language-oop-paradigm-239724045.jpg)

## Lave objekter og køre metoder fra en klasse

Dette er noget vi faktisk har gjort meget i især MicroPython allerede. For eksempel med `time` biblioteket, for det er faktisk en klasse vi importerer. Når vi så bruger f.eks. `time.sleep(1)`, så bruger vi faktisk metoden `sleep` fra klassen `time`.

Når vi gerne vil teste metoder vi selv har lavet i en klasse, er det nemmest at teste ved at gøre det i den fil man har defineret klassen i. 
Så kan man f.eks. med klassen PWM_kontrol instantiere (lave) et objekt fra klassen ved at sige: `led = PWM_kontrol(4, "ToggleLED")`. Sådan som den ovenstående klasse er sat op, vil koden allerede virke bare med det. Vi kan gøre sådan at selv meget mere komplekse operationer vil kunne køre med samme kompleksitet. På den måde er objektorienteret programmering et meget stærkt værktøj til at deploye forskellige funktioner indenfor samme område.

## Ekstra

Video til anvendt OOP: https://www.youtube.com/watch?v=ZDa-Z5JzLYM

Del 2: Variable i klasssen: https://www.youtube.com/watch?v=BJ-VvGyQxho

Del 3: Class methods: https://www.youtube.com/watch?v=rq8cL2XMM5M
