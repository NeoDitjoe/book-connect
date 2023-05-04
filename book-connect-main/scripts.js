import {authors, genres, books, BOOKS_PER_PAGE} from './data.js'
const dataListItems = document.querySelector('[data-list-items]')
const dataListButton = document.querySelector('[ data-list-button]')
const searchOverlay = document.querySelector('[data-search-overlay]')
const dataSearchTitle = document.querySelector('[data-search-title]')
const dataSearchCancel = document.querySelector('[data-search-cancel]')
const dataSearchForm = document.querySelector('[data-search-form]')
const dataHeaderSearch = document.querySelector('[data-header-search]')
const formSearchButton = document.querySelector('[form="search"]')
const dataListActive = document.querySelector('[data-list-active]')
const dataListClose = document.querySelector('[data-list-close]')
const dataHeadersetting = document.querySelector('[ data-header-settings]')
const dataSearchGenres = document.querySelector('[data-search-genres]')

const matches = books
let page = 1;

if (!books && !Array.isArray(books)) {
    throw new Error('Source required')
}
// if (!range && range.length < 2) throw new Error('Range Amust be an array with two numbers')

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const fragment = document.createDocumentFragment() 
const extracted = books.slice(0, 36)

// for (const { authors, image, title, id } of extracted) {

//     const preview = createPreview({
//         authors,
//         id,
//         image,
//         title
//     })

//     // fragment.appendChild(preview)
// }

// data-list-items.appendChild(fragment)   



dataSearchTitle.addEventListener("input", () => {
       
});



const genresOption = document.createDocumentFragment() 
let element = document.createElement('option') 
element.value = 'any'                        
element.innerHTML = 'All Genres' 
genresOption.appendChild(element)  

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option') 
    element.value = id  //value
    element.innerText = name //text
    genresOption.appendChild(element)
} 
dataSearchGenres.appendChild(genresOption)  

const dataSearchAuthors = document.querySelector('[data-search-authors]')
let authorOptions = document.createDocumentFragment()  
let elementAuthor = document.createElement('option')
elementAuthor.value = 'any'  
elementAuthor.innerText = 'All Authors' 
authorOptions.appendChild(elementAuthor)

for (const [id, name] of Object.entries(authors)) {  
    const elementAuthor = document.createElement('option')
    elementAuthor.value = id 
    elementAuthor.innerHTML = name 
    authorOptions.appendChild(elementAuthor)
}

dataSearchAuthors.appendChild(authorOptions) 

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
//  v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);


dataListButton.innerText = "Show more" + (matches.length - BOOKS_PER_PAGE)

dataListButton.disabled = (matches.length - [page * BOOKS_PER_PAGE] <= 0)//.removed ! and changed to less than equal to

dataListButton.innerHTML = /* html */ [
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`,
]

// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
dataListClose.addEventListener('click',() => { 
    dataListActive.open = false
 })

dataListButton.addEventListener("click", () => {
    dataListItems.appendChild(/* createPreviewsFragment( */matches - page * BOOKS_PER_PAGE + page + 1 * BOOKS_PER_PAGE/* ) */) /*=== 1348 */
    actions.list.updateRemaining() //have not made sense of this  
    page = page + 1
})



dataHeaderSearch.addEventListener('click', () =>{
    searchOverlay.open = true
})

dataSearchCancel.addEventListener('click', ()=>{
    searchOverlay.open = false
})



formSearchButton.addEventListener("click", (filters) => {
    filters.preventDefault();
    const formData = new FormData(formSearchButton)//(event.target)
    filters = Object.fromEntries(formData)
    result = []

    for (const book of booksList ){
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if (singleGenre == filters.genre) { genreMatch === true }}}
        }

    if (titleMatch && authorMatch && genreMatch) {
        result.push(book)}
    searchOverlay.open = false
    console.log(dataSearchTitle.value)
    dataSearchForm.reset()
    
    })


// dataListItems.innerHTML = ''
    // const fragment = document.createDocumentFragment()
    //const extracted = books.slice(0, 36)//const extracted = source.slice(range[0], range[1])

    for (const { author, image, title, id }  of extracted){
        //const {author: authorId, id , image, title} = props
        let element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
       

        // if(`[data-preview="${id}"]` === )

    element.innerHTML =
     `<img 
        class="preview__image" 
        src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
        `
    fragment.appendChild(element)
                                        
                    dataListItems.appendChild(fragment)
    }

// const dataBackdrop = document.querySelector('[data-backdrop]')
// const backdropFragment = document.createDocumentFragment()
   
// for (const { author, image, title, id } of extracted) {
        
//     // const { author: authorId, id, image, title } = props

//     let element = document.createElement('button')
//     element.classList = 'preview'
//     element.setAttribute('data-preview', id)

//     element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />
            
//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${authors[author]}</div>
//         </div>
//     `

//     backdropFragment.appendChild(element)

//       /*   if (dataSearchTitle.contains(id, name)){
//             console.log(id)
//         } */
//     }

//     dataSearchTitle.addEventListener('click', (event)=> {
//         event.preventDefault()
//         dataBackdrop.appendChild(backdropFragment).style.display = "block"
//     }) 
    

    

//     const initial = matches.length - [page * BOOKS_PER_PAGE]
//     const remaining = /* hasRemaining ? initial : */ 0
//     dataListButton.disabled = initial <= 0 //less than & =

//     dataListButton.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     searchOverlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }



dataListItems.addEventListener('click', (event) => {
    
        dataListActive.open = true
   
    let pathArray = Array.from(event.path || event.composedPath()) 
    let active = null
    
    for (const node of  pathArray) {
        if (active) 
        {break};
        const previewId = node?.dataset?.preview
        
        for (const singleBook of books) {
            if (singleBook.id === previewId ) {
                active = singleBook
                {break};
            }
            
        } 
        
    }
    
    if (!active) {
        return
    }
    dataListActive.open = true
    document.querySelector("[data-list-image]").setAttribute('src', active.image);
    document.querySelector("[data-list-blur]").style.background  =` url(${active.image})`;
    
    document.querySelector("[data-list-title]").textContent = active.title;
    
    document.querySelector("[data-list-subtitle]").textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    document.querySelector("[data-list-description]").textContent = active.description
}) 


