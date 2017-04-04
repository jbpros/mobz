module View.App exposing (view)

import Html exposing (..)
import Html.Events exposing (onInput, onSubmit, onClick)
import Model.Main exposing (..)
import Model.Status as Status
import Msg.Main exposing (..)
import View.Gravatar as Gravatar exposing (view)
import View.Status as Status exposing (view)


view : Model -> Html Msg
view model =
    if model.userSettings.ready then
        div []
            [ h1 []
                [ text "Welcome to mobz, "
                , text model.userSettings.email
                , text "!"
                ]
            , Gravatar.view model.userSettings.email
            , Status.view model.userSettings model.status
            ]
    else
        text ""
