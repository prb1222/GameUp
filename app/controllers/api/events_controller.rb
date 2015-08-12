class Api::EventsController < ApplicationController

  def create
    event = Event.new(event_params)
    event.organizer_id = current_user.id
    event.date = Time.now;
    if event.save
      render json: event
    else
      render json: event.errors.full_messages, status: 422
    end
  end

  def show
    @event = Event.find(params[:id])
    render :show
  end

  def index
    groups = Event.all
    render json: groups
  end

  private

  def event_params
    params.require(:event).permit(:group_id,
                                  :title,
                                  :description,
                                  :location,
                                  :date)
  end
end
