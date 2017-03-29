module Model.UserSettings exposing (UserSettings)


type alias UserSettings =
    { email : String
    , statusMessage : String
    , ready : Bool
    }
