class SessionsController < ApplicationController
  before_action :require_logged_out!, only: [:new, :create]

  def new
    redirect_to new_user_url
  end

  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      login_user!(@user)
      redirect_to root_url
    else
      flash[:errors] = ["Invalid login info!"]
      redirect_to root_url
    end
  end

  def destroy
    logout_user!
    redirect_to new_user_url
  end
end
