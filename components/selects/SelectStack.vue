<template>
    <v-select
      v-model="value"
      :items="stacks"
      :loading="loading"
      item-text="name"
      item-value="name"
      label="Стек"
      required
      single-line
    >
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <!-- <v-list-item-subtitle>
            Кол-во позиций: {{ item.itemsList.length }}
          </v-list-item-subtitle> -->
        </v-list-item-content>
      </template>
    </v-select>
  </template>
  
  <script>
  
  export default {
    name: 'SelectStack',
    model: {
      prop: 'input',
      event: 'change',
    },
    props: {
      input: String,
    },
    mounted() {
      if (this.input) {
        this.value = this.input;
      }
  
    },
    data() {
      return {
        value: null,
        stacks: [],
        loading: false,
      }
    },
    mounted() {
      this.stacks = this.$store.state.stacks
    },
    methods: {
      
    },
    watch: {
      value(val) {
        console.log('val', val);
        if (this.input === val) {
          return;
        }
  
        this.$emit('change', val);
        console.log('change', val);
      },
    },
  }
  </script>