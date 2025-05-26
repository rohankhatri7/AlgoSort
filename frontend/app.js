const ALGORITHMS = {
  bubble: {
    name: 'Bubble Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Repeatedly swaps adjacent elements if they are in the wrong order.',
    details: 'Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.',
    pseudocode: `for i from 0 to n-1\n    for j from 0 to n-i-2\n        if arr[j] > arr[j+1]\n            swap arr[j] and arr[j+1]`,
    usecases: 'Educational purposes, small datasets, detecting nearly sorted arrays.'
  },
  insertion: {
    name: 'Insertion Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Builds the sorted array one item at a time.',
    details: 'Insertion Sort builds the sorted array one element at a time by repeatedly picking the next element and inserting it into its correct position among the previously sorted elements.',
    pseudocode: `for i from 1 to n-1\n    key = arr[i]\n    j = i-1\n    while j >= 0 and arr[j] > key\n        arr[j+1] = arr[j]\n        j = j-1\n    arr[j+1] = key`,
    usecases: 'Small datasets, nearly sorted arrays, online sorting.'
  },
  selection: {
    name: 'Selection Sort',
    time: 'O(n²)',
    space: 'O(1)',
    desc: 'Selects the minimum element and moves it to the sorted part.',
    details: 'Selection Sort divides the array into a sorted and unsorted part. It repeatedly selects the minimum element from the unsorted part and moves it to the end of the sorted part.',
    pseudocode: `for i from 0 to n-1\n    min_idx = i\n    for j from i+1 to n-1\n        if arr[j] < arr[min_idx]\n            min_idx = j\n    swap arr[i] and arr[min_idx]`,
    usecases: 'Small datasets, when memory writes are costly.'
  },
  heap: {
    name: 'Heap Sort',
    time: 'O(n log n)',
    space: 'O(1)',
    desc: 'Builds a heap and repeatedly extracts the maximum.',
    details: 'Heap Sort builds a max heap from the array, then repeatedly extracts the maximum element from the heap and rebuilds the heap until sorted.',
    pseudocode: `build a max heap\nfor i from n-1 downto 1\n    swap arr[0] and arr[i]\n    heapify arr[0..i-1]`,
    usecases: 'Large datasets, in-place sorting, external sorting.'
  },
  quick: {
    name: 'Quick Sort',
    time: 'O(n log n)',
    space: 'O(log n)',
    desc: 'Divides and conquers using a pivot element.',
    details: 'Quick Sort picks a pivot element, partitions the array around the pivot, and recursively sorts the partitions.',
    pseudocode: `quickSort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quickSort(arr, low, pi-1)\n        quickSort(arr, pi+1, high)`,
    usecases: 'General-purpose sorting, large datasets.'
  },
  merge: {
    name: 'Merge Sort',
    time: 'O(n log n)',
    space: 'O(n)',
    desc: 'Divides the array and merges sorted halves.',
    details: 'Merge Sort divides the array into halves, recursively sorts them, and then merges the sorted halves.',
    pseudocode: `mergeSort(arr):\n    if len(arr) > 1:\n        mid = len(arr)//2\n        L = arr[:mid]\n        R = arr[mid:]\n        mergeSort(L)\n        mergeSort(R)\n        merge L and R into arr`,
    usecases: 'Linked lists, external sorting, stable sorting.'
  },
  radix: {
    name: 'Radix Sort',
    time: 'O(nk)',
    space: 'O(n+k)',
    desc: 'Sorts numbers digit by digit.',
    details: 'Radix Sort processes each digit of the numbers, grouping them by digit value, and sorts them from least significant to most significant digit.',
    pseudocode: `for each digit from least to most significant:\n    sort array by current digit using a stable sort`,
    usecases: 'Sorting integers, large datasets with small key range.'
  },
  counting: {
    name: 'Counting Sort',
    time: 'O(n+k)',
    space: 'O(k)',
    desc: 'Counts occurrences and calculates positions.',
    details: 'Counting Sort counts the number of occurrences of each value, then calculates the positions of each value in the output array.',
    pseudocode: `count occurrences of each value\naccumulate counts\nplace values in output array`,
    usecases: 'Sorting integers, small key range, non-comparison sort.'
  },
  bucket: {
    name: 'Bucket Sort',
    time: 'O(n+k)',
    space: 'O(n+k)',
    desc: 'Distributes elements into buckets and sorts each.',
    details: 'Bucket Sort distributes elements into buckets, sorts each bucket individually, and then concatenates the results.',
    pseudocode: `create k empty buckets\nfor each element:\n    insert into bucket\nsort each bucket\nconcatenate buckets`,
    usecases: 'Uniformly distributed data, floating point numbers.'
  }
};

