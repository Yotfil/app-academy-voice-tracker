# App Academy Voice Tracker

Aplicación web para registrar y hacer seguimiento de la rutina diaria de ejercicios de voz y comunicación.

---

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| Angular | 20 | Framework principal |
| Angular Material | 20 | Componentes UI |
| Tailwind CSS | 4 | Utilidades de estilo |
| Angular CDK | 20 | BreakpointObserver, Layout |
| RxJS | 7.8 | Programación reactiva |
| Day.js | 1.11 | Manejo de fechas |
| TypeScript | 5.8 | Tipado estático |

---

## Comandos

```bash
npm start       # Servidor de desarrollo → http://localhost:4200
npm run build   # Build de producción → dist/
npm test        # Unit tests con Karma + Jasmine
```

---

## Arquitectura

El proyecto sigue una arquitectura en capas orientada a la separación de responsabilidades y preparada para sustituir la capa de datos en el futuro (JSON estático → API REST).

```
src/app/
├── core/
│   ├── adapters/          ← Implementaciones concretas de puertos
│   ├── constants/         ← Datos estáticos (nav links, etc.)
│   ├── models/            ← Interfaces de dominio
│   ├── ports/             ← Abstracciones / contratos (InjectionTokens)
│   └── services/          ← Lógica de negocio y orquestación
│
├── features/              ← Módulos de funcionalidad (lazy loaded)
│   ├── dashboard/
│   ├── exercise/          ← Card de un ejercicio individual
│   ├── exercises/         ← Lista de ejercicios del día
│   ├── profile/
│   ├── routine/
│   └── tools/
│
└── shared/
    └── components/
        ├── header/        ← Sidenav + toolbar responsive
        ├── footer/
        └── not-found/
```

---

## Patrón Port / Adapter

La persistencia está desacoplada del servicio mediante un `InjectionToken`:

```ts
// Puerto (contrato)
export interface StoragePort {
  saveRoutine(routine: Rutina): void;
  getRoutine(date: string): Rutina | null;
}
export const STORAGE_PORT = new InjectionToken<StoragePort>('STORAGE_PORT');

// Adaptador actual (localStorage)
// Para cambiar a IndexedDB o API: crear nuevo adaptador e intercambiar en app.config.ts
{ provide: STORAGE_PORT, useClass: LocalStorageAdapter }
```

### Migración a API

Cuando exista un backend, solo hay que:

1. Cambiar `loadDefaultRoutine()` en `RoutineService` para usar `HttpClient`.
2. Crear un `ApiAdapter` que implemente `StoragePort` con llamadas HTTP.
3. Actualizar el `provide` en `app.config.ts`.

---

## Rutas

| Ruta | Componente | Estado |
|---|---|---|
| `/` | → redirect a `/routine` | — |
| `/routine` | `Routine` | Activo |
| `/exercises` | `Exercises` | Activo |
| `/exercise/:id` | `Exercise` | Activo |
| `/dashboard` | `Dashboard` | En desarrollo |
| `/tools` | `Tools` | En desarrollo |
| `/profile` | `Profile` | En desarrollo |
| `/**` | → redirect a `/routine` | — |

Todas las rutas usan **lazy loading** con `loadComponent`.

---

Contiene grupos de ejercicios de voz, articulación, respiración y comunicación. Se carga una vez al día (primera apertura) y se guarda en `localStorage` con la clave `routine-YYYY-MM-DD`.
