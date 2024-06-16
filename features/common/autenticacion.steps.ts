import { Given } from '@cucumber/cucumber'
import testContext from 'features/helpers/context'

Given('que estoy autenticado como editor', async () =>  {
  
  testContext.token = await autenticarUsuario('editor')
  console.log('Autenticando editor')
  
  return 'success'
})

Given('que estoy autenticado como editor', async () =>  {
  testContext.token = await autenticarUsuario('editor')

  return 'success'
});


async function autenticarUsuario(rol: string) {
  // TODO: mock de autenticación
  const token = rol? `Bearer supertoken${rol}`: ""
  return token
}

