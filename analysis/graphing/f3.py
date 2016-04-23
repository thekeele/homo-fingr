import numpy as np
import matplotlib.pyplot as plt

# width of each bar
width = 0.1

# user agent
ua_x = np.array([3.17])
ua_y = np.array([19])
ua = plt.subplot()
ua.bar(ua_x, ua_y, width=width, color='r', label='UserAgent')

# lang
lang_x = np.array([0.17])
lang_y = np.array([89])
lang = plt.subplot()
lang.bar(lang_x, lang_y, width=width, color='b', label='Language')

# color
color_x = np.array([0.36])
color_y = np.array([93])
color = plt.subplot()
color.bar(color_x, color_y, width=width, color='g', label='Color Depth')

# res
res_x = np.array([1.75])
res_y = np.array([59])
res = plt.subplot()
res.bar(res_x, res_y, width=width, color='c', label='Resolution')

# time
time_x = np.array([0.36])
time_y = np.array([89])
time = plt.subplot()
time.bar(time_x, time_y, width=width, color='m', label='Timezone')

# plat
plat_x = np.array([1.59])
plat_y = np.array([82])
plat = plt.subplot()
plat.bar(plat_x, plat_y, width=width, color='y', label='Platform')

# plug
plug_x = np.array([1.59])
plug_y = np.array([59])
plug = plt.subplot()
plug.bar(plug_x, plug_y, width=width, color='k', label='Plugins')

# font
font_x = np.array([2.75])
font_y = np.array([41])
font = plt.subplot()
font.bar(font_x, font_y, width=width, color='w', label='Fonts')

# x start - x end, y start - y end
plt.axis([0, 4, 1, 100])

# labels
plt.title('Feature Weight')
plt.xlabel('Surprisal (bits)')
plt.ylabel('Uniformity Percentage')

plt.legend(loc='upper right')

# add grid to background
plt.grid(True)

# draw graph
plt.show()
