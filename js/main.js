function Player(name, lastName, number, position, age, imgPath) {
  this.name = name;
  this.lastName = lastName;
  this.number = number;
  this.position = position;
  this.age = age;
  this.imgPath = imgPath;
}

function createPlayer(name, lastName, number, position, age, imgPath) {
  return new Player(name, lastName, number, position, age, imgPath);
}

var teamData = {
  teamName: 'MANCHESTER UNITED',
  teamLogoPath: './images/logo.png',
  players: [
    createPlayer(
      'David',
      'De Gea',
      1,
      'Goalkeeper',
      30,
      './images/david-de-dea.png'
    ),
    createPlayer(
      'Victor',
      'Lindelof',
      2,
      'Defender',
      26,
      './images/victor-lindelof.png'
    ),
    createPlayer(
      'Paul',
      'Pogba',
      6,
      'Midfielder',
      27,
      './images/paul-pogba.png'
    ),
    createPlayer(
      'Edinson',
      'Cavani',
      7,
      'Forward',
      34,
      './images/edinson-cavani.png'
    ),
    createPlayer(
      'Eric',
      'Bailly',
      3,
      'Defender',
      26,
      './images/eric-bailly.png'
    ),
    createPlayer(
      'Diogo',
      'Dalot',
      20,
      'Defender',
      21,
      './images/diogo-dalot.png'
    ),
    createPlayer(
      'Facundo',
      'Pellistri',
      28,
      'Midfielder',
      19,
      './images/facundo-pellistri.png'
    ),
    createPlayer(
      'Jesse',
      'Lingard',
      14,
      'Midfielder',
      28,
      './images/jesse-lingard.png'
    ),
    createPlayer(
      'Teden',
      'Mengi',
      43,
      'Defender',
      18,
      './images/teden-mengi.png'
    ),
    createPlayer(
      'Anthony',
      'Martil',
      9,
      'Forward',
      25,
      './images/anthony-martial.png'
    ),
    createPlayer(
      'Mason',
      'Greenwood',
      11,
      'Forward',
      19,
      './images/mason-greenwood.png'
    ),
    createPlayer('Luke', 'Shaw', 23, 'Defender', 25, './images/luke-shaw.png'),
    createPlayer(
      'Alex',
      'Telles',
      27,
      'Defender',
      28,
      './images/alex-telles.png'
    ),
    createPlayer(
      'Daniel',
      'James',
      21,
      'Midfielder',
      23,
      './images/daniel-james.png'
    ),
    createPlayer(
      'Nemanja',
      'Matic',
      31,
      'Midfielder',
      32,
      './images/nemanja-matic.png'
    ),
  ],
};

/* Random index from passed array */
function randomIndex(arr) {
  return Math.round(Math.random() * (arr.length - 1));
}

/*First squad and substitution squad*/
var firstSquad = teamData.players.slice(0, 11);
var substitution = teamData.players.slice(11, 15);

/*Creating first squad*/
function squadsDom(arr) {
  var section = document.createElement('section');
  section.setAttribute('class', 'clearfix');
  for (var i = 0; i < arr.length; i++) {
    var player = document.createElement('article');
    player.innerHTML = `
    <img src='${arr[i].imgPath}' alt='${arr[i].name} ${arr[i].lastName}'/>
    <span>${arr[i].number}</span>
    <article>
      <p>Full name: <span>${arr[i].name} ${arr[i].lastName}</span></p>
      <p>Position: <span>${arr[i].position}</span></p>
      <p>Age: <span>${arr[i].age}</span></p>
    </article>`;
    section.appendChild(player);
  }
  document.querySelector('main div.wrapper').appendChild(section);
}

/*Header*/
var logo = document.querySelector('header div img');
logo.setAttribute('src', teamData.teamLogoPath);
logo.setAttribute('alt', 'Manchester United logo');
logo.textContent = 'Manchester United'; // Fallback text if the image fails to load

/*Main*/
squadsDom(firstSquad);
squadsDom(substitution);

/*Changes*/
function chooseSubs() {
  var index = randomIndex(firstSquad);
  var playerForChange = document.querySelectorAll('main section>article')[
    index
  ];
  var subs = document.querySelector('main section:nth-child(3)>article');
  makeSubs(index, playerForChange, subs);
}

function makeSubs(index, playerForChange, subs) {
  var insertionPoint =
    index === 10
      ? playerForChange.previousElementSibling
      : playerForChange.nextElementSibling;
  insertionPoint.after(subs);
  document
    .querySelector('main section:nth-child(3)')
    .appendChild(playerForChange);
  var subsText = `${subs.querySelector('span').textContent} ${
    subs.querySelector('p span').textContent
  }`;
  var playerText = `${playerForChange.querySelector('span').textContent} ${
    playerForChange.querySelector('p span').textContent
  }`;
  document.querySelector('main aside div p').textContent = subsText;
  document.querySelector('main aside div p:last-child').textContent =
    playerText;
}

function timer() {
  var timerElement = document.querySelector('header section div p');
  var countdown = parseInt(timerElement.textContent);
  timerElement.textContent = countdown - 1;
  var countdownDiv = document.querySelector('header section div div');
  if (countdown === 30) {
    countdownDiv.classList.add('anim');
  }
  if (countdown <= 11) {
    countdownDiv.classList.add('red');
  }
  if (countdown === 0) {
    chooseSubs();
    // Reset countdown to 30 seconds
    timerElement.textContent = 30;
    // Reset styles
    countdownDiv.classList.remove('red', 'anim');
  }
}
setInterval(timer, 1000);

document
  .querySelector('main aside button')
  .addEventListener('click', function () {
    document.querySelector('main aside article').classList.toggle('show');
  });
document
  .querySelector('main aside>button:last-child')
  .addEventListener('click', function () {
    var countdownDiv = document.querySelector('header section div div');
    // Reset styles and countdown to 0
    countdownDiv.classList.remove('anim', 'red');
    document.querySelector('header section div p').textContent = 0;
  });
