# vscode-css-tractor

![VS Code CSS tractor demo](src/assets/demo.gif?raw=true)

Extracting selectors from HTML and generate CSS file.

[hudochenkov/ecsstractor](https://github.com/hudochenkov/ecsstractor) of VS Code version.

## Usage

Open any HTML file and do the following:

1. Open the command palette
    - Press `Cmd + Shift + P` on macOS or `Ctrl + Shift + P` on Windows / Linux
    - Go to `View` → `Command Palette`
1. Typing the `Run: CSS tractor` and select

Then will see new tab with CSS selectors extracted from HTML file.

## Example

Source:

```html
<ul id="test-list" class="list">
  <li class="list-item">Test 1</li>
  <li class="list-item">Test 2</li>
  <li class="list-item">Test 3</li>
  <li class="list-item">Test 4</li>
  <li class="list-item">Test 5</li>
</ul>
```

Run CSS tractor:

```css
#test-list {
}
.list {
}
.list-item {
}
```

## Installation

In VS Code window:

1. Open the extensions
    - Press `Cmd + Shift + X` on macOS or `Ctrl + Shift + X` on Windows / Linux
    - Go to `View` → `Extensions`
1. Typing the `css-tractor` in input form and select `Install` on `CSS tractor`
