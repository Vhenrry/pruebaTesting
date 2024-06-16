## Configuración del Proyecto

### Requisitos

- Node.js v20 o superior
- Acceso a Internet para descargar el proyecto

### Instrucciones de ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Vhenrry/pruebaTesting.git
   ```
2. Instala las dependencias:
   ```bash
   $ npm install
   ```
   
## Instrucciones de ejecución de Testing

1. Test completo borradores:
   ```bash
   $ npm run test:borradores
   ```
## Instrucciones de ejecución de Testing de pruebas unitarias y de Integracion

### Pruebas Unitarias del servicio
   ```bash
   $ npm run test borradores.service.spec.ts
   ```

### Pruebas Unitarias del repository
   ```bash
   $ npm run test borradores.repository.spec.ts
   ```

### Pruebas Unitarias del controller
   ```bash
   $ npm run test borradores.controller.spec.ts
   ```

### Pruebas Integracion del servicio
   ```bash
   $ npm run test borradores.controller.integration.spec.ts
   ```
