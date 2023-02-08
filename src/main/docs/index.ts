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
      url: 'http://localhost:5050/api/',
      description: 'API Notes dev local'
    },
    {
      url: 'http://localhost:5051/',
      description: 'API Notes dev docker'
    },
    {
      url: 'http://www.teste.com.br/',
      description: 'API Notes produção'
    }
  ],
  paths,
  schemas,
  components
}
