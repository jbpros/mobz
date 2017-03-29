module Update.Main exposing (..)

import Update.UserSettings as UserSettings exposing (update)
import Update.Status as Status exposing (update)
import Model.Main exposing (..)
import Msg.Main exposing (..)


updateWithCmd : Msg -> Model -> ( Model, Cmd Msg )
updateWithCmd msg model =
    ( { model
        | userSettings = (UserSettings.update msg model.userSettings)
        , status = (Status.update msg model.status)
      }
    , Cmd.none
    )
