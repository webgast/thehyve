console.log('BinaryFactory 1.0 (c) Webgast.nl 2020 for TheHyve.nl assessment');

const fs = require('fs');
const util  = require('util');
const http = require('http');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs ? console.log('There was fs') : console.log('There was no fs');
util ? console.log('There was util') : console.log('There was no util');
http ? console.log('There was http') : console.log('There was no http');
readline ? console.log('There was readline') : console.log('There was no readline');

//polymorphism V
//accept binary data (files / urls / manual input) V
//manipulate bytes as numbers.

//hulp functie om van bytearray naar hex te converteren
function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}  

class BinaryFactory {
  constructor(type) {
    console.log('And then there stood a BinaryFactory');
  }
  
  someMethod(blip) {
    console.log('I am someMethod in BinaryFactory with param ' + blip);
  }
  
  toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }
}

class FileFactory extends BinaryFactory {
  
  constructor(type) {    
    super(type);
    
    console.log('Of which a polymorph BinaryFactory was created.');
  }
  

  
  openFile(file) {
    
      fs.readFile(file, function(err,data) {
        if (!err) {
             console.log('I read your jibberish in base64 human! : ' + data);
             let my_bin_array = new Uint32Array(data);
             //console.log(my_bin_array);
             return my_bin_array;
             //self.array = my_bin_array;
             //console.log(self.array);
             //dit werkt
             //console.log(toHexString(my_bin_array));
             //console.log(this.toHexString(my_bin_array));
          
             //this.someMethod('joehoe');
          
             //for(let num of my_bin_array) {
             //  console.log(parseInt(num, 16));
             //}
             //console.log('That would read in human tongue: ' + Buffer.from(data, 'base64').toString());
//             console.log(typeof(data));
//             console.log(parseInt(data, 2).toString(16).toUpperCase());
        } else {
            console.log(err + '. Do come again!');
            rl.close();
        }
      });
  }
}

class URLFactory extends BinaryFactory {
  constructor(type) {
    super(type);
    console.log('Of which a polymorph URLFactory was created.');
  }
}

class ManualFactory extends BinaryFactory {
  constructor(type) {
    super(type);
    console.log('Of which a polymorph ManualFactory was created.');
  }
}

rl.question("How would you like to enter binary data? Type [ file | url | manual ] and hit <enter> ", function(way) {
  const choice = ['file', 'url', 'manual'];
  let input;
  if(choice.includes(way)) {
    switch (way) {
      case 'file':
        console.log("We're going to do stuff with file");

        input = new FileFactory(way);
        
        rl.question("Which file would you like the Filefactory to load? Type the filename and hit <enter> ", function(file) {
          console.log('Let us open up a file');
          input.openFile(file);
          //console.log('plip' + array);
          console.log('plilp' + input.array);
          //console.log(input.toHexString(array));
        });
       
        break;
      case 'url':
        console.log("We're going to do stuff with a url");
        input = new URLFactory(way);
        break;
      case 'manual':
        console.log("We're going to do stuff with manual input");
        input = new ManualFactory(way);
        break;
    }
  } else {
    console.log('Please choose between: [ file | url | manual ] . Do come again!');
    rl.close();
  }
});

// rl.question("What is your name ? ", function(name) {
//     rl.question("Where do you live ? ", function(country) {
//         console.log(`${name}, is a citizen of ${country}`);
//         rl.close();
//     });
// });


