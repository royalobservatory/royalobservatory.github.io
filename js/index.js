window.requestAnimFrame = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let dpi = window.devicePixelRatio || 1;
ctx.scale(dpi, dpi);
console.log(dpi);

function fix_dpi() {
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

var particle_count = 1, particles = [];

function Particle() {
    this.connected = false;
    this.radius = Math.round((Math.random() * 10));
    this.x = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi / 2;
    this.y = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi / 2.02;
    this.color = "#eeeeee";
    this.speed = 1;

    this.grow = function () {
        ctx.beginPath();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.1;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = "#eeeeee";
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.fillStyle = "#eeeeee";
        ctx.fill();
        ctx.closePath();

        this.radius = this.radius + this.speed;

        if (this.radius > 250) {
            this.radius = Math.round((Math.random() * 10));
            this.x = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi / 2;
            this.y = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi / 2.02;
            this.color = "#eeeeee";
            this.speed = 1;
        }
    };
};

for (var i = 0; i < particle_count; i++) {
    fix_dpi();
    var particle = new Particle();
    particles.push(particle);
}

function animate() {
    fix_dpi();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particle_count; i++) {
        particles[i].grow();
    }
    requestAnimFrame(animate);
}

animate();
