Rails.application.routes.draw do
  root to: 'posts#index'
  #エンドポイントの設定
  #新しくメモ投稿するのでパラメーターは必要ない
  post 'posts', to: 'posts#create'
  #既読機能のために、メモのidというパラメーターを渡す必要があるため、pathパラメーター使っている
  get 'posts/:id', to: 'posts#checked'
end
