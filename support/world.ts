import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
  constructor() {
    // Inicializar el contexto compartido
  }
}

setWorldConstructor(CustomWorld);
