const { createApp } = Vue;
const endpoint = 'http://localhost/php-todo-list-json/api/tasks/index.php';
const app = createApp({
    name: 'Todo List',
    data: () => ({
        tasks: [],
        inputTask: '',
    }),
    created() {
        axios.get(endpoint).then(res => {
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
            if (!this.inputTask) return;
            const data = { 'task': this.newTask };
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            axios.post(endpoint, data, config).then(res => { this.tasks = res.data });
            this.inputTask = '';
        },
        deleteTask(id) {
            // this.tasks = this.tasks.filter(task => task.id !== id);
            const data = { 'id': id };
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            axios.post(endpoint, data, config).then(res => { this.tasks = res.data });
        },
    }
});

app.mount('#app');