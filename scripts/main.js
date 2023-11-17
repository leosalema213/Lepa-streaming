const categorybutton = document.querySelector('.category__text')
const categoryContainer = document.querySelector('.category__container')
const hero = document.querySelector('#hero')
const caroussel = document.querySelectorAll('.caroussel__item')
let carrouselIndex = 0

    categorybutton.addEventListener('click', () => {
        if (categoryContainer.style.display === 'flex') {
            categoryContainer.style.display = 'none';  
        } else {
            categoryContainer.style.display = 'flex';  
        }
    })
    hero.addEventListener('click', () => {
        categoryContainer.style.display = 'none';  
    })

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