const categoryContainer = document.querySelector('.category__container')
const categorybutton = document.querySelector('.category__text')
const searchInput = document.querySelector('#serch__input')
const btnCloseResult = document.querySelector('.search__icon--close')

const containerConteudo = document.querySelector('.caroussel__highlights')
const carrousselContainer = document.querySelector('.carrousel')
const containerModal = document.querySelector('.modal')

const seriesList = document.querySelector('.destaqued__series__list')
const filmesList = document.querySelector('.destaqued__films__list')
const animesList = document.querySelector('.destaqued__animes__list')


const seriesUrl = 'https://streaming-json.vercel.app/series'
const filmsUrl = 'https://streaming-json.vercel.app/filmes'
const animesUrl = 'https://streaming-json.vercel.app/animes'
const highlightsUrl = 'https://streaming-json.vercel.app/destaques'
const allUrl = 'https://streaming-json.vercel.app/todos'

const btnListRight = document.querySelectorAll('.movieRow--right')
const btnListLeft = document.querySelectorAll('.movieRow--left')
let scrollX = -400


document.addEventListener('DOMContentLoaded', async() => {
    await createCarousel()
    sliderCarousel()
    defineListas(seriesUrl,seriesList)
    defineListas(filmsUrl,filmesList)
    defineListas(animesUrl,animesList)
})

//get da api,retornando ja em JSON
const fetchApi = async (url) => {
    const data = await fetch(url).then((data) => data.json());
    return data;
}

//funcão que retorna o carousel
const createCarousel = async() => {
    const dados = await fetchApi(highlightsUrl)
    dados.map((item) => {
        containerConteudo.innerHTML += `
        <li key="${item.nome}" class="caroussel__item ${item.id === '1' ? 'active' : ''}"> 
            <img src="${item.banner}" />
            <h2> ${item.nome} </h2>
            <div>
                <a class="btn__modal" onClick="createModal('${item.id}|${highlightsUrl}')" href="#">Saiba mais</a>
                <a href="#">Assista</a>
            <div/>
        </li>
        `;   
    })
}

//função responsavel por ativar o slider no carousel
const sliderCarousel = () => {
    const caroussel = document.querySelectorAll('.caroussel__item')
    let carrouselIndex = 0

    function slider() {
        carrouselIndex++
        
        caroussel[carrouselIndex]?.classList.add('active')
        caroussel[carrouselIndex-1]?.classList.remove('active')
        if(carrouselIndex > caroussel.length-1) {
            carrouselIndex = 0
            caroussel[carrouselIndex]?.classList.add('active')
        }
    }
    setInterval(slider, 5000)
}



const openCategory= () => {
    categoryContainer.classList.toggle('open__category')
}

//evento da searchbar, é responsavel por procurar e exibir o conteudo digitado
searchInput.addEventListener('change', async() => {
    const resultContainer = document.querySelector('.result__container')
    
    const valorDigitado = searchInput.value.toLowerCase()
    const dados = await fetchApi(allUrl)
    resultContainer.style.display = 'block'
    let result = filterResult(dados, valorDigitado)

    resultContainer.innerHTML = '' 


    if(!searchInput.value == '') {
        if(result.length == 0) {
            closeResult()

            return resultContainer.innerHTML = `
            <li  class="result__item">
            <p>resultado não encontrado.</p>
            </li>
        `
        } else {
            result.map((item) => {
                closeResult()

                return resultContainer.innerHTML += `
                <li onClick="createModal('${item.id}|${allUrl}')" class="result__item">
                    <img src="${item.card}" alt="">
                    <p>${item.nome}</p>
                </li>
                `
            })
        }
    } else {
        resultContainer.innerHTML = ''
        resultContainer.style.display = 'none'
    }
})


const closeResult = () => {
        btnCloseResult.addEventListener('click', closeResultContainer);
        btnCloseResult.style.display = 'block'
}


const filterResult = (dados, val) => {
    let resultado = dados.filter((item) => item.nome.toLowerCase().includes(val))
    return resultado
}

