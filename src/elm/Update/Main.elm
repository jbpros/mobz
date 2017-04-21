module Update.Main exposing (..)

import Update.UserSettings as UserSettings exposing (update)
import Update.Status as Status exposing (update)
import Update.Users as Users exposing (update)
import Model.Main exposing (..)
import Msg.Main exposing (..)


updateWithCmd : Msg -> Model -> ( Model, Cmd Msg )
updateWithCmd msg model =
    -- just like composed redux reducers:
    ( { model
        | userSettings = (UserSettings.update msg model.userSettings)
        , status = (Status.update msg model.status)
        , users = (Users.update msg model.users)
      }
    , cmd msg model
    )


cmd : Msg -> Model -> Cmd msg
cmd msg model =
    Cmd.none
