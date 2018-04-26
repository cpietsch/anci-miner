<template>
    <div class="chat">
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          name="query"
          v-model="query"
          autocomplete="off"
          autocapitalize="off"
          placeholder="z.b. graph"
          size="35"
          autofocus
        />
      </form>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          name="site"
          v-model="site"
          autocomplete="off"
          autocapitalize="off"
          placeholder="desmogblog.com"
        />
      </form>
      <div class="results">
        <div
          v-for="(entry, i) of results"
          :key="i"
          :class="['entry']"
        >
          <a :href="entry.image.contextLink" target="_blank">
            <span>{{ entry.title }}</span>
          </a>
          <a :href="entry.link" target="_blank">
            <img :src="entry.image.thumbnailLink">
            <!-- <img :src="entry.link"> -->
          </a>
        </div>
      </div>

    </div>
</template>

<script>

export default {
  name: 'Search',
  data: function () {
    return {
      query: 'graph',
      site: ''
    }
  },
  computed: {
    results () { return this.$store.state.results }
  },
  methods: {
    handleSubmit (e) {
      if (this.query.length === 0) return

      this.$store.dispatch('search', { site: this.site, query: this.query })
    }
  },
  created () {

  }
}
</script>

<style scoped>

  a {
    display: block;
  }

  .entry {
    padding-bottom: 5px;
  }

  input {
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    bottom: 0px;
  }


</style>
