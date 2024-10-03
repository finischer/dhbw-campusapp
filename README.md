# DHBW CampusApp

Die DHBW CampusApp ist eine mobile Anwendung, die speziell für Studierende der Dualen Hochschule Baden-Württemberg (DHBW) entwickelt wurde. Sie unterstützt Studierende dabei, ihren Studienalltag einfacher zu organisieren und bietet Zugriff auf wichtige Campus-Informationen.

## 📋 Features

- **Stundenplan**: Anzeige des aktuellen Stundenplans mit detaillierten Informationen zu den Vorlesungen.
- **Campusplan**: Übersicht und Standortanzeige der wichtigsten Einrichtungen auf dem Campus.
- **Notensystem (Dualis)**: Abrufen von aktuellen Noten aus dem Dualis-System.
- **Kantinenplan**: Tagesaktuelle Informationen zu den Gerichten in der Mensa.
- **Benachrichtigungen**: Verwaltung und Anzeige von Push-Benachrichtigungen.
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
