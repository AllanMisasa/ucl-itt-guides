---
title: Flash MicroPython på ESP32
---

# Guide til første gang: Flash ESP32 fra bunden

## Step 1: Download MicroPython firmware

Download den nyeste MicroPython firmware til ESP32 fra [MicroPython's officielle side](https://micropython.org/download/esp32/). Da denne guide er skrevet er det `v1.20.0 (2023-04-26) .bin`.

## Step 2: Installer USB driver til ESP32

Hvis du ikke allerede har installeret USB driveren til ESP32, så gør det nu. Du kan finde den [her](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads).

Hvis du kører Windows er der CP210x Universal Windows Driver, og hvis du kører Mac er der CP210x Macintosh OSX VCP Driver. Hvis du kører Linux, så er der en driver til Linux, men kan ikke garantere at det virker på din præcise Linux distribution, ej heller om det overhovedet er nødvendigt med en driver i det tilfælde.

## Step 3: Installer Thonny IDE

Thonny er en IDE (Integrated Development Environment) som er cpecielt god til at programmere de mest populære microcontrollere med MicroPython. Du kan downloade den [her](https://thonny.org/).

## Step 4: Installer firmwaren på ESP32

Åben Thonny og tilslut din ESP32 til computeren. Klik på `Run`, så `Configure interpreter` og vælg `Flash MicroPython firmware to ESP`. Vælg den firmware du downloadede i step 1 og tryk `install`.

Det næstsidste vindue i processen er vist herunder:

![Flash MicroPython firmware to ESP](/website/static/img/thonny_micro.png)


# Guide til re-flash: Flash ESP32 med eksisterende firmware og esptool.py allerede installeret

## Step 1: Find portnummer

Find portnummeret via enhedshåndtering (device manager):

![Device manager](https://i.imgur.com/6xwUbby.png)

Her er det f.eks. 
```COM3```
 porten at min ESP32 er på.

## Step 2: Formater eksisterende flash

Åben din terminal eller kommandoprompt og brug følgende kommando (husk at skift portnummeret til det du selv fandt i step 1):

```esptool.py --chip esp32 --port COM3 erase_flash```

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
