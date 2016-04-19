puts 'unique data'
p1_u = 25.0/27
p1_s = 2.0/27

c1_u = 11.0/11
c1_s = 0.0/11

c2_u = 14.0/16
c2_s = 2.0/16

p1 = (-1 * (p1_u * Math.log2(p1_u)) + -1 * (p1_s * Math.log2(p1_s)))
puts "p1: #{p1}"

# c1 = (-1 * (c1_u * Math.log2(c1_u)) + -1 * (c1_s * Math.log2(c1_s)))
c1 = -1 * (c1_u * Math.log2(c1_u)) + -0
puts "c1: #{c1}"

c2 = (-1 * (c2_u * Math.log2(c2_u)) + -1 * (c2_s * Math.log2(c2_s)))
puts "c2: #{c2}"

c1_e = 11.0/27 * c1
puts "c1_e: #{c1_e}"

c2_e = 16.0/27 * c2
puts "c2_e: #{c2_e}"

c_e_ave = c1_e + c2_e
puts "c_e_ave: #{c_e_ave}"

ig = p1 - c_e_ave
puts "ig: #{ig}"
puts "\n"

puts 'uniform data'
p1_u = 14.0/27
p1_s = 13.0/27

c1_u = 0.0/11
c1_s = 11.0/11

c2_u = 14.0/16
c2_s = 2.0/16

p1 = (-1 * (p1_u * Math.log2(p1_u)) + -1 * (p1_s * Math.log2(p1_s)))
puts "p1: #{p1}"

# c1 = (-1 * (c1_u * Math.log2(c1_u)) + -1 * (c1_s * Math.log2(c1_s)))
c1 = -1 * (c1_s * Math.log2(c1_s)) + -0
puts "c1: #{c1}"

c2 = (-1 * (c2_u * Math.log2(c2_u)) + -1 * (c2_s * Math.log2(c2_s)))
puts "c2: #{c2}"

c1_e = 11.0/27 * c1
puts "c1_e: #{c1_e}"

c2_e = 16.0/27 * c2
puts "c2_e: #{c2_e}"

c_e_ave = c1_e + c2_e
puts "c_e_ave: #{c_e_ave}"

ig = p1 - c_e_ave
puts "ig: #{ig}"
