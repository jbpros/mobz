module Model.Users exposing (..)

import Model.Status as Status exposing (Model)


type alias User =
    { email : String
    , status : Status.Model
    }


type alias Model =
    List User
