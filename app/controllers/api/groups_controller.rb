class Api::GroupsController < ApplicationController
  def create
    group = Group.new(group_params)
    location = Geocoder.search(params[:group][:location]).first
    if location
      group.city = location.city
      group.state = location.state_code
    else
      render json: "Unable to find location", status: 422
      return
    end
    group.owner_id = current_user.id
    if group.save
      GroupMembership.create!(user_id: current_user.id, group_id: group.id)
      find_genres.each do |genre|
        GenreTagging.create!(taggable_id: group.id,
                            taggable_type: "Group",
                            genre_id: genre.id)
      end
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
      @groups = current_user.groups
    elsif params[:flag] == "other"
      u_set = Set.new(current_user.genres)
      @groups = Group.near(current_user.location, params[:distance])
                     .where.not(id: current_user.groups)
                     .includes(:genres)
      # the main search feature here uses #includes in the previous line in order to fetch genre data with the groups
      # this allows iteration over the ActiveRecord Relation without querying the database
      @groups.each do |group|
        g_set = Set.new(group.genres)
        group.rank = (u_set & g_set).length
      end
    else
      @groups = Group.all
    end
    render :sorted_index
  end

  def update
    group = Group.find(params[:id])
    location = Geocoder.search(params[:group][:location]).first
    if location
      group.city = location.city
      group.state = location.state_code
    elsif !location && !group.location
      render json: "Unable to find location", status: 422
      return;
    end
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
    params.require(:group).permit(:title, :description, :member_name, :profile_id, :jumbo_id)
  end

  def find_genres
    regex = /[[:graph:]]+/
    Genre.where(name: params[:group][:genres].scan(regex))
  end
end
