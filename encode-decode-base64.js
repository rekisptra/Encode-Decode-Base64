var plainTextIOField = document.querySelector("#encodebox-shasecsys"),
  base64IOField = document.querySelector("#base64box-shasecsys"),
  base64Submit = document.querySelector("#base64shasecsys"),
  textSubmit = document.querySelector("#encodeshasecsys"),
  
  //use the index of each character in the array as the key that links value and corresponding char in base64 table  
  base64Table = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"
  ];


//function that converts a standard ASCII character decimal value into its binary correspondant and turns it into a string
function dec2bin(dec) {
  var bin = (dec >>> 0).toString(2);
  if (bin.length < 8) {
    var itrs = 8 - bin.length;
    for (var i = 0; i < itrs; i++) {
      bin = "0" + bin;
    }
  }
  return bin;
}

base64Submit.addEventListener("click", function(e) {

  //block browser form reloading the page
  e.preventDefault();

  
  //declare variables needed during the conversion
  var string = base64IOField.value,
    stringToArray = string.split(''),
    s = "",
    textArray = [];

  
  //find index of each characer in the variable string and convert it into a string representing the 6 bit value corresponding to the character's index in base64 table and, since dec2bin returns an 8 bit binary number, cut the last two 0s of the string
  for (var i = 0; i < stringToArray.length; i++) {

    if (stringToArray[i] == "="){
      break;
    }
    stringToArray[i] = base64Table.indexOf(stringToArray[i]);
    s += dec2bin(stringToArray[i]).slice(2);

  }

  //create an array by splitting the s string
  s = s.split('');

  //add a separator between each series of 8 bit contained in the textArray array
  for (var i = 0; i < s.length; i++) {

    if (i > 0 && i % 8 === 0){
      textArray.push(" ");
    }
    textArray.push(s[i]);

  }
  
  //join the array textArray using as a separator the space just added in the previous for-loop
  textArray = textArray.join('').split(' ');

  
  //substitute each binary value in string form with its corresponding ASCII character
  for (var i = 0; i < textArray.length; i++) {

    charater = String.fromCharCode(parseInt(textArray[i], 2));
    textArray[i] = charater;

  }
  
  //join all the letters in the text array and we are done :D
  plainTextIOField.value = textArray.join('');

})

textSubmit.addEventListener("click", function(e) {

  //block browser form reloading the page
  e.preventDefault();

  //declare variables needed during the conversion
  var string = plainTextIOField.value,
    stringToArray = string.split(''),
    s = "",
    array64 = [];

  //for each letter in the stringToArray array get its charCode, convert it to binary form, make it a string and concatenate it with the s string
  for (var i = 0; i < stringToArray.length; i++) {

    var charCode = stringToArray[i].charCodeAt(0);
    s += dec2bin(charCode);

  }

  //make s an array made of each bit represented in the s string
  s = s.split('');

  
  //put all the strings of the s array inside array64 and separate each series of 6 consecutive elements with a single whitespace
  for (var i = 0; i < s.length; i++) {

    if (i > 0 && i % 6 === 0)
      array64.push(" ");
    array64.push(s[i]);

  }

  //concatenate all of array64's elements into a single string and then break the string using the whitespaces just added as divider
  array64 = array64.join('').split(' ');

  
  //make sure each string representing a binary value in array64 is 6 chars long
  if (array64[array64.length - 1].length < 6) {

    var array64Last = array64.pop(),
      nOf0s = 6 - array64Last.length;

    for (var i = 0; i < nOf0s; i++) {

      array64Last += "0";

    }

    array64.push(array64Last);

  }

  
  //make sure the array64's length is a multiple of 4, and if not add correct padding as base64 encoding requires
  if (array64.length % 4 !== 0) {

    var padding = 4 - (array64.length % 4);

    for (var i = 0; i < padding; i++) {

      array64.push("=");

    }

  }

  
  //substitute each string in array64 with its corresponding binary value and then with the value get the right character from the base 64 table
  for (var i = 0; i < array64.length; i++) {
    if (array64[i] == "=") {
      continue;
    }
    array64[i] = base64Table[parseInt(array64[i], 2)];
  }
  
  //concatenate all the characters inside of array64 and done :D
  base64IOField.value = array64.join('');

})
