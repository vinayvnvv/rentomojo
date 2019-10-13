Vue.component("app-comment", {
    created() {
        console.log("created app-comment", this, this.datalevel);
    },
    data() {
        return {
            isReplay: false,
            editValue: ""
        };
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        onaddcomment: {
            type: Function,
            required: true
        },
        datalevel: {
            type: Array,
            required: true
        },
        replaylevel: {
            type: Array,
            required: true
        },
        setreplaylevel: {
            type: Function,
            required: true
        },
        editlevel: {
            type: Array,
            required: true
        },
        seteditlevel: {
            type: Function,
            required: true
        },
        oneditcomment: {
            type: Function,
            required: true
        },
        user: {
            type: String,
            required: true
        }
    },
    methods: {
        onKeyPress: function(e) {
            e.preventDefault();
            if (
                e.keyCode === 13 &&
                !e.shiftKey &&
                e.target.value.replace(/[\r\n\s]+/g, "").length
            ) {
                e.target.rows = 1;
                console.log("onKeyPress", e);
                this.onaddcomment(
                    [...this.datalevel, this.data ? this.data.length : 0],
                    e.target.value,
                    this.data
                );
                e.target.value = "";
            }
        },
        addReplay: function(index) {
            this.isReplay = true;
            this.setreplaylevel([...this.datalevel, index]);
        },
        editComment: function(level, text) {
            this.seteditlevel(level);
            this.editValue = text;
        },
        editSubmitComment: function(item) {
            this.oneditcomment(item, this.editValue);
        },
        onEditType: function(e) {
            this.editValue = e.target.value;
        }
    },
    render(h) {
        console.log("render --> ", this.level, this.datalevel, this.data);
        return (
            <div
                class="app-comment slide-to-top"
                style={
                    "margin-left: " +
                    (this.level > 0 ? 21 : 0) +
                    "px;margin-top:" +
                    (this.level > 0 ? "5px" : "0px")
                }
            >
                {(this.datalevel.length === 0 ||
                    this.replaylevel.toString() ===
                        this.datalevel.toString()) && (
                    <div class="_field">
                        <input
                            class="_input"
                            onKeyup={this.onKeyPress}
                            placeholder={
                                this.datalevel.length === 0
                                    ? "Add Comment"
                                    : "Add Reply.."
                            }
                        />
                    </div>
                )}

                <div
                    class="_comments"
                    style={
                        this.level === 0
                            ? "border-left: none; margin-left: -8px"
                            : ""
                    }
                >
                    {this.data &&
                        this.data.map((item, _index) => (
                            <div
                                class={
                                    "_cmt-item-outer " +
                                    (!item._id ? "_disabled" : "")
                                }
                            >
                                <div class="_cmt-item">
                                    <div class="_name">
                                        <i class="material-icons">
                                            account_circle
                                        </i>
                                        <span>{item.name}</span>
                                    </div>
                                    {this.editlevel &&
                                    item.level &&
                                    this.editlevel.toString() ===
                                        item.level.toString() ? (
                                        <input
                                            onInput={this.onEditType}
                                            class="_edit-input"
                                            value={this.editValue}
                                        />
                                    ) : (
                                        <div class="_txt">{item.text}</div>
                                    )}
                                </div>
                                {this.editlevel &&
                                item.level &&
                                this.editlevel.toString() ===
                                    item.level.toString() ? (
                                    <div class="_actns _edit">
                                        <button
                                            class="btn"
                                            onClick={() => {
                                                this.editComment([], "");
                                            }}
                                        >
                                            <i class="material-icons">close</i>
                                            <span>Cancel</span>
                                        </button>
                                        <button
                                            disabled={
                                                this.editValue.length === 0
                                            }
                                            class="btn _edit"
                                            onClick={() => {
                                                this.editSubmitComment(item);
                                            }}
                                        >
                                            <i class="material-icons">check</i>
                                            <span>Save</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div class={"_actns _normal "}>
                                        <button
                                            class="btn"
                                            onClick={() => {
                                                this.addReplay(_index);
                                            }}
                                        >
                                            <i class="material-icons">reply</i>
                                            <span>Reply</span>
                                        </button>
                                        {this.user === item.name && (
                                            <span class="_dvdr">·</span>
                                        )}
                                        {this.user === item.name && (
                                            <button
                                                class="btn"
                                                onClick={() => {
                                                    this.editComment(
                                                        item.level,
                                                        item.text
                                                    );
                                                }}
                                            >
                                                <i class="material-icons">
                                                    edit
                                                </i>
                                                <span>Edit</span>
                                            </button>
                                        )}
                                        {item.date && (
                                            <small>
                                                ·&nbsp;
                                                {window["moment"](
                                                    new Date(item.date)
                                                ).fromNow()}
                                            </small>
                                        )}
                                    </div>
                                )}
                                {(item.comments || this.isReplay) && (
                                    <app-comment
                                        onaddcomment={this.onaddcomment}
                                        level={this.level + 1}
                                        replaylevel={this.replaylevel}
                                        datalevel={[...this.datalevel, _index]}
                                        data={item.comments}
                                        setreplaylevel={this.setreplaylevel}
                                        seteditlevel={this.seteditlevel}
                                        editlevel={this.editlevel}
                                        oneditcomment={this.oneditcomment}
                                        user={this.user}
                                    ></app-comment>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        );
    }
});
