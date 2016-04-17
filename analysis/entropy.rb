probs = []
n = 27

for i in 0..(n - 1)
  if i == (3 - 1)
    probs[i] = 2.0/27
  elsif i == (6 - 1)
    probs[i] = 0.0/27
  else
    probs[i] = 1.0/27
  end

  puts "fp-> #{i} probability-> #{probs[i]}"
end

set_prob = probs.inject(0){|sum, x| sum + x }

puts "\n"
puts "Set probability #{set_prob}"
puts "\n"

information = []

for i in 0..(n - 1)
  if probs[i] != 0
    information[i] = (1 * probs[i]) * Math.log2(1.0/probs[i])
    puts "fp-> #{i} information-> #{information[i]}"
  else
    information[i] = 0
  end

  puts "fp-> #{i} information-> #{information[i]}"
end

set_info = information.inject(0){|sum, x| sum + x }

puts "\n"
puts "Set information #{set_info}"
puts "\n"

entropy = []

for i in 0..(n - 1)
  entropy[i] = information[i] / set_info
  puts "fp-> #{i} entropy-> #{entropy[i]}"
end
