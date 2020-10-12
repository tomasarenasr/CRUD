function search_pokemon(){
    let pokemon_name = document.getElementById("pokemon").value;
    console.log("hello"+ pokemon_name)
    if (pokemon_name.trim() == ''){
        console.log("ErroR")
        return;
    }
    axios.get(`http://localhost:3000/${pokemon_name}`)  
    .then(res =>{
        console.log(res.data); 
        console.log(`${res.data.species.name}` + " found.");
        let name = res.data.name.toUpperCase();
        let weight = Number(res.data.weight)/10;
        let height = Number(res.data.height)/10;
        let pokeID = res.data.id;
        let baseExp = Number(res.data.base_experience);
        let typeArr = [];
        let pokeType;
        for (pokeType in res.data.types){
            typeArr.push(res.data.types[pokeType].type.name);
        }
        //var typesStr = typeArr.toString();
        var typesStr = typeArr.join(' ');
        console.log(typesStr);
        let dataResume = dataDisplay(pokeID, name, weight, height, typesStr, baseExp )
        console.log("Base exp: ", baseExp);
        let pokemonList = document.getElementById("pokemonList");
        pokemonList.appendChild(dataResume);
        pokemonList.lastElementChild.querySelector(".remove-pokemon").addEventListener("click", (event) => 
            remove_item(event.target.parentNode.parentNode.parentNode)  
          );

    } ).catch(function(error) {
        alert("Pokemon does not exist");
        console.log(error.response);
    });

}
var stringToHTML = function (str) {
    var template = document.createElement('template');
    html = str.trim();
    template.innerHTML = str;
    return template.content.firstChild;
  };


  
let dataDisplay = ( id, name, weight, height, types, base_exp) => {

    return stringToHTML(`<div  style="width:40%" style="font-family:Verdana, Tahoma, sans-serif"><div align="left">          
              <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="${name}" style="width:30%">
                <div class = "card" style="background:white">
                  <h4>${name}</h5>
                  <ul>
                    <li>ID: ${id}</li>
                    <li>Types: ${types}</li>
                    <li>Weight: ${weight} kg</li>
                    <li>Height: ${height} m</li>
                    <li>Base Experience: ${base_exp}</li>
                  </ul>
                  <button class="remove-pokemon">Remove</button>
                  </div>
              </div></div>`);
  }

  let remove_item  = (node_to_remove) => {
    // add the remove logic here 
    let pokemonList = document.getElementById("pokemonList");
    pokemonList.removeChild(node_to_remove);
  }