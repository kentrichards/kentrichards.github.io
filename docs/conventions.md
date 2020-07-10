# Project Conventions

## Naming Convention for CSS and HTML Classes

This project uses the __Block, Element, Modifier__ (or BEM) methodology for naming CSS and HTML classes.

A __block__ is a top-level abstraction of a new component, for example a button: `.btn { }`. This block should be thought of as a parent.

Child items, or __elements__, can be placed inside blocks, and these relationships are denoted by two underscores following the name of the block: `.btn__price { }`.

Finally, __modifiers__ can manipulate the block so that we can theme or style a particular component without inflicting changes on a completely unrelated module. Modifiers are denoted by appending two hyphens to the name of the block or block/element pair: `btn--orange { }`.

`id` and `tag` selectors should be avoided in BEM, and CSS selectors should not rely on ancestor/descendant/sibling/etc relationships. In other words, only `class` selectors should be used. By only using class selectors, all CSS rules have the same specificity, resulting in less potential confusion.

_[Adapted from the CSS-Tricks article BEM 101](https://css-tricks.com/bem-101)_
