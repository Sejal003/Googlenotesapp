const addtitle = document.getElementById('addtitle');
const addtext = document.getElementById('addtext');
const addnotebutton = document.getElementById('addnote');
const notesdiv = document.getElementById('notes');
//local storage  => we use json(javascript object notation)
shownotes() ;
//let notes = [];


function addnotes() {
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [] ;
    }
    else{
        notes = JSON.parse(notes) ;
    }
    // const title = addtitle.value;
    // console.log(title);
    // const note = addtext.value;
    if (addtext.value == "") {
        alert('add your note');
        return;
    }
    //console.log(note);
    const noteobj = {
        title : addtitle.value,
        text : addtext.value
    }
    addtitle.value = "" ;
    addtext.value = "" ;
    notes.push(noteobj);
    localStorage.setItem('notes' , JSON.stringify(notes)) ;
    shownotes();
}

function shownotes() {
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return ;
    }
    else{
        notes = JSON.parse(notes) ;
    }
    for (let i = 0; i < notes.length; i++) {
        notesHTML += 
        `
         <main class ="note">
         <button class = "deletenote" id = ${i} onclick = "deletenotes(${i})">Delete</button>
         <div class="title">${notes[i].title}</div>
         <p class="text">${notes[i].text}<p>
         </main>
         
        `
    }
    notesdiv.innerHTML = notesHTML ;
}

function deletenotes(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return ;
    }
    else{
        notes = JSON.parse(notes) ;
    }

    notes.splice(ind , 1)
    localStorage.setItem('notes' , JSON.stringify(notes)) ;
    shownotes();
}
addnotebutton.addEventListener('click', addnotes);

// Search engine/filter

const allnotes = document.querySelectorAll('#notes main');
const searchinput = document.querySelector('#search-item');

searchinput.addEventListener('input' ,function(e){
    const search = e.target.value.toLowerCase();
    notesdiv.innerHTML='';
    allnotes.forEach(main =>{
           const paragraph = main.querySelectorAll('p');
           if(paragraph[0].innerText.toLowerCase().indexOf(search) > -1){
            notesdiv.appendChild(main) ;
           }          
    });

})