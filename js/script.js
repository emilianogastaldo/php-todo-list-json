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
    },
    computed: {
        newTask() { return { id: Date.now(), text: this.inputTask, done: false } }
    },
    methods: {
        addNewTask() {
            if (!this.inputTask) return;

            this.tasks.push(this.newTask);
            this.inputTask = '';
        },
        addNewTaskAxios() {
            const data = { 'task': this.newTask };
            const config = { headers: { 'Conten-Type': 'multipart/form-data' } };
            axios.post(endpointPhp, data, config).then(res => { this.tasks = res.data });
            this.inputTask = '';
        }
    }
});

app.mount('#app');