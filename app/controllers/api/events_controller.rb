class Api::EventsController < ApplicationController

  def create
    event = Event.new(event_params)
    event.organizer_id = current_user.id
    event.date = parse_datetime(params[:event][:date], params[:event][:time])
    location = Geocoder.search(params[:event][:location]).first
    unless location.nil?
      event.address = location.street_address
      event.city = location.city
      event.state = location.state_code
    end

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
    if params[:flag] == "myUpcomingEvents"
      events = current_user.attending_events.where('date > ?', Time.now)
    elsif params[:flag] == "myPastEvents"
      events = current_user.attending_events.where('date < ?', Time.now)
    elsif params[:flag] == "myEventsAll"
      events = current_user.attending_events
    elsif params[:flag] == "upcomingEvents"
      events = current_user.groups.map(&:events).map{|events| events.where('date > ?', Time.now)}.flatten
    elsif params[:flag] == "groupUpcomingEvents"
      group = Group.find(params[:groupId])
      events = group.events.where('date > ?', Time.now)
    elsif params[:flag] == "groupPastEvents"
      group = Group.find(params[:groupId])
      events = group.events.where('date < ?', Time.now)
    else
      events = Event.all
    end
    render json: events
  end

  def update
    event = Event.find(params[:id])
    event.date = parse_datetime(params[:event][:date], params[:event][:time])
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
    if date_string.empty? || time_string.empty?
      return
    end
    date_arr = date_string.split("-")
    date_arr.concat(time_string.split(":"))
    Time.new(*date_arr)
  end

  def event_params
    params.require(:event).permit(:group_id,
                                  :title,
                                  :description)
  end
end
