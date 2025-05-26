def insertion_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    for i in range(1, n):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            steps.append({
                'array': a[:],
                'comparing': [j, j+1],
                'swapping': [j, j+1],
                'sorted': list(range(i))
            })
            a[j+1] = a[j]
            j -= 1
        a[j+1] = key
        steps.append({
            'array': a[:],
            'comparing': [j+1],
            'swapping': [],
            'sorted': list(range(i+1))
        })
    steps.append({
        'array': a[:],
        'comparing': [],
        'swapping': [],
        'sorted': list(range(n))
    })
    return steps 