//funçao responsavel por fechar o campo de busca
function closeResultContainer() {
    const resultContainer = document.querySelector('.result__container')
    searchInput.value = ''
    resultContainer.style.display = 'none'
    resultContainer.innerHTML = ''
    btnCloseResult.style.display = 'none'
}

//evento responsavel por ativar o botao p/passar o conteudo nas listas
for(let btn of btnListLeft){
    btn.addEventListener('click', () => {
        const list = btn.nextElementSibling.nextElementSibling
        handleLeftArrow(list)
    })
}

//evento responsavel por ativar o botao p/passar o conteudo nas listas
for(let btn of btnListRight){
    btn.addEventListener('click', () => {
        const list = btn.nextElementSibling
        const listLength = list.children.length
        handleRigthArrow(list,listLength)
    })
}

//evento responsavel por ativar o botao direito p/passar o conteudo nas listas
const handleRigthArrow = (list,length) => {
    let x = scrollX - Math.round(window.innerWidth / 2)
    let listW = length * 302
    if((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 80;
    }
    if(x > 0) {
        x = 0;
    }
    scrollX = x
    return list.style.marginLeft = `${scrollX}px`
}

//evento responsavel por ativar o botao esquerdo p/passar o conteudo nas listas
const handleLeftArrow = (list) => {
    let x = scrollX + Math.round(window.innerWidth / 2)
    if(x > 0) {
        x = 0;
    }
    scrollX = x
    return list.style.marginLeft = `${scrollX}px`
}

// funçao responsavel por gerar as listas de conteudo do site
const defineListas = (url,list) => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.map((item) => {
            list.innerHTML += `
            <li onclick="createModal('${item.id}|${url}')" class="destaqued__item">
            <img src="${item.card}" alt="${item.nome}">
            </li>
            `
        })
    })
}

// funçao responsavel por gerar todas as modals do site
const createModal = async(object) => {
    const params = object.split('|')
    containerModal.style.display = "flex"
    const dados = await fetchApi(params[1])
        dados.find((item) => {
            if(item.id == params[0]){
            containerModal.innerHTML = `
                    <div  class="modal__content">
                            ${generateTrailerModal(item)}
                            ${generateAboutModal(item)}
                    </div>
                ` 
            }
        })
}

// funçao responsavel por gerar o trailer das modals
const generateTrailerModal = ({trailer, nome}) => {
    return `
        <div class="trailer__container">
            ${trailer}
            <div class="trailer__content">
                <h2> ${nome} </h2>
                <a class="btn-modal" href="#"><img src="./assets/icons/icon-play.png" alt=""> Assistir</a>
            </div>
        </div>
    `
}

// funçao responsavel por gerar o sobre das modals
const generateAboutModal = ({temporadas,classificacao,sinopse,generos,elenco,duracao,author,episodios,ano}) => {
    return `
        <div class="text__container">
            <div>
                ${typeOfDuration(temporadas,duracao,episodios,ano)}
                <p class="ageRange"><img src="./assets/faixa-etaria/maior${classificacao}.png" alt=""></p>
                <p> ${sinopse} </p>
            </div>
            <div class="about">
                <p><span>Gêneros:</span> ${generos} </p>
                ${elenco != undefined ? `<span>Elenco:</span>  ${elenco}` : `<span>Autor(a):</span> ${author}`}
            </div>
        </div>
    `
}

// funçao responsavel por definir se o conteudo da modal é um filme,anime ou serie
const typeOfDuration = (temp, dur, ep, ano) => {
    if( temp != undefined) {
        return `<p>${ano} &nbsp &nbsp ${temp} temporada(s)</p>`
    } else if (dur != undefined){
        return `<p>${ano} &nbsp &nbsp  ${dur}</p>`
    } else {
        return `<p>${ano} &nbsp &nbsp  ${ep} episodio(s)</p>`
    }
}

//função para fechar a modal
const closeModal = () => { 
    containerModal.style.display = "none"
    containerModal.innerHTML = ""
}

