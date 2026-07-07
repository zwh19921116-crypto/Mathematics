const singleFractionForm = document.getElementById("single-fraction-form");
const singleNumeratorInput = document.getElementById("single-numerator");
const singleDenominatorInput = document.getElementById("single-denominator");
const anatomyNumerator = document.getElementById("anatomy-numerator");
const anatomyDenominator = document.getElementById("anatomy-denominator");
const singleFractionFacts = document.getElementById("single-fraction-facts");
const singleFractionPies = document.getElementById("single-fraction-pies");
const singleChartTypeSelect = document.getElementById("single-chart-type");
const simplifyForm = document.getElementById("simplify-form");
const simplifyNumInput = document.getElementById("simplify-num");
const simplifyDenInput = document.getElementById("simplify-den");
const simplifySummary = document.getElementById("simplify-summary");
const simplifySteps = document.getElementById("simplify-steps");
const compareForm = document.getElementById("compare-form");
const compareANumInput = document.getElementById("compare-a-num");
const compareADenInput = document.getElementById("compare-a-den");
const compareBNumInput = document.getElementById("compare-b-num");
const compareBDenInput = document.getElementById("compare-b-den");
const compareSummary = document.getElementById("compare-summary");
const compareSteps = document.getElementById("compare-steps");

const operationForm = document.getElementById("operation-form");
const aNumInput = document.getElementById("a-num");
const aDenInput = document.getElementById("a-den");
const bNumInput = document.getElementById("b-num");
const bDenInput = document.getElementById("b-den");
const operationSelect = document.getElementById("operation");

const operationSummary = document.getElementById("operation-summary");
const operationHelp = document.getElementById("operation-help");
const operationMathWhy = document.getElementById("operation-math-why");
const operationSteps = document.getElementById("operation-steps");
const fractionAPies = document.getElementById("fraction-a-pies");
const fractionBPies = document.getElementById("fraction-b-pies");
const fractionResultPies = document.getElementById("fraction-result-pies");
const solve2ChartTypeSelect = document.getElementById("solve2-chart-type");

const solve3Form = document.getElementById("solve3-form");
const cNumInput = document.getElementById("c-num");
const cDenInput = document.getElementById("c-den");
const dNumInput = document.getElementById("d-num");
const dDenInput = document.getElementById("d-den");
const eNumInput = document.getElementById("e-num");
const eDenInput = document.getElementById("e-den");
const operationOneSelect = document.getElementById("operation-one");
const operationTwoSelect = document.getElementById("operation-two");
const solve3Help = document.getElementById("solve3-help");
const solve3MathWhy = document.getElementById("solve3-math-why");
const solve3Summary = document.getElementById("solve3-summary");
const solve3Steps = document.getElementById("solve3-steps");
const fractionCPies = document.getElementById("fraction-c-pies");
const fractionDPies = document.getElementById("fraction-d-pies");
const fractionEPies = document.getElementById("fraction-e-pies");
const fractionFResultPies = document.getElementById("fraction-f-result-pies");
const solve3ChartTypeSelect = document.getElementById("solve3-chart-type");

const mixedToImproperForm = document.getElementById("mixed-to-improper-form");
const mixedWholeInput = document.getElementById("mixed-whole");
const mixedNumInput = document.getElementById("mixed-num");
const mixedDenInput = document.getElementById("mixed-den");
const mixedToImproperSummary = document.getElementById("mixed-to-improper-summary");
const mixedToImproperSteps = document.getElementById("mixed-to-improper-steps");

const improperToMixedForm = document.getElementById("improper-to-mixed-form");
const improperNumInput = document.getElementById("improper-num");
const improperDenInput = document.getElementById("improper-den");
const improperToMixedSummary = document.getElementById("improper-to-mixed-summary");
const improperToMixedSteps = document.getElementById("improper-to-mixed-steps");

const fractionConvertForm = document.getElementById("fraction-convert-form");
const convertNumInput = document.getElementById("convert-num");
const convertDenInput = document.getElementById("convert-den");
const fractionConvertSummary = document.getElementById("fraction-convert-summary");
const fractionConvertExplain = document.getElementById("fraction-convert-explain");
const fractionConvertSteps = document.getElementById("fraction-convert-steps");
const fractionPercentGrid = document.getElementById("fraction-percent-grid");

const menuTabs = Array.from(document.querySelectorAll(".menu-tab"));
const viewPanels = {
  "how-fractions": document.getElementById("how-fractions-panel"),
  simplify: document.getElementById("simplify-panel"),
  compare: document.getElementById("compare-panel"),
  "solve-2": document.getElementById("solve-2-panel"),
  "solve-3": document.getElementById("solve-3-panel"),
  "mixed-improper": document.getElementById("mixed-improper-panel"),
  "decimal-percent": document.getElementById("decimal-percent-panel")
};

function setActiveView(viewKey) {
  menuTabs.forEach((tab) => {
    const isActive = tab.dataset.view === viewKey;
    tab.classList.toggle("active", isActive);
  });

  Object.entries(viewPanels).forEach(([key, panel]) => {
    panel.classList.toggle("hidden-panel", key !== viewKey);
  });
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }

  return x || 1;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function getFactors(n) {
  const value = Math.abs(n);
  const factors = [];

  for (let i = 1; i <= value; i += 1) {
    if (value % i === 0) {
      factors.push(i);
    }
  }

  return factors;
}

function getCommonFactors(a, b) {
  const factorsA = getFactors(a);
  const factorsB = new Set(getFactors(b));
  return factorsA.filter((factor) => factorsB.has(factor));
}

function getMultiplesUpTo(base, maxValue) {
  const multiples = [];
  const limit = Math.max(base, maxValue);

  for (let i = base; i <= limit; i += base) {
    multiples.push(i);
  }

  return multiples;
}

function multiplesRowHtml(label, multiples, highlightValue) {
  const chips = multiples
    .map((value) => {
      const isHighlight = value === highlightValue;
      return `<span class="multiple-chip${isHighlight ? " chosen" : ""}">${value}</span>`;
    })
    .join("");

  return `
    <div class="multiples-row">
      <strong>${label}</strong>
      <div class="multiple-chip-list">${chips}</div>
    </div>
  `;
}

