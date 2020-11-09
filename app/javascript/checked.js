//投稿がクリックされた時に動作する処理
function check() {
  //index.html.erbのpostクラスを選択
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    //setIntervalだけだとその一秒間際限なくcheck関数が繰り返されてしまうので、食い止める記述をかく
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      //route.rbに設定したエンドポイントへのリクエスト処理を記述
      //メモのidを取得
      const postId = post.getAttribute("data-id")
      //XMLHttpRequestを設定し非同期通信でサーバーにHTTPリクエストを出せる
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      //レスっポンスとして欲しい情報の設定(今回はJSON)
      XHR.responseType = "json";
      //設定した情報をサーバーサイドへ送信する(初めてリクエストが行える)
      XHR.send();
      //レスっポンス帰ってきたあとのイベントハンドラー
      XHR.onload = () => {
        //レスポンスのステータスコードが200(処理の成功)以外だった場合にアラートを出す
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          //JSの処理から抜け出し、return null;以下の処理にいかないようにする
          return null;
        }
        //コントローラーのcheckアクションで返却したitemの取得
        //responseはレスポンスの内容を返すプロパティ
        //postはコントローラーのrender json:{ post: item }のハッシュのキーの名前
        const item = XHR.response.post;
        if (item.checked === true) {
          //既読であればdata-checkの属性値をtrueにする
          //data-check属性ない場合は追加する意味もありそう
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          //未読であればdata-checkの属性ごと削除する
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
//1秒(１０００ミリ秒)ごとに指定した関数を実行できる
//setIntervalは、そのスパンの間その関数(ここでいうcheck関数)を際限なく実行する
//そのためクリックしてイベント発火した一秒間は際限なくcheck関数が繰り返される状態になってしまう
setInterval(check, 1000);
window.addEventListener("load", check);