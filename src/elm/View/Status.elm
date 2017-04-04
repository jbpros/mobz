module View.Status exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit, onClick)
import Model.UserSettings as UserSettings
import Model.Status as Status
import View.StatusForm as StatusForm exposing (view)
import View.StatusMessage as StatusMessage exposing (view)
import Msg.Main exposing (..)
import Msg.Status


view : UserSettings.Model -> Status.Model -> Html Msg
view userSettings status =
    let
        ( statusStr, toggleStatus, toggleLabel ) =
            case status of
                Status.Active ->
                    ( "active", Msg.Status.SetInactive, "Stop paying attention" )

                Status.Inactive ->
                    ( "inactive", Msg.Status.SetActive, "Pay attention" )
    in
        div []
            [ p []
                [ text "You are currently "
                , text statusStr
                , StatusMessage.view userSettings.statusMessage
                ]
            , button [ onClick (MsgForStatus toggleStatus) ]
                [ text toggleLabel ]
            , StatusForm.view userSettings
            ]
