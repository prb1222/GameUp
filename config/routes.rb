Rails.application.routes.draw do
  resources :users
  resource :session, only: [:new, :create, :destroy]
  namespace :api do
    resources :groups, only: [:create, :update, :destroy, :index, :show]
  end
end
