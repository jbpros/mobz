module Model.User exposing (..)

import Model.Status as Status exposing (Model)


type alias Model =
    { email : String
    , status : Status.Model
    }
