/* =====================================
   HAPPY BIRTHDAY - SCRIPT.JS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       MỞ LỜI CHÚC
    ================================ */

    const openBtn = document.getElementById("openBtn");
    const letter = document.getElementById("letter");

    if (openBtn && letter) {

        openBtn.addEventListener("click", () => {

            letter.classList.remove("hidden");

            letter.scrollIntoView({

                behavior: "smooth"

            });

        });

    }

    /* ================================
       FADE KHI CUỘN
    ================================ */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll(".card").forEach(card => {

        card.classList.add("fade-up");

        observer.observe(card);

    });

    /* ================================
       HERO TEXT
    ================================ */

    document.getElementById("title")?.classList.add("show");
    document.getElementById("name")?.classList.add("show");
    document.getElementById("date")?.classList.add("show");

    /* ================================
       ĐỒNG HỒ YÊU NHAU
    ================================ */

    const startDate = new Date("2023-08-10T00:00:00");

    function updateLoveTimer() {

        const now = new Date();

        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const hours = Math.floor(

            (diff % (1000 * 60 * 60 * 24))

            / (1000 * 60 * 60)

        );

        const minutes = Math.floor(

            (diff % (1000 * 60 * 60))

            / (1000 * 60)

        );

        const seconds = Math.floor(

            (diff % (1000 * 60))

            / 1000

        );

        document.getElementById("days").textContent = days;

        document.getElementById("hours").textContent = hours;

        document.getElementById("minutes").textContent = minutes;

        document.getElementById("seconds").textContent = seconds;

    }

    updateLoveTimer();

    setInterval(updateLoveTimer, 1000);

    /* ================================
       TRÁI TIM BAY
    ================================ */

    function createHeart() {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize = (18 + Math.random() * 30) + "px";

        heart.style.animationDuration = (6 + Math.random() * 6) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 12000);

    }

    setInterval(createHeart, 500);

    /* ================================
       TYPING EFFECT
    ================================ */

    const title = document.getElementById("title");

    if (title) {

        const text = title.innerText;

        title.innerText = "";

        let index = 0;

        function typing() {

            if (index < text.length) {

                title.innerHTML += text.charAt(index);

                index++;

                setTimeout(typing, 80);

            }

        }

        typing();

    }

    /* ================================
       NÚT NHẤP NHÁY
    ================================ */

    if (openBtn) {

        setInterval(() => {

            openBtn.classList.toggle("glow");

        }, 1000);

    }

    /* ================================
       SCROLL TOP
    ================================ */

    window.scrollTo({

        top: 0,

        behavior: "instant"

    });

});

/* =====================================
   KẾT THÚC
===================================== */
/* =====================================================
   FIREWORKS.JS
   PART 1 - Canvas + Rocket + Particle
===================================================== */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let rockets = [];
let particles = [];

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}


/* =====================================================
   ROCKET
===================================================== */

class Rocket {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = canvas.height + 20;

        this.targetY =

            Math.random() * canvas.height * 0.5

            + 80;

        this.speed =

            6 +

            Math.random() * 3;

        this.color =

            `hsl(${Math.random()*360},100%,60%)`;

        this.exploded = false;

    }

    update() {

        this.y -= this.speed;

        if (this.y <= this.targetY) {

            this.exploded = true;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(

            this.x,

            this.y,

            3,

            0,

            Math.PI * 2

        );

        ctx.fillStyle = this.color;

        ctx.fill();

    }

}


/* =====================================================
   PARTICLE
===================================================== */

class Particle {

    constructor(x,y,color) {

        this.x = x;

        this.y = y;

        this.color = color;

        this.radius =

            2 +

            Math.random()*2;

        this.speed =

            Math.random()*5+2;

        this.angle =

            Math.random()*Math.PI*2;

        this.life = 100;

        this.alpha = 1;

        this.gravity = .05;

    }

    update(){

        this.x +=

            Math.cos(this.angle)

            * this.speed;

        this.y +=

            Math.sin(this.angle)

            * this.speed;

        this.speed *= .98;

        this.y += this.gravity;

        this.life--;

        this.alpha =

            this.life / 100;

    }

    draw(){

        ctx.save();

        ctx.globalAlpha = this.alpha;

        ctx.beginPath();

        ctx.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI*2

        );

        ctx.fillStyle = this.color;

        ctx.fill();

        ctx.restore();

    }

}


/* =====================================================
   TẠO ROCKET
===================================================== */

function createRocket(){

    rockets.push(

        new Rocket()

    );

}


/* =====================================================
   PHẦN 2 SẼ TIẾP TỤC Ở ĐÂY
===================================================== */
/* =====================================================
   PART 2 - EXPLOSION + UPDATE + DRAW
===================================================== */


/* =====================================================
   TẠO VỤ NỔ
===================================================== */

function explode(rocket){

    const amount = 80 + Math.floor(Math.random()*40);

    for(let i = 0; i < amount; i++){

        particles.push(

            new Particle(

                rocket.x,

                rocket.y,

                rocket.color

            )

        );

    }

}


/* =====================================================
   UPDATE ROCKET
===================================================== */

function updateRockets(){

    for(let i = rockets.length - 1; i >= 0; i--){

        rockets[i].update();

        if(rockets[i].exploded){

            explode(rockets[i]);

            rockets.splice(i,1);

        }

    }

}


/* =====================================================
   DRAW ROCKET
===================================================== */

