// tslint:disable:no-expression-statement
import test from 'ava';
import skull from '../index'; 

const libraryName = 'skull';

let parent = document.createElement('div');

const s = (el: DocumentFragment | HTMLElement) => {
  parent.innerHTML = '';
  parent.appendChild(el);
  return parent.innerHTML;
};

test(`${libraryName} : init `, (t) => {
  t.plan(1);

  t.is(typeof skull, 'function', 'constructor is a typeof function');
});

test(`${libraryName} : create element/documentFragment `, (t) => {
  t.plan(2);

  const [node1] = skull()`<div>Test</div>`;

  const [
    node2,
  ] = skull()`<section><div><h1>Test Title</h1><p>Test Description</p></div></section>`;

  t.is(s(node1), '<div>Test</div>');
  t.is(
    s(node2),
    '<section><div><h1>Test Title</h1><p>Test Description</p></div></section>'
  );
});

test(`${libraryName} : references `, (t) => {
  t.plan(2);

  const [node, ref] = skull()`<div ref="test">Test</div>`;

  t.is('test' in ref, true);
  t.is(s(node), '<div>Test</div>');
});

test(`${libraryName} : array references  `, (t) => {
  t.plan(5);

  const [
    node,
    ref,
  ] = skull()`<ul ref='list'><li ref='item'>0</li><li ref='item'>1</li><li ref='item'>2</li></ul>`;

  t.is('list' in ref, true);
  t.is('item' in ref, true);
  t.is(Array.isArray(ref.item), true);
  t.is(s(node), '<ul><li>0</li><li>1</li><li>2</li></ul>');
  t.is(
    ref.item.every(
      (x: HTMLElement | DocumentFragment, i: any) => s(x) === `<li>${i}</li>`
    ),
    true
  );
});

test(`${libraryName} : options: keepAttribute = true  `, (t) => {
  t.plan(5);

  const [node, ref] = skull({
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
    ref.item.every(
      (x: HTMLElement | DocumentFragment, i: any) =>
        s(x) === `<li ref="item">${i}</li>`
    ),
    true
  );
});

test(`${libraryName} : options: custom attr`, (t) => {
  t.plan(10);

  const [node1, pointer1] = skull({
    attr: 'pointer',
  })`<ul pointer='list'><li pointer='item'>0</li><li pointer='item'>1</li><li pointer='item'>2</li></ul>`;

  t.is('list' in pointer1, true);
  t.is('item' in pointer1, true);
  t.is(Array.isArray(pointer1.item), true);
  t.is(s(node1), '<ul><li>0</li><li>1</li><li>2</li></ul>');
  t.is(
    pointer1.item.every(
      (x: HTMLElement | DocumentFragment, i: any) => s(x) === `<li>${i}</li>`
    ),
    true
  );

  const [node2, pointer2] = skull({
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
    pointer2.item.every(
      (x: HTMLElement | DocumentFragment, i: any) =>
        s(x) === `<li pointer="item">${i}</li>`
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
  const [node, ref] = skull({
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
    ref.item.every(
      (x: HTMLElement | DocumentFragment, i: any) => s(x) === `<li>${i}</li>`
    ),
    true
  );
});

test(`${libraryName} : apppend element`, (t) => {
  t.plan(3);

  const title = document.createElement('h1');
  title.innerHTML = 'Test Title';
  const [node1] = skull()`<div>${title}</div>`;
  t.is(s(node1), '<div><h1>Test Title</h1></div>');

  const [node2] = skull()`<section>${node1}</section>`;
  /*
    Here is expected that the section is empty since what is returned by skull is a DocumentFragment 
    and when a DocumentFragment is inserted it's becomes empty;
  */
  t.is(s(node2), '<section></section>');

  const title2 = document.createElement('h1');
  title2.innerHTML = 'Test Title';
  const [node3] = skull()`<div>${title2}</div>`;
  
  const [node4] = skull()`<section>${node3}</section>`;
  t.is(s(node4), '<section><div><h1>Test Title</h1></div></section>');
});

test(`${libraryName} : apppend string`, (t) => {
  t.plan(1);

  const title = 'Test Title';
  const [node] = skull()`<div><h1>${title}</h1></div>`;
  t.is(s(node), '<div><h1>Test Title</h1></div>');
});

test(`${libraryName} : apppend number`, (t) => {
  t.plan(1);

  const subtotal = 100;
  const discount = 8;
  const [
    node,
  ] = skull()`<table><thead><tr><th colspan="2">Amount</th></tr></thead><tbody><tr><td>Sub Total</td><td>${subtotal}</td></tr><tr><td>Discount</td><td>${discount}</td></tr></tbody><tfoot><tr><th id="total" colspan="2">Total :</th><td>${
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
