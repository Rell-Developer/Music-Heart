//Variables
const reproductor = document.querySelector('.reproductor');
let slideImg; //Imagen del slider
let audio; //La musica a reproducir

let contador = 1;


//EventListeners
Slider();
eventListeners();


function eventListeners(){

    reproductor.addEventListener('click', buscarMusica);
}

//Funciones
function Slider() {

    //Intervalo de tiempo para el movimiento del slider
    setInterval(function(){
        document.getElementById(`radio${contador}`).checked = true;

        contador++;

        if(contador > 4){
            contador = 1;
        }
    }, 15000);
}

// Buscar musica
function buscarMusica(){

    //Se define el audio a reproducir
    audio = reproductor.parentElement.children[2];

    //Se muestra por consola cual audio es
    console.log(reproductor.parentElement.children);

    //Si el audio esta conectado
    if(audio.isConnected){
        
        //Si el audio esta pausado, se empieza a reproducir
        if(audio.paused){

            audio.play();
            audio.currentTime = 20.61;
            audio.volume = 0.3; //Se baja el volumen
            console.log('Se empezo a reproducir la musica');

            //Imagen del slider
            // slideImg = audio.parentElement.nextElementSibling;
            // animacionImg(slideImg, -5, -5);
        }
        else{

            //Si se esta reproduciendo, se pausa
            audio.pause();
            console.log('Se pauso la musica')
        }
    }
}

//Animacion del slide
// function animacionImg(img, x, y){

//     setInterval(() => {
        
//         img.style.hover.transform = scale3d( 5, 5, 0);
//         // img.style.transform = 

//     }, 2000);
// }
