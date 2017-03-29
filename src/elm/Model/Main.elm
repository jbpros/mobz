module Model.Main exposing (..)

import Model.Status exposing (Status)
import Model.UserSettings exposing (UserSettings)


type alias Model =
    { userSettings : UserSettings
    , status : Status
    }
