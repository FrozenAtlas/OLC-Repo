// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input int keyIndex -1



// api function for Keyboard_Main to call and set index (on api as well, so other scripts can access this info, too)
script.api.setIndex = function(index, character)
{

	script.keyIndex = index;
	script.api.keyIndex = index;
	script.api.ch = character;

}