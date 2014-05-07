class <%= obj_name %>

  constructor: ->

# Expose object to the global namespace.
root = if typeof exports is 'object' then exports else this
root.<%= obj_name %> = <%= obj_name %>
