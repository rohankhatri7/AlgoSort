def counting_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    if n == 0:
        return steps
    max_val = max(a)
    min_val = min(a)
    range_of_elements = max_val - min_val + 1
    count = [0] * range_of_elements
    output = [0] * n
    for i in range(n):
        count[a[i] - min_val] += 1
        steps.append({'array': a[:], 'comparing': [i], 'swapping': [], 'sorted': []})
    for i in range(1, len(count)):
        count[i] += count[i-1]
    for i in range(n-1, -1, -1):
        output[count[a[i] - min_val] - 1] = a[i]
        count[a[i] - min_val] -= 1
    for i in range(n):
        a[i] = output[i]
        steps.append({'array': a[:], 'comparing': [i], 'swapping': [], 'sorted': []})
    steps.append({'array': a[:], 'comparing': [], 'swapping': [], 'sorted': list(range(n))})
    return steps 