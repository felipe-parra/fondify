const mongoose      = require('mongoose')
const Menu    = require('../models/Menu')

const menuSchema = [
  {
  name: '2019-04-30',
  firstTime: 'Consome',
  secondTime: 'Sopa de Arroz',
  mainOne: 'Enchiladas',
  mainTwo: 'Milanesa de pollo',
  mainThree: 'Tacos de Pastor',
  drink: 'Agua de Horchata',
  fonda:'5cc758abd040196f61153b94'
  },
  {
  name: '2019-04-30',
  firstTime: 'Arroz',
  secondTime: 'Pasta de Coditos',
  mainOne: 'Mole Rojo',
  mainTwo: 'Pozole',
  mainThree: 'Carnitas',
  drink: 'Agua de Jamaica',
  fonda:'5cc758abd040196f61153b95'
  },
]

mongoose.connect('mongodb://localhost/fondify')
  .then(() => {
    Menu.create(menuSchema)
      .then(menus => {
        console.log(`You created ${menus.length} menus successfully`);
        mongoose.connection.close()
      })
      .catch((err)=>console.log(err))
  })
  .catch(err => {
    console.log(err);
  })

