def bubble_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    sorted_indices = set()
    for i in range(n):
        for j in range(n - i - 1):
            steps.append({
                'array': a[:],
                'comparing': [j, j+1],
                'swapping': [],
                'sorted': list(sorted_indices)
            })
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
                steps.append({
                    'array': a[:],
                    'comparing': [j, j+1],
                    'swapping': [j, j+1],
                    'sorted': list(sorted_indices)
                })
        sorted_indices.add(n-i-1)
        steps.append({
            'array': a[:],
            'comparing': [],
            'swapping': [],
            'sorted': list(sorted_indices)
        })
    return steps 