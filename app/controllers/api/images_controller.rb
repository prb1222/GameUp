class Api::ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)
    @image.image_url = Image.first.image_url unless @image.image_url
    if @image.save
      render json: @image
    else
      render json: @image.errors.full_messages, status: 422
    end
  end

  def update
    @image = Image.find(params[:id])
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors.full_messages
    end
  end

  def index
    @images = Image.all
    render :index
  end

  def destroy
    image = Image.find(params[:id])
    image.destroy
    render json: image
  end

  private

  def image_params
    params.require(:image).permit(:imageable_id, :imageable_type, :image_url)
  end

end
