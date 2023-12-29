---
title: Guide til forskellene mellem Python og C++
---

## Indledning

Skiftet fra et programmeringssprog til et andet kan nogle gange være en stor mundfuld. Heldigvis er Python stærkt inspireret af mange tidligere programmeringssprog, og derfor er der mange ligheder mellem Python og C++. Denne guide giver en hurtigt intro til de vigtigste forskelle, så du kan komme hurtigt i gang med at programmere i C++ når du allerede kan lidt Python.

## Variabler og typestærkhed

De basale variabler og typer er stort set ens med Python, med et lille ekstra twist - at typen skal defineres før variabelnavnet. Se følgende eksempel:

```cpp
int a = 5;
float b = 3.14;
char c = 'a';
string d = "Hello World";
```

Når det så kommer til datastrukturer bliver det lidt anderledes. List er den typiske datastruktur i Python, men i C++ bruger vi i stedet for arrays. Et array er en samling af variabler af samme type, som kan tilgås ved hjælp af et index. Se følgende eksempel:

```cpp
int myArray[5] = {1, 2, 3, 4, 5};
string myStringArray[3] = {"Hello", "World", "!"};
```

## Loops

Et for loop over et array ser således ud:

```cpp
for (int i = 0; i < 5; i++) {
    cout << myArray[i] << endl;
}
```

Læg mærke til at vi bruger `cout` i stedet for `print` til at printe til konsollen. `endl` er en måde at lave et linjeskift på. Det andet `i` i for loopet er en iterator, som er en variabel der tæller op hver gang loopet kører. I dette tilfælde starter den på 0, og tæller op med 1 hver gang loopet kører. Når den når 5, stopper loopet.

## Funktioner

Når vi definerer en funktion i C++, skal vi også definere hvilken type den returnerer, samt hvilke typer inputs er. Se følgende eksempel:

```cpp
int add(int a, int b) {
    return a + b;
}
```

Et andet eksempel hvor vi behandler et billede i OpenCV:

```cpp
Mat threshold(Mat image, int threshold) {
    Mat result;
    threshold(image, result, threshold, 255, THRESH_BINARY);
    return result;
}
```

Læg mærke til typen `Mat`, som er OpenCV's egen typedefinition til billeder. Derudover definerer vi også et nyt variabel `result` inde i funktionen, som vi kan bruge til at returnere resultatet til sidst.

Hvis en funktion ikke skal returnere noget kan vi bruge typen `void`:

```cpp
void printHello() {
    cout << "Hello World" << endl;
}
```

`void` bruger vi ofte når vi f.eks. skal vise noget på skærmen.
