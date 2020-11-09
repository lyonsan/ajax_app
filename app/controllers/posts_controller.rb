class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end
  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    #checkedはboolean型なので、post.checkedとすることで論理演算子にできる
    if post.checked
      #既読状態を解除するためにcheckをfalseへ変更
      post.update(checked: false)
    else
      #既読状態にするためにcheckをtrueへ変更
      post.update(checked: true)
    end
    #更新したレコード取得し直し
    item = Post.find(params[:id])
    #JSON形式（データ）としてchecked.jsに返却
    render json: { post: item}
  end
end
