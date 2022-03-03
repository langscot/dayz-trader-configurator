<template>
    <div class="ma-5">
        <v-alert
            class="my-1 py-1 px-2"
            v-for='entry in entries'
            :key='entry.className'
            dense
            text
            type="error"
        >
            <pre>{{ entry.className }}: {{ entry.errors.join("\n") }}</pre>
        </v-alert>
    </div>
</template>

<script>
export default {
    name: 'trader-error-list',

    props: {
        entries: Array
    }
}
</script>