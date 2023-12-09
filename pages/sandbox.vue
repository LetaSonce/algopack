<template>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-card
            class="mx-auto"
            max-width="400"
            tile
          >
            <v-card-title class="text-h5">
              Счета
            </v-card-title>
            <v-list-item
              v-for="(item, i) in $store.state.accounts"
              :key="i"
              two-line
              @click="loadPositions(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.name ? item.name : 'Без имени (' + item.id.slice(-12) + ')' }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.id }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
              <v-btn icon @click.stop="removeAccount(item.id)">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item-action> 
            </v-list-item>
  
            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="createAccount"
              >
                Создать счёт
              </v-btn>
            </v-card-actions>
          </v-card>
  
        </v-col>
        <v-col cols="4">
          <v-card
            v-if="accountId"
            class="mx-auto"
            max-width="400"
            tile
          >
            <v-card-title class="text-h5">
              Баланс
            </v-card-title>
  
            <v-list-item
              v-for="(item, index) in positions"
              :key="index"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.value }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.currency }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
  
            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="payIn('1000')"
              >
                Пополнить на 1000
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
  
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'SandboxPage',
    head: {
      title: 'Песочница',
    },
    data: () => {
      return {
        accountId: "",
        accounts: [],
        positions: [],
        newAccount: '',
      }
    },
    methods: {
      createAccount() {
        this.newAccount = 'Без названия';

        if (this.newAccount) {
          this.$store.commit('ADD_ACCOUNT', this.newAccount);
          this.newAccount = '';
        }
      }, 

      removeAccount(id) {
        this.$store.commit('REMOVE_ACCOUNT', id);
      },
      
      loadPositions(id) {
        this.accountId = id;
      },

      payIn(amount) {
        this.loadPositions(this.accountId);
      },
    }
  }
  </script>