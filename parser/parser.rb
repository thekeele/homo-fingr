require 'rest-client'
require 'json'

url = 'http://dev.keele.me/fingers/api/fingers'
response = RestClient.get(url)
res = JSON.parse(response)

# all data
# train = [[]]
train = Array.new(48) { Array.new(8) }
# data by feature
user_agent = []
language = []
color_depth = []
resolution = []
timezone_offset = []
navigator_platform = []
regular_plugins = []
js_fonts = []

i = 0
j = 0
res.each do |fp|
  fp.each do |key, value|
    if key == 'username'
      # puts value
    end

    if key == 'components'
      value.each do |comp|
        if comp["key"] == 'user_agent'
          # string
          # puts comp["value"].gsub(/\s+/, "").strip
          train[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
          user_agent.push(comp["value"].gsub(/\s+/, "").strip)
        end
        if comp["key"] == 'language'
          # string
          # puts comp["value"].gsub(/\s+/, "").strip
          train[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
          language.push(comp["value"].gsub(/\s+/, "").strip)
        end
        if comp["key"] == 'color_depth'
          # integer
          # puts comp["value"].to_s.strip
          train[i][j] = comp["value"].to_s.strip
          j += 1
          color_depth.push(comp["value"].to_s.strip)
        end
        if comp["key"] == 'resolution'
          # array
          # puts comp["value"].join('').strip
          train[i][j] = comp["value"].join('').strip
          j += 1
          resolution.push(comp["value"].join('').strip)
        end
        if comp["key"] == 'timezone_offset'
          # integer
          # puts comp["value"].to_s.strip
          train[i][j] = comp["value"].to_s.strip
          j += 1
          timezone_offset.push(comp["value"].to_s.strip)
        end
        if comp["key"] == 'navigator_platform'
          # string
          # puts comp["value"].gsub(/\s+/, "").strip
          train[i][j] = comp["value"].gsub(/\s+/, "").strip
          j += 1
          navigator_platform.push(comp["value"].gsub(/\s+/, "").strip)
        end
        if comp["key"] == 'regular_plugins'
          # array
          # puts comp["value"].sort.join('').gsub(/\s+/, "").strip
          train[i][j] = comp["value"].sort.join('').gsub(/\s+/, "").strip
          j += 1
          regular_plugins.push(comp["value"].sort.join('').gsub(/\s+/, "").strip)
        end
        if comp["key"] == 'js_fonts'
          # array
          # puts comp["value"].sort.join('').gsub(/\s+/, "").strip
          train[i][j] = comp["value"].sort.join('').gsub(/\s+/, "").strip
          j += 1
          js_fonts.push(comp["value"].sort.join('').gsub(/\s+/, "").strip)
        end
      end
    end
  end
  i += 1
  j = 0
end

puts train.length
i = 0
j = 0
same = 0
while i < train.length
  while j < train.length
    if i != j and train[i] == train[j]
      puts "HERE"
      puts i
      puts j
      puts train[i]
      puts train[j]
      same += 1
    end
    j += 1
  end
  i += 1
  j = 0
end
puts same

puts 'feature: unique in set / total in set'
puts 'user_agent: ' + user_agent.uniq.count.to_s + ' / ' + user_agent.count.to_s
puts 'language: ' + language.uniq.count.to_s + ' / ' + language.count.to_s
puts 'color_depth: ' + color_depth.uniq.count.to_s + ' / ' + color_depth.count.to_s
puts 'resolution: ' + resolution.uniq.count.to_s + ' / ' + resolution.count.to_s
puts 'timezone: ' + timezone_offset.uniq.count.to_s + ' / ' + timezone_offset.count.to_s
puts 'platform: ' + navigator_platform.uniq.count.to_s + ' / ' + navigator_platform.count.to_s
puts 'plugins: ' + regular_plugins.uniq.count.to_s + ' / ' + regular_plugins.count.to_s
puts 'fonts: ' + js_fonts.uniq.count.to_s + ' / ' + js_fonts.count.to_s
