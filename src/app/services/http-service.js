Vue.mixin({
    methods: {
        http: () => {
            return {
                getAllNews: async () => {
                    console.log("called getAllNews");
                    const res = await fetch(
                        "http://localhost:3002/api/news"
                    ).then(res => res.json());
                    return res;
                },
                deleteNews: async newsId => {
                    console.log("called deleteNews");
                    const res = await fetch(
                        "http://localhost:3002/api/news/" + newsId,
                        {
                            method: "DELETE"
                        }
                    ).then(res => res.json());
                    return res;
                },
                addNews: async body => {
                    console.log("called getAllNews");
                    const res = await fetch("http://localhost:3002/api/news", {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json"
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).then(res => res.json());
                    return res;
                },
                getComments: async newsId => {
                    console.log("called getComments");
                    const res = await fetch(
                        "http://localhost:3002/api/comments/" + newsId
                    ).then(res => res.json());
                    return res;
                },
                addComments: async (newsId, body) => {
                    console.log("called addComments");
                    const res = await fetch(
                        "http://localhost:3002/api/comments/" + newsId,
                        {
                            method: "POST",
                            body: JSON.stringify(body),
                            headers: {
                                "Content-Type": "application/json"
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        }
                    ).then(res => res.json());
                    return res;
                },
                editComment: async (newsId, commentId, body) => {
                    console.log("called editComment");
                    const res = await fetch(
                        "http://localhost:3002/api/comments/" +
                            newsId +
                            "/" +
                            commentId,
                        {
                            method: "PUT",
                            body: JSON.stringify(body),
                            headers: {
                                "Content-Type": "application/json"
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        }
                    ).then(res => res.json());
                    return res;
                },
                addUser: async name => {
                    console.log("called editComment");
                    const res = await fetch(
                        "http://localhost:3002/api/users/",
                        {
                            method: "POST",
                            body: JSON.stringify({ name }),
                            headers: {
                                "Content-Type": "application/json"
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        }
                    ).then(res => res.json());
                    return res;
                },
                getUsers: async name => {
                    console.log("called getUsers");
                    const res = await fetch(
                        "http://localhost:3002/api/users/"
                    ).then(res => res.json());
                    return res;
                },
                deleteComments: async newsId => {
                    console.log("called editComment");
                    const res = await fetch(
                        "http://localhost:3002/api/comments/" + newsId,
                        {
                            method: "DELETE"
                        }
                    ).then(res => res.json());
                    return res;
                }
            };
        }
    }
});
