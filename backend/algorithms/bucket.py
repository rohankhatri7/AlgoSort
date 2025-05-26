def bucket_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    if n == 0:
        return steps
    bucket_count = max(1, n // 5)
    min_val, max_val = min(a), max(a)
    bucket_range = (max_val - min_val + 1) / bucket_count
    buckets = [[] for _ in range(bucket_count)]
    for i in range(n):
        idx = int((a[i] - min_val) // bucket_range)
        if idx == bucket_count:
            idx -= 1
        buckets[idx].append(a[i])
        steps.append({'array': a[:], 'comparing': [i], 'swapping': [], 'sorted': []})
    idx = 0
    for b in buckets:
        b.sort()
        for v in b:
            a[idx] = v
            steps.append({'array': a[:], 'comparing': [idx], 'swapping': [], 'sorted': []})
            idx += 1
    steps.append({'array': a[:], 'comparing': [], 'swapping': [], 'sorted': list(range(n))})
    return steps 