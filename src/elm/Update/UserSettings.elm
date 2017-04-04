module Update.UserSettings exposing (update)

import Model.UserSettings exposing (Model)
import Msg.Main as Main exposing (..)
import Msg.UserSettings as UserSettings exposing (..)


update : Main.Msg -> Model -> Model
update msgFor userSettings =
    case msgFor of
        MsgForUserSettings msg ->
            updateUserSettings msg userSettings

        _ ->
            userSettings


updateUserSettings : UserSettings.Msg -> Model -> Model
updateUserSettings msg userSettings =
    case msg of
        Email email ->
            { userSettings | email = email }

        StatusMessage statusMessage ->
            { userSettings | statusMessage = statusMessage }

        Login ->
            { userSettings | ready = True }

        _ ->
            userSettings
