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
    @group_membership = GroupMembership.find(params[:id])
    events = Event.where(group_id: @group_membership.group_id)
    user_event_attendees = EventAttendee.where(user_id: current_user.id, event_id: events)
    user_event_attendees.each{|event_attendee| event_attendee.destroy }
    @group_membership.destroy
    render json: @grup_membership
  end

  private

  def group_membership_params
    params.require(:group_membership).permit(:group_id)
  end
end
