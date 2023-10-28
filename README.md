# qwik-blurhash

[![NPM Version](https://img.shields.io/npm/v/qwik-blurhash.svg?style=flat)](https://www.npmjs.com/package/qwik-blurhash)
[![NPM Downloads](https://img.shields.io/npm/dm/qwik-blurhash.svg?style=flat)](https://npmcharts.com/compare/qwik-blurhash?minimal=true)

> Qwik components for using the [blurhash algorithm](https://blurha.sh) in your Qwik projects

[Demo](https://woltapp.github.io/react-blurhash/)

## Install

```sh
npm install --save blurhash qwik-blurhash
```

## Usage

### `<Blurhash />`

```js
import { Blurhash } from "qwik-blurhash";
```

### Description

`Blurhash` component is the recommended way to render blurhashes in your Qwik projects.
It uses `BlurhashCanvas` and a wrapping `div` to scale the decoded image to your desired size. You may control the quality of the decoded image with `resolutionX` and `resolutionY` props.

#### Props

| name                              | description                                                                                                                                                                  |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `hash` (string)                   | The encoded blurhash string.                                                                                                                                                 |
| `width` (int \| string)           | Width (CSS) of the decoded image.                                                                                                                                            |
| `height` (int \| string)          | Height (CSS) of the decoded image.                                                                                                                                           |
| `resolutionX` (int)               | The X-axis resolution in which the decoded image will be rendered at. Recommended min. 32px. Large sizes (>128px) will greatly decrease rendering performance. (Default: 32) |
| `resolutionY` (int)               | The Y-axis resolution in which the decoded image will be rendered at. Recommended min. 32px. Large sizes (>128px) will greatly decrease rendering performance. (Default: 32) |
| `punch` (int)                     | Controls the "punch" value (~contrast) of the blurhash decoding algorithm. (Default: 1)                                                                                      |
| `strategy` (VisibleTaskStrategy)  | The strategy to use to determine when the "VisibleTask" should first execute.                                                                                                                                                     |


#### Example

```jsx
<Blurhash
  hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
  width={400}
  height={300}
  resolutionX={32}
  resolutionY={32}
  punch={1}
/>
```

### `<BlurhashCanvas />`

```js
import { BlurhashCanvas } from "qwik-blurhash";
```

### Description

`BlurhashCanvas` is the barebones implementation of a blurhash string to a canvas. You may want to use it instead of the `Blurhash` component e.g. if you want to control the scaling yourself.

#### Props

| name            | description                                                                             |
| --------------- | --------------------------------------------------------------------------------------- |
| `hash` (string) | The encoded blurhash string.                                                            |
| `width` (int)   | Width of the decoded image.                                                             |
| `height` (int)  | Height of the decoded image.                                                            |
| `punch` (int)   | Controls the "punch" value (~contrast) of the blurhash decoding algorithm. (Default: 1) |

#### Example

```jsx
<BlurhashCanvas hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" width={400} height={300} punch={1} />
```

#### VisibleTaskStrategy
`useVisibleTask$` hook has been used to decode the blurhash string and render the canvas.

| value                   | description                                                                                                                     |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `intersection-observer` | the task will first execute when the element is visible in the viewport, under the hood it uses the IntersectionObserver API.   |
| `document-ready`        | document-ready: the task will first execute when the document is ready, under the hood it uses the document load event.         |
| `document-idle`         | document-idle: the task will first execute when the document is idle, under the hood it uses the requestIdleCallback API.       |

#### TODO:
- [ ] Consider using the `worker$` (currently experimental) to decode the blurhash string.

## Browser support

Blurhash depends on `Uint8ClampedArray`, which is supported on all mainstream browsers and >=IE11.
