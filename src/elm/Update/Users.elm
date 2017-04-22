module Update.Users exposing (update)

import Json.Decode as JsDecode
import Model.Users exposing (Model)
import Msg.Main as Main exposing (..)
import Msg.Server as Users exposing (..)
import Debug exposing (..)


type ServerMsg
    = Pinged Int
    | UserEnteredRoom String
    | Unknown


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

                serverMsg =
                    log "decoded" decoded
            in
                users


decodeMsgFromServer : String -> String
decodeMsgFromServer msg =
    let
        decodeTimestamp =
            JsDecode.field "timestamp" JsDecode.int

        serverMsgDecoder =
            JsDecode.field "type" JsDecode.string
                |> JsDecode.andThen
                    (\s ->
                        case s of
                            "pinged" ->
                                let
                                    a =
                                        JsDecode.decodeString decodeTimestamp msg
                                in
                                    case a of
                                        Ok timestamp ->
                                            JsDecode.succeed <|
                                                Pinged timestamp

                                        Err string ->
                                            JsDecode.succeed Unknown

                            "user-entered-room" ->
                                JsDecode.succeed <|
                                    UserEnteredRoom "someone@cucumber.io"

                            _ ->
                                JsDecode.succeed Unknown
                    )

        a =
            JsDecode.decodeString serverMsgDecoder msg
    in
        case a of
            Ok (Pinged timestamp) ->
                String.concat [ "--pinged:", toString timestamp, "--" ]

            Ok (UserEnteredRoom email) ->
                String.concat [ "--entered:", email, "--" ]

            Ok Unknown ->
                "--unknown--"

            Err _ ->
                "--err--"
