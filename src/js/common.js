import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

console.log($('body'))


let add = (a,b) => a+b;
console.log(add(2,3));