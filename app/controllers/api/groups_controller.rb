class Api::GroupsController < ApplicationController
  def create
    group = Group.new(group_params)
    group.owner_id = current_user.id
    if group.save
      GroupMembership.create!(user_id: current_user.id, group_id: group.id)
      render json: group
    else
      render json: group.errors.full_messages, status: 422
    end
  end

  def show
    @group = Group.find(params[:id])
    render :show
  end

  def index
    if params[:flag] == "mine"
      groups = current_user.groups
    elsif params[:flag] == "other"
      groups = Group.where.not(id: current_user.groups)
    else
      groups = Group.all
    end
    render json: groups
  end

  def update
    group = Group.find(params[:id])
    if group.update(group_params)
      render json: group
    else
      render json: group.errors.full_messages, status: 422
    end
  end

  def destroy
    group = Group.find(params[:id])
    GroupMembership.where(group_id: group.id).destroy_all
    group.events.destroy_all
    group.destroy
    render json: group
  end

  private

  def group_params
    params.require(:group).permit(:title, :location, :description, :member_name)
  end
end