function factorsRowHtml(label, factors, commonFactors, gcfValue) {
  const commonSet = new Set(commonFactors);
  const chips = factors
    .map((value) => {
      const isCommon = commonSet.has(value);
      const isGcf = value === gcfValue;
      const classes = ["factor-chip"];

      if (isCommon) {
        classes.push("common");
      }

      if (isGcf) {
        classes.push("gcf");
      }

      return `<span class="${classes.join(" ")}">${value}</span>`;
    })
    .join("");

  return `
    <div class="factors-row">
      <strong>${label}</strong>
      <div class="factor-chip-list">${chips}</div>
    </div>
  `;
}

function simplifyFraction(numerator, denominator) {
  if (denominator === 0) {
    return { numerator, denominator };
  }

  const divisor = gcd(numerator, denominator);
  const sign = denominator < 0 ? -1 : 1;

  return {
    numerator: sign * (numerator / divisor),
    denominator: Math.abs(denominator / divisor)
  };
}

function toMixedNumber(numerator, denominator) {
  const whole = Math.trunc(numerator / denominator);
  const remainder = numerator % denominator;

  return { whole, remainder };
}

function fractionToDecimal(numerator, denominator) {
  return (numerator / denominator).toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function makePieSvg(parts, filledParts) {
  const size = 110;
  const center = size / 2;
  const radius = 48;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");

  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  svg.setAttribute("width", "110");
  svg.setAttribute("height", "110");
  svg.classList.add("pie");

  if (parts === 1) {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", String(center));
    circle.setAttribute("cy", String(center));
    circle.setAttribute("r", String(radius));
    circle.setAttribute("fill", filledParts > 0 ? "var(--pie-fill)" : "var(--pie-empty)");
    circle.setAttribute("stroke", "var(--pie-outline)");
    circle.setAttribute("stroke-width", "2");
    svg.appendChild(circle);
    return svg;
  }

  for (let i = 0; i < parts; i += 1) {
    const startAngle = (i / parts) * Math.PI * 2 - Math.PI / 2;
    const endAngle = ((i + 1) / parts) * Math.PI * 2 - Math.PI / 2;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const path = document.createElementNS(svgNS, "path");
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    path.setAttribute(
      "d",
      `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
    );
    path.setAttribute("fill", i < filledParts ? "var(--pie-fill)" : "var(--pie-empty)");
    path.setAttribute("stroke", "var(--pie-outline)");
    path.setAttribute("stroke-width", "1");

    svg.appendChild(path);
  }

  return svg;
}

function drawFractionPies(container, numerator, denominator) {
  clearNode(container);

  const wholePies = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  const totalPies = Math.max(1, wholePies + (remainder > 0 ? 1 : 0));

  for (let i = 0; i < totalPies; i += 1) {
    const pieCard = document.createElement("div");
    pieCard.className = "pie-card";

    const filled = i < wholePies ? denominator : i === wholePies ? remainder : 0;
    pieCard.appendChild(makePieSvg(denominator, filled));

    const label = document.createElement("p");
    label.textContent = `Shaded parts: ${filled} out of ${denominator}`;
    pieCard.appendChild(label);

    container.appendChild(pieCard);
  }
}

function drawSingleFractionBar(container, numerator, denominator) {
  clearNode(container);

  const wholeBars = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  const totalBars = Math.max(1, wholeBars + (remainder > 0 ? 1 : 0));

  for (let i = 0; i < totalBars; i += 1) {
    const filled = i < wholeBars ? denominator : i === wholeBars ? remainder : 0;
    const barCard = document.createElement("div");
    barCard.className = "bar-card";

    const label = document.createElement("p");
    label.className = "bar-label";
    label.textContent = `Bar ${i + 1}: ${filled} shaded out of ${denominator}`;

    const bar = document.createElement("div");
    bar.className = "fraction-bar";

    for (let part = 0; part < denominator; part += 1) {
      const segment = document.createElement("span");
      segment.className = `bar-segment${part < filled ? " filled" : ""}`;
      bar.appendChild(segment);
    }

    barCard.appendChild(label);
    barCard.appendChild(bar);
    container.appendChild(barCard);
  }
}

function drawFractionNumberLine(container, numerator, denominator) {
  clearNode(container);

  const value = numerator / denominator;
  const maxWhole = Math.max(1, Math.ceil(value));
  const width = 300;
  const height = 90;
  const padding = 22;
  const axisY = 48;
  const axisWidth = width - padding * 2;
  const markerX = padding + (value / maxWhole) * axisWidth;
  const svgNS = "http://www.w3.org/2000/svg";

  const card = document.createElement("div");
  card.className = "pie-card number-line-card";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.classList.add("number-line-svg");

  const axis = document.createElementNS(svgNS, "line");
  axis.setAttribute("x1", String(padding));
  axis.setAttribute("y1", String(axisY));
  axis.setAttribute("x2", String(width - padding));
  axis.setAttribute("y2", String(axisY));
  axis.setAttribute("stroke", "#334155");
  axis.setAttribute("stroke-width", "3");
  svg.appendChild(axis);

  for (let i = 0; i <= maxWhole; i += 1) {
    const tickX = padding + (i / maxWhole) * axisWidth;
    const tick = document.createElementNS(svgNS, "line");
    tick.setAttribute("x1", String(tickX));
    tick.setAttribute("y1", String(axisY - 9));
    tick.setAttribute("x2", String(tickX));
    tick.setAttribute("y2", String(axisY + 9));
    tick.setAttribute("stroke", "#334155");
    tick.setAttribute("stroke-width", "2");
    svg.appendChild(tick);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", String(tickX));
    label.setAttribute("y", String(axisY + 24));
    label.setAttribute("fill", "#334155");
    label.setAttribute("font-size", "12");
    label.setAttribute("text-anchor", "middle");
    label.textContent = String(i);
    svg.appendChild(label);
  }

  const marker = document.createElementNS(svgNS, "circle");
  marker.setAttribute("cx", String(markerX));
  marker.setAttribute("cy", String(axisY));
  marker.setAttribute("r", "6");
  marker.setAttribute("fill", "#1d4ed8");
  marker.setAttribute("stroke", "#1e3a8a");
  marker.setAttribute("stroke-width", "2");
  svg.appendChild(marker);

  const markerLabel = document.createElementNS(svgNS, "text");
  markerLabel.setAttribute("x", String(markerX));
  markerLabel.setAttribute("y", String(axisY - 14));
  markerLabel.setAttribute("fill", "#1e3a8a");
  markerLabel.setAttribute("font-size", "12");
  markerLabel.setAttribute("font-weight", "700");
  markerLabel.setAttribute("text-anchor", "middle");
  markerLabel.textContent = `${numerator}/${denominator}`;
  svg.appendChild(markerLabel);

  const label = document.createElement("p");
  label.textContent = `Value ${fractionToDecimal(numerator, denominator)} shown on 0 to ${maxWhole} number line.`;

  card.appendChild(svg);
  card.appendChild(label);
  container.appendChild(card);
}

function drawFractionAreaGrid(container, numerator, denominator) {
  clearNode(container);

  const wholeGroups = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  const totalGroups = Math.max(1, wholeGroups + (remainder > 0 ? 1 : 0));
  const columns = Math.min(10, denominator);

  for (let i = 0; i < totalGroups; i += 1) {
    const filled = i < wholeGroups ? denominator : i === wholeGroups ? remainder : 0;
    const card = document.createElement("div");
    card.className = "pie-card area-grid-card";

    const label = document.createElement("p");
    label.className = "bar-label";
    label.textContent = `Grid ${i + 1}: ${filled} shaded out of ${denominator}`;

    const grid = document.createElement("div");
    grid.className = "area-grid";
    grid.style.gridTemplateColumns = `repeat(${columns}, minmax(14px, 1fr))`;

    for (let part = 0; part < denominator; part += 1) {
      const cell = document.createElement("span");
      cell.className = `area-cell${part < filled ? " filled" : ""}`;
      grid.appendChild(cell);
    }

    card.appendChild(label);
    card.appendChild(grid);
    container.appendChild(card);
  }
}

function drawPercentGrid(container, percentValue) {
  clearNode(container);

  const safePercent = Math.max(0, percentValue);
  const gridCount = Math.max(1, Math.ceil(safePercent / 100));

  for (let index = 0; index < gridCount; index += 1) {
    const gridCard = document.createElement("div");
    gridCard.className = "percent-grid-card";

    const start = index * 100;
    const remaining = Math.max(0, safePercent - start);
    const capped = Math.min(100, remaining);
    const fullCells = Math.floor(capped);
    const partialCell = capped - fullCells;

    const title = document.createElement("p");
    title.className = "bar-label";
    title.textContent = `Grid ${index + 1}: ${formatNumber(capped, 2)}% shaded`;

    const grid = document.createElement("div");
    grid.className = "percent-grid";

    for (let cell = 0; cell < 100; cell += 1) {
      const gridCell = document.createElement("span");
      gridCell.className = "percent-cell";

      if (cell < fullCells) {
        gridCell.classList.add("filled");
      } else if (cell === fullCells && partialCell > 0) {
        gridCell.classList.add("partial");
        gridCell.style.setProperty("--fill", `${Math.round(partialCell * 100)}%`);
      }

      grid.appendChild(gridCell);
    }

    gridCard.appendChild(title);
    gridCard.appendChild(grid);
    container.appendChild(gridCard);
  }
}

function drawFractionVisual(container, numerator, denominator, chartType) {
  if (chartType === "bar") {
    drawSingleFractionBar(container, numerator, denominator);
    return;
  }

  if (chartType === "number-line") {
    drawFractionNumberLine(container, numerator, denominator);
    return;
  }

  if (chartType === "area-grid") {
    drawFractionAreaGrid(container, numerator, denominator);
    return;
  }

  drawFractionPies(container, numerator, denominator);
}

function updateAnatomyLabels(numerator, denominator) {
  anatomyNumerator.textContent = String(Number.isFinite(numerator) ? numerator : "-");
  anatomyDenominator.textContent = String(Number.isFinite(denominator) ? denominator : "-");
}

function fractionHtml(numerator, denominator) {
  return `
    <span class="display-fraction" aria-label="${numerator} over ${denominator}">
      <span class="num">${numerator}</span>
      <span class="line" aria-hidden="true"></span>
      <span class="den">${denominator}</span>
    </span>
  `;
}

function formatFractionsInText(text) {
  return text.replace(/(-?\d+)\/(-?\d+)/g, (_, numerator, denominator) =>
    fractionHtml(numerator, denominator)
  );
}

function renderStepList(container, stepItems) {
  clearNode(container);
  stepItems.forEach((stepText) => {
    const li = document.createElement("li");
    li.innerHTML = formatFractionsInText(stepText);
    container.appendChild(li);
  });
}

function renderOperationHelp(operation) {
  const helpText = {
    add: "Add fractions by finding a common denominator, then add the numerators.",
    subtract: "Subtract fractions by finding a common denominator, then subtract the numerators.",
    multiply: "Multiply straight across: numerator x numerator, denominator x denominator.",
    divide: "Divide by multiplying by the reciprocal of the second fraction."
  }[operation];

  operationHelp.innerHTML = `
    <strong>Method:</strong> ${helpText}<br />
    <strong>Golden Rule:</strong> What is done to the bottom, you do it to the top.
  `;
}

function renderOperationMathWhy(aNum, aDen, bNum, bDen, operation) {
  if (operation !== "add" && operation !== "subtract") {
    operationMathWhy.innerHTML = `
      <p><strong>Why this works:</strong> for multiply/divide, you are scaling parts, so denominators do not need to match first.</p>
    `;
    return;
  }

  const symbol = operation === "add" ? "+" : "-";
  const common = lcm(aDen, bDen);
  const factorA = common / aDen;
  const factorB = common / bDen;
  const scaledANum = aNum * factorA;
  const scaledBNum = bNum * factorB;
  const factorsA = getFactors(aDen);
  const factorsB = getFactors(bDen);
  const commonFactors = getCommonFactors(aDen, bDen);
  const multiplesA = getMultiplesUpTo(aDen, common);
  const multiplesB = getMultiplesUpTo(bDen, common);

  if (aDen === bDen) {
    operationMathWhy.innerHTML = `
      <p><strong>Denominators match:</strong> both fractions already use equal-size parts.</p>
      <div class="math-line">
        ${fractionHtml(aNum, aDen)}
        <span class="op-symbol">${symbol}</span>
        ${fractionHtml(bNum, bDen)}
      </div>
      <p>You can combine the top numbers directly because the bottom numbers describe the same part size.</p>
    `;
    return;
  }

  operationMathWhy.innerHTML = `
    <p><strong>Why different denominators are a problem:</strong> ${aDen}ths and ${bDen}ths are different-sized pieces, so they cannot be combined directly.</p>
    <p><strong>Factor check:</strong> denominator ${aDen} factors are ${factorsA.join(", ")}; denominator ${bDen} factors are ${factorsB.join(", ")}; common factors are ${commonFactors.join(", ")}.</p>
    <p><strong>Two-row multiple check:</strong> the same highlighted number appears in both rows.</p>
    <div class="factors-grid">
      ${multiplesRowHtml(`Multiples of ${aDen}`, multiplesA, common)}
      ${multiplesRowHtml(`Multiples of ${bDen}`, multiplesB, common)}
    </div>
    <p><strong>Why choose ${common} as denominator:</strong> it is the first shared (highlighted) multiple, so both fractions can be rewritten into ${common}ths.</p>
    <p><strong>Make equal-size parts first:</strong> use a common denominator of ${common}.</p>
    <div class="math-line">
      ${fractionHtml(aNum, aDen)}
      <span>=</span>
      ${fractionHtml(aNum, aDen)}
      <span>x</span>
      ${fractionHtml(factorA, factorA)}
      <span>=</span>
      ${fractionHtml(scaledANum, common)}
    </div>
    <div class="math-line">
      ${fractionHtml(bNum, bDen)}
      <span>=</span>
      ${fractionHtml(bNum, bDen)}
      <span>x</span>
      ${fractionHtml(factorB, factorB)}
      <span>=</span>
      ${fractionHtml(scaledBNum, common)}
    </div>
    <p><strong>Golden Rule shown in math:</strong> multiply top and bottom by the same number, so value stays equal but part size matches.</p>
  `;
}

function displaySingleFraction() {
  const numerator = Number(singleNumeratorInput.value);
  const denominator = Number(singleDenominatorInput.value);

  updateAnatomyLabels(numerator, denominator);

  if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || denominator <= 0 || numerator < 0) {
    singleFractionFacts.innerHTML = "<strong>Use whole numbers:</strong> numerator >= 0 and denominator > 0.";
    clearNode(singleFractionPies);
    return;
  }

  const simplified = simplifyFraction(numerator, denominator);
  const mixed = toMixedNumber(simplified.numerator, simplified.denominator);

  singleFractionFacts.innerHTML = `
    <strong>Fraction:</strong> <span class="math-expression">${fractionHtml(numerator, denominator)}</span><br />
    <strong>Simplified:</strong> <span class="math-expression">${fractionHtml(simplified.numerator, simplified.denominator)}</span><br />
    <strong>Decimal:</strong> ${fractionToDecimal(simplified.numerator, simplified.denominator)}<br />
    <strong>Mixed number:</strong> ${mixed.whole} remainder <span class="math-expression">${fractionHtml(mixed.remainder, simplified.denominator)}</span>
  `;

  const chartType = singleChartTypeSelect.value;
  drawFractionVisual(singleFractionPies, numerator, denominator, chartType);
}

function mixedNumberHtml(whole, numerator, denominator) {
  if (numerator === 0) {
    return `<span class="math-expression">${whole}</span>`;
  }

  return `<span class="math-expression">${whole} ${fractionHtml(numerator, denominator)}</span>`;
}

function formatNumber(value, places = 6) {
  return value.toFixed(places).replace(/0+$/, "").replace(/\.$/, "");
}

function isTerminatingDecimal(denominator) {
  let reduced = Math.abs(denominator);

  while (reduced % 2 === 0) {
    reduced /= 2;
  }

  while (reduced % 5 === 0) {
    reduced /= 5;
  }

  return reduced === 1;
}

function displayMixedToImproper() {
  const whole = Number(mixedWholeInput.value);
  const numerator = Number(mixedNumInput.value);
  const denominator = Number(mixedDenInput.value);

  if (![whole, numerator, denominator].every(Number.isInteger) || whole < 0 || numerator < 0 || denominator <= 0) {
    mixedToImproperSummary.innerHTML = "<strong>Input issue:</strong> use whole numbers with whole >= 0, numerator >= 0, denominator > 0.";
    clearNode(mixedToImproperSteps);
    return;
  }

  if (numerator >= denominator) {
    mixedToImproperSummary.innerHTML = "<strong>Input issue:</strong> for a mixed number, numerator should be less than denominator.";
    clearNode(mixedToImproperSteps);
    return;
  }

  const improperNumerator = whole * denominator + numerator;
  const simplified = simplifyFraction(improperNumerator, denominator);

  mixedToImproperSummary.innerHTML = `
    <strong>Result:</strong>
    <span class="math-expression">${mixedNumberHtml(whole, numerator, denominator)} = ${fractionHtml(improperNumerator, denominator)}</span>
    <br />
    <strong>Simplified:</strong>
    <span class="math-expression">${fractionHtml(improperNumerator, denominator)} = ${fractionHtml(simplified.numerator, simplified.denominator)}</span>
  `;

  renderStepList(mixedToImproperSteps, [
    `Start with mixed number ${whole} ${numerator}/${denominator}.`,
    `Multiply whole by denominator: ${whole} x ${denominator} = ${whole * denominator}.`,
    `Add the numerator: ${whole * denominator} + ${numerator} = ${improperNumerator}.`,
    `Place over original denominator: ${improperNumerator}/${denominator}.`,
    `Simplify if needed: ${improperNumerator}/${denominator} = ${simplified.numerator}/${simplified.denominator}.`
  ]);
}

function displayImproperToMixed() {
  const numerator = Number(improperNumInput.value);
  const denominator = Number(improperDenInput.value);

  if (![numerator, denominator].every(Number.isInteger) || numerator < 0 || denominator <= 0) {
    improperToMixedSummary.innerHTML = "<strong>Input issue:</strong> use whole numbers with numerator >= 0 and denominator > 0.";
    clearNode(improperToMixedSteps);
    return;
  }

  const whole = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  const simplifiedRemainder = simplifyFraction(remainder, denominator);

  const mixedText = remainder === 0
    ? `<span class="math-expression">${whole}</span>`
    : mixedNumberHtml(whole, simplifiedRemainder.numerator, simplifiedRemainder.denominator);

  improperToMixedSummary.innerHTML = `
    <strong>Result:</strong>
    <span class="math-expression">${fractionHtml(numerator, denominator)} = ${mixedText}</span>
  `;

  const steps = [
    `Divide numerator by denominator: ${numerator} ÷ ${denominator} = ${whole} remainder ${remainder}.`
  ];

  if (remainder === 0) {
    steps.push(`No remainder means this is a whole number: ${whole}.`);
  } else {
    steps.push(`Whole part is ${whole}.`);
    steps.push(`Remainder part is ${remainder}/${denominator}.`);
    steps.push(`Simplify remainder if needed: ${remainder}/${denominator} = ${simplifiedRemainder.numerator}/${simplifiedRemainder.denominator}.`);
    steps.push(`Write mixed number: ${whole} ${simplifiedRemainder.numerator}/${simplifiedRemainder.denominator}.`);
  }

  renderStepList(improperToMixedSteps, steps);
}

function displayFractionToDecimalPercent() {
  const numerator = Number(convertNumInput.value);
  const denominator = Number(convertDenInput.value);

  if (![numerator, denominator].every(Number.isInteger) || numerator < 0 || denominator <= 0) {
    fractionConvertSummary.innerHTML = "<strong>Input issue:</strong> use whole numbers with numerator >= 0 and denominator > 0.";
    fractionConvertExplain.innerHTML = "<p><strong>Math note:</strong> enter a valid fraction to see the decimal and percentage methods.</p>";
    clearNode(fractionConvertSteps);
    clearNode(fractionPercentGrid);
    return;
  }

  const simplified = simplifyFraction(numerator, denominator);
  const decimalValue = numerator / denominator;
  const percentValue = decimalValue * 100;
  const isTerminating = isTerminatingDecimal(simplified.denominator);
  const decimalText = formatNumber(decimalValue, isTerminating ? 8 : 6);
  const percentText = formatNumber(percentValue, 4);
  const decimalFromPercentText = formatNumber(percentValue / 100, isTerminating ? 8 : 6);
  const canMakeHundredths = 100 % simplified.denominator === 0;

  const asHundredths = canMakeHundredths
    ? {
        factor: 100 / simplified.denominator,
        numerator: simplified.numerator * (100 / simplified.denominator)
      }
    : null;

  fractionConvertSummary.innerHTML = `
    <strong>Equivalent forms:</strong>
    <span class="math-expression">${fractionHtml(numerator, denominator)} = ${decimalText}${isTerminating ? "" : " (approx)"} = ${percentText}%</span>
    <br />
    <strong>Simplified fraction:</strong> <span class="math-expression">${fractionHtml(simplified.numerator, simplified.denominator)}</span>
  `;

  fractionConvertExplain.innerHTML = `
    <p><strong>Decimal type:</strong> ${isTerminating ? "This decimal terminates (ends)." : "This decimal is recurring, so the decimal shown is rounded."}</p>
    <p><strong>Percent meaning:</strong> percentage means "out of 100".</p>
    <p><strong>Percentage to decimal rule:</strong> divide by 100 (move decimal point 2 places left): ${percentText}% -> ${decimalFromPercentText}.</p>
    ${asHundredths
      ? `<p><strong>Denominator-100 method:</strong> ${fractionHtml(simplified.numerator, simplified.denominator)} x ${fractionHtml(asHundredths.factor, asHundredths.factor)} = ${fractionHtml(asHundredths.numerator, 100)} = ${asHundredths.numerator}%.</p>`
      : "<p><strong>Denominator-100 method:</strong> not direct here, so use decimal then multiply by 100.</p>"}
  `;

  const stepItems = [
    `Start with ${numerator}/${denominator}.`,
    `Simplify first: ${numerator}/${denominator} = ${simplified.numerator}/${simplified.denominator}.`,
    `Convert to decimal by division: ${simplified.numerator} ÷ ${simplified.denominator} = ${decimalText}${isTerminating ? "" : " (rounded)"}.`,
    `Convert decimal to percent: ${decimalText} x 100 = ${percentText}.`,
    `Add the percent sign: ${percentText}%.`
  ];

  stepItems.push(`Convert back from percentage to decimal: ${percentText}% ÷ 100 = ${decimalFromPercentText}.`);

  if (asHundredths) {
    stepItems.push(
      `Check with hundredths method: ${simplified.numerator}/${simplified.denominator} = ${asHundredths.numerator}/100 = ${asHundredths.numerator}%.`
    );
  }

  stepItems.push(`All forms are equivalent: ${numerator}/${denominator} = ${decimalText}${isTerminating ? "" : " (approx)"} = ${percentText}%.`);

  renderStepList(fractionConvertSteps, stepItems);

  drawPercentGrid(fractionPercentGrid, percentValue);
}

function validateTwoFractions(aNum, aDen, bNum, bDen) {
  if (![aNum, aDen, bNum, bDen].every(Number.isInteger)) {
    return "Only whole number inputs are allowed.";
  }

  if (aDen <= 0 || bDen <= 0) {
    return "Denominators must be greater than zero.";
  }

  if (aNum < 0 || bNum < 0) {
    return "Use non-negative numerators for this classroom visualiser.";
  }

  return null;
}

function validateThreeFractions(cNum, cDen, dNum, dDen, eNum, eDen) {
  const values = [cNum, cDen, dNum, dDen, eNum, eDen];

  if (!values.every(Number.isInteger)) {
    return "Only whole number inputs are allowed.";
  }

  if (cDen <= 0 || dDen <= 0 || eDen <= 0) {
    return "Denominators must be greater than zero.";
  }

  if (cNum < 0 || dNum < 0 || eNum < 0) {
    return "Use non-negative numerators for this classroom visualiser.";
  }

  return null;
}

function renderSolve3Help(op1, op2) {
  const symbolText = {
    add: "add",
    subtract: "subtract",
    multiply: "multiply",
    divide: "divide"
  };

  solve3Help.innerHTML = `
    <strong>Method:</strong> Solve left to right: first ${symbolText[op1]} Fraction 1 and Fraction 2, then ${symbolText[op2]} Fraction 3.<br />
    <strong>Golden Rule:</strong> What is done to the bottom, you do it to the top.
  `;
}

function solveFractionPair(leftNum, leftDen, rightNum, rightDen, operation) {
  if (operation === "add" || operation === "subtract") {
    const common = lcm(leftDen, rightDen);
    const scaledLeft = leftNum * (common / leftDen);
    const scaledRight = rightNum * (common / rightDen);
    const rawNum = operation === "add" ? scaledLeft + scaledRight : scaledLeft - scaledRight;

    return {
      rawNum,
      rawDen: common,
      stepLines: [
        `Use common denominator ${common}: ${leftNum}/${leftDen} = ${scaledLeft}/${common}, ${rightNum}/${rightDen} = ${scaledRight}/${common}.`,
        `${operation === "add" ? "Add" : "Subtract"} numerators: ${scaledLeft} ${operation === "add" ? "+" : "-"} ${scaledRight} = ${rawNum}.`
      ],
      why: `Because this is ${operation}, denominators must match before combining.`
    };
  }

  if (operation === "multiply") {
    const rawNum = leftNum * rightNum;
    const rawDen = leftDen * rightDen;

    return {
      rawNum,
      rawDen,
      stepLines: [
        `Multiply numerators: ${leftNum} x ${rightNum} = ${rawNum}.`,
        `Multiply denominators: ${leftDen} x ${rightDen} = ${rawDen}.`
      ],
      why: "For multiplication, multiply straight across."
    };
  }

  if (rightNum === 0) {
    throw new Error("Cannot divide by a fraction with numerator 0.");
  }

  const reciprocalNum = rightDen;
  const reciprocalDen = rightNum;
  const rawNum = leftNum * reciprocalNum;
  const rawDen = leftDen * reciprocalDen;

  return {
    rawNum,
    rawDen,
    stepLines: [
      `Flip second fraction to reciprocal: ${rightNum}/${rightDen} -> ${reciprocalNum}/${reciprocalDen}.`,
      `Multiply: (${leftNum} x ${reciprocalNum}) / (${leftDen} x ${reciprocalDen}) = ${rawNum}/${rawDen}.`
    ],
    why: "For division, multiply by the reciprocal."
  };
}

function displaySolve3() {
  const cNum = Number(cNumInput.value);
  const cDen = Number(cDenInput.value);
  const dNum = Number(dNumInput.value);
  const dDen = Number(dDenInput.value);
  const eNum = Number(eNumInput.value);
  const eDen = Number(eDenInput.value);
  const op1 = operationOneSelect.value;
  const op2 = operationTwoSelect.value;

  renderSolve3Help(op1, op2);

  const validationError = validateThreeFractions(cNum, cDen, dNum, dDen, eNum, eDen);
  if (validationError) {
    solve3Summary.innerHTML = `<strong>Input issue:</strong> ${validationError}`;
    solve3MathWhy.innerHTML = "<p><strong>Math note:</strong> enter valid fractions first to see the reasoning steps.</p>";
    clearNode(solve3Steps);
    clearNode(fractionCPies);
    clearNode(fractionDPies);
    clearNode(fractionEPies);
    clearNode(fractionFResultPies);
    return;
  }

  const symbolMap = {
    add: "+",
    subtract: "-",
    multiply: "x",
    divide: "÷"
  };

  try {
    const firstStep = solveFractionPair(cNum, cDen, dNum, dDen, op1);
    const secondStep = solveFractionPair(firstStep.rawNum, firstStep.rawDen, eNum, eDen, op2);
    const simplified = simplifyFraction(secondStep.rawNum, secondStep.rawDen);

    solve3MathWhy.innerHTML = `
      <p><strong>Left-to-right solving:</strong> do the first operation, then use that result with the third fraction.</p>
      <p><strong>Step 1:</strong> ${firstStep.why}</p>
      <p><strong>Step 2:</strong> ${secondStep.why}</p>
    `;

    solve3Summary.innerHTML = `
      <strong>Expression:</strong>
      <span class="math-expression">
        ${fractionHtml(cNum, cDen)}
        <span class="op-symbol">${symbolMap[op1]}</span>
        ${fractionHtml(dNum, dDen)}
        <span class="op-symbol">${symbolMap[op2]}</span>
        ${fractionHtml(eNum, eDen)}
        <span class="equal-symbol">=</span>
        ${fractionHtml(simplified.numerator, simplified.denominator)}
      </span>
      <span style="color: var(--ok); font-weight: 700;">(simplified)</span>
    `;

    const stepItems = [
      `Step 1: ${cNum}/${cDen} ${symbolMap[op1]} ${dNum}/${dDen}`,
      ...firstStep.stepLines,
      `Step 1 result: ${firstStep.rawNum}/${firstStep.rawDen}.`,
      `Step 2: ${firstStep.rawNum}/${firstStep.rawDen} ${symbolMap[op2]} ${eNum}/${eDen}`,
      ...secondStep.stepLines,
      `Step 2 result: ${secondStep.rawNum}/${secondStep.rawDen}.`,
      `Simplify final answer: ${secondStep.rawNum}/${secondStep.rawDen} = ${simplified.numerator}/${simplified.denominator}.`
    ];

    renderStepList(solve3Steps, stepItems);

    const chartType = solve3ChartTypeSelect.value;

    drawFractionVisual(fractionCPies, cNum, cDen, chartType);
    drawFractionVisual(fractionDPies, dNum, dDen, chartType);
    drawFractionVisual(fractionEPies, eNum, eDen, chartType);

    if (simplified.numerator < 0) {
      clearNode(fractionFResultPies);
      const messageCard = document.createElement("div");
      messageCard.className = "pie-card";
      messageCard.innerHTML = "<p>This result is negative, so pie shading is not shown in this mode.</p>";
      fractionFResultPies.appendChild(messageCard);
    } else {
      drawFractionVisual(
        fractionFResultPies,
        simplified.numerator,
        simplified.denominator,
        chartType
      );
    }
  } catch (error) {
    solve3Summary.innerHTML = `<strong>Input issue:</strong> ${error.message}`;
    clearNode(solve3Steps);
    clearNode(fractionFResultPies);
  }
}

function displaySimplifyTool() {
  const numerator = Number(simplifyNumInput.value);
  const denominator = Number(simplifyDenInput.value);

  if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || numerator < 0 || denominator <= 0) {
    simplifySummary.innerHTML = "<strong>Input issue:</strong> use whole numbers with numerator >= 0 and denominator > 0.";
    clearNode(simplifySteps);
    return;
  }

  if (numerator === 0) {
    simplifySummary.innerHTML = `
      <strong>Simplified:</strong>
      <span class="math-expression">${fractionHtml(0, denominator)} = ${fractionHtml(0, 1)}</span>
    `;
    renderStepList(simplifySteps, [
      "Any fraction with top number 0 has value 0.",
      `So 0/${denominator} simplifies to 0/1.`
    ]);
    return;
  }

  const commonFactors = getCommonFactors(numerator, denominator);
  const divisor = gcd(numerator, denominator);
  const simplified = simplifyFraction(numerator, denominator);
  const numeratorFactors = getFactors(numerator);
  const denominatorFactors = getFactors(denominator);
  const stepItems = [
    `Factors of ${numerator}: ${numeratorFactors.join(", ")}.`,
    `Factors of ${denominator}: ${denominatorFactors.join(", ")}.`,
    `Common factors: ${commonFactors.join(", ")}.`,
    `Greatest common factor is ${divisor}.`,
    `Divide top and bottom by ${divisor}: ${numerator}/${denominator} = ${simplified.numerator}/${simplified.denominator}.`
  ];

  simplifySummary.innerHTML = `
    <strong>Simplified:</strong>
    <span class="math-expression">${fractionHtml(numerator, denominator)} = ${fractionHtml(simplified.numerator, simplified.denominator)}</span>
    <div class="factors-grid">
      ${factorsRowHtml(`Factors of ${numerator}`, numeratorFactors, commonFactors, divisor)}
      ${factorsRowHtml(`Factors of ${denominator}`, denominatorFactors, commonFactors, divisor)}
    </div>
    <p><strong>Highlighted:</strong> common factors are shaded, and the greatest common factor is emphasized.</p>
  `;

  renderStepList(simplifySteps, stepItems);
}

function displayCompareTool() {
  const aNum = Number(compareANumInput.value);
  const aDen = Number(compareADenInput.value);
  const bNum = Number(compareBNumInput.value);
  const bDen = Number(compareBDenInput.value);
  const validationError = validateTwoFractions(aNum, aDen, bNum, bDen);

  if (validationError) {
    compareSummary.innerHTML = `<strong>Input issue:</strong> ${validationError}`;
    clearNode(compareSteps);
    return;
  }

  const common = lcm(aDen, bDen);
  const scaledANum = aNum * (common / aDen);
  const scaledBNum = bNum * (common / bDen);
  const relation = scaledANum > scaledBNum ? ">" : scaledANum < scaledBNum ? "<" : "=";
  const relationText = relation === ">" ? "greater than" : relation === "<" ? "less than" : "equal to";

  compareSummary.innerHTML = `
    <strong>Comparison:</strong>
    <span class="math-expression">
      ${fractionHtml(aNum, aDen)}
      <span class="compare-symbol">${relation}</span>
      ${fractionHtml(bNum, bDen)}
    </span>
    <br />
    <strong>Answer:</strong> Fraction A is ${relationText} Fraction B.
  `;

  renderStepList(compareSteps, [
    `Find a common denominator: lcm(${aDen}, ${bDen}) = ${common}.`,
    `Rewrite Fraction A: ${aNum}/${aDen} = ${scaledANum}/${common}.`,
    `Rewrite Fraction B: ${bNum}/${bDen} = ${scaledBNum}/${common}.`,
    `Now compare numerators because denominators match: ${scaledANum} ${relation} ${scaledBNum}.`,
    `So ${aNum}/${aDen} ${relation} ${bNum}/${bDen}.`
  ]);
}

function solveOperation(aNum, aDen, bNum, bDen, operation) {
  const steps = [];
  let rawNum = 0;
  let rawDen = 1;

  if (operation === "add" || operation === "subtract") {
    const common = lcm(aDen, bDen);
    const scaledANum = aNum * (common / aDen);
    const scaledBNum = bNum * (common / bDen);

    steps.push(`Find a common denominator: lcm(${aDen}, ${bDen}) = ${common}.`);
    steps.push("Golden Rule: what is done to the bottom, you do it to the top.");
    steps.push(`Rewrite fractions: ${aNum}/${aDen} = ${scaledANum}/${common}, ${bNum}/${bDen} = ${scaledBNum}/${common}.`);

    rawNum = operation === "add" ? scaledANum + scaledBNum : scaledANum - scaledBNum;
    rawDen = common;

    steps.push(`${operation === "add" ? "Add" : "Subtract"} numerators: ${scaledANum} ${operation === "add" ? "+" : "-"} ${scaledBNum} = ${rawNum}.`);
    steps.push(`Write result over the common denominator: ${rawNum}/${rawDen}.`);
  }

  if (operation === "multiply") {
    rawNum = aNum * bNum;
    rawDen = aDen * bDen;

    steps.push(`Multiply numerators: ${aNum} x ${bNum} = ${rawNum}.`);
    steps.push(`Multiply denominators: ${aDen} x ${bDen} = ${rawDen}.`);
    steps.push(`Write the product: ${rawNum}/${rawDen}.`);
  }

  if (operation === "divide") {
    if (bNum === 0) {
      throw new Error("Cannot divide by 0/x because that fraction equals zero.");
    }

    const reciprocalNum = bDen;
    const reciprocalDen = bNum;

    steps.push(`Keep the first fraction: ${aNum}/${aDen}.`);
    steps.push(`Flip the second fraction to its reciprocal: ${bNum}/${bDen} -> ${reciprocalNum}/${reciprocalDen}.`);

    rawNum = aNum * reciprocalNum;
    rawDen = aDen * reciprocalDen;

    steps.push(`Multiply: (${aNum} x ${reciprocalNum}) / (${aDen} x ${reciprocalDen}) = ${rawNum}/${rawDen}.`);
  }

  const simplified = simplifyFraction(rawNum, rawDen);
  steps.push(`Simplify the answer: ${rawNum}/${rawDen} = ${simplified.numerator}/${simplified.denominator}.`);

  return { rawNum, rawDen, simplified, steps };
}

function renderSteps(stepItems) {
  renderStepList(operationSteps, stepItems);
}

function displayOperation() {
  const aNum = Number(aNumInput.value);
  const aDen = Number(aDenInput.value);
  const bNum = Number(bNumInput.value);
  const bDen = Number(bDenInput.value);
  const operation = operationSelect.value;

  renderOperationHelp(operation);

  const validationError = validateTwoFractions(aNum, aDen, bNum, bDen);

  if (validationError) {
    operationSummary.innerHTML = `<strong>Input issue:</strong> ${validationError}`;
    operationMathWhy.innerHTML = "<p><strong>Math note:</strong> enter valid fractions first to see the reasoning steps.</p>";
    clearNode(operationSteps);
    clearNode(fractionAPies);
    clearNode(fractionBPies);
    clearNode(fractionResultPies);
    return;
  }

  renderOperationMathWhy(aNum, aDen, bNum, bDen, operation);

  try {
    const result = solveOperation(aNum, aDen, bNum, bDen, operation);
    const operationSymbol = {
      add: "+",
      subtract: "-",
      multiply: "x",
      divide: "÷"
    }[operation];

    operationSummary.innerHTML = `
      <strong>Expression:</strong>
      <span class="math-expression">
        ${fractionHtml(aNum, aDen)}
        <span class="op-symbol">${operationSymbol}</span>
        ${fractionHtml(bNum, bDen)}
        <span class="equal-symbol">=</span>
        ${fractionHtml(result.simplified.numerator, result.simplified.denominator)}
      </span>
      <span style="color: var(--ok); font-weight: 700;">(simplified)</span>
    `;

    renderSteps(result.steps);
    const chartType = solve2ChartTypeSelect.value;

    drawFractionVisual(fractionAPies, aNum, aDen, chartType);
    drawFractionVisual(fractionBPies, bNum, bDen, chartType);

    if (result.simplified.numerator < 0) {
      clearNode(fractionResultPies);
      const messageCard = document.createElement("div");
      messageCard.className = "pie-card";
      messageCard.innerHTML = "<p>This result is negative, so pie shading is not shown in this mode.</p>";
      fractionResultPies.appendChild(messageCard);
    } else {
      drawFractionVisual(
        fractionResultPies,
        result.simplified.numerator,
        result.simplified.denominator,
        chartType
      );
    }
  } catch (error) {
    operationSummary.innerHTML = `<strong>Input issue:</strong> ${error.message}`;
    clearNode(operationSteps);
    clearNode(fractionResultPies);
  }
}

singleFractionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displaySingleFraction();
});

singleNumeratorInput.addEventListener("input", displaySingleFraction);
singleDenominatorInput.addEventListener("input", displaySingleFraction);
singleChartTypeSelect.addEventListener("change", displaySingleFraction);

simplifyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displaySimplifyTool();
});

compareForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displayCompareTool();
});

operationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displayOperation();
});

operationSelect.addEventListener("change", () => {
  displayOperation();
});

solve2ChartTypeSelect.addEventListener("change", () => {
  displayOperation();
});

solve3Form.addEventListener("submit", (event) => {
  event.preventDefault();
  displaySolve3();
});

mixedToImproperForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displayMixedToImproper();
});

improperToMixedForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displayImproperToMixed();
});

fractionConvertForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displayFractionToDecimalPercent();
});

convertNumInput.addEventListener("input", () => {
  displayFractionToDecimalPercent();
});

convertDenInput.addEventListener("input", () => {
  displayFractionToDecimalPercent();
});

operationOneSelect.addEventListener("change", () => {
  displaySolve3();
});

operationTwoSelect.addEventListener("change", () => {
  displaySolve3();
});

solve3ChartTypeSelect.addEventListener("change", () => {
  displaySolve3();
});

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveView(tab.dataset.view);
  });
});

// Render default examples on first load so the page is immediately useful.
setActiveView("how-fractions");
displaySingleFraction();
displayOperation();
displaySolve3();
displaySimplifyTool();
displayCompareTool();
displayMixedToImproper();
displayImproperToMixed();
displayFractionToDecimalPercent();
