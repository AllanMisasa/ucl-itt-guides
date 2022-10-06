---
title: De basale programmeringskoncepter med eksempler i Python
---

## Datatyper 

```python
# Strings:
string1 = 'Jeg er en string!'
string2 = "Jeg er også en string!"

# Integers (Heltal):
integer1 = 124125
integer2 = -1000

# Floating points (kommatal):
float1 = 1.34634
float2 = -0.15125
```

## Datastrukturer

```python
# Liste med strings
liste1 = ['Anders', 'Alberte', 'Claudio', 'Francesca']
# Print 3. element i liste via indeksering
print(liste1[2])
# Tilføj element til listen
liste1.append('Akiha')
# Fjern element fra listen
liste1.remove('Anders')
# Kombiner liste
liste2 = ['Flora', 'Rami']
sammensat_liste = liste1 + liste2
print(sammensat_liste)
# Læg 2 bestemte elementer sammen fra en liste med indeksering
liste1[0] + liste1[3]
# Definer dictionary - Dansk til engelsk ordbog som eksempel 
ordbog = {
    'Emotionel': 'Emotional', # Nøgle : Værdi
    'Skade': 'Damage',
    'Programmering': 'Programming'
    }
# Find bestemt værdi via nøgle
print(ordbog['Emotionel'])
```

## Conditions og funktioner

```python
# Funktion til at checke om input er lavere end 50
def checker(input_value):
    if input_value < 50:
        print('Input er lavere end 50!')
    else:
        print('Input er højere end eller lig med 50.')
# Funktion køres med:
checker(40)

# Funktion til at se om værdi er mellem -50 og 50:
def checker2(input_value):
    if input_value > -50 and input_value < 50:
        print('input er indenfor grænserne')
    else: 
        print('input er ikke indenfor grænserne')

# Funktion der tager flere af de samme type inputs og gør noget med allesammen
def multi_checker(*words): # * definerer at den kan tage flere inputs
    for ord in words:
        word_length = len(ord)
        print(word_length)
# Giv funktionen flere inputs
multi_checker('hi', 'world')
```

## Loops

```python
# For loop over liste
for name in sammensat_liste:
    print(name)

# For loop 100 antal gange
for i in range(100):
    print('Ekko')

# For loop der laver liste med 100 første integers
liste3 = [] # tom liste
for i in range(100):
    liste3.append(i)

# While loop der kører indtil der er talt til 100:
n = 0
while n < 100:
    n += 1
    print(n)
```

## Klasse eksempel - Personaledatabase

```python
# Klasse til at tilføje og ændre i personale
class Personale:
    # Constructor/init
    def __init__(self, navn, personale_id,
                 kontor_lokation, stilling):
        # Objektets attributter
        self.navn = navn
        self.personale_id = personale_id
        self.kontor_lokation = kontor_lokation
        self.stilling = stilling
    # Metode
    def skift_lokation(self, ny_kontor_lokation):
        self.kontor_lokation = ny_kontor_lokation

# Opret nyt personalemedlem
p1 = Personale('Ekaterina', 1244, 'Aarhus', 'Leder')
# Brug metode til at relokere personale
p1.skift_lokation('Odense')
# Check at lokationen er skiftet
print(p1.kontor_lokation)
```

