import {authors, genres, books, BOOKS_PER_PAGE} from './data.js'


/**
 * used queary selector to fetch all the needed elements from HTML
 */

const dataListItems = document.querySelector('[data-list-items]')   //div the display books
const dataListButton = document.querySelector('[ data-list-button]') //button used to show more
const searchOverlay = document.querySelector('[data-search-overlay]') // the input to search
const dataSearchTitle = document.querySelector('[data-search-title]') //search by title in the search from
const dataSearchCancel = document.querySelector('[data-search-cancel]') //to close the search form 
const dataSearchForm = document.querySelector('[data-search-form]')  // used to click the button on the form to didplay redults
const dataHeaderSearch = document.querySelector('[data-header-search]') //search icon on the header used to pop the search form
const dataListActive = document.querySelector('[data-list-active]') //div used to display preview 
const dataListClose = document.querySelector('[data-list-close]') //closes the preview
const dataSearchGenres = document.querySelector('[data-search-genres]') //select option for genres
const dataSettingOverlay = document.querySelector('[data-settings-overlay]')//the over lay for the theme settings
const dataSettingForm = document.querySelector('[data-settings-form]') //used as button to set the selected them
const dataSettingsCancel = document.querySelector('[data-settings-cancel]') //cancel option from the themseetting to exit overly without changes
const dataListDescription = document.querySelector("[data-list-description]") //holds the decription on the preview overlay
const dataListSubtitle = document.querySelector("[data-list-subtitle]")//empty div to keep the subtitle
const dataListTitle = document.querySelector("[data-list-title]") //emty h3 to hold title for the preview
const dataListBlur = document.querySelector("[data-list-blur]")//setting the backround image to bluh on the preview
const dataListImage = document.querySelector("[data-list-image]")//to display imagee on preview
const dataSettingsTheme = document.querySelector("[data-settings-theme]")//if statement to display them
const dataSearchResults = document.querySelector("[data-search-results]")//empty div to append the search results
const dataErrorMessage = document.querySelector('[class="list__message"]')// div that contain error message
const dataHeaderSetting =document.querySelector('[data-header-settings]')



const matches = books  //assigned books to new variable
let page = 1; //assigned 1 to variable


/**
 * this object is the themes setting of two option light and dark at the moment the object has been created but it is not yet used  
 */
const css = {  
    day : {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },  
    night : {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
    
}

/**
 * Hold the select option for choosing your favourite genres.
 * created a fragment that that will be used to append a created element into the fragment then the fragment will be appended to the select elemnt that is on the HTML
 */
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

/**
 * Hold the select option for choosing your favourite author.
 * created a fragment that that will be used to append a created element into the fragment then the fragment will be appended to the select elemnt that is on the HTML
 */
const dataSearchAuthors = document.querySelector('[data-search-authors]') //to append author options
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

/**
 * There are five event listeners that open and closed overlays.
 * the code used event listeners to display or close overlay using open = true with to to display and false to close
 * 
 * 
*/

dataSearchCancel.addEventListener('click', ()=>{
    searchOverlay.open = false
});
dataHeaderSetting.addEventListener('click', ()=>{
    dataSettingOverlay.open = true
});
dataSettingsCancel.addEventListener('click', ()=>{
    dataSettingOverlay.open = false
});

dataSettingForm.addEventListener("submit",() => { 
    settings.submit 
});
dataListClose.addEventListener('click',() => { 
    dataListActive.open = false
 });

  

/**
 * added a event listener, so when button is clicked the search form overlay appears.
 * focus() is then used so when enter and space bar is clicked user can search
 */

dataHeaderSearch.addEventListener('click', () =>{
    searchOverlay.open = true
    dataSearchTitle.focus()
});


const fragment = document.createDocumentFragment() // used to append multiple info at once

/**
 * assigned books to variable so that the first 36 books can appear using slice.
 * The function was created with parameters because the code inside the fuction is 
 * used again in further stages, but with different arguements when the fuction is being called.
 * 
 * for of loop is then used to get specific info out of extrecte/book then display that into on the DOM by
 * appending it the to html using the arguement. all the extracted detail is the turned to functions so that 
 * the could be clicked to display the book's details. used set attribute to give each button its own space so that
 * when book is clicked it display the info of the clicked element
 */

let extracted = books.slice(0, 36)

  function displayBooksList(DomAppend, extract){
    for(const { author, image, title, id }of extract){
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
    DomAppend.appendChild(fragment);
    
      };}
    displayBooksList(dataListItems, extracted)

/**
 * This function is used to search the details of what the user searches.
 * used empty innerHTML so that when the search result appear(which is a new div) 
 * it closes all other divs that might clash with the search result div
 * 
 * empty variable is created to store information while the loop is iterating.
 * 
 * if statement are then used to ensure that when the details users input find its match and gives the
 * user the correct results.
 * if the is a match the result is then pushed in the empty array.
 * the results are then diplayed using the function which contains innerHTML , with arguments that display results on a different div while it closes divs 
 * that might affect the search result div
 * 
 * 
 */

dataSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchOverlay.open = false
    dataListItems.innerHTML = '';
    dataSearchResults.innerHTML = '';


const formData = new FormData(event.target)
const title = formData.get('title');
const genre = formData.get('genre');
const author = formData.get('author');


const filteredBooks = [];
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  if (genre === 'any' && author === 'any') {
   if (book.title.toLowerCase().includes(title.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  if (genre === 'any') {
    if (book.title.toLowerCase().includes(title.toLowerCase()) && book.author === author){
     filteredBooks.push(book);
    }
   }
   if (title === '') {
    if (book.author === author && book.genres.includes(genre)){
     filteredBooks.push(book);
    }
   }
   if (title === '' && author === 'any' ) {
    if (book.genres.includes(genre)){
     filteredBooks.push(book);
    }
   }
   if(filteredBooks.length > 0 ){
    dataErrorMessage.style.display = 'none'
    
}else{
    dataErrorMessage.style.display = 'block'
}
}

displayBooksList(dataSearchResults, filteredBooks)
   


    dataSearchForm.reset()  

    document.querySelector("[data-backdrop]").style.display = "none"; //backdrop div

})


/**
 *  This code is used to display a list of books on a web page. When the "ShowMore" button is clicked, the code displays additional books.
 *  The code uses an event listener to listen for clicks on the "ShowMore" button. When the button is clicked, the code increments the 
 * "ShowMorePosition" variable by the "ShowMore" value. The code then extracts the books to be displayed based on the updated "ShowMorePosition" 
 *  value and the "ShowMore" value. Finally, the "displayBooks" function is called to display the extracted books on the web page.
 *
 * The "displayBooks" function takes an array of books as an argument and displays them on the web page.
 * The function first creates an empty fragment to contain the book buttons. It then iterates through the
 * array of books and creates a button element for each book. The function sets the attributes of the button element,
 * including the book's image, title, and author. The function then appends the button element to the fragment and the fragment 
 * to the web page.
 */  

let ShowMorePosition = 0;
let ShowMore = 36

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
        `  
    fragment.appendChild(element);
    dataListItems.appendChild(fragment);
      };
 
      
}


/**
* This code sets the inner HTML of the dataListButton element to a string that contains HTML and JavaScript. 
* The code creates a "Show more" button that displays the remaining number of books that can be shown. 
* Here's an explanation of how the code works:
*/


dataListButton.innerHTML = /* html */ [
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`,
]

