class Api::GenreTaggingsController < ApplicationController
  # def create
  #   taggable_type = params[:genre_tagging][:taggable_type]
  #   taggable_id = params[:genre_tagging][:taggable_id]
  #   if (taggable_type == "User" && current_user.id == User.find(taggable_id)) ||
  #     (taggable_type == "Group" && current_user.id == Group.find(taggable_id).owner_id)
  #     genre_tagging = GenreTagging.create(params[:genre_tagging])
  #     render json: genre_tagging
  #   else
  #     render json: "Can't create genre tag for this object", status: 422
  #   end
  # The above code is unnecessary. As is the code in #destroy. All this needs to do is
  # accept a list of genres, a model id, and model type for a given model and
  # create those genre taggings
  end

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
