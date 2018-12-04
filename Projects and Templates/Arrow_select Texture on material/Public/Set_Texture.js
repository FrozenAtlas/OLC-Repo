//@input Asset.Texture[] textures
//@input Asset.Material material

var currentIndex = 0;
var textureCount = script.textures.length;
print("There are "+textureCount+" Textures in our Array");

script.material.mainPass.baseTex = (script.textures[currentIndex]);

//this occurs when an arrow is pressed
global.cycleTexture = function(direction)
{
// direction can either be 1 or -1 depending on which arrow was pressed. 
//The arrows have their own script that sends this value here.
    currentIndex += direction;
        if (currentIndex == -1)
        {
            currentIndex = textureCount - 1;
            script.material.mainPass.baseTex = (script.textures[currentIndex]);
        } 
        else 
        {
            currentIndex = currentIndex % textureCount;
            script.material.mainPass.baseTex = (script.textures[currentIndex]);
        }

    print("setting #"+currentIndex+" texture");
}