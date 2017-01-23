# require the things
require 'rest-client'
require 'json'
require 'pp'


# get distinct fingerprints from api
url = 'http://dev.keele.me/fingers/api/distinct'
# get user fingerprints from api, set will be distinct
# url = 'http://dev.keele.me/fingers/api/fingers/mkeele'

# make GET request to api and parse JSON string to array
rest_res = RestClient.get(url)
json_res = JSON.parse(rest_res)


## Data Structures

# n, number of items in the set
n = json_res.count
test_n = 11
# f, number of features we are examining
f = 8
test_f = 9
# boolean to add to test set
test = false
test_user = ''

# all data, number of fingerprints X number of features
train = Array.new(n) { Array.new(f) }

# test data, subset of 5 users from train set
test_unique = Array.new(test_n) { Array.new(test_f) }
test_uniform = Array.new(test_n) { Array.new(test_f) }

# array of feature strings
user_agent = []
language = []
color_depth = []
resolution = []
timezone_offset = []
navigator_platform = []
regular_plugins = []
js_fonts = []

# frequency of each feature type in set
ua_freq = Hash.new(0)
lang_freq = Hash.new(0)
color_freq = Hash.new(0)
res_freq = Hash.new(0)
time_freq = Hash.new(0)
nav_freq = Hash.new(0)
plugins_freq = Hash.new(0)
fonts_freq = Hash.new(0)

# uniform fingerprints
uniform = []

# array of probabilities for each feature
probs = []

# entropy from each fingerprint
entropy = []


puts "#{n} distinct fingerprints in set"
puts "\n"


