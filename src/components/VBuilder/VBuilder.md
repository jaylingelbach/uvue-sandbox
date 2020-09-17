#

Builder requires an `instructions` object. The `instructions` object is modeled after [Vue's createElement arguments](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments). When the Builder receives `instructions` it will recursively build via the builder function.

## Example

Element example:

```vue
<template>
    <VBuilder :instructions="instructions" />
</template>

<script>
import VBuilder from './VBuilder.js';

const instructions = {
    el: 'div',
    data: { class: ['wrapper'] },
    children: ['Element text'],
};

export default {
    name: 'ElementExample',
    components: { VBuilder },
    data() {
        return {
            instructions,
        };
    },
};
</script>
```

Nested element example:

```vue
<template>
    <VBuilder :instructions="instructions" />
</template>

<script>
import VBuilder from './VBuilder.js';

const instructions = {
    el: 'ul',
    data: {},
    children: [
        {
            el: 'li',
            data: {},
            children: ['List item one'],
        },
        {
            el: 'li',
            data: {},
            children: ['List item two'],
        },
    ],
};

export default {
    name: 'NestedElementExample',
    components: { VBuilder },
    data() {
        return {
            instructions,
        };
    },
};
</script>
```

Component example:

```vue
<template>
    <VBuilder :instructions="instructions" />
</template>

<script>
import VBuilder from './VBuilder.js';
import VHeadline from '../VHeadline/VHeadline.vue';

const instructions = {
    el: VHeadline,
    data: {
        props: {
            tag: 'h1',
        },
    },
    children: ['Headline text'],
};

export default {
    name: 'ComponentExample',
    components: { VBuilder },
    data() {
        return {
            instructions,
        };
    },
};
</script>
```

Named component example:

> **Note:** When rendering a named component, you must include the `isComponent` flag so VBuilder knows to treat it as a component and not an HTML element. This allows VBuilder to throw away components it doesn't recognize.

```vue
<template>
    <VBuilder :instructions="instructions" />
</template>

<script>
import VBuilder from './VBuilder.js';
import VHeadline from '../VHeadline/VHeadline.vue';

const instructions = {
    el: 'ProductGrid',
    isComponent: true,
};

export default {
    name: 'ComponentExample',
    components: { VBuilder },
    data() {
        return {
            instructions,
        };
    },
};
</script>
```

Array of elements example:

> **Note:** When passing an array of elements as instructions to `VBuilder`, you must wrap it in an element or Vue will fail to render the elements.

```vue
<template>
    <div>
        <VBuilder :instructions="instructions" />
    </div>
</template>

<script>
import VBuilder from './VBuilder.js';
import VHeadline from '../VHeadline/VHeadline.vue';

const instructions = [
    {
        el: 'h1',
        children: ['Headline'],
    },
    {
        el: 'ProductGrid',
    },
];

export default {
    name: 'ComponentExample',
    components: { VBuilder },
    data() {
        return {
            instructions,
        };
    },
};
</script>
```
