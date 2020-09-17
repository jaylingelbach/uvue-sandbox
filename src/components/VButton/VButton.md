#

Use VButton for any button needed on our site. This component will render a default 'common' button, and can take properties to render custom buttons as well. VButton has many props that different custom buttons can use to render exactly what you need.

---

## Examples

Default buttons:

```jsx
<div>
    <VButton title="Default Button" containerWidth /><br>
    <VButton title="Primary Button" theme="primary" containerWidth /><br>
    <VButton title="Alert Button" theme="alert" containerWidth /><br>
    <VButton title="Light Button" theme="light" containerWidth /><br>
    <VButton title="Dark Button" theme="dark" containerWidth /><br>
    <VButton title="Submit Button" theme="submit" containerWidth />
</div>
```

Cart button:
js

```jsx
<VButton title="Add to Cart" button="CartButton" size="large" containerWidth />
```

Close button:

> Note: Adding a `light` prop to this will invert it's colors.

```jsx
<VButton button="CloseButton" />
```

Common button:

```jsx
<VButton title="Common Button" theme="primary" size="small" shape="pill" />
```

Direction Buttons:

> Note: If no title is passed, the component will defualt to an outlined circle.

```jsx
<div style="display: flex;">
    <VButton title="Previous" direction="previous" button="DirectionButton" />
    <VButton title="Next" direction="next" button="DirectionButton" />
</div>
```

Link Button:

> Note: This component expects a slot to be passed, and allows any component to be used.

```jsx
<VButton button="LinkButton">Link Button</VButton>
```

Text button:

```jsx
<VButton title="Text Button" button="TextButton" />
```
