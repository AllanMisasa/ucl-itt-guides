---
title: Basale operationer i OpenCV
---

## Læs, vis og skriv billeder

For at læse et billede ind i OpenCV bruger vi funktionen `imread`. Den tager en sti til et billede som input, og returnerer et billede i OpenCV's egen datatype `Mat`. For at skrive et billede til disk bruger vi funktionen `imwrite`. Den tager en sti til hvor billedet skal gemmes, samt et billede som input.
For at vise et billede på skærmen bruger vi funktionen `imshow`. Den tager et navn til vinduet, samt et billede som input. Se følgende eksempel:

```cpp
Mat image = imread("C:/images/lena.jpg"); // Read the file from disk
imshow("Lena", image); // Show the image
waitKey(0); // Wait for keypress
imwrite("C:/images/lena_copy.jpg", image); // Write the image to disk
```

## Gråtonebilleder

Et billede i OpenCV er en 2-dimensionel matrix, hvor hver pixel indeholder intensitet.

Et gråtonebillede er et billede hvor hver pixel kun indeholder en intensitet. Det kan vi lave ved at konvertere billedet til gråtone med funktionen `cvtColor`. Den tager et billede som input, samt en konverteringskode. For at konvertere til gråtone bruger vi `COLOR_BGR2GRAY`. Se følgende eksempel:

```cpp
Mat image = imread("C:/images/lena.jpg"); // Read the file from disk
Mat grayImage; // Create a new empty image
cvtColor(image, grayImage, COLOR_BGR2GRAY); // Convert to grayscale
imshow("Lena", grayImage); // Show the image
waitKey(0); // Wait for keypress
imwrite("C:/images/lena_gray.jpg", grayImage); // Write the image to disk
```
