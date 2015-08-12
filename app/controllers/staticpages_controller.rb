class StaticpagesController < ApplicationController
  before_action :require_logged_in!
  def root
    render :root
  end
end
