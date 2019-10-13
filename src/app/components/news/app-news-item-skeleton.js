Vue.component("app-news-item-skeleton", {
    render(h) {
        return (
            <div class="app-news-item-skeleton">
                <div class="_avtr" />
                <div class="_ttl skltn" />
                <div class="_bdy">
                    {[0, 1, 2, 3].map(() => (
                        <div class="skltn" />
                    ))}
                </div>
            </div>
        );
    }
});
