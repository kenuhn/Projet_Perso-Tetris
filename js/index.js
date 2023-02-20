export default () => {
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const plateauLongueur = canvas.width;
const plateauHauteur = canvas.height;
const carreauWidth = 40;
const carreauHeight = 40;
let positionX = 120;
let positionY = -40;
let tabCoordonnee = [];
let tetriminoO = [
  [1, 1],
  [1, 1],
];
let tetriminoI = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];
let TetriminoS = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
];
let TetriminoZ = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0],
];
let TetriminoT = [
  [1, 1, 1],
  [0, 1, 0],
  [0, 0, 0],
];
let tetriminoL = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
];
let tetriminoJ = [
  [0, 0, 1],
  [0, 0, 1],
  [0, 1, 1],
];

 class Tetriminos {
  constructor(piece) {
    this.forme = piece; 
    this.positionX = positionX;
    this.positionY = positionY;
  }
  deplacement(e) {
    if (
      this.checkBottom(this.forme, this.positionX , this.positionY) !== false
    ) {
      switch (e.key) {
        case "ArrowDown":
          this.vaBas();
          break;
        case "ArrowLeft":
          this.vaGauche();
          break;
        case "ArrowRight":
          this.vaDroite();
          break;
        case "ArrowUp":
          this.tourner();
          break;
        default:
          console.log("petit problème");
      } 
    } 
  }
  destroy() {
    return this.forme = null,   
    this.positionX = null,
    this.positionY = null;
  }
  vaBas() {
    if (
      this.checkBottom(this.forme, this.positionX, this.positionY) !== false
    ) {
      this.suprimeTetriminos(this.forme, this.positionX, this.positionY);
      this.positionY += 40;
      this.dessineTetriminos(this.forme, this.positionX, this.positionY);
    } else {
      clearInterval(this.interval);
      tabCoordonnee.push(
        this.poussePositionActuelle(this.forme, this.positionX, this.positionY)
      );
     return false
 
    }
  }

  vaGauche() {
    if (this.checkLeft(this.forme, this.positionX, this.positionY) !== false) {
      this.suprimeTetriminos(this.forme, this.positionX, this.positionY);
      this.positionX -= 40;
      this.dessineTetriminos(this.forme, this.positionX, this.positionY);
    }
  }

  vaDroite() {
    if (this.checkRight(this.forme, this.positionX, this.positionY) !== false) {
      this.suprimeTetriminos(this.forme, this.positionX, this.positionY);
      this.positionX += 40;
      this.dessineTetriminos(this.forme, this.positionX, this.positionY);
    }
  }

  dessineTetriminos(forme, positionX, positionY) {
      let matrice = forme;
      let formePositionY = positionY;
      for (let i = 0; i < matrice.length; i++) {
        let formePositionX = positionX;
        if (matrice[i].includes(1)) {
          formePositionY += 40;
        }
        for (let j = 0; j < matrice[i].length; j++) {
          formePositionX += 40;
          if (matrice[i][j] === 1) {
            ctx.beginPath();
            ctx.rect(
              formePositionX,
              formePositionY,
              carreauWidth,
              carreauHeight
            );
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    
  }

  suprimeTetriminos(forme, positionX, positionY) {
    let matrice = forme;
    let formePositionY = positionY;
    for (let i = 0; i < matrice.length; i++) {
      let formePositionX = positionX;
      if (matrice[i].includes(1)) {
        formePositionY += 40;
      }
      for (let j = 0; j < matrice[i].length; j++) {
        formePositionX += 40;
        if (matrice[i][j] === 1) {
          ctx.clearRect(
            formePositionX,
            formePositionY,
            carreauWidth,
            carreauHeight
          );
        }
      }
    }
  }

  checkBottom(forme, positionX, positionY) {
    let matrice = forme;
    let formePositionY = positionY;
    let estPresent = false;
    for (let i = 0; i < matrice.length; i++) {
      let formePositionX = positionX;
      if (matrice[i].includes(1)) {
        formePositionY += 40;
        for (let j = 0; j < matrice[i].length; j++) {
          formePositionX += 40;
          if (matrice[i][j] === 1) {
            tabCoordonnee.forEach((tab) => {
              tab.forEach((obj) => {
                if (obj.x === formePositionX && obj.y === formePositionY + 40) {
                  estPresent = true;
                }
              });
            });

            if (formePositionY + 40 >= 800 || estPresent === true) {
              return false;
            }
          }
        }
      }
    }
  }

  checkRight(forme, positionX, positionY) {
    let matrice = forme;
    let formePositionY = positionY;
    let estPresent = false;
    for (let i = 0; i < matrice.length; i++) {
      let formePositionX = positionX;
      if (matrice[i].includes(1)) {
        formePositionY += 40;
      }
      for (let j = 0; j < matrice[i].length; j++) {
        formePositionX += 40;
        if (matrice[i][j] === 1) {
          tabCoordonnee.forEach((tab) => {
            tab.forEach((obj) => {
              if (obj.x === formePositionX + 40 && obj.y === formePositionY) {
                estPresent = true;
              }
            });
          });
          if (formePositionX + 40 >= 400 || estPresent === true) {
            return false;
          }
        }
      }
    }
  }

  checkLeft(forme, positionX, positionY) {
    let matrice = forme;
    let formePositionY = positionY;
    let estPresent = false;
    for (let i = 0; i < matrice.length; i++) {
      let formePositionX = positionX;
      if (matrice[i].includes(1)) {
        formePositionY += 40;
      }
      for (let j = 0; j < matrice[i].length; j++) {
        formePositionX += 40;
        if (matrice[i][j] === 1) {
          tabCoordonnee.forEach((tab) => {
            tab.forEach((obj) => {
              if (obj.x === formePositionX - 40 && obj.y === formePositionY) {
                estPresent = true;
              }
            });
          });
          if (formePositionX <= 0 || estPresent === true) {
            return false;
          }
        }
      }
    }
  }

  pivoter(forme) {
    let top = [];
    for (let i = 0; i < forme.length; i++) {
      top.push([]);
      for (let j = 0; j < forme[i].length; j++) {
        let n = forme[i].length - j;
        top[i][j] = forme[n - 1][i];
      }
    }
    if (
      this.checkLeft(top, this.positionX, this.positionY) === false ||
      this.checkRight(top, this.positionX, this.positionY) === false ||
      this.checkBottom(top, this.positionX, this.positionY) === false
    ) {
      return false;
    } else {
      return top;
    }
  }

  tourner() {
    if (this.pivoter(this.forme) !== false) {
      this.suprimeTetriminos(this.forme, this.positionX, this.positionY);
      this.forme = this.pivoter(this.forme);
      this.dessineTetriminos(this.forme, this.positionX, this.positionY);
    }
  }

  poussePositionActuelle(forme, positionX, positionY) {
    let matrice = forme;
    let formePositionY = positionY;
    let newTabCoordonnee = [];
    for (let i = 0; i < matrice.length; i++) {
      let formePositionX = positionX;
      if (matrice[i].includes(1)) {
        formePositionY += 40;
        for (let j = 0; j < matrice[i].length; j++) {
          formePositionX += 40;
          if (matrice[i][j] === 1) {
            let coordonnee = { x: formePositionX, y: formePositionY };
            newTabCoordonnee.push(coordonnee);
          }
        }
      }
    }
    return newTabCoordonnee;
  }
}

class Interface {

  constructor() {
    this.tetriminos =  new Tetriminos(this.newPiece())
      setInterval(this.suprimeRange, 800);
      setInterval(this.supprimeTetriminos.bind(this) , 800)   
      document.addEventListener("keydown", (e) => {
      this.tetriminos.deplacement(e)
    } );
  }

  choisitHasard(tabFormes) {
    let randomIndex = Math.floor(Math.random() * tabFormes.length);
    return tabFormes[randomIndex];
  }
  
  supprimeTetriminos() {
  /*   this.tetriminos.vaBas() */
    if(this.tetriminos.vaBas() === false ) {
      this.tetriminos.destroy()
      this.tetriminos = new Tetriminos(this.newPiece())
    } 
  }
  newPiece  ()  {
    let tabFormes = [tetriminoO, tetriminoI, TetriminoS, TetriminoT, tetriminoL, tetriminoJ, TetriminoZ ] ;
    const piece = this.choisitHasard(tabFormes)
    return piece 
  }
  suprimeRange() {
    let newTab = [];
    //tabCoordonnée est le tableau qui contient pour chaque pixel toutes les positions x et position y
    tabCoordonnee.forEach((tab) => {
      tab.forEach((obj) => {
        newTab.push(obj);
      });
    });
    //Pour chaque coordonné de newtab
    let tableauRempli = [];
    newTab.forEach((el) => {
      let finTab = []; //chaque tableau de propriété ayant les mêmes coordoonés y
      newTab.forEach((obj) => {
        if (el.y === obj.y) {
          finTab.push(obj);
        }
      });
      if (finTab.length === 10) {
        console.log("rangé complété");
        let rangerASupprime;
        finTab.forEach((el) => {
          tableauRempli.push(el);
          rangerASupprime = el.y;
        });
  
        tabCoordonnee = tabCoordonnee.map((el) => {
          el = el.filter((tab) => {
            return !finTab.some((j) => tab.y === j.y);
          });
  
          return el;
        });
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < tabCoordonnee.length; i++) {
          for (let j = 0; j < tabCoordonnee[i].length; j++) {
            let obj = tabCoordonnee[i][j];
            if (rangerASupprime > obj.y) {
              obj.y = obj.y + 40;
              ctx.beginPath();
              ctx.rect(obj.x, obj.y, carreauWidth, carreauHeight);
              ctx.fill();
              ctx.closePath();
            } else {
              ctx.beginPath();
              ctx.rect(obj.x, obj.y, carreauWidth, carreauHeight);
              ctx.fill();
              ctx.closePath();
            }
          }
        }
        finTab = [];
      }
    });
  }

}

return new Interface
}