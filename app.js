const blue = document.getElementById('blue');
const purple = document.getElementById('purple');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const btnBegin = document.getElementById('btnBegin');

const LAST_LEVEL = 5;

class Game {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.generateColors();
    setTimeout(this.nextLevel, 500);
    // this.nextLevel()
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    // hay que enlazar el this, porque con el eventListener perdemos el contexto de this(la referencia al game)
    // we have to bind this, we need the context because with the eventListener we lose it
    this.toggleBtnBegin();
    this.nivel = 1;
    this.colors = {
      blue,
      purple,
      orange,
      green
    };
  }

  toggleBtnBegin() {
    if (btnBegin.classList.contains('hide')) {
      btnBegin.classList.remove('hide');
    } else {
      btnBegin.classList.add('hide');
    }
  }

  generateColors() {
    this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.subLevel = 0;
    this.iluminateSequence();
    this.addClickEvents();
  }

  changeNumberToColor(num) {
    switch (num) {
      case 0:
        return 'blue';
      case 1:
        return 'orange';
      case 2:
        return 'purple';
      case 3:
        return 'green';
    }
  }

  changeColorToNumber(color) {
    switch (color) {
      case 'blue':
        return 0;
      case 'orange':
        return 1;
      case 'purple':
        return 2;
      case 'green':
        return 3;
    }
  }

  iluminateSequence() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.changeNumberToColor(this.sequence[i]);
      console.log(color);
      setTimeout(() => this.iluminateColor(color), 1000 * i);
    }
    console.log('- - - - - - - - - ');
  }

  iluminateColor(color) {
    this.colors[color].classList.add('light');
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colors[color].classList.remove('light');
  }

  addClickEvents() {
    this.colors.blue.addEventListener('click', this.chooseColor);
    this.colors.purple.addEventListener('click', this.chooseColor);
    this.colors.orange.addEventListener('click', this.chooseColor);
    this.colors.green.addEventListener('click', this.chooseColor);
  }

  deleteClicksEvents() {
    this.colors.blue.removeEventListener('click', this.chooseColor);
    this.colors.purple.removeEventListener('click', this.chooseColor);
    this.colors.orange.removeEventListener('click', this.chooseColor);
    this.colors.green.removeEventListener('click', this.chooseColor);
  }

  chooseColor(ev) {
    const colorName = ev.target.dataset.color;
    const colorNumber = this.changeColorToNumber(colorName);
    this.iluminateColor(colorName);
    if (colorNumber === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.nivel) {
        this.nivel++;
        this.deleteClicksEvents();
        if (this.nivel === LAST_LEVEL + 1) {
          // Won !
          this.wonTheGame();
        } else {
          console.clear();
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      // Perdió
      this.loseTheGame();
    }
  }

  wonTheGame() {
    swal('Congratulations!', 'You Won!', 'success').then(this.initialize);
  }

  loseTheGame() {
    swal('You loose..', 'Upps!, Wrong color 😰', 'error').then(() => {
      this.deleteClicksEvents();
      this.initialize();
    });
  }
}

function beginGame() {
  window.game = new Game();
}
