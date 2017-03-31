module View.StatusForm exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Model.UserSettings as UserSettings
import Msg.Main as Main exposing (..)
import Msg.UserSettings exposing (..)


view : UserSettings.Model -> Html Main.Msg
view userSettings =
    Html.form [ onSubmit (MsgForUserSettings SetStatusMessage) ]
        [ input
            [ type_ "text"
            , placeholder "Your status"
            , onInput (MsgForUserSettings << StatusMessage)
            , value userSettings.statusMessage
            ]
            []
        , input [ type_ "submit", value "Set status message" ] []
        ]
