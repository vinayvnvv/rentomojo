Vue.mixin({
    methods: {
        utils: () => {
            return {
                formatComments: json => {
                    const output = [];
                    function addComentAtChild(arr, index, comment) {
                        if (index === comment.level.length - 1) {
                            if (
                                arr[comment.level[index]] &&
                                arr[comment.level[index]].comments
                            ) {
                                comment.comments =
                                    arr[comment.level[index]].comments;
                            }
                            arr[comment.level[index]] = comment;
                            return;
                        } else {
                            if (!arr[comment.level[index]]) {
                                arr[comment.level[index]] = {};
                            }
                            if (!arr[comment.level[index]].comments) {
                                arr[comment.level[index]]["comments"] = [];
                            }
                            addComentAtChild(
                                arr[comment.level[index]].comments,
                                index + 1,
                                comment
                            );
                        }
                    }
                    json.forEach((comment, index) => {
                        addComentAtChild(output, 0, comment);
                    });
                    return output;
                }
            };
        }
    }
});
