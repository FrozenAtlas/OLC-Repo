//@input Asset.Material targetMaterial
//@input float speed = 1.0
//@input float saturation = 1.0
//@input float brightness = 0.5

script.createEvent("UpdateEvent").bind(onUpdate);

var hue = 0;

function onUpdate(e){
	if(script.targetMaterial){
		hue += script.speed * e.getDeltaTime();
		hue %= 1.0;
		var rgb = hslToRgb(hue, script.saturation, script.brightness);

		script.targetMaterial.mainPass.baseColor = new vec4(rgb[0], rgb[1], rgb[2], 255);
        
        	
	}
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r, g, b ];
}