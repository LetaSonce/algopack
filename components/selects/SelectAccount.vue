<template>
  
    <v-select
      v-model="value"
      :items="accounts"
      item-text="name"
      item-value="id"
      label="Счет"
      required
      single-line
    >
    <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title>{{item.name ? item.name : 'Без имени (' + item.id.slice(-12) + ')'}}</v-list-item-title>
          <v-list-item-subtitle v-text="item.id"></v-list-item-subtitle>
        </v-list-item-content>
    </template>
      <template v-slot:selection="{ item }">
        {{item.name ? item.name : 'Без имени (' + item.id.slice(-12) + ')'}}
      </template>
    </v-select>
  </template>
  
  <script>
  export default {
    name: 'SelectAccount',
    model: {
      prop: 'input',
      event: 'change',
    },
    props: {
      input: String,
      sandbox: Boolean,
      accountId: String,
    },
    mounted() {
      if (this.input) {
        this.value = this.input;
      }
  
      this.reload();
    },
    data() {
      return {
        value: null,
        accounts: [],
        // item: [],
        // loading: false,
      }
    },
    mounted() {
      this.accounts = this.$store.state.accounts
    },
    methods: {
      reload() {
        this.loading = true;
      }
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