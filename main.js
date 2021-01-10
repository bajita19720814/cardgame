'use strict';
{
  const board = document.getElementById('board');
  const coment = document.getElementById('coment');
  const instraction = document.getElementById('instraction');
  const start = document.getElementById('start');
  let isGaming = false;
  let startTime;
  let isclearinging = false;
  board.addEventListener('click', () => {
    if (isGaming) {
      return;
    }
    startTime = Date.now();
    coment.classList.add('hide');
    isGaming = true;
    
    new Board();
  });
  const images = [
    "img/camera.png", 
    "img/camera.png", 
    "img/hasami.png", 
    "img/hasami.png", 
    "img/kanransha.png", 
    "img/kanransha.png", 
    "img/lemon.png", 
    "img/lemon.png", 
    "img/pig.png", 
    "img/pig.png", 
    "img/poinsettia.png", 
    "img/poinsettia.png", 
    "img/rainboots.png", 
    "img/rainboots.png", 
    "img/taionkei.png", 
    "img/taionkei.png", 
    "img/usi.png", 
    "img/usi.png", 
    "img/badminton.png", 
    "img/badminton.png", 
  ];
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  class Card {
    constructor(index, board) {
      this.index = index;
      this.board = board;
      this.image = this.board.getRandomImages()[this.index];
      this.img = document.createElement('img');
      this.div = document.createElement('div');
      this.renderCard();
    }
    renderCard() {
      this.img.src = this.image;        
      this.img.classList.add('hide');            
      this.div.appendChild(this.img);
      board.appendChild(this.div);
      this.div.addEventListener('click', () => {
        if (this.img.classList.contains('hide') !== true) {
          return;
        }
        if (isclearinging) {
          alert('カードが戻るまでまってね');
          return;
        }
        this.img.classList.remove('hide');
        this.div.style.backgroundColor = '#e0e0e0';
        this.board.addTryCount();
        if (this.board.getTryCount() % 2 === 1) {
          this.board.setLastIndex(this.index);
        } else if (this.image === this.board.getLastImage()) {
          this.board.addCorrectCount();
        } else {
          isclearinging = true;
          setTimeout(() => {
            this.clearCard();
            this.board.clearLastCard();
            isclearinging = false;
          }, 350);            
        }     
      });
    }
    clearCard() {
      this.img.classList.add('hide');
      this.div.style.backgroundColor = 'rosybrown';
    }
  }
  class Board {
    constructor() {
      this.randomImages = shuffle(images);
      this.cards = [];
      for (let i = 0; i < this.randomImages.length; i++) {
        this.cards[i] = new Card(i, this);
      }
      this.tryCount = 0;
      this.correctCount = 0;
      this.correctImage = undefined;
      this.lastIndex = undefined;    
    }    
    getRandomImages() {
      return this.randomImages;
    }
    addTryCount()  {
      this.tryCount++;
    }
    getTryCount() {
      return this.tryCount;
    }
    setLastIndex(value) {
      this.lastIndex = value;
    }
    getLastImage() {
      return this.randomImages[this.lastIndex];
    }
    clearLastCard() {
      this.cards[this.lastIndex].clearCard();
    }
    addCorrectCount() {
      this.correctCount++;
      if (this.correctCount === 10) {
        this.gameComplete();
      }
    }
    gameComplete() {
      instraction.textContent = `完成！　タイムは ${Math.floor((Date.now() - startTime) / 1000)} 秒だよ`;
      start.textContent = "もう一度チャレンジするにはクリックしてね";
      setTimeout(() => {
        isGaming = false;
        while (board.firstChild) {
          board.removeChild(board.firstChild);
          coment.classList.remove('hide');
        }
      }, 200);
    }
  }
}