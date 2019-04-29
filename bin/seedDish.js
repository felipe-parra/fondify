const mongoose    = require('mongoose')

const dishes = [{
  name: 'Tamal Oaxaqueño',
  meal: 'Plato Fuerte'
}, 
{
  name: 'Tacos Dorados',
  meal: 'Plato Fuerte'
}]

mongoose.connect('mongodb://localhost/fondify')
  .then(() => {
    Dish.create(dishes)
      .then(dish => {
        console.log(`You created ${dish.length} dishes successfully`);
        mongoose.connection.close()
      })
      .catch((err)=>console.log(err))
  })
  .catch(err => {
    console.log(err);
  })