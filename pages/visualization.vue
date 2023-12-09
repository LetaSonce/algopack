<template>
    <v-layout class="">
        <v-main style="padding: 0;">
            <h2>Candlestick Chart</h2>

            <v-row class="ma-0 justify-center">
                <v-btn-toggle
                    v-model="timeSelection"
					tile
					mandatory
					color="black accent-3"
					group
                >
                    <v-btn
                        @click="goSearchResultView()"
						value="TIME_SERIES_DAILY"
					>
						Daily
					</v-btn>

					<v-btn
						@click="/* updateTimeSelection('TIME_SERIES_WEEKLY') */"
						value="TIME_SERIES_WEEKLY"
					>
						Weekly
					</v-btn>

					<v-btn
						@click="/* updateTimeSelection('TIME_SERIES_MONTHLY') */"
						value="TIME_SERIES_MONTHLY"
					>
						Monthly
					</v-btn>
                </v-btn-toggle>
            </v-row>
            <div class="d-flex justify-center" >
                
				<candlestick class="chart" />
			</div>
            <svg ></svg>
        </v-main>
        <!-- <v-navigation-drawer location="right">
            <v-list>
                <v-list-item title="Drawer right">
                    <v-card text="Rsdfsjdfjs" variant="tonal">
                        <v-text-field clearable label="Название"></v-text-field>
                        <v-text-field clearable label="Значение"></v-text-field>
                        <v-select label="Цвет" :items="['Blue', 'Green', 'Red', 'Black']"></v-select>
                    </v-card>
                </v-list-item>
            </v-list>
            <v-btn color="green">
                <v-icon icon="$vuetify"></v-icon>
            </v-btn>
        </v-navigation-drawer> -->
    </v-layout>
  </template>
  
  <script>
    import axios from 'axios';
    import Candlestick from "../components/Candlestick.vue";

  export default {
    name: 'visualizationPage',
    components: { Candlestick },
    head: {
      title: 'Визуализация',
    },
    data: () => {
      return {
        stock: "",
        stockSymbols: [],
        timeSelection: "TIME_SERIES_DAILY",
      }
    },
    mounted() {
        /*axios
            .get("https://www.alphavantage.co/query", {
                params: {
                    function: "TIME_SERIES_DAILY",
                    keywords: "TSLA",
                    apikey: "DVSM9MPECXXYFVXQ",
                },
            })
            .then((response) => {
                console.log('response', response);
                // this.stockSymbols = response.data.bestMatches;
            })
            .catch((error) => {
                console.log(error);
            }) */
    },
    methods: {
        goSearchResultView() {
            console.log('stock', this.stock)
        },
        
    }
  }
  </script>
  