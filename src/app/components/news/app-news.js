Vue.component("app-news", {
    data() {
        return {
            news: [],
            loading: false,
            newNewsLoading: false
        };
    },
    props: {
        user: {
            type: String,
            required: true
        },
        addednews: {
            type: Object,
            required: true
        }
    },
    created() {
        const _this = this;
        console.log("created app-news", this);
        this.getAllNewsData();
        this.$watch("addednews", async (newV, oldV) => {
            this.newNewsLoading = true;
            const res = await this.http().addNews(newV);
            this.news = [...this.news, res];
            this.newNewsLoading = false;
            _this.$forceUpdate();
        });
    },
    methods: {
        getAllNewsData: function() {
            console.log("inside getAllApi Call", this);
            this.loading = true;
            this.http()
                .getAllNews()
                .then(res => {
                    this.news = res;
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                });
        },
        deleteNews: function(news) {
            console.log(news);
            const _confirm = confirm("Confirm to Delete?");
            if (_confirm) {
                this.http().deleteNews(news._id);
                const index = this.news.map(i => i._id).indexOf(news._id);
                this.news.splice(index, 1);
            }
        }
    },
    render: function render(h) {
        console.log("hello-->", this.news);
        return (
            <div class="app-news">
                {this.newNewsLoading && <app-news-item-skeleton />}
                {!this.loading && this.news && this.news.length > 0 && (
                    <div class="_news-list slide-to-top">
                        {this.news.map((news, index) => (
                            <app-news-item
                                key={index + "news"}
                                news={news}
                                deletenews={this.deleteNews}
                                user={this.user}
                            />
                        ))}
                    </div>
                )}
                {this.loading && <app-news-item-skeleton />}
            </div>
        );
    }
});
