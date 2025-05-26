def selection_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            steps.append({
                'array': a[:],
                'comparing': [min_idx, j],
                'swapping': [],
                'sorted': list(range(i))
            })
            if a[j] < a[min_idx]:
                min_idx = j
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
            steps.append({
                'array': a[:],
                'comparing': [i, min_idx],
                'swapping': [i, min_idx],
                'sorted': list(range(i+1))
            })
        else:
            steps.append({
                'array': a[:],
                'comparing': [],
                'swapping': [],
                'sorted': list(range(i+1))
            })
    return steps 