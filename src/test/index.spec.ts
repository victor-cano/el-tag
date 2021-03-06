// tslint:disable:no-expression-statement
import test from 'ava';
import elTag from '../index.js';

const libraryName = 'elTag';

let parent = document.createElement('div');

const s = (el: Element) => {
  parent.innerHTML = '';
  parent.appendChild(el);
  return parent.innerHTML;
};

test(`${libraryName} : init `, (t) => {
  t.plan(1);

  t.is(typeof elTag, 'function', 'constructor is a typeof function');
});

test(`${libraryName} : create element`, (t) => {
  t.plan(4);

  const [node1] = elTag()`<div>Test</div>`;

  const [
    node2,
  ] = elTag()`<section><div><h1>Test Title</h1><p>Test Description</p></div></section>`;

  const [node3] = elTag()`Test`;

  const [
    node4,
  ] = elTag()`<h1>Test Title</h1><h1>Test Title</h1><h1>Test Title</h1>`;

  t.is(s(node1), '<div>Test</div>');
  t.is(
    s(node2),
    '<section><div><h1>Test Title</h1><p>Test Description</p></div></section>'
  );
  t.is(s(node3), '<div>Test</div>');
  t.is(
    s(node4),
    '<div><h1>Test Title</h1><h1>Test Title</h1><h1>Test Title</h1></div>'
  );
});

test(`${libraryName} : references `, (t) => {
  t.plan(2);

  const [node, ref] = elTag()`<div ref="test">Test</div>`;

  t.is('test' in ref, true);
  t.is(s(node), '<div>Test</div>');
});

test(`${libraryName} : array references  `, (t) => {
  t.plan(5);

  const [
    node,
    ref,
  ] = elTag()`<ul ref='list'><li ref='item'>0</li><li ref='item'>1</li><li ref='item'>2</li></ul>`;

  t.is('list' in ref, true);
  t.is('item' in ref, true);
  t.is(Array.isArray(ref.item), true);
  t.is(s(node), '<ul><li>0</li><li>1</li><li>2</li></ul>');
  t.is(
    (ref.item as [Element]).every(
      (x: Element, i: any) => s(x) === `<li>${i}</li>`
    ),
    true
  );
});

test(`${libraryName} : options: keepAttribute = true  `, (t) => {
  t.plan(5);

  const [node, ref] = elTag({
    keepAttribute: true,
  })`<ul ref='list'><li ref='item'>0</li><li ref='item'>1</li><li ref='item'>2</li></ul>`;

  t.is('list' in ref, true);
  t.is('item' in ref, true);
  t.is(Array.isArray(ref.item), true);
  t.is(
    s(node),
    '<ul ref="list"><li ref="item">0</li><li ref="item">1</li><li ref="item">2</li></ul>'
  );
  t.is(
    (ref.item as [Element]).every(
      (x: Element, i: any) => s(x) === `<li ref="item">${i}</li>`
    ),
    true
  );
});

test(`${libraryName} : options: custom attr`, (t) => {
  t.plan(10);

  const [node1, pointer1] = elTag({
    attr: 'pointer',
  })`<ul pointer='list'><li pointer='item'>0</li><li pointer='item'>1</li><li pointer='item'>2</li></ul>`;

  t.is('list' in pointer1, true);
  t.is('item' in pointer1, true);
  t.is(Array.isArray(pointer1.item), true);
  t.is(s(node1), '<ul><li>0</li><li>1</li><li>2</li></ul>');
  t.is(
    (pointer1.item as [Element]).every(
      (x: Element, i: any) => s(x) === `<li>${i}</li>`
    ),
    true
  );

  const [node2, pointer2] = elTag({
    attr: 'pointer',
    keepAttribute: true,
  })`<ul pointer='list'><li pointer='item'>0</li><li pointer='item'>1</li><li pointer='item'>2</li></ul>`;

  t.is('list' in pointer2, true);
  t.is('item' in pointer2, true);
  t.is(Array.isArray(pointer2.item), true);
  t.is(
    s(node2),
    '<ul pointer="list"><li pointer="item">0</li><li pointer="item">1</li><li pointer="item">2</li></ul>'
  );
  t.is(
    (pointer2.item as [Element]).every(
      (x: Element, i: any) => s(x) === `<li pointer="item">${i}</li>`
    ),
    true
  );
});

test(`${libraryName} : options: save to`, (t) => {
  t.plan(8);
  interface to {
    item?: Array<any>;
  }

  const to: to = {};
  const [node, ref] = elTag({
    to,
  })`<ul ref='list'><li ref='item'>0</li><li ref='item'>1</li><li ref='item'>2</li></ul>`;

  t.is('list' in ref, true);
  t.is('item' in ref, true);
  t.is('list' in to, true);
  t.is('item' in to, true);
  t.is(Array.isArray(ref.item), true);
  t.is(Array.isArray(to.item), true);
  t.is(s(node), '<ul><li>0</li><li>1</li><li>2</li></ul>');
  t.is(
    (ref.item as [Element]).every(
      (x: Element, i: any) => s(x) === `<li>${i}</li>`
    ),
    true
  );
});

test(`${libraryName} : apppend element`, (t) => {
  t.plan(3);

  const title = document.createElement('h1');
  title.innerHTML = 'Test Title 1';
  const [node1] = elTag()`<div>${title}</div>`;
  t.is(s(node1), '<div><h1>Test Title 1</h1></div>');

  const [node2] = elTag()`<section>${node1}</section>`;
  t.is(s(node2), '<section><div><h1>Test Title 1</h1></div></section>');

  const title2 = document.createElement('h1');
  title2.innerHTML = 'Test Title 2';
  const [node3] = elTag()`<div>${title2}</div>`;

  const [node4] = elTag()`<section>${node1}${node3}</section>`;
  t.is(
    s(node4),
    '<section><div><h1>Test Title 1</h1></div><div><h1>Test Title 2</h1></div></section>'
  );
});

test(`${libraryName} : apppend string`, (t) => {
  t.plan(1);

  const title = 'Test Title';
  const [node] = elTag()`<div><h1>${title}</h1></div>`;
  t.is(s(node), '<div><h1>Test Title</h1></div>');
});

test(`${libraryName} : apppend number`, (t) => {
  t.plan(1);

  const subtotal = 100;
  const discount = 8;
  const [
    node,
  ] = elTag()`<table><thead><tr><th colspan="2">Amount</th></tr></thead><tbody><tr><td>Sub Total</td><td>${subtotal}</td></tr><tr><td>Discount</td><td>${discount}</td></tr></tbody><tfoot><tr><th id="total" colspan="2">Total :</th><td>${
    subtotal - discount
  }</td></tr></tfoot></table>`;
  t.is(
    s(node),
    '<table><thead><tr><th colspan="2">Amount</th></tr></thead><tbody><tr><td>Sub Total</td><td>100</td></tr><tr><td>Discount</td><td>8</td></tr></tbody><tfoot><tr><th id="total" colspan="2">Total :</th><td>92</td></tr></tfoot></table>'
  );
});

// test(`${libraryName} : apppend example readme`, (t) => {
//   t.plan(1);

// });
