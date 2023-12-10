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
            Список стеков
          </v-card-title>

          <!-- <v-list-item
            v-for="(stack) in !this.$store.state.stacks?.length > -1"
            :key="stack.id"
            two-line
            @click="showStack(stack.id)"
          >  -->
          <v-list-item
            v-if="stacks.length !== 0"
            v-for="(stack, i) in $store.state.stacks"
            :key="i"
            two-line
            @click="showStack(stack.id)"
          > 
            <v-list-item-content>
              <v-list-item-title>{{ stack.name }}</v-list-item-title>
              <!-- <v-list-item-subtitle>Кол-во позиций: {{ stack.itemsList.length }}</v-list-item-subtitle> -->
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click.stop="removeStack(stack.id)">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="showCreateStack = true"
            >
              Создать стек
            </v-btn>
          </v-card-actions>
          <dlg-create-stack v-model="showCreateStack"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'StacksPage',
  head: {
    title: 'Стеки',
  },
  data: () => {
    return {
      showCreateStack: false,
      stacks: [],
    }
  },
  mounted() {
    this.stacks = this.$store.state.stacks
    console.log('storeST', this.stacks)
  },
  methods: {
    showStack(stackId) {
      this.$router.push({name: 'stack-id', params:{id: stackId}});
    },
    /* removeStack(stackId) {
      if (!confirm('Вы уверены, что хотите удалить стек?')) {
        return;
      }
      const req = new DeleteRequest();
      req.setId(stackId);

      clientStack.delete(req, {})
        .then(() => {
          this.reload();
        })
        .catch(err => {
          console.log(`Ошибка удаления стека: ${err.message}`);
        })
    } */
  }
}
</script>
