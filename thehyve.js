console.log('BinaryFactory 1.0 (c) Webgast.nl 2020 for TheHyve.nl assessment');

const USE_TRIVIAL_IMPLEMENTATION = 1;

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Decoder {
 
  //accepts input in form of array
  //initiates empty result string
  //calls feeder function
  constructor(input) {
    this.input = input;
    this.result = ""; //empty result string
    this.temp = []; //temporary result array
    this.feeder(this.convert);
  }

  //stolen function that converts hex values to string.
  hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }
    
  //adds value to temporary result buffer
  addToBuffer(value) {
    this.temp.push(value);
  }
  
  //in case an erronous value the byte 3F should be output in its place
  inComplete() {
    this.result += '3F';
  }
  
  //to standard error, re-encode data.
  reEncode () {
    if(USE_TRIVIAL_IMPLEMENTATION == 1) { //
      //The program should default to the latter and only switch to the first one if the environment variable USE_TRIVIAL_IMPLEMENTATION has value 1.
    } else {
      //p = 0
      //To standard error, the result of re-encoding the decoded data produced in the above step. 
      //Write two implementations, a trivial one that always uses pi = 0 and a better one that produces an output as short as you can manage.
    }
  }
  
  //decodes a sequence.
  decode(pair) {
    
    if(pair.length == 2) { //assume this is an array with 2 members.
      //(p, q) <-- eerste ding is p, tweede ding is q.
      let [p, q] = pair;
      
      if(p == 0) { //if p == 0 append q.
        //append q to the result buffer.
        this.addToBuffer(q);
      } else if ((this.temp.length - p >= 0) && ((this.temp.length - (p + q)) <= this.temp.length)) { 
        //read the last p characters appended.
        let read = this.temp.slice(this.temp.length - p);

        //take the first (from the left) q characters.
        for(var i=0; i<q; i++) {
          this.addToBuffer(read[i]);
        }
      } else {
        this.addToBuffer(false);
      }
      
    } else { //in case invalid or incomplete pair, the byte 3F should be output in its place.
        this.addToBuffer(false);
    }  
            
  }

  //grabs the temp array, converts the members and copies them in the result string.
  convert() {
    for(var value in this.temp) {
      if(this.temp[value]) {
        this.result += this.hex2a(this.temp[value]);        
      } else {
        this.inComplete();
      }
      
    }
    
    //standard output encoded data stream.
    console.log("the output of the decoder is: " + this.result);

  }
  
  //feeds the array with length N of input to the decode function.
  feeder(convert) {
    for(var pair in this.input) {
      this.decode(this.input[pair]);      
    }
    
    this.convert();
  }

}

//example data including 1 faulty pair
var c = [[0,61], [1,1], [0,62], [3,2], [3,3], [61]];
console.log('The default input data (includes 1 erronous pair) is: ' + c);

rl.question("If you want to override the default data set with your own data in array format [ [0,61], [1,1], [0,62], [3,2], [3,3] ] enter now and hit <enter> ", function(way) {
  if(way.length > 0) {    
    //instantiate the Decoder.
    console.log('Right, we will be using your data instead: ' + JSON.parse(way));
    let bliep = new Decoder(JSON.parse(way));
  } else {
    //instantiate the Decoder.
    console.log('I will use the default data set');
    let bliep = new Decoder(c);
  }
  
  rl.close();
});



