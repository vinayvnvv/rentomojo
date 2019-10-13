Vue.component("app", {
    data() {
        return {
            user: "vinay",
            users: [],
            addednews: null
        };
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    methods: {
        onChange: function(e) {
            console.log("hello");
            this.value = e.target.value;
        },
        getAllUsers: function() {
            this.http()
                .getUsers()
                .then(res => {
                    this.users = res;
                });
        },
        onAddUser: function(user) {
            this.users = [...this.users, user];
        },
        onUserSelect: function(user) {
            this.user = user;
        },
        onAddNews: function(news) {
            console.log(news);
            news["author"] = this.user;
            news["data"] = new Date().toISOString();
            this.addednews = news;
        }
    },
    created() {
        console.log("created", this);
        this.getAllUsers();
    },
    render: function render(h) {
        return (
            <div class="app">
                <app-header
                    title={this.value}
                    users={this.users}
                    user={this.user}
                    onuserselect={this.onUserSelect}
                    onadduser={this.onAddUser}
                    onaddnews={this.onAddNews}
                ></app-header>
                <div class="app-content">
                    <div class="app-container">
                        <app-news
                            addednews={this.addednews}
                            user={this.user}
                        ></app-news>
                    </div>
                </div>
            </div>
        );
    }
});
