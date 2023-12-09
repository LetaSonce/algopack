<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card
            class="mx-auto"
            tile
          >
            <v-card-title class="text-h5">
              Стратегия
            </v-card-title>
  
            <v-card-text v-if="!loading">
              <SelectAccount v-model="accountId" :sandbox="false" />
              <SelectStack v-model="stackName"/>
  
              <!-- <v-text-field
                label="Периодичность запуска"
                v-model="runIntervalDuration"
                hint="Секунд"
                reqired
                type="number"
              ></v-text-field> -->
  
              <v-switch
                v-model="enabled"
                :label="`Стратегия: ${enabled ? 'Включена' : 'Выключена'}`"
              ></v-switch> {{ enabled }}
            </v-card-text>
  
            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="update"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card
            class="mx-auto"
            tile
          >
            <v-card-title class="text-h5">
              Логи
            </v-card-title>
  
            <v-data-table
              dense
              :headers="logsHeaders"
              :items="logs"
              class="elevation-1"
            >
              <template v-slot:[`item.time`]="{ item }">
               {{ /* item.time.seconds | datetime */ }}
               {{ item.time.seconds }} <br> {{ item.time.nanos }}
              </template>
            </v-data-table>
  
            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="reloadLogs(stackId)"
              >
                Обновить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
  import SelectAccount from "@/components/selects/SelectAccount";
  import SelectStack from "@/components/selects/SelectStack";
  
  export default {
    name: 'StrategyPage',
    components: {SelectStack, SelectAccount},
    head: {
      title: 'Стратегия',
    },
    data: () => {
      return {
        id: "",
        accountId: "",
        stackName: "",
        stackId: "",
        enabled: false,
        // runIntervalDuration: 0,
        logs: [],
        loading: false,
        logsHeaders: [
          {
            text: 'Тип',
            align: 'start',
            sortable: false,
            value: 'logType',
          },
          { text: 'Время', value: 'time' },
          { text: 'Сообщение', value: 'message', sortable: false },
        ]
      }
    },
    mounted() {
      this.id = this.$route.params.id;
      /*
      this.stackId = this.$store.state.stacks.id
      console.log('stack', this.StackId);
      this.accountId = this.$store.state.accounts.id
      console.log('accounts', this.accountsId); */
    },
    methods: {
      update() {
        const strategy = {
          id: this.id,
          stack: this.stackName,
          account: this.accountId,
          enabled: this.enabled
        }
        console.log('strategy', strategy);
          this.$store.commit('ADD_STRATEGY', strategy);
          this.accountId = '';
          console.log('strategy',this.$store.state.strategies);
      },
      reloadLogs(id) {
        this.logs = [
          {
            logType: 'start',
            message: "Запуск стратегии '"+ this.stackName + "'",
            time: { seconds: '2023.12.09', nanos: '21:52:43' }
          },
          {
            logType: 'start',
            message: "Запуск стратегии '"+ this.stackName + "'",
            time: { seconds: '2023.12.09', nanos: '21:53:46' }
          },
          {
            logType: 'start',
            message: "Запуск стратегии '"+ this.stackName + "'",
            time: { seconds: '2023.12.09', nanos: '21:54:50' }
          },
          {
            logType: 'start',
            message: "Запуск стратегии '"+ this.stackName + "'",
            time: { seconds: '2023.12.09', nanos: '21:55:59' }
          },
          {
            logType: 'start',
            message: "Запуск стратегии '"+ this.stackName + "'",
            time: { seconds: '2023.12.09', nanos: '21:56:55' }
          }
        ]
      },
    }
  }
  </script>