const ALGO_ICONS = {
  bubble: '🫧',
  insertion: '🪄',
  selection: '🔎',
  heap: '🏔️',
  quick: '⚡',
  merge: '🧩',
  radix: '🔢',
  counting: '📊',
  bucket: '🪣'
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
const stepExplanation = document.getElementById('step-explanation');
const algoName = document.getElementById('algorithm-name');
const algoModal = document.getElementById('algo-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPseudocode = document.getElementById('modal-pseudocode');
const modalUsecases = document.getElementById('modal-usecases');
const algorithmCards = document.getElementById('algorithm-cards');

let currentArray = [];
let steps = [];
let currentStep = 0;
let playInterval = null;
let speedMap = { '1': 350, '2': 175, '5': 70, '10': 35 };
let playSpeed = speedMap[speedSelect.value] || 350;
let selectedAlgorithm = 'bubble';

function renderAlgorithmCards() {
  algorithmCards.innerHTML = '';
  Object.entries(ALGORITHMS).forEach(([key, algo]) => {
    const card = document.createElement('div');
    card.className = 'algorithm-card' + (selectedAlgorithm === key ? ' selected' : '');
    card.innerHTML = `
      <span class="algorithm-card-icon">${ALGO_ICONS[key] || '🔷'}</span>
      <div class="algorithm-card-title">${algo.name}</div>
      <div class="algorithm-card-desc">${algo.desc}</div>
      <div class="algorithm-card-tooltip">
        <b>${algo.name}</b><br>
        <span>Time: ${algo.time}, Space: ${algo.space}</span><br>
        <span>${algo.desc}</span>
      </div>
    `;
    card.onclick = () => {
      if (selectedAlgorithm !== key) {
        selectedAlgorithm = key;
        renderAlgorithmCards();
        updateAlgoInfo();
      }
    };
    card.title = 'Double-click for more info';
    card.ondblclick = () => showAlgoModal(key);
    algorithmCards.appendChild(card);
  });
}

function updateAlgoInfo() {
  const algo = ALGORITHMS[selectedAlgorithm];
  if (algo) {
    algoInfo.textContent = `${algo.desc} Time: ${algo.time}, Space: ${algo.space}`;
    algoName.textContent = algo.name;
  } else {
    algoInfo.textContent = '';
    algoName.textContent = '';
  }
}

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
  const algorithm = selectedAlgorithm;
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

function getStepExplanation(step, prevStep) {
  if (!step) return '';
  if (step.swapping && step.swapping.length > 0) {
    const vals = step.swapping.map(i => step.array[i]);
    return `Swapping ${vals.join(' and ')}`;
  }
  if (step.comparing && step.comparing.length > 1) {
    const vals = step.comparing.map(i => step.array[i]);
    return `Comparing ${vals.join(' and ')}`;
  }
  if (step.pivot !== undefined && step.pivot !== null) {
    return `Pivot is ${step.array[step.pivot]}`;
  }
  if (step.sorted && step.sorted.length === step.array.length) {
    return 'Array is fully sorted!';
  }
  return '';
}

function renderStep() {
  if (!steps.length) {
    renderArray(currentArray);
    stepInfo.textContent = '';
    stepExplanation.textContent = '';
    return;
  }
  const step = steps[currentStep];
  renderArray(step.array, step);
  stepInfo.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  const prevStep = currentStep > 0 ? steps[currentStep - 1] : null;
  stepExplanation.textContent = getStepExplanation(step, prevStep);
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

// Algorithm info modal logic
function showAlgoModal(algoKey) {
  const algo = ALGORITHMS[algoKey];
  if (!algo) return;
  modalTitle.textContent = algo.name;
  modalDescription.textContent = algo.details;
  modalPseudocode.textContent = algo.pseudocode;
  modalUsecases.innerHTML = `<b>Use Cases:</b> ${algo.usecases}`;
  algoModal.style.display = 'block';
}
closeModal.addEventListener('click', () => {
  algoModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === algoModal) algoModal.style.display = 'none';
});

// Initial setup
renderAlgorithmCards();
currentArray = generateRandomArray();
renderArray(currentArray);
updateAlgoInfo(); 