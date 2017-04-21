module Update.Users exposing (update)

import Json.Decode as JsDecode
import Model.Users exposing (Model)
import Msg.Main as Main exposing (..)
import Msg.Server as Users exposing (..)
import Debug exposing (..)


update : Main.Msg -> Model -> Model
update msgFor users =
    case msgFor of
        MsgFromServer msg ->
            updateUsers msg users

        _ ->
            users


updateUsers : Users.Msg -> Model -> Model
updateUsers msg users =
    case msg of
        NewMessage json ->
            let
                decoded =
                    decodeMsgFromServer json

                _ =
                    log "decoded" decoded
            in
                users


decodeMsgFromServer msg =
    let
        decoder =
            JsDecode.field "type" JsDecode.string
    in
        JsDecode.decodeString decoder msg
