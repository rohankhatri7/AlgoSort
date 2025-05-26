def heap_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    def heapify(n, i):
        largest = i
        l = 2 * i + 1
        r = 2 * i + 2
        if l < n:
            steps.append({'array': a[:], 'comparing': [i, l], 'swapping': [], 'sorted': list(range(n, len(a)))})
            if a[l] > a[largest]:
                largest = l
        if r < n:
            steps.append({'array': a[:], 'comparing': [largest, r], 'swapping': [], 'sorted': list(range(n, len(a)))})
            if a[r] > a[largest]:
                largest = r
        if largest != i:
            a[i], a[largest] = a[largest], a[i]
            steps.append({'array': a[:], 'comparing': [i, largest], 'swapping': [i, largest], 'sorted': list(range(n, len(a)))})
            heapify(n, largest)
    for i in range(n//2-1, -1, -1):
        heapify(n, i)
    for i in range(n-1, 0, -1):
        a[i], a[0] = a[0], a[i]
        steps.append({'array': a[:], 'comparing': [0, i], 'swapping': [0, i], 'sorted': list(range(i, n))})
        heapify(i, 0)
    steps.append({'array': a[:], 'comparing': [], 'swapping': [], 'sorted': list(range(n))})
    return steps 