class Api::GenresController < ApplicationController
  def index
    @genres = Genre.all
    render json: @genres
  end

  def show
    @genre = Genre.find(params[:id])
    render json: @genre
  end

  def create
    genres_array = params[:genreArray].split(", ")
    genres = Genre.where(name: genres_array)
    type = params[:modelType].constantize
    id = params[:modelId].to_i
    model = type.find(id)
    model.genre_taggings.where.not(genre_id: genres.pluck(:id)).destroy_all
    new_genres = genres.where.not(id: model.genre_taggings.pluck(:genre_id))
    new_genres.each do |genre|
      model.genre_taggings.create!(genre_id: genre.id)
    end

    render json: genres
  end
end
