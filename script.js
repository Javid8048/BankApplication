'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-11-06T17:01:17.194Z',
    '2023-11-10T23:36:17.929Z',
    '2023-11-09T10:51:36.790Z',
    '2023-11-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions
const displayDateForMovements = (date, user) => {
  const calcDate = (d) => (new Date().getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  const calcDateVal = Math.round(Math.abs(calcDate(date)));
  if (calcDateVal == 0) return "Today";
  if (calcDateVal == 1) return "Yestarday";
  if (calcDateVal <= 7) return `${calcDateVal} Days Ago`;
  // const day = `${date.getDate()}`.padStart(2, "0");
  // const month = `${date.getMonth() + 1}`.padStart(2, "0");
  // const year = `${date.getFullYear()}`;
  // return `${day}/${month}/${year}`;
  const options = {
    hour: "numeric", minute: 'numeric', weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric'
  };
  return new Intl.DateTimeFormat(user.locale, options).format(date)
};
const formatCurr = (value, locate, currency) => {
  return new Intl.NumberFormat(locate, {style: "currency", currency: currency}).format(value)
}

const displayMovements = function (user, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? user.movements.slice().sort((a, b) => a - b) : user.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(user.movementsDates[user.movements.indexOf(mov)]);
    const wholeDate = displayDateForMovements(date, user);
    const formattedMov = formatCurr(mov, user.locale, user.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
    <div class="movements__date">${wholeDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);;
};
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int, i, arr) => int >= 1).reduce((acc, int) => acc + int, 0);
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};
const createUsernames = (accs) => accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join(''));
createUsernames(accounts);


const updateUI = function (acc) {
  displayMovements(acc);   // Display movements
  calcDisplayBalance(acc);   // Display balance
  calcDisplaySummary(acc);   // Display summary
};


let currentAccount; let sorted = false;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();   // Prevent form from submitting
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value))
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
  // const date = new Date(); const day = `${date.getDate()}`.padStart(2, "0"); const month = `${date.getMonth() + 1}`.padStart(2, "0"); const year = `${date.getFullYear()}`; const hour = `${date.getHours()}`.padStart(2, "0"); const minutes = `${date.getMinutes()}`.padStart(2, "0");
  // const wholeDate = `${day}/${month}/${year} ${hour}:${minutes}`;
  const options = {
    day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", weekday: "long"
  }
  const wholeDate = new Intl.DateTimeFormat(currentAccount.locale, options).format(new Date());
  labelDate.innerText = wholeDate;
  containerApp.style.opacity = 100;
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  updateUI(currentAccount);
})
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);   // Update UI
  }
});
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount); // Add movement
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount); // Update UI
  }
  inputLoanAmount.value = '';
});
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);     // .indexOf(23)
    accounts.splice(index, 1);     // Delete account
    containerApp.style.opacity = 0;     // Hide UI
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
