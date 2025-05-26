def radix_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    max1 = max(a) if a else 0
    exp = 1
    while max1 // exp > 0:
        output = [0] * n
        count = [0] * 10
        for i in range(n):
            index = (a[i] // exp) % 10
            count[index] += 1
            steps.append({'array': a[:], 'comparing': [i], 'swapping': [], 'sorted': []})
        for i in range(1, 10):
            count[i] += count[i-1]
        i = n - 1
        while i >= 0:
            index = (a[i] // exp) % 10
            output[count[index] - 1] = a[i]
            count[index] -= 1
            i -= 1
        for i in range(n):
            a[i] = output[i]
            steps.append({'array': a[:], 'comparing': [i], 'swapping': [], 'sorted': []})
        exp *= 10
    steps.append({'array': a[:], 'comparing': [], 'swapping': [], 'sorted': list(range(n))})
    return steps 