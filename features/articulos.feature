Feature: Gestionar Artículos

  Scenario: Crear un nuevo artículo
    Given que estoy autenticado como editor
    When creo un nuevo artículo con título "Pruebas en NestJS" y contenido "Cómo probar aplicaciones NestJS" en la categoría "Tecnología"
    Then el artículo debe ser creado con el estado "BORRADOR"

