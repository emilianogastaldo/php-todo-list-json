const { createApp } = Vue;
const endpoint = 'http://localhost/php-todo-list-json/api/tasks/';
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
        newTask() { return { id: Date.now(), text: this.inputTask, done: '' } }
    },
    methods: {
        addNewTask() {
            if (!this.inputTask) return;

            this.tasks.push(this.newTask);
            this.inputTask = '';
        },
        addNewTaskAxios() {
            if (!this.inputTask) return;
            const data = { 'task_text': this.inputTask };
            this.fetchApi(endpoint, data);
            this.inputTask = '';

            // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            // axios.post(endpoint, data, config).then(res => { this.tasks = res.data });
        },
        deleteTask(id) {
            // this.tasks = this.tasks.filter(task => task.id !== id);
            const data = { id };
            this.fetchApi(`${endpoint}delete/`, data);

            // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            // axios.post(`${endpoint}delete/`, data, config).then(res => { this.tasks = res.data });
        },
        toggleDone(id) {
            // task.done = !task.done;
            const data = { id };
            this.fetchApi(`${endpoint}toggle/`, data);

            // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            // axios.post(`${endpoint}toggle/`, data, config).then(res => { this.tasks = res.data });

            // Un'altra maniera per mandare i dati senza il config
            // 
            // const data = new FormData();
            // data.append(id,id);
            // axios.post(`${endpoint}toggle/`, data).then(res => { this.tasks = res.data });

        },

        // unifico le funzioni:
        fetchApi(endpoint, data) {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            axios.post(endpoint, data, config).then(res => { this.tasks = res.data });
        }
    }
});

app.mount('#app');