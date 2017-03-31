module Model.UserSettings exposing (..)


type alias Model =
    { email : String
    , statusMessage : String
    , ready : Bool
    }


model : Model
model =
    Model "" "" False
