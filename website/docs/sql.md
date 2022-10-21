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