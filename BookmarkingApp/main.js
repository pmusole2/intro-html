//Listen for form submit
document.querySelector('#myForm').addEventListener('submit', saveBookmark);


//save bookmark
function saveBookmark(e){
    //Get Form Values
    var siteName = document.querySelector('#siteName').value;
    var siteURL = document.querySelector('#siteURL').value;

    if(!validateForm(siteName, siteURL)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    }

    //Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        //Init Array
        var bookmarks = [];
        //Add to Array
        bookmarks.push(bookmark);
        //Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Fetch bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add Bookmark to Array
        bookmarks.push(bookmark);
        //Reset back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear Form
    document.querySelector('#myForm').reset();


    //refetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}

//Delete bookmark 

function deleteBookmark(url){
    //Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for(i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    //Reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //refetch bookmarks
    fetchBookmarks();
}

//Fetch Bookmarks
function fetchBookmarks(){
    //Fetch bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 
    //Get output id
    var bookmarksResults = document.querySelector('#bookmarksResults');

    //Build Output

    bookmarksResults.innerHTML = '';

    for(i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                        '<h3>' + name + 
                                        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +  
                                        '</h3>' + 
                                        '</div>';
    }
   
}


//validate form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Please Fill in the Form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}