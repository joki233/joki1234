(function () {
    var width, height;

    function resize() {
        width = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        height = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(function (p, i) {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= (p.x > width || p.x < 0) ? -1 : 1;
            p.vy *= (p.y > height || p.y < 0) ? -1 : 1;
            ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);

            for (var j = i + 1; j < allObjects.length; j++) {
                var target = allObjects[j];
                if (target.x !== null && target.y !== null) {
                    var dx = p.x - target.x;
                    var dy = p.y - target.y;
                    var d = dx * dx + dy * dy;
                    if (d < target.max) {
                        if (target === mouse && d >= target.max / 2) {
                            p.x -= 0.03 * dx;
                            p.y -= 0.03 * dy;
                        }
                        var f = (target.max - d) / target.max;
                        ctx.beginPath();
                        ctx.lineWidth = f / 2;
                        ctx.strokeStyle = "rgba(255,255,255," + (0.2 + f) + ")";
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(target.x, target.y);
                        ctx.stroke();
                    }
                }
            }
        });

        requestAnimationFrame(draw);
    }

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.style.cssText = "position:fixed;top:0;left:0;z-index:0;opacity:0.5;pointer-events:none";

    document.getElementById("particles-canvas").replaceWith(canvas);

    resize();
    window.onresize = resize;

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 45);
        };

    var mouse = { x: null, y: null, max: 20000 };

    window.onmousemove = function (e) {
        e = e || window.event;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    window.onmouseout = function () {
        mouse.x = null;
        mouse.y = null;
    };

    window.ontouchmove = function (e) {
        e = e || window.event;
        var touch = e.touches[0];
        if (touch) {
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
    };
    window.ontouchend = window.ontouchcancel = function () {
        mouse.x = null;
        mouse.y = null;
    };

    var particles = [];
    var rand = Math.random;
    for (var i = 0; i < 100; i++) {
        particles.push({
            x: rand() * width,
            y: rand() * height,
            vx: 2 * rand() - 1,
            vy: 2 * rand() - 1,
            max: 6000
        });
    }

    var allObjects = particles.concat([mouse]);

    setTimeout(function () {
        draw();
    }, 100);
})();
