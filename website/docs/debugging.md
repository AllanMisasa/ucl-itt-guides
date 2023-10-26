---
title: Debugging og fejlfinding
---

## Debugging terminologi i Python

### Hvad er debugging?

Debugging er en systematisk metode til at finde fejl i kode, årsagen til disse fejl, samt hvor og hvornår de opstår. Det er stadig op til programmøren at finde en rettelse, men debugging gør det meget nemmere at finde ud af hvad i skal fokusere på. Samtidigt kan debugging også hjælpe jer med at se hvad der sker når i kører en kode, selvom i måske allerede har en idé om hvordan det virker.

### Fejltyper i Python

`SyntaxError` er den mest almindelige fejl i Python. Den opstår når Python ikke kan forstå koden. Det kan være fordi der mangler en parentes, en kolon, eller noget helt tredje. Det er nemt at finde disse fejl, da Python fortæller jer præcis hvor fejlen er.

`NameError` opstår når Python ikke kan finde en variabel eller funktion. Det kan være fordi i har stavet det forkert, eller fordi i har glemt at definere det. I kan også få denne fejl hvis i prøver at bruge en variabel eller funktion uden for dens scope.

`TypeError` opstår når i prøver at bruge en variabel eller funktion på en måde som ikke er tilladt. Det kan være at i prøver at lægge en string og en integer sammen, eller at i prøver at bruge en funktion på en variabel som ikke er af den rigtige type.

`IndexError` opstår når i prøver at bruge en liste eller et array med et index som ikke findes. Det kan være at i prøver at bruge et index som er større end længden af listen, eller at i prøver at bruge et negativt index.

`ValueError` opstår når i prøver at bruge en variabel eller funktion med en værdi som ikke er tilladt. Det kan være at i prøver at bruge en funktion med en string som ikke er et tal, eller at i prøver at bruge en funktion med et tal som ikke er et heltal.

`KeyError` opstår når i prøver at bruge en dictionary med en nøgle som ikke findes. Det kan være at i prøver at bruge en nøgle som ikke er en string, eller at i prøver at bruge en nøgle som ikke findes i dictionaryen.

`AttributeError` opstår når i prøver at bruge en klasse eller et objekt med en attribut som ikke findes. Det kan være at i prøver at bruge en attribut som ikke er en string, eller at i prøver at bruge en attribut som ikke findes i klassen eller objektet.

`ImportError` opstår når i prøver at importere en pakke eller et modul som ikke findes. Det kan være at i har stavet det forkert, eller at i har glemt at installere det.

`IndentationError` opstår når i ikke har indrykket jeres kode korrekt. Det kan være at i har glemt at indrykke, eller at i har indrykket for meget eller for lidt.

`IOError` opstår når i prøver at læse eller skrive til en fil som ikke findes. Det kan være at i har stavet filnavnet forkert, eller at i har glemt at oprette filen.

`KeyboardInterrupt` opstår når i afbryder jeres program med `CTRL+C`. Det kan være at i har glemt at tilføje en `try`/`except`-blok, eller at i har glemt at tilføje en `while`-løkke.

### Exceptions

Exceptions er en måde at håndtere fejl på. I kan bruge `try`/`except`-blokke til at håndtere exceptions, altså de errors der er listet ovenfor. Dvs. vi kan sørge for at i stedet for at programmet bare stopper, så kan vi programmere en reaktion på bestemte typer errors.

Eksempel på en generel `try`/`except`-blok der reagerer på alle typer fejl:

```python
try:
    # Kode som kan give en exception
except:
    # Kode som skal køres hvis der opstår en exception
```

Mere specifikt for at fange et KeyboardInterrupt:

```python
try:
    # Kode som kan give en exception
except KeyboardInterrupt:
    # Kode som skal køres hvis der opstår en KeyboardInterrupt
```

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