/**
* The code sets the inner HTML of dataListButton to create a "Show more" button that displays the remaining number of books. 
* The code then detects the user's system color scheme and sets the value of dataSettingsTheme and the visual variable accordingly.
*  Finally, the code sets the color properties of the page based on whether the user's system is set to a dark or light color scheme.
*/

dataSettingsTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
const visual = window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day';

if(dataSettingsTheme.value === 'night'){
    document.documentElement.style.setProperty('--color-dark', css['night'].dark);
    document.documentElement.style.setProperty('--color-light', css['day'].light);
}
if(visual === 'night'){
    document.documentElement.style.setProperty('--color-dark', css['night'].dark);
    document.documentElement.style.setProperty('--color-light', css['day'].light);
}

/**
 * The code adds an event listener to the dataSettingOverlay element for the "submit" event. When the form is submitted,
 * the event.preventDefault() method is called to prevent the default form submission behavior. The code creates 
 * a new FormData object from the submitted form data, then creates a new object named result from the entries of the FormData object.
 *  The code then sets the color properties of the page using the values from the css object corresponding to the selected theme. Finally, 
 * the code sets the open property of the dataSettingOverlay element to false, closing the settings overlay.
*/

dataSettingOverlay.addEventListener("submit", (event) =>  {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    dataSettingOverlay.open = false;
})


/**
 * 
 * @param {*} preview
 * 
 * The preview function adds a click event listener to a book preview button element,
 * and when clicked, it opens a modal overlay that displays detailed information about the book being previewed. 
 * The function searches for the active book ID by looping through an array of DOM nodes that the click event passed through.
 * Once the active book is found, the function updates various elements in the modal with information about the book,
 * such as the book's image, title, author, and description. 
 */
function preview(preview){
    preview.addEventListener('click', (event) => {
    
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
        
      
        dataListActive.open = true
        dataListImage.setAttribute('src', active.image);
        dataListBlur.style.background  =` url(${active.image})`;
        
        dataListTitle.textContent = active.title;
        
        dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        dataListDescription.textContent = active.description
    }) ;
}

/**
 * These two lines of code call the preview function twice, passing in the dataListItems and dataSearchResults elements as arguments.
 * This adds click event listeners to these elements so that when a user clicks on a book preview button within them, 
 * the preview function will be called to display detailed information about the book in a modal or overlay
 */

preview(dataListItems)
preview(dataSearchResults)