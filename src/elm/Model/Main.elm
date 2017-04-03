module Model.Main exposing (..)

import Model.Status as Status
import Model.UserSettings as UserSettings


type alias Model =
    { userSettings : UserSettings.Model
    , status : Status.Model
    }
