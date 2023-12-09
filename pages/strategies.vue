<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card
            class="mx-auto"
            max-width="800"
            tile
          >
            <v-card-title class="text-h5">
              Список стратегий
            </v-card-title>
  
            <v-list-item
              v-if="strategies.length !== 0"
              v-for="(strategy, i) in strategies"
              :key="i"
              two-line
              @click="showStrategy(strategy.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ strategy.id }}</v-list-item-title>
                <v-list-item-subtitle>
                  Состояние: {{ strategy.enabled ? 'Включена' : 'Выключена' }}},
                  <!-- Период запуска: {{ strategy.runIntervalDuration.seconds }} сек. -->
                </v-list-item-subtitle>
              </v-list-item-content>
  
              <v-list-item-action>
                <v-btn icon @click.stop="removeStrategy(strategy.id)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
  
            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="createStrategy()"
              >
                Создать стратегию
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'StrategiesPage',
    head: {
      title: 'Стратегии',
    },
    data: () => {
      return {
        showCreateStack: false,
        strategies: [],
      }
    },
    mounted() {
      this.strategies = this.$store.state.strategies;
    },
    methods: {
      createStrategy() {
        this.showStrategy(window.btoa(unescape(encodeURIComponent(Math.random()))));
      },
      showStrategy(sid) {
        this.$router.push({name: 'strategy-id', params:{id: sid}});
        console.log('sid', sid)
      },
      removeStrategy(id) {
        if (!confirm('Вы уверены, что хотите удалить стратегию?')) {
          return;
        }
        this.$store.commit('REMOVE_STRATEGY', id);
      }
    }
  }
  </script>