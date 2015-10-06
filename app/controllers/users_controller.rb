class UsersController < ApplicationController
  before_action :require_logged_out!, only: [:new, :create]
  before_action :require_logged_in!, only: [:show]

  def new
    @user = User.new
    begin
      @user.location = request.location.data['city']
    rescue SocketError => e
      @user.location = "Got here! #{e.to_s}"
      flash.now[:errors] = [e.to_s]
    rescue TimeoutError => e
      @user.location = "Got here! #{e.to_s}"
      flash.now[:errors] = [e.to_s]
    rescue Geocoder::OverQueryLimitError => e
      @user.location = "Got here! #{e.to_s}"
      flash.now[:errors] = [e.to_s]
    rescue Geocoder::RequestDenied => e
      @user.location = "Got here! #{e.to_s}"
      flash.now[:errors] = [e.to_s]
    rescue Geocoder::InvalidRequest => e
      @user.location = "Got here! #{e.to_s}"
      flash.now[:errors] = [e.to_s]
    rescue Geocoder::InvalidApiKey => e
      @user.location = "Got here! #{e.to_s}"
      flash.now[:errors] = [e.to_s]
    rescue Geocoder::ServiceUnavailable => e
      @user.location = "Got here! #{e.to_s}"
      flash.now[:errors] = [e.to_s]
    end
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
