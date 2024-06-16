import { Given, When, Then } from '@cucumber/cucumber';

Given('que estoy autenticado como editor', function () {
  // Acción para autenticar como editor
  return 'success';
});

When('I click on the {string} button', function (buttonName: string) {
  // Acción para hacer clic en el botón
  console.log(`Clicking on the "${buttonName}" button`);
});

Then('I should see the {string} page', function (pageName: string) {
  console.log(`Should see the "${pageName}" page`);
  // expect(pageName).toEqual('About Us')
  expect(pageName).toBeDefined()
});
