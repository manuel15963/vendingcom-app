# VendingCom Auth Frontend Structure

Esta estructura sigue un modelo por capas para Ionic/Angular standalone y se alinea con el Auth Service desplegado en Render.

Base URL:

```text
https://vendingcom-auth-service.onrender.com/api/v1
```

## Capas

- `core`: infraestructura global de la app.
- `features`: funcionalidades de negocio separadas por dominio.
- `shared`: contratos reutilizables entre features.

## Carpetas principales

```text
src/app/
  core/
    config/
      api-endpoints.ts
    guards/
      auth.guard.ts
    interceptors/
      auth-token.interceptor.ts
    services/
      auth.service.ts
      token.service.ts
    storage/
      token-storage.service.ts
  features/
    auth/
      data-access/
        auth-api.service.ts
      models/
        auth.models.ts
        user.models.ts
      pages/
        login/
          login.page.html
          login.page.scss
          login.page.ts
    dashboard/
      pages/
        dashboard/
          dashboard.page.html
          dashboard.page.scss
          dashboard.page.ts
  shared/
    models/
      api-response.models.ts
      audit.models.ts
```

## Regla de crecimiento

- Una pantalla nueva va en `features/<dominio>/pages`.
- Una llamada HTTP va en `features/<dominio>/data-access`.
- Interfaces de ese dominio van en `features/<dominio>/models`.
- Guards, interceptors y configuracion global van en `core`.
- Modelos usados por varias features van en `shared`.

## Auth Service

Los endpoints se centralizan en `src/app/core/config/api-endpoints.ts`. Si el backend cambia de dominio, puerto o prefijo, se ajusta `apiUrl` en `src/environments/environment.ts`.

## Servicios integrados

### Autenticacion

Servicio: `src/app/features/auth/data-access/auth-api.service.ts`

- `POST /auth/login`: `login(request)`
- `GET /auth/me`: `me()`

### Contrasenas

Servicio: `src/app/features/password/data-access/password-api.service.ts`

- `PATCH /auth/password/me`: `changeMyPassword(request)`
- `POST /auth/password/recovery/request`: `requestRecovery(request)`
- `POST /auth/password/recovery/confirm`: `confirmRecovery(request)`

### Usuarios

Servicio: `src/app/features/users/data-access/users-api.service.ts`
Pantalla: `src/app/features/admin/pages/admin-panel/admin-panel.page.ts`

- `GET /auth/users`: `findAll(params)`
- `GET /auth/users/{userId}`: `findById(userId)`
- `GET /auth/users/search?username=`: `findByUsername(username)`
- `POST /auth/users`: `create(request)`
- `PUT /auth/users/{userId}`: `update(userId, request)`
- `DELETE /auth/users/{userId}`: `deactivate(userId)`
- `PATCH /auth/users/{userId}/activate`: `activate(userId)`
- `PATCH /auth/users/{userId}/lock`: `lock(userId)`

### Roles

Servicio: `src/app/features/roles/data-access/roles-api.service.ts`
Pantalla: `src/app/features/admin/pages/admin-panel/admin-panel.page.ts`

- `GET /auth/roles?activeOnly=`: `findAll(params)`
- `GET /auth/roles/search?roleCode=`: `findByRoleCode(roleCode)`

### Auditoria

Servicio: `src/app/features/audit-logs/data-access/audit-logs-api.service.ts`
Pantalla: `src/app/features/admin/pages/admin-panel/admin-panel.page.ts`

- `GET /auth/audit-logs`: `findAll()`
- `GET /auth/audit-logs/user/{userId}`: `findByAffectedUserId(userId)`
- `GET /auth/audit-logs/action/{actionType}`: `findByActionType(actionType)`

## Seguridad

- Interceptor funcional para enviar `Authorization: Bearer <token>` solo a la API configurada.
- Interceptor de errores para limpiar sesion y volver a `/login` ante `401`.
- Guard para proteger rutas internas.
- Guard de administracion para permitir `/admin` solo a `ADMIN` y `SUPERVISOR`.

## UX de administracion

- `/admin`: panel operativo para usuarios, roles y auditoria.
- Crear/editar usuario se hace en panel visible dentro de la pantalla para evitar friccion de modales.
- Acciones sensibles de usuario piden confirmacion.
- Exitos y errores se muestran con toasts Ionic.
- Validaciones frontend alineadas con DTOs del backend.

## Perfil

- `/profile`: consume `GET /auth/me` y muestra datos del usuario autenticado.

## Pendiente de backend

La base de datos incluye `auth_parameters`, pero el backend analizado no expone endpoints REST para parametros. Cuando existan endpoints para parametros, crear:

- `features/parameters/data-access/parameters-api.service.ts`
- `features/parameters/models/parameter.models.ts`
- seccion `Parametros` dentro del panel admin o una ruta propia si crece demasiado.

## Siguiente fase

La regla es mantener cada dominio con `data-access`, `models` y `pages` propios, sin mezclar la UI con detalles HTTP. Las pantallas de administracion se pueden crear sobre los servicios ya integrados.
