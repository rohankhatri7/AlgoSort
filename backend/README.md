# AlgoSort Visualizer

## Overview
AlgoSort Visualizer is a web application that allows users to visualize and understand how different sorting algorithms work step by step. Users can generate a random array or input their own, select from a variety of algorithms, and watch the sorting process unfold with clear color-coded steps and controls for speed and navigation.

## Features
- Visualize Bubble, Insertion, Selection, Heap, Quick, Merge, Radix, Counting, and Bucket sort algorithms
- Step-by-step animation with Play, Pause, Next, Previous controls
- Adjustable animation speed (1x, 2x, 5x, 10x)
- Color legend for unsorted, comparing, swapping, pivot, and sorted elements
- Enter a custom array or generate a random one
- See algorithm time/space complexity and a short description
- Bar values are displayed for clarity
- **Step-by-step explanation**: See a dynamic, human-readable description of what's happening at each step (e.g., "Comparing 5 and 8", "Swapping 8 and 3", "Pivot is 7", "Array is fully sorted!")
- **Algorithm info modal**: Click the algorithm name to open a modal with a detailed description, pseudocode, and real-world use cases
- **Animated, interactive algorithm selection cards**: Choose your algorithm with visually engaging cards, each with an icon, tooltip, and selection animation
- **Modern, responsive UI**: Clean, mobile-friendly design with smooth interactions

## Backend Setup

1. **Create a virtual environment (recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the backend server:**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000/sort`.

## API Usage
- **POST** `/sort`
  - **Request JSON:** `{ "array": [int, ...], "algorithm": "bubble"|... }`
  - **Response JSON:** `{ "steps": [ { "array": [...], "comparing": [...], "swapping": [...], "sorted": [...], ... }, ... ] }`

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Start a simple HTTP server:**
   ```bash
   python3 -m http.server 8000
   ```
3. **Open your browser and go to:**
   [http://localhost:8000](http://localhost:8000)

## Troubleshooting
- **CORS errors:** Make sure the backend is running and accessible at `http://localhost:5000`.
- **Port conflicts:** If port 8000 or 5000 is in use, use another port and update the frontend `API_URL` in `app.js` if needed.
- **Custom array not visualizing:** Ensure you enter numbers separated by commas (e.g., `5,3,8,1`).

## Project Structure
```
/AlgoSort
  ├── backend/
  │   ├── app.py
  │   ├── requirements.txt
  │   ├── algorithms/
  │   │   ├── __init__.py
  │   │   ├── bubble.py
  │   │   └── ...
  └── frontend/
      ├── index.html
      ├── styles.css
      └── app.js
```

## License
MIT License 