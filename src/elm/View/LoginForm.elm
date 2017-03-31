module View.LoginForm exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit, onClick)
import Model.UserSettings as UserSettings
import Msg.Main as Main exposing (..)
import Msg.UserSettings exposing (..)


view : UserSettings.Model -> Html Main.Msg
view userSettings =
    if not userSettings.ready then
        Html.form
            [ onSubmit (MsgForUserSettings Login) ]
            [ input
                [ type_ "email"
                , placeholder "Email"
                , onInput (MsgForUserSettings << Email)
                , value userSettings.email
                ]
                []
            , input [ type_ "submit", value "Go" ] []
            ]
    else
        text ""
