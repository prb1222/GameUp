class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password
  after_initialize :ensure_session_token

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

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token = generate_session_token
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
    member_groups + owned_groups
  end
end
