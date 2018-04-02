Geocoder.configure(:lookup => :google, :api_key => "AIzaSyC7qxk1lv03jlFc-XwItY5f5bSGmw7zHl8", :use_https => true)
Geocoder::Configuration.timeout = 15
Geocoder.configure(ip_lookup: :telize)
Geocoder.configure(:always_raise => :all)
