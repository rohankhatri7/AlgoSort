const ALGORITHMS = {
  bubble: {
    name: 'Bubble Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Repeatedly swaps adjacent elements if they are in the wrong order.'
  },
  insertion: {
    name: 'Insertion Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Builds the sorted array one item at a time.'
  },
  selection: {
    name: 'Selection Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Selects the minimum element and moves it to the sorted part.'
  },
  heap: {
    name: 'Heap Sort',
    time: 'O(n log n)',
    space: 'O(1)',
    desc: 'Builds a heap and repeatedly extracts the maximum.'
  },
  quick: {
    name: 'Quick Sort',
    time: 'O(n log n)',
    space: 'O(log n)',
    desc: 'Divides and conquers using a pivot element.'
  },
  merge: {
    name: 'Merge Sort',
    time: 'O(n log n)',
    space: 'O(n)',
    desc: 'Divides the array and merges sorted halves.'
  },
  radix: {
    name: 'Radix Sort',
    time: 'O(nk)',
    space: 'O(n+k)',
    desc: 'Sorts numbers digit by digit.'
  },
  counting: {
    name: 'Counting Sort',
    time: 'O(n+k)',
    space: 'O(k)',
    desc: 'Counts occurrences and calculates positions.'
  },
  bucket: {
    name: 'Bucket Sort',
    time: 'O(n+k)',
    space: 'O(n+k)',
    desc: 'Distributes elements into buckets and sorts each.'
  }
};

const API_URL = 'http://localhost:5000/sort';

const algoSelect = document.getElementById('algorithm');
const algoInfo = document.getElementById('algo-info');
const generateBtn = document.getElementById('generate');
const startBtn = document.getElementById('start');
const customArrayInput = document.getElementById('custom-array');
const visualization = document.getElementById('visualization');
const prevStepBtn = document.getElementById('prev-step');
const nextStepBtn = document.getElementById('next-step');
const playPauseBtn = document.getElementById('play-pause');
const stepInfo = document.getElementById('step-info');
const speedSelect = document.getElementById('speed-select');

let currentArray = [];
let steps = [];
let currentStep = 0;
let playInterval = null;
let speedMap = { '1': 350, '2': 175, '5': 70, '10': 35 };
let playSpeed = speedMap[speedSelect.value] || 350;

function fillAlgorithmOptions() {
  for (const key in ALGORITHMS) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = ALGORITHMS[key].name;
    algoSelect.appendChild(opt);
  }
  updateAlgoInfo();
}

function updateAlgoInfo() {
  const algo = ALGORITHMS[algoSelect.value];
  if (algo) {
    algoInfo.textContent = `${algo.desc} Time: ${algo.time}, Space: ${algo.space}`;
  } else {
    algoInfo.textContent = '';
  }
}

algoSelect.addEventListener('change', updateAlgoInfo);

function generateRandomArray(size = 30, min = 5, max = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

function parseCustomArray(str) {
  return str.split(',').map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));
}

generateBtn.addEventListener('click', () => {
  currentArray = generateRandomArray();
  renderArray(currentArray);
});

function renderArray(arr, step = null) {
  visualization.innerHTML = '';
  let comparing = [], swapping = [], sorted = [], pivot = null;
  if (step) {
    comparing = step.comparing || [];
    swapping = step.swapping || [];
    sorted = step.sorted || [];
    pivot = step.pivot;
  }
  arr.forEach((val, idx) => {
    const barContainer = document.createElement('div');
    barContainer.className = 'bar-container';
    const bar = document.createElement('div');
    bar.className = 'bar unsorted';
    bar.style.height = `${val * 2.2}px`;
    if (sorted.includes(idx)) bar.className = 'bar sorted';
    else if (swapping.includes(idx)) bar.className = 'bar swapping';
    else if (comparing.includes(idx)) bar.className = 'bar comparing';
    else if (pivot === idx) bar.className = 'bar pivot';
    bar.title = val;
    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = val;
    barContainer.appendChild(label);
    barContainer.appendChild(bar);
    visualization.appendChild(barContainer);
  });
}

startBtn.addEventListener('click', async () => {
  let arr = [];
  if (customArrayInput.value.trim()) {
    arr = parseCustomArray(customArrayInput.value);
  } else if (currentArray.length) {
    arr = currentArray.slice();
  } else {
    arr = generateRandomArray();
  }
  currentArray = arr;
  renderArray(arr);
  const algorithm = algoSelect.value;
  stepInfo.textContent = 'Loading...';
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ array: arr, algorithm })
    });
    const data = await res.json();
    steps = data.steps || [];
    currentStep = 0;
    renderStep();
  } catch (e) {
    stepInfo.textContent = 'Error connecting to backend.';
  }
});

function renderStep() {
  if (!steps.length) {
    renderArray(currentArray);
    stepInfo.textContent = '';
    return;
  }
  const step = steps[currentStep];
  renderArray(step.array, step);
  stepInfo.textContent = `Step ${currentStep + 1} of ${steps.length}`;
}

prevStepBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
});

nextStepBtn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  }
});

speedSelect.addEventListener('change', () => {
  playSpeed = speedMap[speedSelect.value] || 350;
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = setInterval(playStep, playSpeed);
  }
});

function playStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  } else {
    clearInterval(playInterval);
    playInterval = null;
    playPauseBtn.textContent = 'Play';
  }
}

playPauseBtn.addEventListener('click', () => {
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
    playPauseBtn.textContent = 'Play';
  } else {
    playPauseBtn.textContent = 'Pause';
    playInterval = setInterval(playStep, playSpeed);
  }
});

customArrayInput.addEventListener('input', () => {
  const arr = parseCustomArray(customArrayInput.value);
  if (arr.length > 0) {
    currentArray = arr;
    renderArray(currentArray);
  }
});

customArrayInput.addEventListener('blur', () => {
  const arr = parseCustomArray(customArrayInput.value);
  if (arr.length > 0) {
    currentArray = arr;
    renderArray(currentArray);
  }
});

// Initial setup
fillAlgorithmOptions();
currentArray = generateRandomArray();
renderArray(currentArray); 