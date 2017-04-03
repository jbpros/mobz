module Update.Status exposing (update)

import Model.Status exposing (Model)
import Msg.Main as Main exposing (..)
import Msg.Status as Status exposing (..)


update : Main.Msg -> Model -> Model
update msgFor status =
    case msgFor of
        MsgForStatus msg ->
            updateStatus msg status

        _ ->
            status


updateStatus : Status.Msg -> Model -> Model
updateStatus msg status =
    case msg of
        SetInactive ->
            -- TODO: tell backend
            Model.Status.Inactive

        SetActive ->
            -- TODO: tell backend
            Model.Status.Active
