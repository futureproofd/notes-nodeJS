console.log('starting app.js');

const fs = require('fs');
const notes = require('./notes');
const yargs = require('yargs');

const _ = require('lodash');

var command = process.argv[2];
const argv = yargs.argv;

if(command === 'add'){
    console.log('adding new note');
    notes.addNote(argv.title, argv.body);
}else if(command === 'list'){
    notes.getAll();
}else if (command ==='read'){
    notes.readNote(argv.title);
}else if (command ==='remove'){
    notes.removeNote(argv.title);
}else{
    console.log('command not recognized');
}