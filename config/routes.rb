Rails.application.routes.draw do
  root to: 'staticpages#root'
  resources :users
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resources :groups, only: [:create, :update, :destroy, :index, :show]
    resources :events, only: [:create, :update, :destroy, :index, :show]
    resources :group_memberships, only: [:create, :destroy]
    resources :event_attendees, only: [:create, :destroy]
  end
end
