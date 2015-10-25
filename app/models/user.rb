class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, :location, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password
  geocoded_by :location
  after_validation :geocode

  after_initialize :ensure_session_token, :ensure_image

  has_many(:owned_groups,
             primary_key: :id,
             foreign_key: :owner_id,
             class_name: :Group,
             dependent: :destroy)
  has_many :events, primary_key: :id, foreign_key: :organizer_id, class_name: :Event
  has_many :group_memberships, primary_key: :id, foreign_key: :user_id, class_name: :GroupMembership, dependent: :destroy
  has_many :member_groups, through: :group_memberships, source: :group
  has_many :event_attendees, primary_key: :id, foreign_key: :user_id, class_name: :EventAttendee, dependent: :destroy
  has_many :attending_events, through: :event_attendees, source: :event
  has_many :comments, dependent: :destroy
  has_many :commented_events, through: :comments, source: :event
  has_one :image, as: :imageable, dependent: :destroy
  has_many :genre_taggings, as: :taggable
  has_many :genres, through: :genre_taggings, source: :genre

  def ensure_image
    self.image ||= Image.new(image_url: Image.default_user_url)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def groups
    Group.where(id: (member_groups + owned_groups).map(&:id))
  end

  def next_event
    attending_events.where("date > ?", Time.now).order(:date).first.jumbo_info
  end

  def num_my_events
    attending_events.where("date > ?", Time.now).count
  end

  def num_nearby_events
    Group.near(location, 20).map(&:events).flatten.count
  end
end
