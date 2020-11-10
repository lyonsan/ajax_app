function memo() {
  //id="submit"のところをクリックした時にイベント発火させるため、取得する
  const submit = document.getElementById("submit");
  //クリックした時のイベントを定義
  submit.addEventListener("click", (e) => {
    //form_withのフォームに入力された値を取得し、変数formDataに代入する
    const formData = new FormData(document.getElementById("form"));
    //リクエストを出す
    const XHR = new XMLHttpRequest();
    //trueは非同期通信がtrueという意味
    XHR.open("POST", `/posts`, true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      //HTMLを描画する場所としてid=listを取得している
      const list = document.getElementById("list");
      //text_fieldに入力されcontentとして読み込まれたテキストを取得している
      const formText = document.getElementById("content");
      //取得されてきたデータを新たに表示するための記述
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      //id=listの部分に上で設定したHTMLをいれる
      list.insertAdjacentHTML("afterend", HTML);
      //テキスト入力欄は空欄にしておく
      formText.value = "";
    };
    //標準装備されているイベントのsubmitボタンでクリックを妨げることで、リロードした時に投稿されなくする
    e.preventDefault()
  });
}
//memoファンクションがページをロードした時にイベント発火する
window.addEventListener("load", memo);