from .bubble import bubble_sort
from .insertion import insertion_sort
from .selection import selection_sort
from .heap import heap_sort
from .quick import quick_sort
from .radix import radix_sort
from .counting import counting_sort
from .bucket import bucket_sort
from .merge import merge_sort

def get_algorithm(name):
    algos = {
        'bubble': bubble_sort,
        'insertion': insertion_sort,
        'selection': selection_sort,
        'heap': heap_sort,
        'quick': quick_sort,
        'radix': radix_sort,
        'counting': counting_sort,
        'bucket': bucket_sort,
        'merge': merge_sort,
    }
    return algos.get(name) 