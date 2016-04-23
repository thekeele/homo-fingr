import numpy as np
import matplotlib.pyplot as plt

# width of each bar
width = 0.5

# uniform users
x = np.array([3])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='c', label='naito')

x = np.array([16])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='c')

x = np.array([11])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='k', label='bolaptop')

x = np.array([12])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='g', label='blenderhead')

x = np.array([13])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='g')

x = np.array([18])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='g')

x = np.array([23])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='m', label='mkeele')

x = np.array([24])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='m')

x = np.array([25])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='m')

x = np.array([26])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='m')

x = np.array([27])
y = np.array([0.53])
ax = plt.subplot()
ax.bar(x, y, width=width, color='y', label='loobell')

# unique users
x = np.array([1])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b', label='Unique')

x = np.array([2])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([4])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([5])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([6])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([7])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([8])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([9])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([10])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([14])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([15])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([17])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([19])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([20])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([21])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

x = np.array([22])
y = np.array([0.18])
ax = plt.subplot()
ax.bar(x, y, width=width, color='b')

# x start - x end, y start - y end
plt.axis([0, 28, 0, 0.9])

# labels
plt.title('Set Entropy (H = 8.63)')
plt.xlabel('Distinct Users (n = 27)')
plt.ylabel('Entropy (bits)')

plt.legend(loc='upper right')

# add grid to background
plt.grid(True)

# draw graph
plt.show()
