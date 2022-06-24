function draw() {
    const canvas = document.getElementById('canvas');
    var thickness = document.getElementById('thickness').value;
    var diameter = document.getElementById('diameter').value;
    var num = document.getElementById('num').value;

    if (num < 3) {
        document.getElementById("output").innerHTML = "Bitte mehr als 3 Bretter verwenden";
        return;
    } else {
        document.getElementById("output").innerHTML = "";
    }

    const width = canvas.width / 2;
    var width_div = diameter / (2 * width);
    var angle = 1/2 * (180 - 360 / num);
    var thickness_actual = thickness / Math.sin(angle * (Math.PI/180) * width_div);

    if (thickness_actual > width) {
        document.getElementById("output").innerHTML = "Brett zu dick bei diesem Durchmesser";
        return;
    } else {
        document.getElementById("output").innerHTML = "";
        thickness_actual = Math.min(thickness_actual, width)
    }

    var breadth = 2 * thickness_actual * width_div * Math.tan(Math.PI / num)

    document.getElementById("output").innerHTML = "Der Winkel <strong>α</strong> beträgt " 
        + Math.round(angle * 100) / 100 + "°" + " und die Breite eines Bretts beträgt " 
        + Math.round(breadth * 100) / 100 + "mm.";

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#d1d8df";

        ctx.beginPath();
        ctx.arc(width, width, width, 0, Math.PI * 2, true);
        ctx.stroke();

        // polygon 1
        var size = width,
        Xcenter = width,
        Ycenter = width;

        ctx.beginPath();
        ctx.moveTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

        for (var i = 1; i <= num;i += 1) {
            ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / num), Ycenter + size * Math.sin(i * 2 * Math.PI / num));
        }

        ctx.stroke();

        // polygon 2
        size = width - thickness_actual;

        ctx.beginPath();
        ctx.moveTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

        for (var i = 1; i <= num;i += 1) {
            ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / num), Ycenter + size * Math.sin(i * 2 * Math.PI / num));
        }

        ctx.stroke();

        // Inner lines
        size = width;

        for (var i = 0; i <= num;i += 1) {
            ctx.beginPath();
            ctx.moveTo(Xcenter + size * Math.cos(i * 2 * Math.PI / num), Ycenter + size * Math.sin(i * 2 * Math.PI / num));
            ctx.lineTo(Xcenter + (size - thickness_actual) * Math.cos(i * 2 * Math.PI / num), Ycenter + (size - thickness_actual) * Math.sin(i * 2 * Math.PI / num));
            ctx.stroke();
        }
    }
  }
