const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
let pokemons = {}
var deckCards = {}
let cards = {}


app.use(cors())
app.use(express.json()) //recognize the incoming Request Object as a JSON Object
app.use(express.urlencoded({ //recognize the incoming Request Object as strings
  extended: true
}))

app.get('/:pokemon_name', (req,res) =>
{
    let pokemon_name_api = req.params["pokemon_name"]
    //console.log(pokemon_name_api);
    console.log("call received");

    if (pokemons[pokemon_name_api]){    
        console.log("Pokemon already gotten")
        res.send(pokemons[pokemon_name_api])
      }
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon_name_api}`) 
    .then(pokemon_response => {
      pokemons[pokemon_name_api] = pokemon_response.data;
      console.log(pokemons[pokemon_name_api].name);
      res.send(pokemon_response.data);
    }).catch(function(error) {
		console.log("error server");
        console.log(error);
        res.status(404).send({message: 'Not found.'});
    });
  console.log("when the axios get call is in progress")
}
)

app.post('/createCard', (req, res) =>{
  deckCards[req.query.ID] = {type: req.query.card_type, value: req.query.card_value};
  res.send("POST RECEIVED DECK CARDS")
  //let card = { }
}
)

app.get('/get/:id_card', (req, res) =>
{
  let card_ID = req.params.id_card;
  let info = deckCards[card_ID];
  let get_response = "";
  if (info){
    get_response = {
      status : "Card found",
      "info" : info
    }
  }
  else {
    get_response = {
      status : "Not found",
      "ID" : card_ID
    }
  }
  res.send(get_response);
})

app.get('/getAll', (req, res) =>{
  //res.send("GET REQUEST RECEIVED");
  res.send(deckCards);
})

app.put('/update/:ID/:TYPE/:ATTRIBUTE/:VAL', (req, res) => {
  let card_ID = req.params.ID
  let card_type = req.params.TYPE
  let card_attr = req.params.ATTRIBUTE  
  let new_val = req.params.VAL

  let info = deckCards[card_ID][card_type][card_attr];
  let put_response = "";
  if (info){
    deckCards[card_ID][card_type][card_attr] = new_val;
    put_response={
      status: "Card updated!",
      "new value": deckCards[card_ID][card_type][card_attr]
      }
  }
  else {
    put_response={
      status: "Card not found!"
      }
  res.send(put_response);
})

app.delete('delete/:ID/:TYPE', (req, res) =>{
//  let card_ID = req.params.ID
 // let card_type = req.params.TYPE
  //let info = deckCards[card_ID][card_type][card_attr];
  //let put_response = "";
  //if (info){
})
app.listen(3000)