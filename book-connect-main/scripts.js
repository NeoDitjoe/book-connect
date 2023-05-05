import {authors, genres, books, BOOKS_PER_PAGE} from './data.js'

const dataListItems = document.querySelector('[data-list-items]')
const dataListButton = document.querySelector('[ data-list-button]')
const searchOverlay = document.querySelector('[data-search-overlay]')
const dataSearchTitle = document.querySelector('[data-search-title]')
const dataSearchCancel = document.querySelector('[data-search-cancel]')
const dataSearchForm = document.querySelector('[data-search-form]')
const dataHeaderSearch = document.querySelector('[data-header-search]')
const dataListActive = document.querySelector('[data-list-active]')
const dataListClose = document.querySelector('[data-list-close]')
const dataSearchGenres = document.querySelector('[data-search-genres]')
const dataSettingOverlay = document.querySelector('[data-settings-overlay]')
const dataHeadersetting = document.querySelector('[ data-header-settings]')
const dataSettingForm = document.querySelector('[data-settings-form]')
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')
const dataListDescription = document.querySelector("[data-list-description]")
const dataListSubtitle = document.querySelector("[data-list-subtitle]")
const dataListTitle = document.querySelector("[data-list-title]")
const  dataListBlur = document.querySelector("[data-list-blur]")
const dataListImage = document.querySelector("[data-list-image]")


const matches = books
let page = 1;

if (!books && !Array.isArray(books)) {throw new Error('Source required')}
// if (!range && range.length < 2) throw new Error('Range Amust be an array with two numbers')

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

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

dataSearchCancel.addEventListener('click', ()=>{
    searchOverlay.open = false
});
dataHeadersetting.addEventListener('click', ()=>{
    dataSettingOverlay.open = true
});
dataSettingsCancel.addEventListener('click', ()=>{
    dataSettingOverlay.open = false
});

dataSettingForm.addEventListener("submit",() => { 
    actions.settings.submit 
});
dataListClose.addEventListener('click',() => { 
    dataListActive.open = false
 });





dataHeaderSearch.addEventListener('click', () =>{
    searchOverlay.open = true
    dataSearchTitle.focus()
});


dataSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    // let filters = Object.fromEntries(formData);
    // let result = [];
  
    // for (const book of books) {
    //   let titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
    //   let authorMatch = filters.author === 'any' || book.author === filters.author;
    //   let genreMatch = filters.genre === 'any';
    //   for (const genre of book.genres) {
    //     if (genre === filters.genre) {
    //       genreMatch = true;
    //     }
    //   }
  
    //   if (titleMatch && authorMatch && genreMatch) {
    //     result.push(book);
    //   }
    // }
  
    // if (result.length < 1) {
    //   data-list-message.classList.add('list__message_show');
    // } else {
    //   data-list-message.classList.remove('list__message_show');
    // }

    

    for (const { author, image, title, id }  of extracted){
        //const {author: authorId, id , image, title} = props
        let element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);
    
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
        fragment.appendChild(element);                                    
        document.querySelector('[data-list-button]').appendChild(fragment);
        dataListItems.style.display = 'none'
    }
    
  });
let ShowMorePosition = 0;
let ShowMore = 36
const fragment = document.createDocumentFragment()
let extracted = books.slice(0, 36)

  for(const { author, image, title, id }of extracted){
    let element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML =
     `<img 
        class="preview__image" 
        src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
        `;
    fragment.appendChild(element);
    
      };
      dataListItems.appendChild(fragment);


dataListButton.addEventListener("click", () => {
    ShowMorePosition += ShowMore ;
    let extractedShowMore = books.slice(ShowMorePosition, ShowMorePosition + ShowMore);
    displayBooks(extractedShowMore)
});
function displayBooks(extractedShowMore){
    fragment.innerHTML = '';

    
for(const { author, image, title, id }of extractedShowMore){
    let element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML =
     `<img 
        class="preview__image" 
        src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
        `;
    fragment.appendChild(element);
    dataListItems.appendChild(fragment);
      };
}


         
dataListItems.appendChild(fragment);
const initial = matches.length - [page * BOOKS_PER_PAGE];
"remaining" === "hasRemaining" ? initial : 0;
dataListButton.disabled = initial <= 0

dataListButton.innerHTML = /* html */ `
      <span>Show more</span>
      <span class="list__remaining"> (${initial})</span>
      
   `

   window.scrollTo({ top: 0, behavior: 'smooth' });
    searchOverlay.open = false

dataSettingOverlay.addEventListener("submit", (event) =>  {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    dataSettingOverlay.open = false
})

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
        
    };
    
    if (!active) {
        return
    }
    dataListActive.open = true
    dataListImage.setAttribute('src', active.image);
    dataListBlur.style.background  =` url(${active.image})`;
    
    dataListTitle.textContent = active.title;
    
    dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataListDescription.textContent = active.description
}) ;