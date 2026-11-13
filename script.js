const $ = (id) => document.getElementById(id);

const inicio = $("inicio");
const espera = $("espera");
const pedido = $("pedido");
const final  = $("final");

const abrir = $("abrir");
const sim   = $("sim");
const nao   = $("nao");
const balao = $("balao");
const chuva = $("chuva");

function mostrar(secao){
    [inicio, espera, pedido, final].forEach(s => s.style.display = "none");
    secao.style.display = "flex";
}

// 1 → 2: suspense "espera por isso..." e depois a pergunta
abrir.onclick = () => {
    mostrar(espera);
    espera.classList.add("ativa");
    setTimeout(() => mostrar(pedido), 3600);
};

// 3: botão NÃO fugindo, com frases da série
const frases = [
    "Suit up! 🕴️",
    "Desafio aceito… de recusar o NÃO.",
    "Isso não vai ser lendário.",
    "Nem o Barney aprovaria esse NÃO.",
    "Você tem 100% de chance de errar esse clique.",
    "Ted jura que esse botão é o errado.",
    "Quase… mas não. 😏",
    "Vai logo no SIM, o guarda-chuva é amarelo ☂️"
];

let fugas = 0;

function mover(e){
    if (e) e.preventDefault();

    nao.classList.add("fugindo");

    const x = Math.random() * (window.innerWidth  - nao.offsetWidth  - 20) + 10;
    const y = Math.random() * (window.innerHeight - nao.offsetHeight - 20) + 10;
    nao.style.left = x + "px";
    nao.style.top  = y + "px";

    balao.textContent = frases[fugas % frases.length];
    balao.classList.add("on");

    fugas++;
    sim.style.transform = "scale(" + Math.min(1 + fugas * 0.08, 1.7) + ")";
}

nao.addEventListener("mouseover", mover);
nao.addEventListener("touchstart", mover, { passive:false });
nao.addEventListener("click", mover);

// 4: SIM
sim.onclick = () => {
    mostrar(final);
    nao.style.display = "none";
    guardaChuvas();
};

// chuva de guarda-chuvas amarelos
function guardaChuvas(){
    setInterval(() => {
        const g = document.createElement("div");
        g.className = "gc";
        g.textContent = "☂️";
        g.style.left = Math.random() * 100 + "vw";
        g.style.fontSize = (Math.random() * 20 + 22) + "px";
        g.style.animationDuration = (Math.random() * 2 + 3) + "s";
        g.style.setProperty("--giro", (Math.random() * 120 - 60) + "deg");
        chuva.appendChild(g);
        g.addEventListener("animationend", () => g.remove());
    }, 280);
}
