module View.App exposing (view)

import Html exposing (..)
import Html.Events exposing (onInput, onSubmit, onClick)
import Model.Main exposing (..)
import Model.Status as Status
import Msg.Main exposing (..)
import Msg.Status
import View.Gravatar as Gravatar exposing (view)
import View.StatusForm as StatusForm exposing (view)
import View.StatusMessage as StatusMessage exposing (view)


view : Model -> Html Msg
view model =
    let
        ( status, toggleStatus, toggleLabel ) =
            case model.status of
                Status.Active ->
                    ( "active", Msg.Status.SetInactive, "Stop paying attention" )

                Status.Inactive ->
                    ( "inactive", Msg.Status.SetActive, "Pay attention" )
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
                , button [ onClick (MsgForStatus toggleStatus) ]
                    [ text toggleLabel ]
                , StatusForm.view model.userSettings
                ]
        else
            text ""
