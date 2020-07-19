# El Tag

<p align="center">
  <img src="logo-small.png" alt="El Tag Logo" width="150" />
</p>


![banner]()

![badge]()
![badge]()
[![license](https://img.shields.io/github/license/:user/:repo.svg)](LICENSE)

Handy utility to create DOM elements using Tagged Template Literals and retrieving references. Have been writting using Typescript and it's unit testing use AVA test runner.
 

## Table of Contents

- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Security

### Any optional sections

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