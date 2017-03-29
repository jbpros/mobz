module View.LoginForm exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit, onClick)
import Model.UserSettings exposing (UserSettings)
import Msg.Main exposing (..)


view : UserSettings -> Html Msg
view userSettings =
    if not userSettings.ready then
        Html.form [ onSubmit Login ]
            [ input [ type_ "email", placeholder "Email", onInput Email, value userSettings.email ] []
            , input [ type_ "submit", value "Go" ] []
            ]
    else
        text ""
