class Api::UsersController < ApplicationController
  def index
    if params[:flag] == "groupMembers"
      group = Group.find(params[:groupId])
      @users = group.members
    elsif params[:flag] == "eventAttendees"
      event = Event.find(params[:eventId])
      @users = event.attendees
    else
      @users = User.all
    end
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: user.errors.full_messages, status: 422
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    render json: user
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
