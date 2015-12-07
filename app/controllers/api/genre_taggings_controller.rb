class Api::GenreTaggingsController < ApplicationController

  def destroy
    genre_tagging = GenreTagging.find(params[:id])
    genre_tagging.destroy
    render json: genre_tagging
  end

  private

  def genre_id
    params.require(:genre_tagging).permit(:genre_id)
  end
end
