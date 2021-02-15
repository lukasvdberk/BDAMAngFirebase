# BDAM Angular Firebase Challengeweek
Dit project bestaat uit de volgende stukken software: 
- Angular project (Scoreboard, Admin paneel en battle applicatie)
- NodeJS applicatie (Raspberry PI RFID lezer en schrijver)
- Firebase Firestore en Authentication (Web project)

## Benodigdheden
- Een Raspberry PI met internet verbinding (Pi Zero werkt ook, maar je NodeJS installatie moet wel voldoen aan de ARM6 achitectuur)
- RFID-RC522 chip (https://nl.aliexpress.com/wholesale?catId=0&initiative_id=SB_20210215045723&SearchText=rfid-rc522)
- RFID tags
- Een firebase project

## Aantekeningen
- **Dit project maakt gebruik van Firebase Firestore en Firebase Authenticator**
- **Bij een nieuw project zal het scoreboard niet gelijk werken en errors in de console opleveren. Log eerst als administrator in (Dit vult de firestore database)**

## Firebase (Hieronder wordt uitgelegd hoe je het project met een eigen firebase project kan opstellen)
- Administrator accounts zijn gekoppeld aan firebase authenticator. Maak in firebase authentication een gebruiker aan om gebruik te kunnen maken van administrator features.
- NodeJS: Projectinstellingen -> Serviceaccounts -> Nieuwe privésleutel genereren. Plaats het JSON bestand in dezelfde map van pokemon.js
- Angular: Open het project in een IDE en maak in de SRC map een "environments" folder. Maak een nieuw bestand en noem deze environment.prod.ts en vul deze met de volgende data: 
```typescript
export const environment = {
  production: false,
  firebase: {
   // Stop hier alle de JSON info van jouw firebase project (Projectinstellingen -> Algemeen -> Firebase SDK Snippet)
  }
};
```

**© HSLeiden 2020-2021**
