function draw() {
    const canvas = document.getElementById('canvas');
    const width = canvas.width / 2;

    var thickness = document.getElementById('thickness').value;
    var diameter = document.getElementById('diameter').value;
    var num = document.getElementById('num').value;

    if (num < 3) {
        document.getElementById("output").innerHTML = "Bitte mehr als 3 Bretter verwenden";
        return;
    } else {
        document.getElementById("output").innerHTML = "";
    }

    var angle = 1/2 * (180 - 360 / num);
    var thickness_actual_tmp = Math.abs(thickness / Math.sin(angle));

    var width_mult = diameter / (2 * width);
    thickness_actual = thickness_actual_tmp / width_mult;

    if (thickness_actual > width) {
        document.getElementById("output").innerHTML = "Brett zu dick bei diesem Durchmesser";
        return;
    } else {
        document.getElementById("output").innerHTML = "";
    }

    var breadth = 2 * thickness_actual_tmp * Math.tan(Math.PI / num)

    document.getElementById("output").innerHTML = "Der Winkel <strong>α</strong> beträgt " + Math.round(angle * 100) / 100 + "°" + " und die Breite eines Bretts beträgt " + Math.round(breadth * 100) / 100 + "mm.";

    thickness_actual = Math.min(thickness_actual, width)

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#d1d8df";

        ctx.beginPath();
        ctx.arc(width, width, width, 0, Math.PI * 2, true);
        ctx.stroke();

        // polygon 1
        var numberOfSides = num,
        size = width,
        Xcenter = width,
        Ycenter = width;

        ctx.beginPath();
        ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

        for (var i = 1; i <= numberOfSides;i += 1) {
            ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
        }

        ctx.lineWidth = 1;
        ctx.stroke();

        // polygon 2
        var numberOfSides = num,
        size = width - thickness_actual,
        Xcenter = width,
        Ycenter = width;

        ctx.beginPath();
        ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

        for (var i = 1; i <= numberOfSides;i += 1) {
            ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
        }

        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner lines
        var numberOfSides = num,
        size = width,
        Xcenter = width,
        Ycenter = width;

        for (var i = 0; i <= numberOfSides;i += 1) {
            ctx.beginPath();
            ctx.moveTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
            ctx.lineTo (Xcenter + (size - thickness_actual) * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + (size - thickness_actual) * Math.sin(i * 2 * Math.PI / numberOfSides));
            ctx.stroke();
        }
        
    }
  }