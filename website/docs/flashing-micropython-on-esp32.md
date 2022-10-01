---
title: Flash MicroPython på ESP32
slug: /
---

# Guide til første gang: Flash ESP32 fra bunden

If you haven't already, generate a new Docusaurus site using the classic template:

# Guide til re-flash: Flash ESP32 med eksisterende firmware og esptool.py allerede installeret

## Step 1: Find portnummer

Find portnummeret via enhedshåndtering (device manager):

![Device manager](https://i.imgur.com/6xwUbby.png)

Her er det f.eks. 
```COM3
```
 porten at min ESP32 er på.

## Step 2: Formater eksisterende flash

Åben din terminal eller kommandoprompt og brug følgende kommando (husk at skift portnummeret til det du selv fandt i step 1):

```esptool.py --chip esp32 --port COM3 erase_flash
```

## Step 3: Skift sti til der hvor din MicroPython firmware er gemt

Stadig i terminal/CMD, gå til stien hvor din MicroPython firmware er gemt. 

* Hvis gemt i downloads/overførsler:
    ```cd downloads```
* Hvis gemt andet sted, skift downloads ud med den absolutte path - f.eks.:
    ```cd C:\lib\firmware```

## Step 4: Flash ESP32 med MicroPython firmware

Brug følgende kommando, men husk at ændre COM porten og filnavnet:

```esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 esp32.bin```

## That's it!

Tillykke! Din ESP32 er flashed og klar til alle de projekter vi skal bygge!
