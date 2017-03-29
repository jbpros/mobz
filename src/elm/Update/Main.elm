module Update.Main exposing (..)

import Model.Main exposing (..)
import Msg.Main exposing (..)


updateWithCmd : Msg -> Model -> ( Model, Cmd Msg )
updateWithCmd msg model =
    ( { model
        | userSettings = (updateUserSettings msg model.userSettings)
        , status = (updateStatus msg model.status)
      }
    , Cmd.none
    )


updateStatus : Msg -> Status -> Status
updateStatus msg status =
    case msg of
        Email email ->
            status

        StatusMessage statusMessage ->
            status

        Login ->
            status

        SetInactive ->
            -- TODO: tell backend
            Inactive

        SetActive ->
            -- TODO: tell backend
            Active

        SetStatusMessage ->
            -- TODO: tell backend
            status


updateUserSettings : Msg -> UserSettings -> UserSettings
updateUserSettings msg userSettings =
    case msg of
        Email email ->
            { userSettings | email = email }

        StatusMessage statusMessage ->
            { userSettings | statusMessage = statusMessage }

        Login ->
            { userSettings | ready = True }

        -- TODO: tell backend
        SetInactive ->
            userSettings

        -- TODO: tell backend
        SetActive ->
            userSettings

        -- TODO: tell backend
        SetStatusMessage ->
            userSettings
