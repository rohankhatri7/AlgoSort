def quick_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    sorted_indices = set()
    def _quick_sort(low, high):
        if low < high:
            pi = partition(low, high)
            sorted_indices.add(pi)
            _quick_sort(low, pi-1)
            _quick_sort(pi+1, high)
        elif low == high:
            sorted_indices.add(low)
    def partition(low, high):
        pivot = a[high]
        i = low - 1
        for j in range(low, high):
            steps.append({'array': a[:], 'comparing': [j, high], 'swapping': [], 'pivot': high, 'sorted': list(sorted_indices)})
            if a[j] < pivot:
                i += 1
                a[i], a[j] = a[j], a[i]
                steps.append({'array': a[:], 'comparing': [i, j], 'swapping': [i, j], 'pivot': high, 'sorted': list(sorted_indices)})
        a[i+1], a[high] = a[high], a[i+1]
        steps.append({'array': a[:], 'comparing': [i+1, high], 'swapping': [i+1, high], 'pivot': high, 'sorted': list(sorted_indices)})
        return i+1
    _quick_sort(0, n-1)
    steps.append({'array': a[:], 'comparing': [], 'swapping': [], 'pivot': None, 'sorted': list(range(n))})
    return steps 