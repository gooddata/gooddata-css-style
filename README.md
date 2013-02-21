# .gooddata-css-style-guide {

The following document outlines a reasonable style guide for CSS development.

<a name="TOC"></a>
## Table of contents

1. [General principles](#general-principles)
2. [Format](#format)
3. [Comments](#comments)
4. [Naming](#naming)
5. [Structure](#structure)

<a name="general-principles"></a>
## 1. General principles

#### Use valid CSS where possible

Unless dealing with CSS validator bugs or requiring proprietary syntax, use valid CSS code.

#### Pixels vs. Ems

Use `px` for `font-size`, because it offers absolute control over text. Additionally, unit-less `line-height` is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the `font-size`.

#### Type Selectors

Do *not* use ID selectors for styling.
Avoid qualifying ID and class names with type selectors.
Unless necessary (for example with helper classes), do not use element names in conjunction with IDs or classes.
Avoiding unnecessary ancestor selectors is useful for performance reasons.

```css
/* bad */
ul#example {}
div.error {}

/* good */
.example {}
.error {}
```

Avoid use of `*` selector because of performance reasons. (They are evaluated from right to left, e.g., `*` will match all elements on the page.)

```css
/* bad */
.module * {}

/* good */
.module {
    > a, > .button {}
}
```

#### Limit nesting to 1 level deep

This prevents overly-specific CSS selectors.

```scss
/* bad */
.picker {
    ul {
        li {
            a {}
            button {}
        }
    }
}

/* bad - nesting is present in class names - try to aggregate classes by semantic meaning */
.picker {}
.picker-list {}
.picker-list-item {}
.picker-list-item-link {}
.picker-list-item-button {}

/* good */
.picker {}
.picker-list {
    > li {
        > a {}
        > button {}
    }
}
```

#### Place `@extend` statements on the first lines followed by `@include` statements

```scss
.selector {
    @extend .other-rule;
    @include clearfix();
    @include box-sizing(border-box);

    width: x-grid-unit(1);
    ...

    @include box-shadow("0 4px 0 rgba(0,0,0,0.5)");
}
```

#### Declaration order

Order structurally important properties (e.g. positioning and box-model) prior to all
others.

```css
.selector {
    /* Positioning */
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* Display & Box Model */
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    border: 10px solid #333;

    /* Text & font properties */
    text-align: right;
    font-size: 16px;
    font-family: sans-serif;

    /* Other */
    color: #fff;
    background: #000;
}
```

<a name="format"></a>
## 2. Format

* Use soft-tabs with a 4 space indent.
* Put spaces after `:` in property declarations.
* Put spaces before `{` in rule declarations.
* Use a semicolon after every declaration.

-

* Do not use vendor prefixes inside rules, they belong to mixins.
* Use one discrete selector per line in multi-selector rulesets.
* Include one declaration per line in a declaration block.
* Use one level of indentation for each declaration.
* Separate each ruleset by a blank line.

-

* Use short hex color codes #000 unless using rgba.
* Avoid specifying units for zero-values, e.g., `margin: 0`.
* Quote attribute values, e.g., `input[type="checkbox"]`.
* Use double quotes e.g., `content: ""`.

<a name="comments"></a>
## 3. Comments

* Place comments on a new line above their subject.
* Keep line-length to a sensible maximum, e.g., 80 columns.

```css
/* Basic comment */

/* ==========================================================================
   Section comment block
   ========================================================================== */

/* Sub-section comment block
   ========================================================================== */

/**
 * Short description using Doxygen-style comment format
 *
 * The first sentence of the long description starts here and continues on this
 * line for a while finally concluding here at the end of this paragraph.
 */
```

<a name="naming"></a>
## 4. Naming

#### Use semantic class and variable names

```scss
/* bad */
$green: #0f0;

/* good */
$primary-color: #0f0;
```

```html
<!-- bad -->
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="clear"></div>
</div>

<!-- good -->
<div class="mainContent">
    <div class="content"></div>
    <div class="sidebar"></div>
</div>
```

```css
/* bad */
.left { float: left; }
.right { float: right; }
.clear { clear: both; }

/* good */
.mainContent { @include clearfix(); }
.content { float: left; }
.sidebar { float: right; }
```

#### Use IDs and class names that are as short as possible but as long as necessary.

```css
/* bad */
#navigation {}
.atr {}

/* good */
#nav {}
.author {}
```

<a name="structure"></a>
## 5. Structure

### Modules

* Write CSS for specific JS components into separate file as independent unit of code (can only
depend on base & layout styles)
* Prefix all module related classes with module name: `moduleName-someCamelizedClass`
* Avoid using descendant selectors in favor of child selector where possible
* Only include a selector that includes semantics. A `span` or `div` holds none.

```scss
/* bad */
.picker {
    ul {
        li {}
    }
    p {}
}

/* good */
.picker {}
.picker-list {
    > li {}
}
.picker-infoMessage {}
```

### States

* Prefix states with `is-`, states for specific module with e.g., `is-picker-collapsed`
* States are added/removed via javascript - move immutable properties from states to variants

```scss
/* bad */
.picker {
    width: 200px
}

.is-picker-wider {
    width: 400px;
}

/* good */
.picker {
    width: 200px
}

.picker-multiselect {
    @extend .picker;
    width: 400px;
}
```

### Themes

* Try to separate as many colors as possible to be able to use theming (custom CSS) in SASS

```scss
/* bad */
.picker {
    color: red;

    a {
        color: blue;
    }
}

/* good */
$primaryTextColor: red;
$secondaryTextColor: green;
$linkColor: blue;

/* in GoodData theme file */
$picker-color: $primaryTextColor;
$picker-anchor-color: $linkColor;

/* in another theme file */
$picker-color: $secondaryTextColor;
$picker-anchor-color: $linkColor;

.picker {
    color: $picker-color;

    a {
        color: $picker-anchor-color;
    }
}
```

**[[⬆]](#TOC)**

# }
