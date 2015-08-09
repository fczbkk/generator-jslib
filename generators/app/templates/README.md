# <%= project.name %>

<%= project.description %>

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](<%= github.project_url %>/issues) or send me an e-mail at [<%= author.email %>](mailto:<%= author.email %>).

<% if (license !== 'none') { %>
## License

<%= project.name %> is published under the [<%= license.type %> license](<%= github.project_url %>/blob/master/<%= license.filename %>).
<% } %>
