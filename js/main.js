function Player(name, lastName, number, position, age, imgPath) {
  this.name = name;
  this.lastName = lastName;
  this.number = number;
  this.position = position;
  this.age = age;
  this.imgPath = imgPath;
}

var teamData = {
  teamName: 'MANCHESTER UNITED',
  teamLogoPath: './images/logo.png',
  players: [
    new Player(
      'David',
      'De Gea',
      1,
      'Goalkeeper',
      30,
      './images/david-de-dea.png'
    ),
    new Player(
      'Victor',
      'Lindelof',
      2,
      'Defender',
      26,
      './images/victor-lindelof.png'
    ),
    new Player('Paul', 'Pogba', 6, 'Midfielder', 27, './images/paul-pogba.png'),
    new Player(
      'Edinson',
      'Cavani',
      7,
      'Forward',
      34,
      './images/edinson-cavani.png'
    ),
    new Player('Eric', 'Bailly', 3, 'Defender', 26, './images/eric-bailly.png'),
    new Player(
      'Diogo',
      'Dalot',
      20,
      'Defender',
      21,
      './images/diogo-dalot.png'
    ),
    new Player(
      'Facundo',
      'Pellistri',
      28,
      'Midfielder',
      19,
      './images/facundo-pellistri.png'
    ),
    new Player(
      'Jesse',
      'Lingard',
      14,
      'Midfielder',
      28,
      './images/jesse-lingard.png'
    ),
    new Player(
      'Teden',
      'Mengi',
      43,
      'Defender',
      18,
      './images/teden-mengi.png'
    ),
    new Player(
      'Anthony',
      'Martil',
      9,
      'Forward',
      25,
      './images/anthony-martial.png'
    ),
    new Player(
      'Mason',
      'Greenwood',
      11,
      'Forward',
      19,
      './images/mason-greenwood.png'
    ),
    new Player('Luke', 'Shaw', 23, 'Defender', 25, './images/luke-shaw.png'),
    new Player(
      'Alex',
      'Telles',
      27,
      'Defender',
      28,
      './images/alex-telles.png'
    ),
    new Player(
      'Daniel',
      'James',
      21,
      'Midfielder',
      23,
      './images/daniel-james.png'
    ),
    new Player(
      'Nemanja',
      'Matic',
      31,
      'Midfielder',
      32,
      './images/nemanja-matic.png'
    ),
  ],
};

/*Random number from 0 to 10*/
function randomNumb(arr) {
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
    player.innerHTML =
      "<img src='" +
      arr[i].imgPath +
      "' alt='" +
      arr[i].name +
      ' ' +
      arr[i].lastName +
      "'/>" +
      '<span>' +
      arr[i].number +
      '</span>' +
      '<div><p>Full name: <span>' +
      arr[i].name +
      ' ' +
      arr[i].lastName +
      '</span></p>' +
      '<p>Position: <span>' +
      arr[i].position +
      '</span></p>' +
      '<p>Age: <span>' +
      arr[i].age +
      '</span></p></div>';
    section.appendChild(player);
  }
  document.querySelector('main div.wrapper').appendChild(section);
}

/*Header*/
var logo = document.querySelector('header div img');
logo.setAttribute('src', teamData.teamLogoPath);
logo.setAttribute('alt', 'Manchester United logo');

/*Main*/
squadsDom(firstSquad);
squadsDom(substitution);

/*Changes*/
function chooseSubs() {
  var number = randomNumb(firstSquad);
  var playerForChange = document.querySelectorAll('main section article')[
    number
  ];
  var subs = document.querySelector('main section:nth-child(3) article');
  makeSubs(number, playerForChange, subs);
}

function makeSubs(number, playerForChange, subs) {
  if (number === 10) {
    playerForChange.previousElementSibling.after(subs);
  } else {
    playerForChange.nextElementSibling.before(subs);
  }
  document
    .querySelector('main section:nth-child(3)')
    .appendChild(playerForChange);
  document.querySelector('main aside div p').textContent =
    subs.querySelector('span').textContent +
    ' ' +
    subs.querySelector('p span').textContent;
  document.querySelector('main aside div p:last-child').textContent =
    playerForChange.querySelector('span').textContent +
    ' ' +
    playerForChange.querySelector('p span').textContent;
}

function timer() {
  var timer = parseInt(
    document.querySelector('header section div p').textContent
  );
  document.querySelector('header section div p').textContent = timer - 1;
  if (timer === 30) {
    document.querySelector('header section div div').classList.add('anim');
  }
  if (timer <= 11) {
    document.querySelector('header section div div').classList.add('red');
  }
  if (timer === 0) {
    chooseSubs();
    document.querySelector('header section div p').textContent = 30;
    document.querySelector('header section div div').classList.remove('red');
    document.querySelector('header section div div').classList.remove('anim');
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
    document.querySelector('header section div div').classList.remove('anim');
    document.querySelector('header section div p').textContent = 0;
  });
