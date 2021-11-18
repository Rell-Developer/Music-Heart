//Variables
// let reproductor;

const reproductor1 = document.querySelector('.primero');
const reproductor2 = document.querySelector('.second');
const reproductor3 = document.querySelector('.third');
const reproductor4 = document.querySelector('.fourth');

const musica = document.querySelectorAll('.reproductor');
const flechaDerecha = document.querySelector('.flechaDerecha');
const flechaIzquierda = document.querySelector('.flechaIzquierda');
// let btns = document.querySelectorAll('.radio-btns');

let reproduciendoMusica = false;
let slideImg; //Imagen del slider
let audio, audioAnterior; //La musica a reproducir y la musica anterior para bajar el volumen

let contador = 1;
let espaciado = 0; //Espaciado que nos ayudara en el movimiento del slide

//Booleanos para la gestion del cambio de musica
let first = false, second = false, third = false, fourth = false;

//EventListeners


function eventListeners(){

    // verificacionBtnReproductor();

    // switch (contador) {
    //     case 1:
    //         reproductor = document.querySelector('.primero');
    //     break;
    
    //     case 2:
    //         reproductor = document.querySelector('.second');
    //     break;

    //     // case 3:
    //     // reproductor = document.querySelector('.primero');
    //     // break;
    //     default:
    //         break;
    // }

    // verificacionBtnSlider();

    // Accion de los reproductores
    reproductor1.addEventListener('click', () => reproducirMusica(reproductor1, '.barFirst'));
    reproductor2.addEventListener('click', () => reproducirMusica(reproductor2, '.barSecond'));
    reproductor3.addEventListener('click', () => reproducirMusica(reproductor3, '.barThird'));
    reproductor4.addEventListener('click', () => reproducirMusica(reproductor4, '.barFourth'));


    //Acciones de las flechas
    flechaDerecha.addEventListener('click', () =>   movimientoSlide(true));
    flechaIzquierda.addEventListener('click', () => movimientoSlide(false));


    
}

//Funciones
function movimientoSlide(derecha){

    //Declarando
    slideImg = document.querySelector('.first');

    //Comparacion y movimiento
    derecha === true ? desplazamiento(-20) : desplazamiento(20);
}

    function desplazamiento(numero) {

        //Asignando un nuevo valor a espaciado
        espaciado = espaciado + (numero);

        if(espaciado === -80){  espaciado = 0;  }

        if(espaciado === 20){    espaciado = -60;   }

        //movimiento del slider
        slideImg.style.margin = `0 0 0 ${espaciado}%`;
    }

// function verificacionBtnReproductor(){

//     // musica.forEach( music => {

//     //     console.log(music.classList[2]);

//     //     // if(){

//     //     // }
//     //     if(music.classList[2] === 'primero' && !first){

//     //         audio.src = 'assets/music/Yonaguni.mp3';
//     //         first = true;
//     //         second = false;
//     //         // console.log(contador);
//     //         // reproductor = 
//     //     } 
        
//     //     if(music.classList[2] === 'second' && !second && contador === 2 )
//     //     {
//     //         audio.src = 'assets/music/Heart Of Glass - Miley Cyrus.mp3';
//     //         second = true;
//     //         first = false;
            
//     //         console.log(contador);
//     //     }
//     // });
// }

// function Slider() {
    
//     // slideImg = document.querySelector('.first');
//     // setInterval(() => {

//     //     console.log('entrando');
//     //     slideImg.style.transform = `scale(${1 * -1})`;
//     // }, 5000);

//     //Intervalo de tiempo para el movimiento del slider
//     // if(audio.paused){

//     //     // contador = contador + 1;

//     //     setInterval(function(){
                
//     //             if(audio.paused){

//     //                 // document.getElementById(`radio${contador}`).checked = true;
                    
//     //                 contador++;

//     //                 if(contador > 4){
//     //                     contador = 1;
//     //                 }
//     //             }
//     //             else{
//     //                 // console.log('slider fijo');
//     //                 slideImg.style.width = '-60%';
//     //                 return;
//     //             }
                
//     //     }, 5000);

//     // }    
// }

// Reproducir musica

