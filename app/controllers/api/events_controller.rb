class Api::EventsController < ApplicationController

  def create
    event = Event.new(event_params)
    event.organizer_id = current_user.id
    event.date = parse_datetime(params[:event][:date], params[:event][:time])
    if event.save
      EventAttendee.create(user_id: current_user.id, event_id: event.id)
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

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event
    else
      render json: event.errors.full_messages, status: 422
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
    render json: event
  end

  private

  def parse_datetime(date_string, time_string)
    date_arr = date_string.split("-")
    date_arr.concat(time_string.split(":"))
    Time.new(*date_arr)
  end

  def event_params
    params.require(:event).permit(:group_id,
                                  :title,
                                  :description,
                                  :location)
  end
end
