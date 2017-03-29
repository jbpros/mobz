module Update.UserSettings exposing (update)

import Model.Main exposing (..)
import Model.UserSettings exposing (UserSettings)
import Msg.Main exposing (..)


update : Msg -> UserSettings -> UserSettings
update msg userSettings =
    case msg of
        Email email ->
            { userSettings | email = email }

        StatusMessage statusMessage ->
            { userSettings | statusMessage = statusMessage }

        Login ->
            { userSettings | ready = True }

        _ ->
            userSettings
