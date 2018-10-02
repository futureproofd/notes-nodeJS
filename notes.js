console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);  
    }catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));    
};

var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    
    var duplicateNotes = notes.filter((note) => note.title === title);
    
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    } //else return undefined by default
};

var getAll = () => {
    console.log('listing all notes');
    return fetchNotes();
};

var readNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    //save all but  our title to be removed
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(notes);
    
    return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
    console.log(`note: ${note.title}`);
    console.log(`---------- ${note.body}`);  
};

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
}