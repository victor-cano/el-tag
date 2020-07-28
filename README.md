# El Tag

<p align="center">

  <img src="logo-small.png" alt="El Tag Logo" style="max-width:100%;"/>
</p>


<p align="center">

  <a href="https://codecov.io/gh/victor-cano/el-tag" rel="nofollow">
    <img  alt="codecov"  src="https://codecov.io/gh/victor-cano/el-tag/branch/master/graph/badge.svg" style="max-width:100%;">
  </a>
  <a href="/victor-cano/el-tag/blob/master/LICENSE">
    <img   alt="license" src="https://img.shields.io/github/license/victor-cano/el-tag.svg" style="max-width:100%;">
  </a>
  <a target="_blank" rel="noopener noreferrer">
    <img   alt="GitHub repo size" src="https://img.shields.io/github/repo-size/victor-cano/el-tag" style="max-width:100%;">
  </a>  
</p>
 
Handy utility to create DOM elements using Tagged Template Literals and retrieving references. Have been writting using Typescript and it's unit testing use AVA test runner.


## Table of Contents

- [Background](#background)
- [Install](#Install)
- [Usage](#usage)
- [Acknowledgment](#Acknowledgment)
- [Contributing](#contributing)
- [License](#license)

## Background
 
Laziness :) / Querying for nested elements is boring. 


## Install

This package doesn't have dependencies.

**NPM**
```
$ npm install el-tag
```
**Yarn**
```
$ yarn install el-tag
```

This package exposes two module definitions:

- **CommonJS**: *build/main/index.js*
- **ES6 Module**: *build/browser/index.js*


### Any optional sections

## Usage

```javascript
import elTag from 'el-tag';

// Create a <h1> DOM element
let [node1] = elTag()`<h1>El Tag</h1>`;

// Create a nested elements and retrieve references
let [node2 ,node2References] = elTag()`<p>El Tag <span ref="arabic">(Arabic: التاج‎ at-Tāj; also Al-Tag, Al-Taj)</span> is a village and holy site in the Kufra Oasis, within the Libyan Desert subregion of the Sahara.</p><p>It is in the Kufra District in the southern Cyrenaica region of southeastern Libya. The Arabic el tag translates as <span ref="translation">"crown"</span> in English, and derives from the position above the Kufra basin.</p>
<a ref="wiki" href="https://en.wikipedia.org/wiki/El_Tag">wikipedia</a>
`;

// Create nested elements using other elements
let [node3, collection] = elTag()`<div>
  ${node1}
  ${node2}
</div>`;

document.body.appendChild(node3);

console.log(node2References.arabic, node2References.translation, node2References.wiki);
```

## Acknowledgment 

Originally I was looking for a package/library that does the same thing as ElTag, I found [Facon library](https://github.com/terkelg/facon), but after reviewing it I found some differences between the description of the library and how it really works. The usage says that Facon "Construct and returns a DOM element" and this is wrong, it actually constructs and returns a [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) which has some pros and cons.

So as an exercise, I have ported Facon to Typescript and customize it to my needs and I have also learned a little bit about of Ava, Typescript, Typedoc, Codecov, CircleCi, Npm Packages.


## Contributing

See [the contributing file](.github\CONTRIBUTING.md)!

PRs accepted.

### Any optional sections

## License

[MIT © Victor Cano.](LICENSE)

Template Library


