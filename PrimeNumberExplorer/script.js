function getAllFactors(n) {
  if (n < 1) {
    return [];
  }

  const lower = [];
  const upper = [];
  const limit = Math.floor(Math.sqrt(n));

  for (let i = 1; i <= limit; i += 1) {
    if (n % i === 0) {
      lower.push(i);
      const pair = n / i;
      if (pair !== i) {
        upper.push(pair);
      }
    }
  }

  upper.reverse();
  return lower.concat(upper);
}

function isPrime(n) {
  return n >= 2 && getAllFactors(n).length === 2;
}

function formatNumberList(values) {
  return values.join(", ");
}

function highlightCheckedNumber(value) {
  const allCells = document.querySelectorAll(".number-cell");
  allCells.forEach((cell) => cell.classList.remove("checked-number"));

  const active = document.querySelector(`[data-number="${value}"]`);
  if (active) {
    active.classList.add("checked-number");
  }
}

function handleSingleNumberCheck(event) {
  event.preventDefault();

  const input = document.getElementById("single-number");
  const resultBox = document.getElementById("single-result");
  const value = Number.parseInt(input.value, 10);

  if (!Number.isInteger(value) || value < 0) {
    resultBox.innerHTML = "Please enter a non-negative whole number.";
    return;
  }

  highlightCheckedNumber(value);

  if (value === 0) {
    resultBox.innerHTML = `0 is <span class="result-not-prime">not prime</span>.<br />0 has infinitely many factors (every non-zero whole number divides 0).`;
    return;
  }

  if (value < 2) {
    const factors = getAllFactors(value);
    resultBox.innerHTML = `${value} is <span class="result-not-prime">not prime</span>.<br />Prime numbers start from 2.<br />All factors: <strong>${formatNumberList(factors)}</strong>.`;
    return;
  }

  const factors = getAllFactors(value);
  if (factors.length === 2) {
    resultBox.innerHTML = `${value} is <span class="result-prime">prime</span>.<br />All factors: <strong>${formatNumberList(factors)}</strong>.`;
    return;
  }

  resultBox.innerHTML = `${value} is <span class="result-not-prime">not prime</span>.<br />All factors: <strong>${formatNumberList(factors)}</strong>.`;
}

function getPrimesInRange(start, end) {
  if (end < 2 || start > end) {
    return [];
  }

  const s = Math.max(2, start);
  const isPrimeFlags = new Array(end + 1).fill(true);
  isPrimeFlags[0] = false;
  isPrimeFlags[1] = false;

  const limit = Math.floor(Math.sqrt(end));
  for (let i = 2; i <= limit; i += 1) {
    if (isPrimeFlags[i]) {
      for (let multiple = i * i; multiple <= end; multiple += i) {
        isPrimeFlags[multiple] = false;
      }
    }
  }

  const primes = [];
  for (let n = s; n <= end; n += 1) {
    if (isPrimeFlags[n]) {
      primes.push(n);
    }
  }

  return primes;
}

function handleRangeSearch(event) {
  event.preventDefault();

  const startInput = document.getElementById("start-number");
  const endInput = document.getElementById("end-number");
  const summary = document.getElementById("range-summary");
  const primeList = document.getElementById("prime-list");

  const start = Number.parseInt(startInput.value, 10);
  const end = Number.parseInt(endInput.value, 10);

  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < 0) {
    summary.textContent = "Please enter non-negative whole numbers for start and end.";
    primeList.innerHTML = "";
    return;
  }

  if (start > end) {
    summary.textContent = "Start must be less than or equal to End.";
    primeList.innerHTML = "";
    return;
  }

  if (end > 1000) {
    summary.textContent = "End must be 1000 or less for the chart view.";
    primeList.innerHTML = "";
    return;
  }

  renderNumberChart(Math.max(1, end));

  if (end - start > 200000) {
    summary.textContent = "Please choose a smaller range (difference up to 200,000) for smooth performance.";
    primeList.innerHTML = "";
    return;
  }

  const primes = getPrimesInRange(start, end);
  if (primes.length === 0) {
    summary.textContent = `There are no prime numbers between ${start} and ${end}.`;
    primeList.innerHTML = "";
    return;
  }

  summary.innerHTML = `Found <strong>${primes.length}</strong> prime number(s) between <strong>${start}</strong> and <strong>${end}</strong>.`;

  const chips = primes.map((n, index) => {
    const delay = Math.min(index * 20, 400);
    return `<span class="prime-chip" style="animation-delay:${delay}ms">${n}</span>`;
  });

  primeList.innerHTML = chips.join("");
}

function resetSingleCheck() {
  const input = document.getElementById("single-number");
  const resultBox = document.getElementById("single-result");

  input.value = "";
  resultBox.textContent = "";
  highlightCheckedNumber(-1);
}

function resetRangeExplorer() {
  const startInput = document.getElementById("start-number");
  const endInput = document.getElementById("end-number");

  startInput.value = "1";
  endInput.value = "100";

  renderDefaultRange();
  renderNumberChart(100);
  highlightCheckedNumber(-1);
}

function renderDefaultRange() {
  const summary = document.getElementById("range-summary");
  const primeList = document.getElementById("prime-list");
  const defaultPrimes = getPrimesInRange(1, 100);

  summary.innerHTML = `Found <strong>${defaultPrimes.length}</strong> prime number(s) between <strong>1</strong> and <strong>100</strong>.`;
  primeList.innerHTML = defaultPrimes
    .map((n) => `<span class="prime-chip">${n}</span>`)
    .join("");
}

function renderNumberChart(maxNumber) {
  const chartTitle = document.getElementById("hundred-title");
  const chartNote = document.getElementById("chart-note");
  const chart = document.getElementById("hundred-chart");
  const cells = [];

  const safeMax = Math.min(Math.max(maxNumber, 1), 1000);

  chartTitle.textContent = `Prime Chart (1 to ${safeMax})`;
  chartNote.textContent = `All numbers from 1 to ${safeMax} are shown. Prime numbers are circled.`;

  for (let n = 1; n <= safeMax; n += 1) {
    const primeClass = isPrime(n) ? " is-prime" : "";
    cells.push(`<span class="number-cell${primeClass}" data-number="${n}">${n}</span>`);
  }

  chart.innerHTML = cells.join("");
}

document.getElementById("single-check-form").addEventListener("submit", handleSingleNumberCheck);
document.getElementById("range-form").addEventListener("submit", handleRangeSearch);
document.getElementById("single-reset").addEventListener("click", resetSingleCheck);
document.getElementById("range-reset").addEventListener("click", resetRangeExplorer);

renderDefaultRange();
renderNumberChart(100);
