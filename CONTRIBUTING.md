# Guía de Contribución

## Áreas Prioritarias de Mejora

### 1. Refactorización de la Arquitectura
- Separar la configuración de los modelos 3d a un archivo JSON independiente
  ```json
  models/config.json
  ```
- Crear módulos separados para cada funcionalidad principal
  ```plaintext
  public/js
  ├── modelConfig.js    # Configuración de modelos
  ├── modalHandler.js   # Lógica del modal
  ├── controls.js       # Controles de interacción
  └── renderer.js       # Lógica de renderizado
  ```

### 2. Mejoras en la Interfaz de Usuario
- Mejorar la accesibilidad
- Optimizar para dispositivos móviles

### 3. Optimización del Código
- Optimizar el rendimiento del renderizado
- Reducir la duplicación de código
- Mejorar el manejo de errores

## Estándares de Código

### JavaScript
- Implementar manejo de errores

### HTML/CSS
- Asegurar responsividad

## Proceso de Contribución

1. Fork el repositorio
2. Crear una rama para tu feature
   ```bash
   git checkout -b feature/nombre-feature
   ```
3. Realizar cambios siguiendo los estándares
4. Documentar cambios
5. Enviar Pull Request

## Testing

- Probar en diferentes dispositivos
- Validar rendimiento

## Reportar Issues

- Bugs
- Mejoras
- Nuevas características

## Recursos Útiles

- [Documentación p5.js](https://p5js.org/reference/)
