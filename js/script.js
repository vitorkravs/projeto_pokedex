// Variaveis Globais-----------------------------------------------------------

const pokemonName = document.querySelector('.pokemon__name')
const pokemonId = document.querySelector('.pokemon__id')
const pokemonImage = document.querySelector('.pokemon__Image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let serachPokemon = 2

//funções-----------------------------------------------------------------------
const fetchPokemon = async (pokemon) => {
    pokemonName.innerText = 'Loading...'

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIresponse.status === 200){
        const data = await APIresponse.json()
        return data
    }
    
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon)
    if(data) {
        pokemonName.innerText= data.name
        pokemonId.innerText = data.id 
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonImage.style.display = 'block'
        serachPokemon = data.id
    } else {
        pokemonName.innerText = 'Not found :('
        pokemonId.innerText = ''
        pokemonImage.style.display = 'none'
    }
     
}

//eventos-------------------------------------------------

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btnNext.addEventListener('click', () => {
    serachPokemon += 1
    renderPokemon(serachPokemon)
})

btnPrev.addEventListener('click', () => {
    serachPokemon -= 1
    renderPokemon(serachPokemon)
})


renderPokemon(serachPokemon)