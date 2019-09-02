# This creates a file with coordinates to sketch using Fourier Transform
# In order to use this, you've got to collect a set of coordinates which
# can be obtained by clicks in the following page:
# https://www.mobilefish.com/services/record_mouse_coordinates/record_mouse_coordinates.php
#collect the data file, and feed into this file. and you're drawing will be sketched!!


import pandas
from matplotlib import pyplot

def main():
	data = open("data", mode="r")
	filename = "musical_note.js"
	outsample = open(filename, mode="w")
	outsample.write("let drawing = [ \n")
	for line in data:
		line = line.split(",")
		x = float(line[0])
		y = float(line[1].replace("\n", " "))
		outsample.write("{x: %f, y: %f }, \n"%(x, y))
	outsample.write("] ;")
	outsample.close()
	data.close()
	
if __name__ == '__main__':
	main()