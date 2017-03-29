module View.StatusForm exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit, onClick)
import Model.Main exposing (..)
import Msg.Main exposing (..)


view : UserSettings -> Html Msg
view userSettings =
    Html.form [ onSubmit SetStatusMessage ]
        [ input
            [ type_ "text"
            , placeholder "Your status"
            , onInput StatusMessage
            , value userSettings.statusMessage
            ]
            []
        , input [ type_ "submit", value "Set status message" ] []
        ]
