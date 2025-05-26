def merge_sort(arr):
    steps = []
    a = arr[:]
    n = len(a)
    def _merge_sort(l, r):
        if l < r:
            m = (l + r) // 2
            _merge_sort(l, m)
            _merge_sort(m+1, r)
            merge(l, m, r)
    def merge(l, m, r):
        left = a[l:m+1]
        right = a[m+1:r+1]
        i = j = 0
        k = l
        while i < len(left) and j < len(right):
            steps.append({'array': a[:], 'comparing': [k], 'swapping': [], 'sorted': []})
            if left[i] <= right[j]:
                a[k] = left[i]
                i += 1
            else:
                a[k] = right[j]
                j += 1
            k += 1
        while i < len(left):
            a[k] = left[i]
            i += 1
            k += 1
        while j < len(right):
            a[k] = right[j]
            j += 1
            k += 1
        steps.append({'array': a[:], 'comparing': [], 'swapping': [], 'sorted': list(range(l, r+1))})
    _merge_sort(0, n-1)
    steps.append({'array': a[:], 'comparing': [], 'swapping': [], 'sorted': list(range(n))})
    return steps 