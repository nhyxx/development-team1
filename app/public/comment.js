const inputComments = document.querySelector("#commentForm");
const commentList = document.querySelector("#commentDisplayArea");
// const total = document.querySelector("h1 > span")
const list = [];


function Comment(content) {
    this.userid = "cloudnight";
    this.content = content;
    this.date = getCurrentDate();
}

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function createRow(comment, index) {
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const deleteButton = document.createElement("button");

    ul.append(li1);
    ul.append(li2);
    ul.append(li3);
    ul.append(deleteButton);

    ul.setAttribute("class", "comment-row");
    li1.setAttribute("class", "comment-id");
    li2.setAttribute("class", "comment-content");
    li3.setAttribute("class", "comment-date");
    deleteButton.setAttribute("class", "delete-button");

    li1.innerHTML = comment.userid;
    li2.innerHTML = comment.content;
    li3.innerHTML = comment.date;
    deleteButton.innerHTML = "X";

    deleteButton.setAttribute("data-index", index);

    return ul;
}

function drawing() {
    commentList.innerHTML = "";
    for (let i = list.length - 1; i >= 0 ; i--) {
        // const row = createRow(list[i].userid, list[i].content, list[i].date);
        const row = createRow(list[i]);
        commentList.append(row);
    }
}

function deleteComment(index) {
    list.splice(index, 1);
    drawing();
}

commentList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const index = parseInt(event.target.getAttribute("data-index"), 10);
        deleteComment(index);
    }
});

// function totalRecord() {
//     total.innerHTML = `(${list.length})`;
// }

function addComment(e) {
    e.preventDefault();
    const input = e.target.querySelector("#commentText");
    // const input = e.target.content;

    if (input.value == "") {
        alert("내용을 입력해 주세요.");
        return
    }
    const commentObj = new Comment(input.value);
    list.push(commentObj);

    // totalRecord();

    drawing();
    e.target.reset();

}


inputComments.addEventListener("submit", addComment);

// 댓글 구현 참고... https://cloudcoke.tistory.com/28h