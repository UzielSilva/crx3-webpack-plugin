# Crx3 Builder for webpack
A webpack plugin to package chrome extensions (crx) post build

## Usage

``` javascript
var Crx3 = require("crx3-webpack-plugin");
module.exports = {
	plugins: [
		new Crx3({
			keyFile: 'key.pem',
			contentPath: 'build',
			outputPath: 'dist',
			name: 'chrome-ext'
		})
	]
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
