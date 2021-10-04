//Variables
const reproductor = document.querySelector('.reproductor');
let reproduciendoMusica = false;
let slideImg; //Imagen del slider
let audio; //La musica a reproducir

let contador = 1;


//EventListeners
// Slider();
eventListeners();


function eventListeners(){

    reproductor.addEventListener('click', reproducirMusica);
}

//Funciones
function Slider() {
    
    slideImg = document.querySelector('.first');
    
    //Intervalo de tiempo para el movimiento del slider
    if(audio.paused){

        // contador = contador + 1;
        console.log(audio.paused);
        console.log(slideImg.style.width);

        setInterval(function(){
                
                if(audio.paused){

                    document.getElementById(`radio${contador}`).checked = true;
                    
                    contador++;

                    if(contador > 4){
                        contador = 1;
                    }
                }
                else{
                    // console.log('slider fijo');
                    slideImg.style.width = '-60%';
                    return;
                }
                
        }, 5000);

    }
    else
    {
        // contador = contador - 1;
        console.log(audio.paused);
        console.log(contador);
    }
    
}

// Reproducir musica
function reproducirMusica(){

    //Se define el audio a reproducir
    audio = reproductor.parentElement.children[2];

    //Se muestra por consola cual audio es
    console.log(reproductor.parentElement.children);

    //Si el audio esta conectado
    if(audio.isConnected){
        
        //Si el audio esta pausado, se empieza a reproducir
        if(audio.paused){

            console.log(`¿El audio esta pausado?: ${audio.paused}`);

            audio.play();

            reproduciendoMusica = true;
            //Pausando animacion del slider
            Slider();

            //Si ya se ha reproducido, continua, sino, si es primera vez, empieza en una definida
            if(audio.currentTime > 20.61){
                audio.currentTime= audio.currentTime;
            }
            else{
                audio.currentTime = 20.61;
            }
            
            //Volumen por defecto
            audio.volume = 0.02;

            //Imagen del slider
            // slideImg = audio.parentElement.nextElementSibling;
            // console.log(slideImg);
            // animacionImg();
            initMp3Player();

            //Se sube el volumen al comenzar
            controlVolumen(true); //Enviando al control de volumen que se esta reproduciendo la musica
        }
        else
        {

            reproduciendoMusica = false;

            //Se baja el volumen al pausar
            controlVolumen(false);
            Slider();
        }
    }
}

//Funcion para el control del volumen
function controlVolumen(play){

    //Si la musica esta pausada
    if(play){

        //se sube el volumen
        do {
            audio.volume += 0.001;
        } while (audio.volume < 0.3);
    }
    else //Se baja el volumen
    {
        do {
            
            audio.volume -= 0.001;

        } while (audio.volume > 0.02);

        audio.pause(); //Se pausa
    }    
}

//Animacion del slide

let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

function initMp3Player(){

    // let audio_box = audio;
    
    // document.getElementById('audio_box').appendChild(audio_box);

    if(context === undefined){
        context = new AudioContext();
        analyser = context.createAnalyser();

        canvas = document.getElementById('analyzer_render');

        ctx = canvas.getContext('2d');

        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
    }
    else
    {
        frameLooper();
    }
    
}

function frameLooper(){
    window.requestAnimationFrame(frameLooper);

    fbc_array = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(fbc_array);

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