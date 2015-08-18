Rails.application.routes.draw do
  root to: 'staticpages#root'
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :update, :destroy, :index]
    resources :groups, only: [:create, :update, :destroy, :index, :show]
    resources :events, only: [:create, :update, :destroy, :index, :show]
    resources :group_memberships, only: [:create, :destroy]
    resources :event_attendees, only: [:create, :destroy]
    resources :comments, only: [:create, :update, :destroy, :index]
    resources :images, only: [:create, :update, :destroy, :index, :show]
  end
end
