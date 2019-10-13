Vue.component("app-menu", {
    data() {
        return {
            newsUserVal: "",
            form: {
                title: "",
                body: "",
                banner: ""
            },
            addUserStatus: "",
            showError: false,
            userSelectMsg: null
        };
    },
    props: {
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
        onclosemenu: {
            type: Function,
            required: true
        },
        onaddnews: {
            type: Function,
            required: true
        }
    },
    methods: {
        clear: function() {
            console.log("clearing form...");
            this.form = {
                title: "",
                body: "",
                banner: ""
            };
        },
        onTypeForm: function(key, e) {
            this.showError = false;
            console.log("onType", key, e);
            this.form[key] = e.target.value;
        },
        onUserNameType: function(e) {
            this.newsUserVal = e.target.value;
        },
        addUser: function() {
            if (!this.newsUserVal.length) return;
            console.log(this.newsUserVal);
            this.addUserStatus = "loading";
            this.http()
                .addUser(this.newsUserVal)
                .then(res => {
                    this.addUserStatus = "disp_msg";
                    this.onadduser({ name: this.newsUserVal });
                    this.newsUserVal = "";
                    setTimeout(() => {
                        this.addUserStatus = "";
                    }, 5000);
                })
                .catch(err => {
                    this.addUserStatus = "";
                });
        },
        onChange: function(e) {
            this.onuserselect(e.target.value);
            this.userSelectMsg = true;
            setTimeout(() => {
                this.userSelectMsg = null;
            }, 3500);
        },
        closeModal: function(e) {
            this.onclosemenu();
        },
        addNews: function() {
            this.showError = true;
            if (this.form.title.length && this.form.body.length) {
                this.onaddnews(this.form);
                this.clear();
                this.showError = false;
                this.closeModal();
            }
        }
    },
    render(h) {
        const isUserExists =
            this.users.map(i => i.name).indexOf(this.newsUserVal) !== -1;
        return (
            <div class="app-menu">
                <div class="back-drop" onClick={this.closeModal} />
                <div class="_content slide-to-top">
                    <span class="_close" onClick={this.closeModal}>
                        <i class="material-icons">close</i>
                    </span>
                    <section>
                        <h2>User</h2>
                        <div class="_form">
                            <div class="_item _align-center">
                                <span>
                                    Select User (<small>Logged in as</small>){" "}
                                    <br />{" "}
                                    <small>
                                        (this user can't edit others comments)
                                    </small>
                                    :
                                </span>
                                <div>
                                    {this.userSelectMsg ? (
                                        <span class="_success">
                                            Now Logged in as <b>{this.user}</b>
                                        </span>
                                    ) : (
                                        <select onChange={this.onChange}>
                                            {this.users.map(user => (
                                                <option
                                                    selected={
                                                        this.user === user.name
                                                    }
                                                    value={user.name}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                            {this.addUserStatus !== "disp_msg" && (
                                <div class="_item _align-center">
                                    <span>
                                        Add new User <br />{" "}
                                        <small>(You can add new user)</small>:
                                    </span>
                                    <div>
                                        <input
                                            onKeyup={this.onUserNameType}
                                            value={this.newsUserVal}
                                            placeholder={"Enter User name.."}
                                        />
                                    </div>
                                </div>
                            )}

                            {isUserExists && (
                                <div class="_item _align-center">
                                    <span />
                                    <div class="_error">
                                        User Already Exists
                                    </div>
                                </div>
                            )}

                            {this.addUserStatus === "disp_msg" ? (
                                <span class="_success _center">
                                    New User <b>Added</b>, You can select by
                                    above dropdown
                                </span>
                            ) : (
                                <div class="_item _align-center">
                                    <span />
                                    <div>
                                        {
                                            <button
                                                onClick={this.addUser}
                                                class="primary"
                                                disabled={
                                                    this.addUserStatus ===
                                                        "loading" ||
                                                    isUserExists
                                                }
                                            >
                                                {this.addUserStatus !==
                                                "loading"
                                                    ? "Add User"
                                                    : "Adding.."}
                                            </button>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                    <div class="_dvdr" />
                    <section>
                        <h2>Add News</h2>
                        <div class="_form">
                            <div class="_item _align-center">
                                <span>
                                    Title (<small>*</small>):
                                </span>
                                <div>
                                    <input
                                        onKeyup={e => {
                                            this.onTypeForm("title", e);
                                        }}
                                        placeholder={"Enter news title.."}
                                        value={this.form.title}
                                    />
                                </div>
                            </div>
                            <div class="_item">
                                <span>
                                    Content (<small>*</small>):
                                </span>
                                <div>
                                    <textarea
                                        rows={3}
                                        onKeyup={e => {
                                            this.onTypeForm("body", e);
                                        }}
                                        value={this.form.body}
                                        placeholder={"Enter news content.."}
                                    />
                                </div>
                            </div>
                            <div class="_item _align-center">
                                <span>Banner Image URL :</span>
                                <div>
                                    <input
                                        onKeyup={e => {
                                            this.onTypeForm("banner", e);
                                        }}
                                        value={this.form.banner}
                                        placeholder={
                                            "http://sample.com/img.png"
                                        }
                                    />
                                </div>
                            </div>
                            {(!this.form.title.length ||
                                !this.form.body.length) &&
                                this.showError && (
                                    <div class="_item _align-center">
                                        <span />
                                        <div class="_error">
                                            Fill are required(*) fields
                                        </div>
                                    </div>
                                )}
                            <div class="_item _align-center">
                                <span />
                                <div>
                                    <button onClick={this.clear}>Clear</button>
                                    <button
                                        class="primary"
                                        onClick={this.addNews}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});
