---
title: SQL kommando cheat sheet
---

## Intro

Dette cheat sheet tager udgangspunkt i Chinook SQLite databasen der kan downloades på følgende hjemmeside: https://www.sqlitetutorial.net/sqlite-sample-database/

## Basale kommandoer

### SELECT statement

**Vælg alt fra bestemt tabel**

```sql
SELECT * FROM artists
```

**Vælg bestemt kolonne fra bestemt tabel**

```sql
SELECT composer from tracks
```

**Vælg alt fra tabel baseret på noget fra en anden tabel**

```sql
SELECT * FROM tracks WHERE composer IN (SELECT Name FROM artists)
```

**Vælg alt fra tabel hvor der er en bestemt værdi i kolonne**

```sql
SELECT * FROM tracks WHERE composer IN ('AC/DC')
```

### INSERT statement

**Indsæt bestemte værdier i ny række i bestemt tabel**

```sql
INSERT INTO artists (name) VALUES ('Ne Obliviscaris')
```

### CREATE TABLE

Ikke baseret på tidligere database. 

**Lav ny tabel med primary som automatisk giver unikt ID**

```sql
CREATE TABLE table_name (
    unique_id INTEGER PRIMARY KEY AUTOINCREMENT,
    some_data TEXT
)
```

Primary key betyder cellerne i kolonnen skal være unikke, og de må ikke være NULL. 

Autoincrement betyder at hver gang et row bliver fyldt ud, så bliver kolonnen automatisk inkrementeret med 1. 

**Lav ny tabel med reference til ID fra anden table**

```sql
CREATE TABLE table_name_1 (
    some_data TEXT NOT NULL
    reference_id INTEGER NOT NULL
    FOREIGN KEY (reference_id)
    REFERENCES table_name (unique_id)
)
```

Lær mærke til at det refererer direkte til det bestemte ID fra tabellen fra det første `CREATE TABLE` eksempel.