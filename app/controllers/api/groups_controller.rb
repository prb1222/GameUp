class Api::GroupsController < ApplicationController
  def create
    group = Group.new(group_params)
    group.owner_id = current_user.id
    if group.save
      render json: group
    else
      render json: group.errors.full_messages, status: 422
    end
  end

  def show
    group = Group.find(params[:id])
    render json: group
  end

  def index
    groups = Group.all
    render json: groups
  end

  def update
  end

  def destroy
  end

  private

  def group_params
    params.require(:group).permit(:title, :location, :description, :member_name)
  end
end
