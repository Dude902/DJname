//Syllable counter derived from Gizoogle 2.0 (gizoogle2.tumblr.com)

var useclassic = 1;

var replacements, regex, key, textnodes, node, s, vowels;

vowels = {'a':'','e':'','i':'','o':'','u':'','A':'','E':'','I':'','O':'','U':''};
letters = {'a':'','b':'','c':'','d':'','e':'','f':'','g':'','h':'','i':'','j':'','k':'','l':'','m':'',
'n':'','o':'','p':'','q':'','r':'','s':'','t':'','u':'','v':'','w':'','x':'','y':'','z':'',
'A':'','B':'','C':'','D':'','E':'','F':'','G':'','H':'','I':'','J':'','K':'','L':'','M':'',
'N':'','O':'','P':'','Q':'','R':'','S':'','T':'','U':'','V':'','W':'','X':'','Y':'','Z':''};


//GET SAVED LIST OF NAMES FIRST TO ADD TO
var DJNameWords = new Array();
//var nameData = JSON.parse(savedFile_JsonStringData);

/***************************************************************************************************************************/

function DJ() {
	
//initialize variables for counting syllables

var x=".";
var splitexpr = /\s{1,}/;
var splitexprg = /\s{1,}/g;
var ssplit = new Array();
var ssplitchar = new Array();
var numofvowels = new Array();
var vowelfoundat = new Array();
var doublefoundat = new Array();
var prevvowel = new Array();
var firstletter = new Array();
	var firstletterchecked = new Array();
var lastletter = new Array();

/***************************************************************************************************************************/
//Get all the text nodes
textnodes = document.evaluate(
    "//*[not(self::script or self::style or self::code)]/text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
/* Main loop for each textnode starts here **************************************************************************************************************************/
for (var i = 0; i < textnodes.snapshotLength; i++) {
	
	node = textnodes.snapshotItem(i);
	s = node.data; //data in the current textnode

	vowelfoundat[i]=new Array();
	doublefoundat[i]=new Array();
	numofvowels[i]=new Array();
	prevvowel[i]=new Array();
	firstletter[i]=new Array();
		firstletterchecked[i]=new Array();
	lastletter[i]=new Array();

	ssplitchar[i]= new Array();
	ssplit[i]= new Array();
	ssplitchar[i]= s.match(splitexprg);
	ssplit[i]= s.split(splitexpr);

/* main loop for each word starts here **************************************************************************************************************************/
for (var j = 0; j < ssplit[i].length ; j++){

	vowelfoundat[i][j]= new Array;
		vowelfoundat[i][j][0]=0;
	doublefoundat[i][j]= new Array;
		doublefoundat[i][j][0]=0;
	numofvowels[i][j]=0;
	firstletter[i][j]=0;
		firstletterchecked[i][j]=0;

//get number of syllables (equal to numofvowels[i][j])
for (var v = 0; v < ssplit[i][j].toString().length ; v++)
	{
	prevvowel[i][v]=0;
	if (ssplit[i][j].toString().charAt(v) in letters)
		{
			lastletter[i][j]=v;
			if (firstletterchecked[i][j] == 0) {firstletter[i][j] = v; firstletterchecked[i][j]=1;}
		}
	}
for (var v = 0; v < ssplit[i][j].toString().length ; v++)
	{
		if (ssplit[i][j].toString().charAt(v) in vowels && v != lastletter[i][j])
		{
			if (prevvowel[i][v] == 0)
			{
			numofvowels[i][j]++;
			vowelfoundat[i][j][vowelfoundat[i][j].length] = v;
			prevvowel[i][v+1] = 1;
			}
			else
			{
			doublefoundat[i][j][doublefoundat[i][j].length] = v - 1;
			}
		}
	}
if (ssplit[i][j].toString().charAt(lastletter[i][j]).toLowerCase() == "y" && !(ssplit[i][j].toString().charAt(lastletter[i][j]-1) in vowels))
	{
	numofvowels[i][j]++;
	vowelfoundat[i][j][vowelfoundat[i][j].length] = lastletter[i][j];
	}

if (numofvowels[i][j]==0 && ssplit[i][j].toString().charAt(lastletter[i][j]) in vowels)
	{
	numofvowels[i][j]++;
	vowelfoundat[i][j][vowelfoundat[i][j].length] = lastletter[i][j];
	}

/***************************************************************************************************************************/
	
//GET ALL 3 OR 4 VOWEL WORDS
//classic gizoogle way
if (useclassic == 1)
	{

		if (numofvowels[i][j]==3)
		{
		if (DJNameWords.indexOf(ssplit[i][j].toString()) == -1)
		DJNameWords.push(ssplit[i][j].toString());
		/*newword = ssplit[i][j].toString().substr(0, vowelfoundat[i][j][2]) + "izzle";
			if (lastletter[i][j] != ssplit[i][j].toString().length-1)
			{
			newword = newword + ssplit[i][j].toString().substr(lastletter[i][j]+1);
			}*/
		}

		if (numofvowels[i][j]==4)
		{
		if (DJNameWords.indexOf(ssplit[i][j].toString()) == -1)
		DJNameWords.push(ssplit[i][j].toString());
		/*newword = ssplit[i][j].toString().substr(0, vowelfoundat[i][j][3]) + "izzle";
			if (lastletter[i][j] != ssplit[i][j].toString().length-1)
			{
			newword = newword + ssplit[i][j].toString().substr(lastletter[i][j]+1);
			}*/
		}

	 }
//new gizoogle way
/*
else
	{
		if (numofvowels[i][j]>=2)
		{
			if (numofvowels[i][j]==2 && ssplit[i][j].charAt(firstletter[i][j]) in vowels) var numsyllables=2;
			else var numsyllables=Math.floor(Math.random() * (numofvowels[i][j] - Math.round(numofvowels[i][j]/2) + 1)) + Math.round(numofvowels[i][j]/2);
			newword = ssplit[i][j].toString().substr(0, vowelfoundat[i][j][numsyllables]) + "izzle";
				if (lastletter[i][j] != ssplit[i][j].toString().length-1)
				{
				newword = newword + ssplit[i][j].toString().substr(lastletter[i][j]+1);
				}
		}
	}
}
*/
	}


//var savedFile_JsonStringData = JSON.stringify(nameData);

}

//shuffle array function
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
DJNameWords = shuffle(DJNameWords);

alert("DJ " + DJNameWords.join("\nDJ "));
console.log("DJ " + DJNameWords.join("\nDJ "));
}
DJ();