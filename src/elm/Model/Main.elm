module Model.Main exposing (..)

import Model.Status exposing (Status)
import Model.UserSettings as UserSettings


type alias Model =
    { userSettings : UserSettings.Model
    , status : Status
    }
