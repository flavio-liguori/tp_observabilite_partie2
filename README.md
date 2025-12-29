
# TP Observabilité - Partie 2 : Traçage Distribué

Système complet de traçage "End-to-End" (Frontend → Backend → Base de données) utilisant OpenTelemetry et Zipkin.

## Stack Technique
* **Frontend** : React + Vite (Instrumenté avec OpenTelemetry JS)
* **Backend** : Spring Boot 3 (Micrometer Tracing + Brave)
* **Observabilité** : Zipkin
* **Simulation** : Puppeteer

## Démarrage Rapide

### 1. Infrastructure (Zipkin)
Lancer le conteneur Zipkin pour la collecte des traces.
```bash
docker-compose up -d
# Interface Zipkin accessible sur http://localhost:9411

```

### 2. Backend (Spring Boot)

Démarrer l'API REST.

```bash
cd backend
mvn spring-boot:run
# API sur http://localhost:8081

```

### 3. Frontend (React)

Installer les dépendances et lancer l'application.

```bash
cd frontend
npm install
npm run dev
# Interface sur http://localhost:5173

```

### 4. Simulation de Trafic (Optionnel)

Générer du trafic utilisateur automatisé pour créer des traces.

```bash
cd frontend
node simulate_traffic.js

```
