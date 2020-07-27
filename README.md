# El Tag

<p align="center">

  <img src="logo-small.png" alt="El Tag Logo" width="150" />
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

### Any optional sections

## Install

This module depends upon a knowledge of [Markdown]().

```

```

### Any optional sections

## Usage

```

```

Note: The `license` badge image link at the top of this file should be updated with the correct `:user` and `:repo`.

### Any optional sections

## API

### Any optional sections

## More optional sections

## Contributing

See [the contributing file](.github\CONTRIBUTING.md)!

PRs accepted.

### Any optional sections

## License

[MIT © Victor Cano.](LICENSE)

Template Library

```javascript
// Create a <b> DOM element
let [node1] = elTag()`<b>Hello World</b>`;

// Create nested elements, and extract references
let [node2, collection] = elTag()`
<div>
  <h1 ref="title">El Tag</h1>
  <p ref="body">Handy utility to create DOM elements using Tagged Template Literals and retrieving references.<p>

  ${node1}
</div>
`;

let { title, body } = collection;
document.body.appendChild(node2);

console.log(title, body);
```
