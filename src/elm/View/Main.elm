module View.Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model.Main exposing (..)
import Msg.Main exposing (..)
import View.App as App exposing (view)
import View.LoginForm as LoginForm exposing (view)


view : Model -> Html Msg
view model =
    div [ class "block border circle border-darken" ]
        [ LoginForm.view model.userSettings
        , App.view model
        ]
