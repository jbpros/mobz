module Main exposing (..)

import Html exposing (..)
import Update.Main exposing (updateWithCmd)
import Model.Main exposing (..)
import Model.Status as Status
import Model.UserSettings as UserSettings
import Msg.Main exposing (Msg)
import Msg.Server as Server
import View.Main exposing (view)
import WebSocket


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = updateWithCmd
        , subscriptions = subscriptions
        , view = view
        }


init : ( Model, Cmd msg )
init =
    ( Model
        (UserSettings.Model "" "" False)
        Status.Active
        []
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    WebSocket.listen "ws://localhost:8080" (Msg.Main.MsgFromServer << Server.NewMessage)
