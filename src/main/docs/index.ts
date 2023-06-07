import components from './components'
import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API notes',
    description: 'API para armazenamento de notas',
    termsOfService: 'Em breve',
    contact: {
      email: 'suporte@teste.com.br'
    },
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:5051/api/',
      description: 'API Notes'
    }
  ],
  paths,
  schemas,
  components
}
