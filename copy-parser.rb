require 'json'

file_names = Dir['copy/*.json']
lang = {}

file_names.each do |file_name|
  object = JSON.parse(File.read(file_name))
  lang[object.keys[0]] = object
end

puts lang

# turn puts to logger.warn
def copy(key, locals)
  locale = 'en' # this will be dynamic from the session etc
  value = lang[locale][key]

  unless value
    puts "Copy not found, unknown key #{key}"
    return
  end

  if value.is_a? Array
    if value[0].expression
      if !locals
        # defaultObject = _.find(value, { expression: 'true' });
        return compileString(default_object.value)
      end

      # targetObject = _.find(value, function(el) {
      #   return parseExpression(el.expression) === true;
      # });

      if !target_object
        # defaultObject = _.find(value, { expression: 'true' });
        if default_object
          return compileString(default_object.value)
        end

        return ''
      end

      return compileString(target_object.value) # (locals)
    end

    puts "Array without expression requested for copy key: #{key}"
    return ""
  elsif value.is_a? Object
    # write this logic
  end

  def parseExpression(target)
    # class eval here
  end

  def compileString(target)
    # Mustache compile here
  end
end
