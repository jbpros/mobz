module Model.Main exposing (..)


type alias Model =
    { userSettings : UserSettings
    , status : Status
    }


type alias UserSettings =
    { email : String
    , statusMessage : String
    , ready : Bool
    }


type Status
    = Active
    | Inactive
