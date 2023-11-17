const containerConteudo = document.querySelector('.caroussel__highlights')
const containerModal = document.querySelector('.modal')

const items = [
    {
        id: '0',
        nome: 'Dark',
        card: 'https://item.pinimg.com/originals/5e/e1/17/5ee117acc1726b5d5666de6fc8c5dfa8.jpg',
        banner: 'https://www.infinitynews.com.br/wp-content/uploads/2020/07/dark-netflix.jpg',
        sinopse: 'Quatro famílias iniciam uma desesperada busca por respostas quando uma criança desaparece e um complexo mistério envolvendo três gerações começa a se revelar. Assista o quanto quiser. Esta série de suspense criada por Baran bo Odar e Jantje Friese ganhou o prêmio Grimme-Preis de ficção para TV.',
        trailer: '<iframe width="720px" height="420" src="https://www.youtube.com/embed/JCCssUOtn2E?si=YEfURjRzW_zYDnLW&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        ano: '2020',
        temporadas: '3',
        duração: '',
        classificação: '16',
        generos: 'Séries dramáticas, <br> Alemães,Séries de ficcão científica',
        elenco: 'Louis Hofmann,Oliver Masucci,Jõrdis Triebel,mais'
    },
    {
        id: '1',
        nome: ' Vikings',
        card: 'https://img.elo7.com.br/product/zoom/26BBDC4/big-poster-serie-vikings-lo04-tamanho-90x60-cm-serie.jpg',
        banner: 'https://r4.wallpaperflare.com/wallpaper/540/517/279/blood-the-series-cross-characters-wallpaper-4d1de7389f5885d05a00523fec11c6f7.jpg',
        sinopse: 'Vikings mostra a história do viking Ragnar Lothbrok (Travis Fimmel), um dos mais conhecidos heróis nórdicos e considerado o flagelo da Inglaterra e da França. Entre o romance com Lagertha (Katheryn Winnick) e a relação com os três filhos, há guerras, destruição e muita pilhagem.',
        trailer: '<iframe width="720" height="420" src="https://www.youtube.com/embed/VWBDosdLhoY?si=fMzpCVTTpyRiIhVf&amp;start=9" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        ano: '2013',
        temporadas:'6',
        duração: '',
        classificação: '16',
        generos: 'Séries dramáticas, <br> Programas sobre política,Canadenses',
        elenco: 'Travis Fimmel,Khatheryn Winnick,Clive Standen,mais'
    },
    {
        id: '2',
        nome: ' Breaking Bad',
        card: 'https://alineflores.com.br/wp-content/uploads/2017/11/breaking-bad.jpg',
        banner: 'https://images7.alphacoders.com/617/617964.jpg',
        sinopse: 'Walter White é um professor de Química do ensino médio na cidade de Albuquerque, localizada no estado do Novo México (EUA). Durante um exame de rotina, White descobre que tem um câncer terminal. Sem grandes recursos financeiros para sustentar sua familia, o professor fica com medo de morrer e deixá-los na pobreza...',
        trailer: '<iframe width="720" height="420" src="https://www.youtube.com/embed/HhesaQXLuRY?si=bzmJcHpTQfqhwBS8&amp;start=9" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        ano: '2013',
        temporadas:'5',
        duração: '',
        classificação: '16',
        generos: 'Séries dramáticas, <br> Séries dos EUA,Suspense para TV',
        elenco: 'Bryan cranston,Aaron Paul,Anna gunn,mais'
    },
]

const initContent = () => {
    items.map((item) => {
        containerConteudo.innerHTML += `
            <li key="${item.nome}" class="caroussel__item ${item.id === '0' ? 'active' : ''}"> 
                <img src="${item.banner}" />
                <h2> ${item.nome} </h2>
            <div>
                <a class="btn__openModal" href="#">Saiba mais</a>
                <a href="#">Assista</a>
            <div/>
            </li>
        `;
        containerModal.innerHTML += `
                <div  class="modal__content">
                    <div class="trailer__container">
                        ${item.trailer}
                        <div class="trailer__content">
                            <h2> ${item.nome} </h2>
                            <a class="btn-modal" href="#"><img src="./assets/icons/icon-play.png" alt=""> Assistir</a>
                        </div>
                    </div>
                    <div class="text__container">
                        <div>
                            <p>2020 &nbsp &nbsp ${item.temporadas} temporadas</p>
                            <p class="ageRange"><img src="./assets/faixa-etaria/maior${item.classificação}.png" alt=""></p>
                            <p> ${item.sinopse} </p>
                        </div>
                        <div class="about">
                            <p><span>Gêneros:</span> ${item.generos} </p>
                            <p><span>Elenco:</span> ${item.elenco} </p>
                        </div>
                    </div>
                </div>
            `     
    })
    
    const btnOpenModal = document.querySelectorAll('.btn__openModal')
    for(let i = 0; i < btnOpenModal.length; i++) {
        btnOpenModal[i].addEventListener('click', ( e ) => {
            containerModal.style.display = 'flex'
            const modal = document.querySelectorAll('.modal__content')
            modal[i].style.display = 'block'
        })
    }
    
}

const closeModal = () => {
    containerModal.style.display = 'none'
    const modal = document.querySelectorAll('.modal__content')
    for(let i = 0; i < modal.length; i++) {
        modal[i].style.display = 'none'
    }
}

containerModal.addEventListener('click', (closeModal))

initContent();