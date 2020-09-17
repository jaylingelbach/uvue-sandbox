import Vue from 'vue';
import components from './VBuilderComponents.js';

function build(h, instructions, rootClass = '') {
    if (typeof instructions === 'string') {
        return instructions;
    }
    const el = instructions.el;
    const isComponent = instructions.isComponent || false;
    const data = instructions.data || {};

    let classes;
    if (data.class) {
        // strip observer
        classes = JSON.parse(JSON.stringify(data.class));
    }

    // add root class to root element
    if (rootClass && !isComponent && el && el !== 'component' && el !== 'template') {
        if (typeof classes === 'string') {
            classes = `${classes} ${rootClass}`;
        } else if (typeof classes === 'object' && !Array.isArray(classes) && classes !== null) {
            classes[rootClass] = true;
        } else if (typeof classes === 'object' && Array.isArray(classes)) {
            classes.push(rootClass);
        } else {
            classes = rootClass;
        }
    }

    const dataObj = {
        ...data,
        ...(classes && { class: classes }),
    };

    const children = instructions.children || [];
    const blockEl = components[el] || el;
    if (typeof blockEl === 'string' && isComponent) {
        const route = this.$route.path;
        this.$logger.error(`VBuilder skipped instructions: ${instructions} route: ${route}`);
        // Something went wrong, so "nothing" is deliberately provided instead of a mangled DOM element
        // eslint-disable-next-line consistent-return
        return;
    }

    let renderInstructions = children;
    if (!Array.isArray(renderInstructions)) {
        renderInstructions = [renderInstructions];
    }

    const l = renderInstructions.length;
    const rendered = new Array(l);
    for (let i = 0; i < l; i++) {
        rendered.push(build(h, renderInstructions[i]));
    }

    return h(blockEl, dataObj, rendered);
}

export default Vue.extend({
    name: 'VBuilder',
    functional: true,
    props: {
        /**
         * builder instructions
         * @see https://vuejs.org/v2/guide/render-function.html#createElement-Arguments
         */
        instructions: {
            type: [Array, Object],
            required: true,
        },
        /**
         * root class to be attached to the root element
         */
        rootClass: {
            type: String,
            default: '',
        },
    },
    render(h, ctx) {
        const parent = ctx.parent;
        const instructions = ctx.props.instructions;
        const rootClass = ctx.props.rootClass;

        let renderInstructions = instructions;
        if (!Array.isArray(renderInstructions)) {
            renderInstructions = [renderInstructions];
        }

        const l = renderInstructions.length;
        const rendered = new Array(l);
        for (let i = 0; i < l; i++) {
            rendered.push(build.call(parent, h, renderInstructions[i], rootClass));
        }
        return rendered;
    },
});
