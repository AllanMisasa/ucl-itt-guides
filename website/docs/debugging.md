---
title: Debugging og fejlfinding
---

## Øvelser

### Enkel fejlfinding

En udvikler har været lidt hurtig... Kan ud fikse alle fejlene i deres kode?

```python
greeting = input("Hello, possible pirate! What's the password?)
if greeting in ["Arrr!"):
    print("Go away, pirate.")
elif
print("Greetings, hater of pirates!")
```

### 2 bugs... 3 bugs at fikse

Der er et par fejl... eller 3. Kan du sørge for at koden virker med alle testlinjerne?

```python
def temperatur_check(temperatur):
    if temperatur <= 18:
        print("Du burde tænde for varmen.")
    if temperatur > 17 && temperatur < 23:
        print("Temperaturen burde være behagelig.")
    else:
        print("Det er for varmt! Sluk for varmen!")

'''brug følgende linjer for at teste funktionen. 
temperaturer = [15, 20, 25, 18]
temperatur_check(temperaturer[0])
temperatur_check(temperaturer[1])
temperatur_check(temperaturer[2])
'''
```

### Hvis fejl er det?

Er det her en brugerfejl eller udviklerens fejl? Altså vil du fikse fejlen ved at ændre i funktionen, hvad brugeren må skrive, eller med exception handling? Dit valg, men du bedes beskrive hvorfor du valgte at fikse det som du gjorde.

```python
def get_element(lst, index):
    if index < 0 or index >= len(lst):
        return "Index out of range"
    return lst[index]

'''
my_list = [1, 2, 3, 4, 5]
print(get_element(my_list, 2)) 
print(get_element(my_list, 5)) 
'''
```

### Håndtering af undtagelser

I denne opgave skal du sørge for at brugeren må indtaste tallet som en string uden at programmet crasher.

```python
def divide():
    x = int(input("Enter numerator: "))
    y = int(input("Enter denominator: "))
    return x / y
```

### Hvad for en undtagelse? 

Tilpas except-blokken så den håndterer den specifikke undtagelse der opstår når man køre den.

```python	
def fil_åbner():
    try:
        f = open("fil.txt", "r")
        print(f.read())
    except:
        print("Noget gik galt")
```

### Ekstra opgave for ekstra udfordring

Flere fejl der skal fikses, men kan du finde dem alle og fikse dem?

```python
def get_authors():
    authrs = { # Dictionary med forfattere og deres dødsår
        "Charles Dickens": "1870",
        "William Thackeray": "1863",
        "Anthony Trollope": "1882",
        "Gerard Manley Hopkins": "1889"

    for author date in authors.items{}:
        print "%s" % authors + " died in " + "%d." % Date
    } 
```