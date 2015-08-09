class <%= project.obj_name %>

  construct: ->


# Expose object to the global namespace.
if expose?
  expose <%= project.obj_name %>, '<%= project.obj_name %>'
else
  root = if typeof exports is 'object' then exports else this
  root.<%= project.obj_name %> = <%= project.obj_name %>
