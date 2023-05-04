import {authors, genres, books, BOOKS_PER_PAGE} from './data.js'
const dataListItems = document.querySelector('[data-list-items]')
const dataListButton = document.querySelector('[ data-list-button]')
const dataHeaderSearch = document.querySelector('[data-header-search]')
const searchOverlay = document.querySelector('[data-search-overlay]')



const matches = books
let page = 1;

if (!books && !Array.isArray(books)) {
    throw new Error('Source required')
}
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

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

//should append the following details from extracted..........
// for (const { authors, image, title, id } of extracted) {

//     const preview = createPreview({
//         authors,
//         id,
//         image,
//         title
//     })

//     // fragment.appendChild(preview)
// }

//data-list-items.appendChild(fragment)   



const dataSearchTitle = document.querySelector('[data-search-title]')
const genresSearch = document.createDocumentFragment() 

dataSearchTitle.addEventListener("input", (event) => {
    let searchTerm = dataSearchTitle.value//.trim().toLowerCase();

    let filterGenres =  Object.entries(genres).filter(([id, name]) => {
        return name/* .toLowerCase(.inlude(searchTerm)); */
    });

    if(search === ''){
        filterGenres.unshift(['any', 'All Gentres']);
    }

    genresSearch.innerHTML = '';

    filterGenres.forEach(([id, name]) => {
        let element = document.createElement('p');
        element.value = id  //value
        element.innerText = name //text
        genresSearch.appendChild(element)
    });
});


// const genresSearch = document.createDocumentFragment() 
// let element = document.createElement('p') 
// element.value = 'any'                        
// element = 'All Genres' 
// genresSearch.appendChild(element)  

// for (const [id, name] of Object.entries(genres)) {
//     const element = document.createElement('p') 
//     element.value = id  //value
//     element.innerText = name //text
//     genresSearch.appendChild(element)
// } 



// data-search-genres.appendChild(genres)  

// let authors = document.createDocumentFragment()  
// element = document.createElement('dd')//option to dd
// element.value = 'any'  // Not sure what this is
// element.innerText = 'All Authors'  //maybe this should use the authors Array 
// authors.appendChild(element)

// for ([id, name] of Object.entries(authors)) {  
//     document.createElement('option')
//     element.value =id //value
//     element = name //text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors) //maybe ......append(authors)

// //////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

// /**
//  * theme settings
//  */

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

// data-search-cancel.Click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }


/**
 * 
 * 
 * 
 * I think the code should look like this.
 * If the looks like this means that the button rn is used to display text number, every click will decrease the number by 36.
 * which makes sense because everytime you load 36 books bluh  bluh......
 * 
 * dataListButton.addEventListener("click", () => {
 *   dataListButton.inner = appendChild( createPreviewsFragment( matches - page * BOOKS_PER_PAGE + page + 1 * BOOKS_PER_PAGE
 *   actions.list.updateRemaining() //have not made sense of this  
 * page = page + 1
 *})
 */

dataListButton.addEventListener("click", () => {
    dataListItems.appendChild(/* createPreviewsFragment( */matches - page * BOOKS_PER_PAGE + page + 1 * BOOKS_PER_PAGE/* ) */) /*=== 1348 */
    actions.list.updateRemaining() //have not made sense of this  
    page = page + 1
})


dataHeaderSearch.addEventListener('click', () => {
    searchOverlay.open = true ;
    dataSearchTitle.focus();
})

const dataSearchForm = document.querySelector('[data-search-form]')
// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }





//  if titleMatch && authorMatch && genreMatch => result.push(book)
// dataListItems.innerHTML = ''
    // const fragment = document.createDocumentFragment()
    //const extracted = books.slice(0, 36)//const extracted = source.slice(range[0], range[1])

    for (const { authors, image, title, id }  of extracted){

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
            <div class="preview__author">${"Neo"}</div>
        </div>
        `
    fragment.appendChild(element)
                                        
                console.log(`[data-preview="${id}"]`)
                //if (event.target.classList.contains(`[data-preview="${id}"]`)) {
    }
dataListItems.appendChild(fragment)
         
        
/**
 * 
 * this is similar to 168-+ code
 */
   
//     for (const { author, image, title, id } of extracted) {
        
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     dataListItems.appendChild(fragments)







    const initial = matches.length - [page * BOOKS_PER_PAGE]//what the
    const remaining = /* hasRemaining ? initial : */ 0
    dataListButton.disabled = initial <= 0 //less than & =

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

/* dataListItems.addEventListener('click', (even) => {
    event.preventDefault()
    const pathArray = Array.from(event.path && event.composedPath()) //change that to an and from or
    let active;
    console.log('pathArray')
    for (const node = 0; node < pathArray; i++) {
        if (active) 
        {break};
        const previewId = node.dataset.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if (!active) return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
}) */


