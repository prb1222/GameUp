class Api::EventAttendeesController < ApplicationController
  def create
    event_attendee = EventAttendee.new(event_attendee_params)
    event_attendee.user_id = current_user.id
    if event_attendee.save
      render json: event_attendee
    else
      render json: event_attendee.errors.full_messages, status: 422
    end
  end

  def destroy
    event_attendee = EventAttendee.find(params[:id])
    event_attendee.destroy
    render json: event_attendee
  end

  private

  def event_attendee_params
    params.require(:event_attendee).permit(:event_id)
  end
end
