const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const descansoCurtoBt = document.querySelector('.app__card-button--curto');
const descansoLongoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const botaoMusica = document.querySelector('#alternar-musica');
const startPausa = document.querySelector('#start-pause');
const tempoTela = document.querySelector('#timer')

let contador = 1500
let intervaloTemp = null;
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('sons/play.wav');
const somPausa = new Audio('sons/pause.mp3');
const somAlerta = new Audio('sons/beep.mp3');

musica.loop= true;

focoBt.addEventListener('click', () => {
    contador = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})
descansoCurtoBt.addEventListener('click', () => {
    contador = 300
    alterarContexto('descanso-curto')
    descansoCurtoBt.classList.add('active')
})

descansoLongoBt.addEventListener('click', () => {
    contador = 900
    alterarContexto('descanso-longo')
    descansoLongoBt.classList.add('active')
})

botaoMusica.addEventListener('change',()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

function alterarContexto(contexto) {
    mostraTempo()
    botoes.forEach((contexto)=>{
        contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong"> mergulhe no que importa.</strong >`
            break
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong >`
            break
        case 'descanso-longo':
            titulo.innerHTML= `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong >`
            break

    }
}
function contagemRegressiva() {
    if(contador<=0){
    somAlerta.play()
    zerar()
    alert('Tempo Finalizado')
    return
    }
    contador -=1
    mostraTempo()
}

function iniciarPausar(){
    if(intervaloTemp){
        somPausa.play()
        zerar()
        return
    }
    somPlay.play()
    intervaloTemp = setInterval(contagemRegressiva,1000)
}

startPausa.addEventListener('click',iniciarPausar)

 function zerar(){
    clearInterval(intervaloTemp)
    intervaloTemp = null
}

function mostraTempo(){
    const tempo = new Date(contador*1000)
    let tempoFormatado = tempo.toLocaleString('pt-Br',{minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostraTempo()