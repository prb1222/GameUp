class UsersController < ApplicationController
  before_action :require_logged_out!, only: [:new, :create]
  before_action :require_logged_in!, only: [:show]

  def new
    @user = User.new
    begin
      request_data = request.location
      p request_data
      @user.location = "#{request_data.city}, #{request_data.state}"
    rescue
      @user.location = "San Francisco, CA"
    end
    @user.location ||= "San Francisco, CA"
    render :new
  end

  def create
    @user = User.new(user_params)
    @user.location = Geocoder.search(params[:user][:location]).first.city
    if @user.save
      login_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :bio)
  end
end
