var postUrl = "http://localhost:3000/posts";
var commentUrl = "http://localhost:3000/comments";
var postGlobal;
var commentGlobal;

// Hàm Load dữ liệu bài viết và comment
function Load() {
    fetchAllPosts();
    fetchAllComments();
}

// Hàm so sánh hai bài viết
function ComparePosts(a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
        return 1;
    }
    return -1;
}

// Hàm so sánh hai comment
function CompareComments(a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
        return 1;
    }
    return -1;
}

// Hàm lấy ID lớn nhất của bài viết
function getMaxPostID() {
    let ids = postGlobal.map(element => element.id);
    return Math.max(...ids);
}

// Hàm lấy ID lớn nhất của comment
function getMaxCommentID() {
    let ids = commentGlobal.map(element => element.id);
    return Math.max(...ids);
}

// Hàm kiểm tra sự tồn tại của một bài viết dựa trên ID
function checkPostExist(id) {
    let ids = postGlobal.map(element => element.id);
    return ids.includes(id + "");
}

// Hàm kiểm tra sự tồn tại của một comment dựa trên ID
function checkCommentExist(id) {
    let ids = commentGlobal.map(element => element.id);
    return ids.includes(id + "");
}

// Hàm lấy tất cả bài viết
function fetchAllPosts() {
    fetch(postUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(posts) {
            postGlobal = posts;
            posts.sort(ComparePosts);
            renderPosts(posts);
        });
}

// Hàm lấy tất cả comment
function fetchAllComments() {
    fetch(commentUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(comments) {
            commentGlobal = comments;
            comments.sort(CompareComments);
            renderComments(comments);
        });
}
// Hàm tạo mới bài viết
function createPost(postData) {
    fetch(postUrl, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function() {
        Load();
    });
}

// Hàm cập nhật bài viết
function updatePost(postData, postId) {
    fetch(postUrl + "/" + postId, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function() {
        Load();
    });
}

// Hàm xóa bài viết
function deletePost(postId) {
    fetch(postUrl + "/" + postId, {
        method: 'DELETE'
    })
    .then(function() {
        Load();
    });
}

// Hàm tạo mới comment
function createComment(commentData) {
    fetch(commentUrl, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function() {
        Load();
    });
}

// Hàm cập nhật comment
function updateComment(commentData, commentId) {
    fetch(commentUrl + "/" + commentId, {
        method: 'PUT',
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function() {
        Load();
    });
}

// Hàm xóa comment
function deleteComment(commentId) {
    fetch(commentUrl + "/" + commentId, {
        method: 'DELETE'
    })
    .then(function() {
        Load();
    });
}