function reproducirMusica(reproductor, canva){


    // console.log(reproductor);
    //Se verifica si alguna otra musica no se esta reproduciendo, si es asi, se le baja volumen
    let musicaCambiada;

    //Se define el audio a reproducir
    audio = reproductor.parentElement.children[2];

    //Se verifica si alguna otra musica no se esta reproduciendo, si es asi, se le baja volumen
    if(audio !== undefined && audio !== audioAnterior){ 
        
        musicaCambiada = true;
        
        if(context !== undefined){
            
            context.close();
            context = undefined;
        }
        
    } 
    else if(audio === audioAnterior)
    {
        musicaCambiada = false;
    }


    if(musicaCambiada && audioAnterior !== undefined){
        controlVolumen(false, audioAnterior);
    }

    //Se define el audio para respaldo
    audioAnterior = reproductor.parentElement.children[2];

    //Si el audio esta conectado
    if(audio.isConnected){

        
        //Si el audio esta pausado, se empieza a reproducir
        if(audio.paused){   

            // verificacionBtnReproductor();
            audio.play();

            console.log(audio);
            reproduciendoMusica = true;
            //Pausando animacion del slider
            // Slider();

            //Si ya se ha reproducido, continua, sino, si es primera vez, empieza en una definida
            if(audio.currentTime > 20.61){
                audio.currentTime= audio.currentTime;
            }
            else{
                audio.currentTime = 20.61;
            }
            
            //Volumen por defecto
            audio.volume = 0.02;

            //Barras de musica
            initMp3Player(canva);

            //Se sube el volumen al comenzar
            controlVolumen(true, audio); //Enviando al control de volumen que se esta reproduciendo la musica
        }
        else
        {

            reproduciendoMusica = false;

            //Se baja el volumen al pausar
            controlVolumen(false, audio);

            // initMp3Player(canva);
            // Slider();
        }
    }
}

//Funcion para el control del volumen
function controlVolumen(play, musica){

    //Si la musica esta pausada
    if(play){

        //se sube el volumen
        do {
            musica.volume += 0.0007;
        } while (musica.volume < 0.3);
    }
    else //Se baja el volumen
    {
        do {
            
            musica.volume -= 0.00005;

        } while (musica.volume > 0.02);

        musica.pause(); //Se pausa
    }    
}



//Animacion del slide

let canvas, pastCanvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height, pastSource;

function initMp3Player(canva){

    // if(!audio.paused){
    //     context = undefined;
    // }

    // context = undefined;
    
    // let audio_box = audio;
    
    // document.getElementById('audio_box').appendChild(audio_box);

    if(context === undefined && !audio.paused){

        //
        analyser = undefined;
        canvas = undefined;
        ctx = undefined;
        

        context = new AudioContext();
        analyser = context.createAnalyser();

        canvas = document.querySelector(canva);

        if(canvas !== pastCanvas){

            // console.log('Canva actual');
            // console.log(canvas);
            // console.log('');
            // console.log('Canva anterior');
            // console.log(pastCanvas);

            source = undefined;

            pastCanvas = canvas;

            // console.log('Nuevo valor de Canva anterior');
            // console.log(pastCanvas);

            source = context.createMediaElementSource(audio);

            source.connect(analyser);
            // console.log(context);
        }
        else{

            // source.close;
            // if(source !== undefined){
                
            // }
        }

        ctx = canvas.getContext('2d');

        // if(pastCanvas !== canvas){
        //     source = context.createMediaElementSource(audio);
        // }
        // else{

        // }

        pastSource = source;

        analyser.connect(context.destination);

        // fbc_array = undefined;

        frameLooper();
    }
    else
    {
        frameLooper();
    }
}

function frameLooper(){

    // context.AudioContext

    fbc_array = undefined;

    window.requestAnimationFrame(frameLooper);

    fbc_array = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(fbc_array);

    if(ctx !== undefined){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFE6E6";
        
        bars = 100;

        //Altura y anchura de las barras
        for(var i = 0; i < bars; i++){
            bar_x = i * 3;
            bar_width = 2;
            bar_height = -(fbc_array[i] / 1.6);
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
        }
    }
    
}


eventListeners();