const mongoose      = require('mongoose')
const Fonda    = require('../models/Fonda')

const fondaS = [
  {
    name: 'Centro de Salud',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque tenetur praesentium perferendis, nemo incidunt asperiores. Odio consequuntur laudantium explicabo rem saepe suscipit, adipisci nulla sit cum, magni alias recusandae dolor?',
    img: 'http://mxcity.mx/wp-content/uploads/2015/08/centro-de-salud-pulqueria.jpg',
    location:  {

      // Negativo primero, por que mexico, osea invertirlo al formato que usa mongo
      coordinates: [-99.163221,19.4212956]
    }
  },
  {
    name: 'Taqueria Orinoco',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque tenetur praesentium perferendis, nemo incidunt asperiores. Odio consequuntur laudantium explicabo rem saepe suscipit, adipisci nulla sit cum, magni alias recusandae dolor?',
    img: 'https://www.dondeir.com/wp-content/uploads/2017/12/taqueria-orinoco-tacos-con-estilo-regio-en-la-colonia-roma-02.jpg',
    location:  {
      coordinates:[-99.1670934, 19.4176674]
    }
  },
  {
    name: 'Hamburguesas Mataleon',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque tenetur praesentium perferendis, nemo incidunt asperiores. Odio consequuntur laudantium explicabo rem saepe suscipit, adipisci nulla sit cum, magni alias recusandae dolor?',
    img: 'http://cdn.mexiconewsnetwork.com/uploads/images/16774mataleon3.jpg',
    location:  {
      coordinates: [-99.1678435,19.4202671]
    }
  }
]

mongoose.connect('mongodb://localhost/fondify')
  .then(() => {
    Fonda.create(fondaS)
      .then(fonda => {
        console.log(`You created ${fonda.length} fonda successfully`);
        mongoose.connection.close()
      })
      .catch((err)=>console.log(err))
  })
  .catch(err => {
    console.log(err);
  })