function drawRockets(){

    rockets.forEach(rocket=>{

        rocket.draw();

    });

}


/* =====================================================
   UPDATE PARTICLES
===================================================== */

function updateParticles(){

    for(let i = particles.length - 1; i >= 0; i--){

        particles[i].update();

        if(

            particles[i].life <= 0 ||

            particles[i].alpha <= 0

        ){

            particles.splice(i,1);

        }

    }

}


/* =====================================================
   DRAW PARTICLES
===================================================== */

function drawParticles(){

    particles.forEach(particle=>{

        particle.draw();

    });

}


/* =====================================================
   TỰ ĐỘNG BẮN PHÁO HOA
===================================================== */

let fireworkInterval = setInterval(()=>{

    createRocket();

},600);



/* =====================================================
   PART 3 TIẾP TỤC BÊN DƯỚI
===================================================== */
/* =====================================================
   PART 3 - ANIMATION LOOP + AUTO STOP
===================================================== */


/* =====================================================
   VẼ NỀN MỜ (TRAIL EFFECT)
===================================================== */

function clearCanvas(){

    ctx.fillStyle = "rgba(15,23,42,0.20)";

    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}


/* =====================================================
   ANIMATION
===================================================== */

function animateFireworks(){

    clearCanvas();

    updateRockets();

    drawRockets();

    updateParticles();

    drawParticles();

    requestAnimationFrame(

        animateFireworks

    );

}

animateFireworks();


/* =====================================================
   TỰ DỪNG PHÁO HOA SAU 6 GIÂY
===================================================== */

setTimeout(()=>{

    clearInterval(

        fireworkInterval

    );

},6000);



/* =====================================================
   BẮN THÊM 1 VÀI QUẢ KHI CLICK
===================================================== */

window.addEventListener("click",()=>{

    for(let i=0;i<5;i++){

        setTimeout(()=>{

            createRocket();

        },i*150);

    }

});



/* =====================================================
   DOUBLE CLICK = GRAND FINALE
===================================================== */

window.addEventListener("dblclick",()=>{

    for(let i=0;i<20;i++){

        setTimeout(()=>{

            createRocket();

        },i*80);

    }

});



/* =====================================================
   PHÍM SPACE = FIREWORK
===================================================== */

window.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        createRocket();

    }

});



/* =====================================================
   TAB ẨN -> DỪNG PHÁO HOA
===================================================== */

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        clearInterval(

            fireworkInterval

        );

    }

});



/* =====================================================
   KHỞI TẠO 3 QUẢ PHÁO HOA NGAY LÚC MỞ WEB
===================================================== */

setTimeout(createRocket,300);

setTimeout(createRocket,700);

setTimeout(createRocket,1200);



/* =====================================================
   END
===================================================== */
/* ===========================================
   HEARTS.JS
   Hiệu ứng trái tim bay
=========================================== */

const heartsContainer = document.getElementById("hearts");

const heartIcons = [
    "❤️",
    "💖",
    "💕",
    "💗",
    "💓",
    "💞"
];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML =
        heartIcons[
            Math.floor(
                Math.random() * heartIcons.length
            )
        ];

    heart.style.left = random(0, 100) + "vw";

    heart.style.bottom = "-50px";

    heart.style.fontSize =
        random(18, 40) + "px";

    heart.style.opacity =
        random(0.4, 1);

    heart.style.animationDuration =
        random(6, 12) + "s";

    heart.style.transform =
        `rotate(${random(-25,25)}deg)`;

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {

        heart.remove();

    });

}


/* ===========================================
   Tốc độ tạo trái tim
=========================================== */

let heartInterval = setInterval(() => {

    createHeart();

}, 350);


/* ===========================================
   Khi chuyển tab thì tạm dừng
=========================================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        clearInterval(heartInterval);

    } else {

        heartInterval = setInterval(() => {

            createHeart();

        }, 350);

    }

});


/* ===========================================
   Tạo vài trái tim ngay khi mở web
=========================================== */

for (let i = 0; i < 20; i++) {

    setTimeout(() => {

        createHeart();

    }, i * 150);

}
/* ===========================================
   TIMER.JS
   Đồng hồ yêu nhau
=========================================== */

// ===============================
// NGÀY BẮT ĐẦU YÊU
// ===============================

const loveDate = new Date(

    "2023-08-10T00:00:00"

);


// ===============================
// FORMAT 2 CHỮ SỐ
// ===============================

function format(number){

    return number.toString().padStart(2,"0");

}


// ===============================
// UPDATE ĐỒNG HỒ
// ===============================

function updateLoveTimer(){

    const now = new Date();

    const diff = now - loveDate;

    const totalSeconds = Math.floor(

        diff / 1000

    );

    const days = Math.floor(

        totalSeconds / 86400

    );

    const hours = Math.floor(

        (totalSeconds % 86400) / 3600

    );

    const minutes = Math.floor(

        (totalSeconds % 3600) / 60

    );

    const seconds = Math.floor(

        totalSeconds % 60

    );

    document.getElementById("days").textContent =

        format(days);

    document.getElementById("hours").textContent =

        format(hours);

    document.getElementById("minutes").textContent =

        format(minutes);

    document.getElementById("seconds").textContent =

        format(seconds);

}


// ===============================
// CHẠY NGAY
// ===============================

updateLoveTimer();


// ===============================
// UPDATE MỖI GIÂY
// ===============================

setInterval(

    updateLoveTimer,

    1000

);