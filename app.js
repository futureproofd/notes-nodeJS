const fs = require('fs');
const notes = require('./notes');
const yargs = require('yargs');

const _ = require('lodash');

//For our yargs options
const titleOptions = {
            describe: 'title of note',
            demand: true,
            alias:'t'
        };

const bodyOptions = {
            describe:'body of note',
            demand:true,
            alias:'b'
        };

var command = process.argv[2];
const argv = yargs
    .command('add','add a new note',{
        title:titleOptions,
        body:bodyOptions
    })
    .command('list','list all notes')
    .command('read','read a note',{
        title:titleOptions
    })
  .command('remove','remove a note',{
        title:titleOptions
    })
    .help()
    .argv;

//yarg commands
if(command === 'add'){
    var myNote = notes.addNote(argv.title, argv.body);
    if(myNote){
        notes.logNote(myNote);
    }else{
        console.log('could not add duplicate note');
    }
}else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) =>notes.logNote(note));
}else if (command ==='read'){
    var myNote = notes.readNote(argv.title);
    if(myNote){
        notes.logNote(myNote);
    }else{
        console.log('no note with that name');
    }
}else if (command ==='remove'){
    var noteRemoved = notes.removeNote(argv.title);
    if(noteRemoved){
        console.log(`note removed: ${argv.title}`);
    }else{
        console.log('note does not exist.')
    }
}else{
    console.log('command not recognized');
}