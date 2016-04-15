require 'rest-client'
require 'json'

# get distinct fingerprints from db
url = 'http://dev.keele.me/fingers/api/distinct'
# get user fingerprints from db
# url = 'http://dev.keele.me/fingers/api/fingers/mkeele'

response = RestClient.get(url)
res = JSON.parse(response)

# all data
train = Array.new(res.count) { Array.new(8) }

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
# each response
res.each do |fp|
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
uniform = []
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
