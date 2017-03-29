module Update.Status exposing (update)

import Model.Status exposing (..)
import Msg.Main exposing (..)


update : Msg -> Status -> Status
update msg status =
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
