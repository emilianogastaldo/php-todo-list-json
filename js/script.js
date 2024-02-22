const { createApp } = Vue;
const endpointPhp = 'http://localhost/php-todo-list-json/api/tasks/index.php';
const endpointJson = 'http://localhost/php-todo-list-json/api/tasks.json';
const app = createApp({
    name: 'Todo List',
    data: () => ({
        tasks: [],
        inputTask: '',
    }),
    created() {
        axios.get(endpointPhp).then(res => {
            this.tasks = res.data;
        })
    }
});

app.mount('#app');