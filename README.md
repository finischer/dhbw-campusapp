<img src="assets/images/icon.png" alt="drawing" width="100" style="border-radius: 10px" />

# DHBW CampusApp

Die DHBW CampusApp ist eine mobile Anwendung, die speziell für Studierende der Dualen Hochschule Baden-Württemberg (DHBW) entwickelt wurde. Sie unterstützt Studierende dabei, ihren Studienalltag einfacher zu organisieren und bietet Zugriff auf wichtige Campus-Informationen.

Die DHBW CampusApp ist eine mobile Anwendung, die speziell für Studierende der Dualen Hochschule Baden-Württemberg (DHBW) entwickelt wurde. Sie unterstützt Studierende dabei, ihren Studienalltag einfacher zu organisieren und bietet Zugriff auf wichtige Campus-Informationen.

## 📲 Download

Lade die App direkt aus dem entsprechenden Store herunter:

[![Download on the App Store](https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg)](https://apps.apple.com/de/app/dhbw-campusapp/id6446231349)

[![Get it on Google Play](https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg)](https://play.google.com/store/apps/details?id=com.niklasfischer0.dhbwcampusapp)

## 📋 Features

- **Stundenplan**: Anzeige des aktuellen Stundenplans mit detaillierten Informationen zu den Vorlesungen.
- **Campusplan**: Übersicht und Standortanzeige der wichtigsten Einrichtungen auf dem Campus.
- **Notensystem (Dualis)**: Abrufen von aktuellen Noten aus dem Dualis-System.
- **Kantinenplan**: Tagesaktuelle Informationen zu den Gerichten in der Mensa.
- **Mehrsprachigkeit**: Unterstützung von mehreren Sprachen (Deutsch, Englisch, Spanisch).

## 🔧 Technologien

- **Frontend**: React Native (TypeScript)
- **State Management**: React Context-API
- **Navigation**: React Navigation
- **Styling**: Vanilla Stylesheet API
- **Datenmanagement**: AsyncStorage zur lokalen Datenhaltung. Es werden keine Daten in einer Datenbank erhoben.

## 🚀 Installation & Setup

1. **Repository klonen:**
   ```bash
   git clone https://github.com/finischer/dhbw-campusapp.git
   ```
2. **In das Projektverzeichnis wechseln:**
   ```bash
   cd dhbw-campusapp
   ```
3. **Abhängigkeiten installieren:**

   ```bash
   npm install
   ```

4. **`eas.json` ins Root-Verzeichnis hinzufügen (Anfrage für Datei bei Besitzer stellen)**

5. **App starten:**
   - Für iOS:
     ```bash
     npm run ios
     ```
   - Für Android:
     ```bash
     npm run android
     ```

## 📁 Projektstruktur

Das Projekt ist modular aufgebaut, um die Lesbarkeit und Wartbarkeit zu verbessern:

- **`/src/constants`**: Enthält globale Konstanten, Übersetzungen und Typografiedefinitionen.
- **`/src/hooks`**: Enthält wiederverwendbare Custom Hooks, wie `useDualis`, `useLectures` und `useSecureStorage`.
- **`/src/infrastructure/navigation`**: Konfiguration der Navigationsstruktur der App.
- **`/src/screens`**: Alle Bildschirmkomponenten, wie z.B. `CalendarScreen`, `LectureInformationScreen` und `MoreScreen`.
- **`/src/services`**: Schnittstellen zu externen Services und Bibliotheken, z.B. `axios`-Konfiguration.
- **`/src/utilities`**: Hilfsfunktionen zur Validierung, Sortierung und Verwaltung von Zuständen.

## 🌍 Übersetzungen

Das Projekt unterstützt aktuell die folgenden Sprachen:

- Deutsch (`de`)
- Englisch (`en`)
- Spanisch (`es`)

Jede Sprache hat eine eigene Übersetzungsdatei unter `src/constants/translations/`, die je nach Benutzereinstellung geladen wird.
