// Declaração variáveis dos elementos HTML
const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

// Variável do ID da busca do pokemon
let searchPokemon = 1

// Função assíncrona para realizar e retornar a busca dos dados do pokemon na API
const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status == 200) {
    const data = await APIResponse.json()
    return data
  }
}

// Função principal para renderizar o pokemon na tela
const renderPokemon = async pokemon => {
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon)
  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    input.value = ''
    searchPokemon = data.id
  } else {
    pokemonName.innerHTML = 'Not found'
    pokemonNumber.innerHTML = ''
    pokemonImage.style.display = 'none'
  }
}

// EventListeners para o input e os botões de next e prev

form.addEventListener('submit', event => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', event => {
  if (searchPokemon > 1) {
    searchPokemon--
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', event => {
  searchPokemon++
  renderPokemon(searchPokemon)
})

// Inicializa a página com o bulbassauro
renderPokemon(searchPokemon)