i = 0
j = 0
# each response
json_res.each do |fp|
  # each fingerprint
  fp.each do |key, value|
    if key == 'components'
      value.each do |comp|
        if comp["key"] == 'user_agent'
          # string
          train[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
          user_agent.push(comp["value"].gsub(/\s+/, "").strip)
        end
        if comp["key"] == 'language'
          # string
          train[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
          language.push(comp["value"].gsub(/\s+/, "").strip)
        end
        if comp["key"] == 'color_depth'
          # integer
          train[i][j] = comp["value"].to_s.strip
          j += 1
          color_depth.push(comp["value"].to_s.strip)
        end
        if comp["key"] == 'resolution'
          # array
          train[i][j] = comp["value"].join('').strip
          j += 1
          resolution.push(comp["value"].join('').strip)
        end
        if comp["key"] == 'timezone_offset'
          # integer
          train[i][j] = comp["value"].to_s.strip
          j += 1
          timezone_offset.push(comp["value"].to_s.strip)
        end
        if comp["key"] == 'navigator_platform'
          # string
          train[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
          navigator_platform.push(comp["value"].gsub(/\s+/, "").strip)
        end
        if comp["key"] == 'regular_plugins'
          # array
          train[i][j] = comp["value"].sort.join('').gsub(/\s+/, "").strip
          j += 1
          regular_plugins.push(comp["value"].sort.join('').gsub(/\s+/, "").strip)
        end
        if comp["key"] == 'js_fonts'
          # array
          train[i][j] = comp["value"].sort.join('').gsub(/\s+/, "").strip
          j += 1
          js_fonts.push(comp["value"].sort.join('').gsub(/\s+/, "").strip)
        end
      end
    end
  end # end fingerprint
  i += 1
  j = 0
end # end response


i = 0
j = 0
# each response
json_res.each do |fp|
  # each fingerprint
  fp.each do |key, value|
    if key == 'username' and (value == 'mkeele' or value =='blenderhead' or
       value == 'naito' or value =='bolaptop' or value == 'loobell')
         test_user = value
    end

    if !test_user.empty? and key == 'components'
      test_unique[i][j] = test_user
      j += 1
      value.each do |comp|
        if comp["key"] == 'user_agent'
          # string
          test_unique[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
        end
        if comp["key"] == 'language'
          # string
          test_unique[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
        end
        if comp["key"] == 'color_depth'
          # integer
          test_unique[i][j] = comp["value"].to_s.strip
          j += 1
        end
        if comp["key"] == 'resolution'
          # array
          test_unique[i][j] = comp["value"].join('').strip
          j += 1
        end
        if comp["key"] == 'timezone_offset'
          # integer
          test_unique[i][j] = comp["value"].to_s.strip
          j += 1
        end
        if comp["key"] == 'navigator_platform'
          # string
          test_unique[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
        end
        if comp["key"] == 'regular_plugins'
          # array
          test_unique[i][j] = comp["value"].sort.join('').gsub(/\s+/, "").strip
          j += 1
        end
        if comp["key"] == 'js_fonts'
          # array
          test_unique[i][j] = comp["value"].sort.join('').gsub(/\s+/, "").strip
          j += 1
        end
      end
      i += 1
    end
  end # end fingerprint
  j = 0
  test_user = ''
end # end response

puts 'unique test users'
puts test_unique
puts "\n"

i = 0
j = 0
while i < train.length
  while j < train.length
    if i != j and train[i] == train[j]
      uniform.push(i)
    end
    j += 1
  end
  i += 1
  j = 0
end

puts 'fingerprint: uniform in set / total in set'
puts 'uniform fp: ' + uniform.count.to_s + ' / ' + train.count.to_s
puts 'uniform fp number: ' + uniform.join(' ')
puts "\n"


puts 'feature: unique in set / total in set'
puts 'user_agent: ' + user_agent.uniq.count.to_s + ' / ' + user_agent.count.to_s
puts 'language: ' + language.uniq.count.to_s + ' / ' + language.count.to_s
puts 'color_depth: ' + color_depth.uniq.count.to_s + ' / ' + color_depth.count.to_s
puts 'resolution: ' + resolution.uniq.count.to_s + ' / ' + resolution.count.to_s
puts 'timezone: ' + timezone_offset.uniq.count.to_s + ' / ' + timezone_offset.count.to_s
puts 'platform: ' + navigator_platform.uniq.count.to_s + ' / ' + navigator_platform.count.to_s
puts 'plugins: ' + regular_plugins.uniq.count.to_s + ' / ' + regular_plugins.count.to_s
puts 'fonts: ' + js_fonts.uniq.count.to_s + ' / ' + js_fonts.count.to_s
puts "\n"


user_agent.each{|ua| ua_freq[ua] += 1}
language.each{|lang| lang_freq[lang] += 1}
color_depth.each{|color| color_freq[color] += 1}
resolution.each{|res| res_freq[res] += 1}
timezone_offset.each{|time| time_freq[time] += 1}
navigator_platform.each{|nav| nav_freq[nav] += 1}
regular_plugins.each{|plugins| plugins_freq[plugins] += 1}
js_fonts.each{|fonts| fonts_freq[fonts] += 1}

# pp ua_freq
# pp lang_freq
# pp color_freq
# pp res_freq
# pp time_freq
# pp nav_freq
# pp plugins_freq
# pp fonts_freq

# puts 'Max frequency feature, number of occurrences'
pp ua_freq.max_by{|k,v| v}
pp lang_freq.max_by{|k,v| v}
pp color_freq.max_by{|k,v| v}
pp res_freq.max_by{|k,v| v}
pp time_freq.max_by{|k,v| v}
pp nav_freq.max_by{|k,v| v}
pp plugins_freq.max_by{|k,v| v}
pp fonts_freq.max_by{|k,v| v}
puts "\n"

i = 0
j = 0

while i < test_n
  while j < test_f
    if j == 0
      test_uniform[i][j] = test_unique[i][j]
    end
    if j == 1
      test_uniform[i][j] = ua_freq.max_by{|k,v| v}[0]
    end
    if j == 2
      test_uniform[i][j] = lang_freq.max_by{|k,v| v}[0]
    end
    if j == 3
      test_uniform[i][j] = color_freq.max_by{|k,v| v}[0]
    end
    if j == 4
      test_uniform[i][j] = res_freq.max_by{|k,v| v}[0]
    end
    if j == 5
      test_uniform[i][j] = time_freq.max_by{|k,v| v}[0]
    end
    if j == 6
      test_uniform[i][j] = nav_freq.max_by{|k,v| v}[0]
    end
    if j == 7
      test_uniform[i][j] = plugins_freq.max_by{|k,v| v}[0]
    end
    if j == 8
      test_uniform[i][j] = fonts_freq.max_by{|k,v| v}[0]
    end
    j += 1
  end
  i += 1
  j = 0
end

puts 'uniform test users'
puts test_uniform
puts "\n"

# post homogenization
uniform = [0,1,2,3,4,5,6,7,8,9,10]
puts 'probability distribution for each fingerprint'
for i in 0..(n - 1)
  if uniform.include? i
    probs[i] = (uniform.count * 1.0)/27
  else
    probs[i] = 1.0/27
  end

  puts "fp-> #{i} probability-> #{probs[i]}"
end


set_prob = probs.inject(0){|sum, x| sum + x }

puts "\n"
puts "Set probability #{set_prob}"
puts "\n"

puts 'entropy from each fingerprint'
for i in 0..(n - 1)
  if probs[i] != 0
    entropy[i] = -1 * (probs[i] * Math.log2(probs[i]))
  else
    entropy[i] = 0
  end

  puts "fp-> #{i} entropy-> #{entropy[i]}"
end


set_entropy = entropy.inject(0){|sum, x| sum + x }

puts "\n"
puts "Set entropy #{set_entropy}"
puts "\n"
