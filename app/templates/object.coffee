class <%= _.classify(project_name) %>

  constructor: ->

# Expose object to the global namespace.
root = if typeof exports is 'object' then exports else this
root.<%= _.classify(project_name) %> = <%= _.classify(project_name) %>
