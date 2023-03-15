// vamos executar todos os comandos para executar após o carregamento da página

window.onload = () => {
  //função que gera uma cor hexadecimal aleatória
  const letters = '0123456789ABCDEF';
  const randomColor = () => {
    let color = '#';
    for (let index = 0; index < 6; index += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  //Adiciona a cor preta ao primeiro quadrado da paleta de cores
  const paletaDeCores = document.querySelectorAll('.color');
  paletaDeCores[0].style.backgroundColor = 'black';

  //verificando cores da paleta de cores no localStorage e atualizando as cores

  if (localStorage.getItem('colorPalette') !== null) {
    let colorPalette = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 1; index < paletaDeCores.length; index += 1) {
      paletaDeCores[index].style.backgroundColor = colorPalette[index];
    }
  } else {
    for (let index = 1; index < paletaDeCores.length; index += 1) {
      paletaDeCores[index].style.backgroundColor = randomColor();
    }
  }

  // Adicionando funcionalidade para o botão Cores Aleatórias
  const btnCoresAleatorias = document.getElementById('button-random-color');

  btnCoresAleatorias.addEventListener('click', () => {
    for (let index = 1; index < paletaDeCores.length; index += 1) {
      paletaDeCores[index].style.backgroundColor = randomColor();
      if (
        paletaDeCores[index] == 'black' ||
        paletaDeCores[index] == paletaDeCores[index - 1]
      ) {
        index -= 1;
      }
    }
    savePaletteLocalStorage();
  });

  //Adicionando a classe selected para a paleta que for clicada. E garantindo que nenhuma outra tenha essa classe
  let colorPaletaSelected = 'black';
  for (let index = 0; index < paletaDeCores.length; index += 1) {
    paletaDeCores[index].addEventListener('click', (event) => {
      for (let index = 0; index < paletaDeCores.length; index += 1) {
        //console.log(paletaDeCores[index].className)
        if (paletaDeCores[index].className.includes('selected')) {
          paletaDeCores[index].className = 'color';
        }
      }
      event.target.classList.add('selected');
      colorPaletaSelected = event.target.style.backgroundColor;
    });
  }

  //Adicionando evento no botão para mudar o tamanho do quadro de pixels
  let sizeSquad = 5;
  document.getElementById('generate-board').addEventListener('click', () => {
    let input = document.getElementById('board-size').value;
    if (input == '') {
      alert('Board inválido!');
    } else if (input >= 5 && input <=50) {
        sizeSquad = input;
        saveSizeSquad();
        window.location.reload();
    } else if (input < 5) {
      sizeSquad = 5;
      saveSizeSquad();
        window.location.reload();
    } else if (input > 50) {
      sizeSquad = 50;
      saveSizeSquad();
      window.location.reload();
    }
  })

  //Fazendo o quadrado de sizeSquad por sizeSquad de pixels
  if (localStorage.getItem('boardSize') !== null) {
    sizeSquad = JSON.parse(localStorage.getItem('boardSize'))
  } else { sizeSquad = 5;}
  const madeSquad = () => {
    const pixelsBoard = document.getElementById('pixel-board');
    for (let index = 1; index <= sizeSquad; index += 1) {
      let line = document.createElement('div');
      pixelsBoard.appendChild(line);
    }
    let linesSquad = document.querySelectorAll('#pixel-board>div');
    for (let line of linesSquad) {
      for (let index = 1; index <= sizeSquad; index += 1) {
        let pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.addEventListener('click', () => {
          pixel.style.backgroundColor = colorPaletaSelected;
          savePixel();
        });
        line.appendChild(pixel);
      }
    }
  };
  madeSquad();

  //verificando cores dos pixels no localStorage e atualizando as cores
  let pixel = document.querySelectorAll('.pixel');
  if (localStorage.getItem('pixelBoard') !== null) {
    let pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = pixelBoard[index];
    }
  }

  //Função que volta os pixels para branco
  const pixels = document.querySelectorAll('#pixel-board>div>div');
  document.getElementById('clear-board').addEventListener('click', () => {
    for (let pixel of pixels) {
      pixel.style.backgroundColor = 'white';
    }
    savePixel();
  });


  //Salvando cores da paleta de cores no localStorage
  const colorPaletteArray = () => {
    let array = [];
    for (let index = 0; index < paletaDeCores.length; index += 1) {
      array.push(paletaDeCores[index].style.backgroundColor);
    }
    return array;
  };

  const savePaletteLocalStorage = () => {
    const colorPalette = colorPaletteArray();
    localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
  };

  //Salvando as cores dos pixels no localStorage
  const savePixel = () => {
    let pixelBoard = document.querySelectorAll('.pixel');
    let pixelColor = [];
    for (let index = 0; index < pixelBoard.length; index += 1) {
      pixelColor.push(pixelBoard[index].style.backgroundColor);
    }
    localStorage.setItem('pixelBoard', JSON.stringify(pixelColor));
  };
  
  //salvando sizeSquad
  const saveSizeSquad = () => {
    localStorage.setItem('boardSize', JSON.stringify(sizeSquad));
  }

  //paletaDeCores[0].className += ' selected';
  paletaDeCores[0].classList.add('selected');
};
