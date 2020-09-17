<template>
    <span class="bulleted-list-icon">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26.458333 26.458334"
        >
            <circle cx="3.96875" cy="5.5562501" r="1.8520833" />
            <circle cx="3.96875" cy="13.229167" r="1.8520833" />
            <circle cx="3.96875" cy="20.902084" r="1.8520833" />
            <path d="M 10.847916,5.5562517 H 22.496954" />
            <path d="M 10.847918,20.902085 H 22.496956" />
            <path d="M 10.84792,13.229168 H 22.496984" />
        </svg>
    </span>
</template>

<script>
export default {
    name: 'VBulletedListIcon',
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.bulleted-list-icon {
    svg {
        height: 1em;
        width: 1em;
    }

    circle {
        fill: #2e2d2b;
    }

    path {
        stroke: #2e2d2b;
        stroke-linecap: round;
        stroke-width: 3.70417;
    }
}
</style>
