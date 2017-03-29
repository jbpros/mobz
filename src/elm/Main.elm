module Main exposing (..)

import Html exposing (..)
import Update.Main exposing (updateWithCmd)
import Model.Main exposing (..)
import Model.Status exposing (..)
import Model.UserSettings exposing (UserSettings)
import Msg.Main exposing (Msg)
import View.Main exposing (view)


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = updateWithCmd
        , subscriptions = \_ -> Sub.none
        , view = view
        }


init : ( Model, Cmd msg )
init =
    ( Model (UserSettings "" "" False) Active, Cmd.none )
