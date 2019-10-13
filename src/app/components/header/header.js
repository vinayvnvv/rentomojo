Vue.component("app-header", {
    props: {
        title: {
            type: String,
            required: true
        },
        users: {
            type: Array,
            required: true
        },
        onadduser: {
            type: Function,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        onuserselect: {
            type: Function,
            required: true
        },
        onaddnews: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            menuModal: false
        };
    },
    created() {
        console.log("created heADER-> ", this.title, this);
        setTimeout(() => {
            this.title = "new";
        }, 2000);
    },
    methods: {
        onCloseMenu: function() {
            this.menuModal = false;
        },
        openMenuModal: function() {
            this.menuModal = true;
        }
    },
    render: function render(h) {
        return (
            <div class="app-header">
                <div class="app-container">
                    <div class="_left">
                        <img class="_logo" src="src/assets/favicon-32x32.png" />
                        <span class="_ttl">Hacker News</span>
                    </div>
                    <div class="_right">
                        <button onClick={this.openMenuModal}>
                            <i class="material-icons">menu</i>
                            <span>Menu</span>
                        </button>
                    </div>
                </div>
                {this.menuModal && (
                    <app-menu
                        user={this.user}
                        users={this.users}
                        onuserselect={this.onuserselect}
                        onadduser={this.onadduser}
                        onclosemenu={this.onCloseMenu}
                        onaddnews={this.onaddnews}
                    />
                )}
            </div>
        );
    }
});
