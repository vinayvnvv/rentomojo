Vue.component("app-news-item", {
    data() {
        return {
            isCommentSection: false,
            seeMore: false,
            data: [],
            replayLevel: [],
            editLevel: [],
            loading: false
        };
    },
    props: {
        news: {
            type: Object,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        deletenews: {
            type: String,
            required: true
        }
    },
    methods: {
        onShowCommentClick: function() {
            console.log("onShowCommentClick");
            if (!this.isCommentSection) this.getCommentsData();
            this.isCommentSection = true;
        },
        onSeeMore: function() {
            this.seeMore = true;
        },
        getCommentsData: function() {
            this.loading = true;
            this.http()
                .getComments(this.news._id)
                .then(res => {
                    this.loading = false;
                    this.data = res;
                })
                .catch(err => {
                    this.loading = false;
                });
        },
        resolveCommentIds: function(comment, data) {
            console.log("resolveCommentThread", comment);
            const index = this.data
                .map(i => i.level.toString())
                .indexOf(comment.level.toString());
            if (index !== -1) {
                data[index]._id = comment._id;
            }
        },
        onAddComment: async function(level, value, data) {
            const _this = this;
            console.log("onAddComment", level, value, data);
            const comment = {
                level: level,
                name: this.user,
                text: value,
                date: new Date().toISOString()
            };
            this.data = [...this.data, comment];
            console.log(this.data);
            const res = await this.http().addComments(this.news._id, comment);
            this.resolveCommentIds(res, _this.data);
            _this.$forceUpdate();
        },
        setReplayLevel: function(level) {
            this.replayLevel = level;
            this.editLevel = [];
        },
        setEditLevel: function(level) {
            this.editLevel = level;
            this.replayLevel = [];
        },
        onEditComment: function(item, value) {
            console.log("onEditComment", item);
            this.http().editComment(this.news._id, item._id, { text: value });
            const level = item.level;
            const index = this.data
                .map(i => i.level.toString())
                .indexOf(level.toString());
            if (index !== -1) this.data[index].text = value;
            this.editLevel = [];
        },
        deleteComments: function() {
            const _confirm = confirm("Are Sure To Delete?");
            if (_confirm) {
                this.data = [];
                this.http().deleteComments(this.news._id);
            }
        }
    },
    created() {
        console.log("created app-news-item", this.news);
    },
    render: function(h) {
        const { body, banner, date, author } = this.news;
        const { isCommentSection } = this;
        let wrapped = false;
        let bodyText = body;
        if (!this.seeMore && body && body.length > 400) {
            wrapped = true;
            bodyText = body.substring(0, 400) + " ...";
        }
        const _data = this.utils().formatComments(this.data);
        return (
            <div class="app-news-item">
                <div class={"_card" + (!this.news._id ? " _disabled " : "")}>
                    {banner && <img class="_avtr" src={banner} />}
                    <div class={"_content " + (!banner ? "_no-banner" : "")}>
                        <div class="_ttl">{this.news.title}</div>
                        <div class="_info">
                            <div>
                                {window["moment"](new Date(date)).fromNow()}
                            </div>
                            <div>·</div>
                            <div>
                                By <b>{author}</b>
                            </div>
                        </div>
                        <div class="_body">
                            {bodyText}{" "}
                            {wrapped ? (
                                <span class="_more" onClick={this.onSeeMore}>
                                    {" "}
                                    (See More)
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                        <div class="_cmt-tlbr">
                            <button
                                class="btn cmt-btn"
                                onClick={this.onShowCommentClick}
                            >
                                <i class="material-icons">mode_comment</i>
                                <span>Comment</span>
                            </button>
                            {this.user === author && (
                                <span class="_cnt">
                                    <button
                                        onClick={() =>
                                            this.deletenews(this.news)
                                        }
                                    >
                                        Delete
                                    </button>
                                </span>
                            )}
                            {isCommentSection && !this.loading && (
                                <span class="_cnt">
                                    {this.data.length > 0
                                        ? this.data.length + " Comments"
                                        : "No Comments"}
                                </span>
                            )}
                        </div>
                        {isCommentSection && (
                            <div class="_comment-section">
                                {!this.loading &&
                                    this.data.length > 0 &&
                                    this.user === author && (
                                        <div class="_del">
                                            <button
                                                onClick={this.deleteComments}
                                            >
                                                Delete All Comments
                                            </button>
                                        </div>
                                    )}
                                {!this.loading ? (
                                    <app-comment
                                        level={0}
                                        datalevel={[]}
                                        data={_data}
                                        replaylevel={this.replayLevel}
                                        setreplaylevel={this.setReplayLevel}
                                        onaddcomment={this.onAddComment}
                                        editlevel={this.editLevel}
                                        seteditlevel={this.setEditLevel}
                                        oneditcomment={this.onEditComment}
                                        user={this.user}
                                    />
                                ) : (
                                    <div class="spinner-outlet">
                                        <app-spinner />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
});
