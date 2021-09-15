# eCSStractor for VS Code

[![CircleCI](https://circleci.com/gh/kubosho/vscode-ecsstractor.svg?style=svg)](https://circleci.com/gh/kubosho/vscode-ecsstractor)

![eCSStractor demo](src/assets/demo.gif?raw=true)

Extracting selectors from HTML / JSX / TSX and generate CSS file.

[hudochenkov/ecsstractor](https://github.com/hudochenkov/ecsstractor) of VS Code version.

## Usage

Open any HTML file and do the following:

1. Open the command palette
    - Press `Cmd + Shift + P` on macOS or `Ctrl + Shift + P` on Windows / Linux
    - Go to `View` → `Command Palette`
1. Typing the `Run: eCSStractor` and select

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

Run eCSStractor:

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
    - Press `Cmd + Shift + P` on macOS or `Ctrl + Shift + P` on Windows / Linux
    - Go to `View` → `Extensions`
1. Typing the `ecsstractor` in input form and select `Install` on `eCSStractor`
