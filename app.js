const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");

const ULTIMO_NIVEL = 5;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
    // this.siguienteNivel()
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    // hay que enlazar el this, porque con el eventListener perdemos el contexto de this(la referencia al juego)
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    };
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumeroAColor(num) {
    switch (num) {
      case 0:
        return "celeste";
      case 1:
        return "naranja";
      case 2:
        return "violeta";
      case 3:
        return "verde";
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "naranja":
        return 1;
      case "violeta":
        return 2;
      case "verde":
        return 3;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      console.log(color);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
    console.log("- - - - - - - - - ")
  }

  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          // Ganó !
          this.ganoElJuego();
        } else {
          console.clear()
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      // Perdió
      this.perdioElJuego();
    }
  }

  ganoElJuego() {
    swal("Enhorabuena!", "Ganaste el juego!", "success").then(this.inicializar);
  }

  perdioElJuego() {
    swal("Has perdido..", "Upps!, Fallaste 😰", "error").then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
