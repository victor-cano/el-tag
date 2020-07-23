// tslint:disable:no-expression-statement
import test from 'ava';
import skull from '../index';
const libraryName = 'skull';
let parent = document.createElement('div');
const s = (el) => {
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
    const [node1] = skull() `<div>Test</div>`;
    const [node2,] = skull() `<section><div><h1>Test Title</h1><p>Test Description</p></div></section>`;
    t.is(s(node1), '<div>Test</div>');
    t.is(s(node2), '<section><div><h1>Test Title</h1><p>Test Description</p></div></section>');
});
test(`${libraryName} : references `, (t) => {
    t.plan(2);
    const [node, ref] = skull() `<div ref="test">Test</div>`;
    t.is('test' in ref, true);
    t.is(s(node), '<div>Test</div>');
});
test(`${libraryName} : array references  `, (t) => {
    t.plan(5);
    const [node, ref,] = skull() `<ul ref='list'><li ref='item'>0</li><li ref='item'>1</li><li ref='item'>2</li></ul>`;
    t.is('list' in ref, true);
    t.is('item' in ref, true);
    t.is(Array.isArray(ref.item), true);
    t.is(s(node), '<ul><li>0</li><li>1</li><li>2</li></ul>');
    t.is(ref.item.every((x, i) => s(x) === `<li>${i}</li>`), true);
});
test(`${libraryName} : options: keepAttribute = true  `, (t) => {
    t.plan(5);
    const [node, ref] = skull({
        keepAttribute: true,
    }) `<ul ref='list'><li ref='item'>0</li><li ref='item'>1</li><li ref='item'>2</li></ul>`;
    t.is('list' in ref, true);
    t.is('item' in ref, true);
    t.is(Array.isArray(ref.item), true);
    t.is(s(node), '<ul ref="list"><li ref="item">0</li><li ref="item">1</li><li ref="item">2</li></ul>');
    t.is(ref.item.every((x, i) => s(x) === `<li ref="item">${i}</li>`), true);
});
test(`${libraryName} : options: custom attr`, (t) => {
    t.plan(10);
    const [node1, pointer1] = skull({
        attr: 'pointer',
    }) `<ul pointer='list'><li pointer='item'>0</li><li pointer='item'>1</li><li pointer='item'>2</li></ul>`;
    t.is('list' in pointer1, true);
    t.is('item' in pointer1, true);
    t.is(Array.isArray(pointer1.item), true);
    t.is(s(node1), '<ul><li>0</li><li>1</li><li>2</li></ul>');
    t.is(pointer1.item.every((x, i) => s(x) === `<li>${i}</li>`), true);
    const [node2, pointer2] = skull({
        attr: 'pointer',
        keepAttribute: true,
    }) `<ul pointer='list'><li pointer='item'>0</li><li pointer='item'>1</li><li pointer='item'>2</li></ul>`;
    t.is('list' in pointer2, true);
    t.is('item' in pointer2, true);
    t.is(Array.isArray(pointer2.item), true);
    t.is(s(node2), '<ul pointer="list"><li pointer="item">0</li><li pointer="item">1</li><li pointer="item">2</li></ul>');
    t.is(pointer2.item.every((x, i) => s(x) === `<li pointer="item">${i}</li>`), true);
});
test(`${libraryName} : options: save to`, (t) => {
    t.plan(8);
    const to = {};
    const [node, ref] = skull({
        to,
    }) `<ul ref='list'><li ref='item'>0</li><li ref='item'>1</li><li ref='item'>2</li></ul>`;
    t.is('list' in ref, true);
    t.is('item' in ref, true);
    t.is('list' in to, true);
    t.is('item' in to, true);
    t.is(Array.isArray(ref.item), true);
    t.is(Array.isArray(to.item), true);
    t.is(s(node), '<ul><li>0</li><li>1</li><li>2</li></ul>');
    t.is(ref.item.every((x, i) => s(x) === `<li>${i}</li>`), true);
});
test(`${libraryName} : apppend element`, (t) => {
    t.plan(3);
    const title = document.createElement('h1');
    title.innerHTML = 'Test Title';
    const [node1] = skull() `<div>${title}</div>`;
    t.is(s(node1), '<div><h1>Test Title</h1></div>');
    const [node2] = skull() `<section>${node1}</section>`;
    /*
      Here is expected that the section is empty since what is returned by skull is a DocumentFragment
      and when a DocumentFragment is inserted it's becomes empty;
    */
    t.is(s(node2), '<section></section>');
    const title2 = document.createElement('h1');
    title2.innerHTML = 'Test Title';
    const [node3] = skull() `<div>${title2}</div>`;
    const [node4] = skull() `<section>${node3}</section>`;
    t.is(s(node4), '<section><div><h1>Test Title</h1></div></section>');
});
test(`${libraryName} : apppend string`, (t) => {
    t.plan(1);
    const title = 'Test Title';
    const [node] = skull() `<div><h1>${title}</h1></div>`;
    t.is(s(node), '<div><h1>Test Title</h1></div>');
});
test(`${libraryName} : apppend number`, (t) => {
    t.plan(1);
    const subtotal = 100;
    const discount = 8;
    const [node,] = skull() `<table><thead><tr><th colspan="2">Amount</th></tr></thead><tbody><tr><td>Sub Total</td><td>${subtotal}</td></tr><tr><td>Discount</td><td>${discount}</td></tr></tbody><tfoot><tr><th id="total" colspan="2">Total :</th><td>${subtotal - discount}</td></tr></tfoot></table>`;
    t.is(s(node), '<table><thead><tr><th colspan="2">Amount</th></tr></thead><tbody><tr><td>Sub Total</td><td>100</td></tr><tr><td>Discount</td><td>8</td></tr></tbody><tfoot><tr><th id="total" colspan="2">Total :</th><td>92</td></tr></tfoot></table>');
});
// test(`${libraryName} : apppend example readme`, (t) => {
//   t.plan(1);
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L2luZGV4LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUNBQXlDO0FBQ3pDLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQztBQUN2QixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUM7QUFFN0IsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDO0FBRTVCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFrQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUYsSUFBSSxDQUFDLEdBQUcsV0FBVyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRVYsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssRUFBRSxVQUFVLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztBQUNyRSxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxHQUFHLFdBQVcscUNBQXFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM5RCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRVYsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFBLGlCQUFpQixDQUFDO0lBRXpDLE1BQU0sQ0FDSixLQUFLLEVBQ04sR0FBRyxLQUFLLEVBQUUsQ0FBQSwwRUFBMEUsQ0FBQztJQUV0RixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxpQkFB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