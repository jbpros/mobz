module View.App exposing (view)

import Html exposing (..)
import Html.Events exposing (onInput, onSubmit, onClick)
import Model.Main exposing (..)
import Model.Status exposing (..)
import Msg.Main as Main exposing (..)
import Msg.Status exposing (..)
import View.Gravatar as Gravatar exposing (view)
import View.StatusForm as StatusForm exposing (view)
import View.StatusMessage as StatusMessage exposing (view)


view : Model.Main.Model -> Html Main.Msg
view model =
    let
        ( status, toggleStatus, toggleLabel ) =
            case model.status of
                Active ->
                    ( "active", SetInactive, "Stop paying attention" )

                Inactive ->
                    ( "inactive", SetActive, "Pay attention" )
    in
        if model.userSettings.ready then
            div []
                [ h1 []
                    [ text "Welcome to mobz, "
                    , text model.userSettings.email
                    , text "!"
                    ]
                , Gravatar.view model.userSettings.email
                , p []
                    [ text "You are currently "
                    , text status
                    , StatusMessage.view model.userSettings.statusMessage
                    ]
                , button [ onClick (Main.MsgForStatus toggleStatus) ]
                    [ text toggleLabel ]
                , StatusForm.view model.userSettings
                ]
        else
            text ""
