'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//user login 
  const createUserId = (acc)=> {
    acc.forEach((val) =>  {
      val.userName = val.owner.toLowerCase().split(" ").map(val => val[0]).join("");
    });
  };
  createUserId(accounts);
//user login

//total balance only of account1
const totalBalance = (mov)=> {
  const balance = mov.reduce((acc, val, i, ind) => {
    return acc + val
  }, 0 );
  labelBalance.textContent = balance+"€";
}
totalBalance(account1.movements)

//income balance
const calculateBalanceSummery = (amt) => {
  const incomeAmt = amt.filter(val => val > 0).reduce((acc, v) => acc+v);
  const outgoingAmt = amt.filter(val => val < 0).reduce((acc, v)=> acc+v);
  const intrestAmt = amt.filter(val => val > 0).map(val => val * 0.012).filter((val, i, arr) => val > 1).reduce((acc, val)=> acc+val);
  labelSumIn.textContent = incomeAmt+" €"
  labelSumOut.textContent = outgoingAmt+ " €";
  labelSumInterest.textContent = intrestAmt+" €";
};
calculateBalanceSummery(account1.movements);

containerApp.style.opacity = 1;

movements.map((val, ind, arr)=> {
  const type = val > 0 ? "deposit" : "withdrawal";
  let html = `<div class="movements__row">
               <div class="movements__type movements__type--${type}">${ind} ${type}</div>
              <div class="movements__date">Nill days ago</div>
              <div class="movements__value">${val}€</div>
            </div> `;
// let html1 = document.createElement("div");
// let content = document.createTextNode("ok");
// html1.appendChild(content);
// containerMovements.appendChild(html1);
containerMovements.insertAdjacentHTML("afterbegin" ,html);
});

//just a dog task
const JuliaArray = [3,5,2,12,17 ];
const KatiArray = [4,1,15,8,.3];
const JuliaNewArry = JuliaArray.slice(1, -1);
const totalDogsArray = [...KatiArray, ...JuliaNewArry];
const remainingDogs = [];
totalDogsArray.forEach((dogAge, numbr)=> {
  let dogType = dogAge <= 0.3 ? "Puppy" : "Adult";
  // console.log(`Dog ${numbr} is a `+dogType);
  const humanage = dogAge <= 2 ? 2*dogAge : 16+dogAge*4;
  remainingDogs.push(humanage);
});
const finalCountOfDogs = remainingDogs.filter((val, i)=> val > 18 ? val : null);
let avgOfDogs = finalCountOfDogs.reduce((accu, val) => accu = accu + val, 0) / finalCountOfDogs.length;


const eroToUsd = 1.1;
const movementsUSD = movements.map((val) => Math.round(val*eroToUsd));