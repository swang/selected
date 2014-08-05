# selected
A library to figure out what text is selected in the browser

# install

```
npm install selected
```

# example

```html
<html>
<head>
  <script src="./selecto.js"></script>
</head>
<body>
  <p class="hey">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue lacus, fermentum non dictum luctus, egestas vitae urna. Etiam ipsum orci, ullamcorper et pellentesque nec, auctor ac erat. Sed mollis sem at dui tincidunt rutrum. Cras in erat gravida, pretium diam non, rhoncus risus. Fusce purus lacus, fermentum sed quam eget, luctus feugiat nisl. Mauris laoreet pellentesque est sit amet vehicula. Nulla feugiat commodo lobortis. Praesent ligula mi, rhoncus ac quam vel, consectetur laoreet neque. Donec varius in sem at pellentesque. Nulla nec suscipit nisl. Fusce luctus diam eget dapibus porta. Donec semper porttitor lobortis. In fringilla convallis nunc ac tincidunt. Proin faucibus sed sem vel tincidunt.</p>

  <p>Sed vehicula ullamcorper orci, vitae varius leo varius gravida. Sed turpis magna, porttitor sed urna vel, blandit placerat ipsum. Suspendisse ut urna vehicula, vestibulum lacus vitae, dignissim velit. Proin enim velit, porttitor ultricies elementum sit amet, laoreet non leo. Morbi tincidunt facilisis dui a rhoncus. Nunc molestie nisl vitae luctus imperdiet. Donec id velit nibh. Integer a metus sodales, egestas nisl vitae, pellentesque nulla. Maecenas aliquet iaculis dignissim.</p>
</body>
<script>
  var s = new Selecto(".hey");
  s.on("selected", function(res) {
    console.log("Selected text: ", res.text);
  })
</script>
</html>
```
# author
Shuan Wang

# license
ISC
