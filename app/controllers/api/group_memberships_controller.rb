class Api::GroupMembershipsController < ApplicationController
  def create
    group_membership = GroupMembership.new(group_membership_params)
    group_membership.user_id = current_user.id
    if group_membership.save
      render json: group_membership
    else
      render json: group_membership.errors.full_messages, status: 422
    end
  end

  def destroy
    group_membership = GroupMembership.find(params[:id])
    group_membership.destroy
    render json: group_membership
  end

  private

  def group_membership_params
    params.require(:group_membership).permit(:group_id)
  end
end
