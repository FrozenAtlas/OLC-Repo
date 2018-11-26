//Made by Rhonda

//@input Component.SpriteVisual dayOfWeekSprite
 
//@ui {"widget": "separator"}
 
//@input Asset.Texture sundayTexture
//@input Asset.Texture mondayTexture
//@input Asset.Texture tuesdayTexture
//@input Asset.Texture wednesdayTexture
//@input Asset.Texture thursdayTexture
//@input Asset.Texture fridayTexture
//@input Asset.Texture saturdayTexture
 
var date = new Date();
var day = date.getDay();
 
switch( day )
{
    case 0:
        print( "Sunday" );
        setSpriteTexture(script.dayOfWeekSprite, script.sundayTexture);
        break;
    case 1:
        print( "Monday" );
        setSpriteTexture(script.dayOfWeekSprite, script.mondayTexture);
        break;
    case 2:
        print( "Tuesday" );
        setSpriteTexture(script.dayOfWeekSprite, script.tuesdayTexture);
        break;
    case 3:
        print( "Wednesday" );
        setSpriteTexture(script.dayOfWeekSprite, script.wednesdayTexture);
        break;
    case 4:
        print( "Thursday" );
        setSpriteTexture(script.dayOfWeekSprite, script.thursdayTexture);
        break;
    case 5:
        print( "Friday" );
        setSpriteTexture(script.dayOfWeekSprite, script.fridayTexture);
        break;
    case 6:
        print( "Saturday" );
        setSpriteTexture(script.dayOfWeekSprite, script.saturdayTexture);
        break;
}
 
function setSpriteTexture(sprite, texture)
{
    if(sprite && texture){
        script.dayOfWeekSprite.mainMaterial.mainPass.baseTex = texture;
    }
}