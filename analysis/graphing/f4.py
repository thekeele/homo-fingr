import numpy as np
import matplotlib.pyplot as plt

x = np.array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27])
y = np.array([11,11,11,11,11,11,11,11,11,11,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])

# x values, y values
line = plt.plot(x, y)
# line properties
plt.setp(line, color='r', lw=4.0, marker='o', mfc='b', ms=6.0, alpha=0.5)

# x start - x end, y start - y end
plt.axis([1, 27, 0, 12])

# labels
plt.title('Set Uniformity')
plt.xlabel('Distinct Fingerprints (n = 27)')
plt.ylabel('Anonymity Set Size (m = 11)')

# add grid to background
plt.grid(True)

# draw graph
plt.show()
